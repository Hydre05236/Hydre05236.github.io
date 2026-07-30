import crypto from "node:crypto";
import { execFile } from "node:child_process";
import http from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDirectory = path.join(root, "posts");
const generatedPostsFile = path.join(postsDirectory, "posts.generated.js");
const buildPostsScript = path.join(root, "scripts", "build-posts.mjs");
const port = Number(process.env.PORT || 4173);
const authorToken = crypto.randomBytes(32).toString("hex");
const maxRequestBytes = 1_100_000;
const gitNetworkRetryDelays = [0, 2_000, 6_000];
let publishing = false;

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

function isLocalHost(request) {
  const hostname = String(request.headers.host || "").split(":")[0].toLowerCase();
  return hostname === "127.0.0.1" || hostname === "localhost";
}

function isTrustedAuthorRequest(request) {
  const origin = String(request.headers.origin || "");
  const allowedOrigins = new Set([
    `http://127.0.0.1:${port}`,
    `http://localhost:${port}`,
  ]);
  const suppliedToken = String(request.headers["x-author-token"] || "");

  return (
    isLocalHost(request) &&
    allowedOrigins.has(origin) &&
    suppliedToken.length === authorToken.length &&
    crypto.timingSafeEqual(Buffer.from(suppliedToken), Buffer.from(authorToken))
  );
}

async function readJson(request) {
  const chunks = [];
  let total = 0;

  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxRequestBytes) {
      const error = new Error("文章内容过大，暂不支持超过 1 MB 的单篇文章。");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("发布请求的格式无效。");
    error.status = 400;
    throw error;
  }
}

function cleanSingleLine(value, maxLength) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

function localToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function slugify(value) {
  return (
    String(value || "")
      .toLocaleLowerCase("zh-CN")
      .normalize("NFKD")
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 100) || `note-${Date.now()}`
  );
}

function validatePost(payload) {
  const title = cleanSingleLine(payload.title, 200);
  const summary = cleanSingleLine(payload.summary, 500);
  const content = String(payload.content || "").replace(/\r\n/g, "\n").trim();
  const mode = payload.mode === "update" ? "update" : "create";
  const requestedSlug = cleanSingleLine(payload.slug, 100);
  const slug = mode === "update" ? requestedSlug : slugify(title);
  const tags = Array.isArray(payload.tags)
    ? payload.tags.map((tag) => cleanSingleLine(tag, 40)).filter(Boolean).slice(0, 12)
    : [];
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(payload.date || ""))
    ? String(payload.date)
    : localToday();

  if (!title) throw Object.assign(new Error("请先填写文章标题。"), { status: 400 });
  if (!summary) throw Object.assign(new Error("请填写一段文章摘要。"), { status: 400 });
  if (!content) throw Object.assign(new Error("文章正文不能为空。"), { status: 400 });
  if (mode === "update" && !requestedSlug) {
    throw Object.assign(new Error("缺少要更新的文章标识，请从已发布文章进入编辑。"), { status: 400 });
  }
  if (content.length > 1_000_000) {
    throw Object.assign(new Error("文章内容过大，暂不支持超过 1 MB 的单篇文章。"), { status: 413 });
  }
  if (!/^[\p{Letter}\p{Number}]+(?:-[\p{Letter}\p{Number}]+)*$/u.test(slug)) {
    throw Object.assign(new Error("文章文件名无效，请重新导入或新建草稿。"), { status: 400 });
  }
  if (tags.some((tag) => /[\[\],]/.test(tag))) {
    throw Object.assign(new Error("标签中不能包含逗号或方括号。"), { status: 400 });
  }

  return { title, summary, content, slug, tags, date, mode };
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function serializePost(post) {
  const tags = post.tags.map(yamlString).join(", ");
  return [
    "---",
    `title: ${yamlString(post.title)}`,
    `date: ${post.date}`,
    `summary: ${yamlString(post.summary)}`,
    `tags: [${tags}]`,
    "---",
    "",
    post.content,
    "",
  ].join("\n");
}

async function runGit(args, allowedCodes = [0]) {
  try {
    const result = await execFileAsync("git", args, {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 2 * 1024 * 1024,
      timeout: 120_000,
      windowsHide: true,
    });
    return { code: 0, stdout: result.stdout.trim(), stderr: result.stderr.trim() };
  } catch (error) {
    const code = Number(error.code);
    if (allowedCodes.includes(code)) {
      return {
        code,
        stdout: String(error.stdout || "").trim(),
        stderr: String(error.stderr || "").trim(),
      };
    }
    const detail = cleanSingleLine(error.stderr || error.message, 500);
    throw new Error(detail || "Git 操作失败。");
  }
}

function isTransientGitNetworkError(message) {
  return /RPC failed|curl \d+|connection (?:was )?reset|expected flush after ref listing|failed to connect|couldn't connect|could not resolve host|timed? out|timeout|remote end hung up|early EOF|TLS|SSL|HTTP\/2 stream|(?:^|\s)(?:502|503|504)(?:\s|$)/i.test(message);
}

async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function runNetworkGit(args) {
  let lastError = null;

  for (const delay of gitNetworkRetryDelays) {
    if (delay) await wait(delay);
    try {
      return await runGit(["-c", "http.version=HTTP/1.1", ...args]);
    } catch (error) {
      lastError = error;
      if (!isTransientGitNetworkError(error.message)) throw error;
    }
  }

  const error = new Error(
    `GitHub 连接在自动重试 ${gitNetworkRetryDelays.length} 次后仍不可用。你的草稿仍安全保存在写作台，请稍后再次点击发布。最后错误：${lastError?.message || "网络连接失败。"}`
  );
  error.status = 503;
  error.code = "GIT_NETWORK_UNAVAILABLE";
  throw error;
}

