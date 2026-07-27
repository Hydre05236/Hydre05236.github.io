import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDirectory = path.join(root, "posts");
const outputFile = path.join(postsDirectory, "posts.generated.js");

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try { return JSON.parse(trimmed); } catch { return trimmed.slice(1, -1); }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function localToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function parseFrontMatter(source, filename) {
  const normalized = source.replace(/\r\n?/g, "\n");
  if (!normalized.startsWith("---\n")) {
    throw new Error(`${filename}: 缺少 YAML front matter`);
  }
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) throw new Error(`${filename}: front matter 没有结束标记`);

  const meta = {};
  for (const line of normalized.slice(4, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (key === "tags") {
      value = value.replace(/^\[|\]$/g, "").split(",").map(parseScalar).filter(Boolean);
    } else {
      value = parseScalar(value);
    }
    meta[key] = value;
  }

  if (!meta.title) throw new Error(`${filename}: 缺少 title`);
  return {
    slug: path.basename(filename, path.extname(filename)),
    title: meta.title,
    date: meta.date || localToday(),
    summary: meta.summary || "",
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    content: normalized.slice(end + 5).trim()
  };
}

const files = (await fs.readdir(postsDirectory))
  .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
  .sort();

const posts = [];
for (const filename of files) {
  posts.push(parseFrontMatter(await fs.readFile(path.join(postsDirectory, filename), "utf8"), filename));
}

const json = JSON.stringify(posts, null, 2).replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029");
await fs.writeFile(outputFile, `// 此文件由 npm run posts 自动生成，请勿手动修改。\nwindow.PUBLISHED_POSTS = ${json};\n`, "utf8");
console.log(`已生成 ${posts.length} 篇文章：${path.relative(root, outputFile)}`);