async function ensureCleanWorktree() {
  const status = await runGit(["status", "--porcelain"]);
  if (status.stdout) {
    const error = new Error("站点目录中还有未处理的改动。为避免误提交，本次发布已停止。请先在 Codex 中检查这些改动。");
    error.status = 409;
    error.code = "DIRTY_WORKTREE";
    throw error;
  }
}

async function isAncestor(ancestor, descendant) {
  const result = await runGit(["merge-base", "--is-ancestor", ancestor, descendant], [0, 1]);
  return result.code === 0;
}

async function synchronizeRemote() {
  await runNetworkGit(["fetch", "origin", "master"]);
  const head = (await runGit(["rev-parse", "HEAD"])).stdout;
  const remote = (await runGit(["rev-parse", "origin/master"])).stdout;

  if (head === remote) return;
  if (await isAncestor(head, remote)) {
    await runGit(["merge", "--ff-only", "origin/master"]);
    return;
  }
  if (!(await isAncestor(remote, head))) {
    const error = new Error("本地与 GitHub 上的版本已经分叉。请先在 Codex 中处理同步问题，再重新发布。");
    error.status = 409;
    error.code = "DIVERGED_BRANCH";
    throw error;
  }
}

async function publishPost(payload) {
  const post = validatePost(payload);
  await ensureCleanWorktree();
  await synchronizeRemote();
  await ensureCleanWorktree();

  const articleFile = path.join(postsDirectory, `${post.slug}.md`);
  const relativeArticle = path.relative(root, articleFile).replace(/\\/g, "/");
  const relativeGenerated = path.relative(root, generatedPostsFile).replace(/\\/g, "/");
  let oldArticle = null;
  let oldGenerated = null;
  let articleExists = false;
  let committed = false;

  try {
    oldArticle = await fs.readFile(articleFile);
    articleExists = true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  if (articleExists && post.mode === "create") {
    const error = new Error("该标题对应的文章地址已经存在。请从已有文章进入编辑，或修改新文章标题。");
    error.status = 409;
    error.code = "ARTICLE_EXISTS";
    throw error;
  }
  if (!articleExists && post.mode === "update") {
    const error = new Error("要更新的文章不存在。请返回文章列表重新进入编辑。");
    error.status = 409;
    error.code = "ARTICLE_NOT_FOUND";
    throw error;
  }

  try {
    oldGenerated = await fs.readFile(generatedPostsFile);
    await fs.writeFile(articleFile, serializePost(post), "utf8");
    await execFileAsync(process.execPath, [buildPostsScript], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 2 * 1024 * 1024,
      timeout: 30_000,
      windowsHide: true,
    });

    await runGit(["add", "--", relativeArticle, relativeGenerated]);
    const staged = await runGit(["diff", "--cached", "--quiet"], [0, 1]);
    if (staged.code === 1) {
      const action = post.mode === "update" ? "Update" : "Publish";
      await runGit(["commit", "-m", `${action} article: ${post.title}`]);
      committed = true;
    }

    await runNetworkGit(["push", "origin", "master"]);
    const commit = (await runGit(["rev-parse", "--short", "HEAD"])).stdout;
    return {
      commit,
      created: post.mode === "create",
      liveUrl: `https://hydre05236.github.io/#/article/${encodeURIComponent(post.slug)}`,
      post: {
        content: post.content,
        date: post.date,
        slug: post.slug,
        summary: post.summary,
        tags: post.tags,
        title: post.title,
      },
    };
  } catch (error) {
    if (!committed) {
      if (articleExists) await fs.writeFile(articleFile, oldArticle);
      else await fs.rm(articleFile, { force: true });
      if (oldGenerated) await fs.writeFile(generatedPostsFile, oldGenerated);
      await runGit(["restore", "--staged", "--", relativeArticle, relativeGenerated], [0, 1, 128]);
    }
    throw error;
  }
}

async function handleApi(request, response, pathname) {
  if (pathname === "/api/session" && request.method === "GET") {
    if (!isLocalHost(request)) return sendJson(response, 403, { error: "仅允许从本机访问写作服务。" });
    return sendJson(response, 200, {
      author: true,
      repository: "Hydre05236/Hydre05236.github.io",
      token: authorToken,
    });
  }

  if (pathname === "/api/publish" && request.method === "POST") {
    if (!isTrustedAuthorRequest(request)) {
      return sendJson(response, 403, { error: "写作会话无效，请从桌面快捷方式重新打开。" });
    }
    if (publishing) return sendJson(response, 409, { error: "上一篇文章仍在发布，请稍候。", code: "PUBLISHING" });

    publishing = true;
    try {
      const result = await publishPost(await readJson(request));
      return sendJson(response, 200, result);
    } catch (error) {
      return sendJson(response, error.status || 500, {
        code: error.code || "PUBLISH_FAILED",
        error: cleanSingleLine(error.message, 600) || "发布失败。",
      });
    } finally {
      publishing = false;
    }
  }

  return sendJson(response, 404, { error: "Not found" });
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host || `127.0.0.1:${port}`}`);
    const pathname = decodeURIComponent(requestUrl.pathname);

    if (pathname.startsWith("/api/")) {
      await handleApi(request, response, pathname);
      return;
    }

    const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(root, relative);
    if (!filePath.toLowerCase().startsWith(root.toLowerCase() + path.sep)) {
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    }

    const body = await fs.readFile(filePath);
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(error.status || 404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error.status === 403 ? "Forbidden" : "Not found");
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`端口 ${port} 已被占用。写作服务可能已经启动。`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Hydre05236 author studio: http://127.0.0.1:${port}/#/write`);
});
