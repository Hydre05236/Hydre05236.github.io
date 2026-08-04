(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const publishedPosts = Array.isArray(window.PUBLISHED_POSTS) ? window.PUBLISHED_POSTS : [];
  const localPostKey = "math-blog:local-posts";
  const draftKey = "math-blog:draft";
  const isAuthorMode = ["localhost", "127.0.0.1", ""].includes(location.hostname);
  const views = [...document.querySelectorAll(".view")];
  let authorToken = "";
  let currentSlug = "";
  let currentDate = "";
  let currentMode = "create";
  let publisherReady = false;

  const starterDraft = String.raw`## 从一个问题开始

在这里写下你的第一段数学文字。行内公式可以写成 $e^{i\pi}+1=0$，独立公式则使用双美元符号：

$$
\int_M \Delta f\,\mathrm{d}V = 0.
$$

### 一个命题

> 清楚地写下假设，往往已经完成了证明的一半。

接下来可以记录定义、例子与证明。`;

  const elements = {
    articleList: document.querySelector("#article-list"),
    searchInput: document.querySelector("#search-input"),
    articleMeta: document.querySelector("#article-meta"),
    articleTitle: document.querySelector("#article-title"),
    articleSummary: document.querySelector("#article-summary"),
    articleBody: document.querySelector("#article-body"),
    articleFooter: document.querySelector("#article-footer"),
    comments: document.querySelector("#comments-container"),
    title: document.querySelector("#editor-title"),
    summary: document.querySelector("#editor-summary"),
    tags: document.querySelector("#editor-tags"),
    body: document.querySelector("#editor-body"),
    preview: document.querySelector("#editor-preview"),
    status: document.querySelector("#editor-status"),
    mode: document.querySelector("#editor-mode"),
    articlePicker: document.querySelector("#existing-article"),
    independentScroll: document.querySelector("#independent-scroll"),
    deleteButton: document.querySelector("#delete-article"),
    publishButton: document.querySelector("#publish-github"),
    publishResult: document.querySelector("#publish-result"),
    workspace: document.querySelector("#studio-workspace")
  };

  function getLocalPosts() {
    try {
      return JSON.parse(localStorage.getItem(localPostKey) || "[]");
    } catch {
      return [];
    }
  }

  function allPosts() {
    return [...getLocalPosts(), ...publishedPosts].sort((a, b) =>
      String(b.date || "").localeCompare(String(a.date || ""))
    );
  }

  function applyConfig() {
    document.documentElement.classList.toggle("author-mode", isAuthorMode);
    document.title = config.documentTitle || config.title || "我的数学札记";
    document.querySelectorAll("[data-site-title]").forEach((el) => { el.textContent = config.title || "我的数学札记"; });
    document.querySelectorAll("[data-author]").forEach((el) => { el.textContent = config.author || "你的名字"; });
    document.querySelectorAll("[data-site-description]").forEach((el) => { el.textContent = config.description || ""; });
    document.querySelectorAll("[data-about]").forEach((el) => { el.textContent = config.about || ""; });
    const github = config.github || "https://github.com/Hydre05236";
    const githubLink = document.querySelector("#github-link");
    githubLink.textContent = github.replace(/^https?:\/\/github\.com\//, "@");
    githubLink.href = github;
    document.querySelector("#current-year").textContent = new Date().getFullYear();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderInline(source) {
    const protectedValues = [];
    const protect = (value) => {
      const token = `@@PROTECTED_${protectedValues.length}@@`;
      protectedValues.push(value);
      return token;
    };

    let text = source
      .replace(/`([^`]+)`/g, (_, code) => protect(`<code>${escapeHtml(code)}</code>`))
      .replace(/\$\$[\s\S]+?\$\$/g, (value) => protect(escapeHtml(value)))
      .replace(/\\\[[\s\S]+?\\\]/g, (value) => protect(escapeHtml(value)))
      .replace(/\\\([\s\S]+?\\\)/g, (value) => protect(escapeHtml(value)))
      .replace(/\$(?!\s)(?:\\.|[^$\n])+?\$/g, (value) => protect(escapeHtml(value)));

    text = escapeHtml(text)
      .replace(/!\[([^\]]*)\]\(((?:https?:\/\/|\.{0,2}\/)[^\s)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\.{0,2}\/)[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");

    protectedValues.forEach((value, index) => {
      text = text.replace(`@@PROTECTED_${index}@@`, value);
    });
    return text;
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown || "").replace(/\r\n?/g, "\n").split("\n");
    const html = [];
    let paragraph = [];
    let listType = null;
    let inCode = false;
    let codeLanguage = "";
    let codeLines = [];

    const closeParagraph = () => {
      if (paragraph.length) {
        html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    };
    const closeList = () => {
      if (listType) html.push(`</${listType}>`);
      listType = null;
    };

    for (const line of lines) {
      const fence = line.match(/^```\s*([\w-]*)/);
      if (fence) {
        if (inCode) {
          html.push(`<pre><code${codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : ""}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
          inCode = false;
          codeLines = [];
          codeLanguage = "";
        } else {
          closeParagraph();
          closeList();
          inCode = true;
          codeLanguage = fence[1] || "";
        }
        continue;
      }
      if (inCode) {
        codeLines.push(line);
        continue;
      }
      if (!line.trim()) {
        closeParagraph();
        closeList();
        continue;
      }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        closeParagraph();
        closeList();
        const level = heading[1].length;
        html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
        continue;
      }
      if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
        closeParagraph();
        closeList();
        html.push("<hr>");
        continue;
      }
      const quote = line.match(/^>\s?(.*)$/);
      if (quote) {
        closeParagraph();
        closeList();
        html.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
        continue;
      }
      const unordered = line.match(/^[-*+]\s+(.+)$/);
      const ordered = line.match(/^\d+[.)]\s+(.+)$/);
      if (unordered || ordered) {
        closeParagraph();
        const nextType = unordered ? "ul" : "ol";
        if (listType !== nextType) {
          closeList();
          listType = nextType;
          html.push(`<${listType}>`);
        }
        html.push(`<li>${renderInline((unordered || ordered)[1])}</li>`);
        continue;
      }
      paragraph.push(line.trim());
    }

    if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    closeParagraph();
    closeList();
    return html.join("\n");
  }

  function typeset(container) {
    if (!container) return;
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetClear?.([container]);
      window.MathJax.typesetPromise([container]).catch(() => {});
    }
  }

  function formatDate(date) {
    if (!date) return "未标日期";
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return date;
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(parsed);
  }

  function renderPostList(query = "") {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    const posts = allPosts().filter((post) => {
      const haystack = [post.title, post.summary, ...(post.tags || [])].join(" ").toLocaleLowerCase("zh-CN");
      return !needle || haystack.includes(needle);
    });

    if (!posts.length) {
      const isSearch = Boolean(needle);
      elements.articleList.innerHTML = `
        <div class="empty-state">
          <div>
            <h3>${isSearch ? "没有找到相关文章" : "第一篇文章正在酝酿"}</h3>
            <p>${isSearch ? "换一个关键词再试试。" : "从一个定义、一段推导，或一个还没解决的问题开始。"}</p>
          </div>
          ${isSearch || !isAuthorMode ? "" : '<a class="primary-action" href="#/write">打开写作台 <span aria-hidden="true">→</span></a>'}
        </div>`;
      return;
    }

    elements.articleList.innerHTML = posts.map((post) => `
      <a class="article-row" href="#/article/${encodeURIComponent(post.slug)}">
        <time datetime="${escapeHtml(post.date || "")}">${escapeHtml(formatDate(post.date))}</time>
        <div>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.summary || "")}</p>
        </div>
        <div class="article-tags">${(post.tags || []).map((tag) => `<span># ${escapeHtml(tag)}</span>`).join("")}</div>
        <span class="article-arrow" aria-hidden="true">→</span>
      </a>`).join("");
  }

  function renderArticle(slug) {
    const post = allPosts().find((item) => item.slug === slug);
    if (!post) {
      location.hash = "#/";
      return;
    }
    elements.articleMeta.textContent = `${formatDate(post.date)} · ${(post.tags || []).join(" / ") || "札记"}`;
    elements.articleTitle.textContent = post.title;
    elements.articleSummary.textContent = post.summary || "";
    elements.articleBody.innerHTML = markdownToHtml(post.content || "");
    if (post.local) {
      elements.articleFooter.innerHTML = `
        <span>此文章仅保存在当前浏览器中。</span>
        <button class="delete-local-post" type="button">删除本地文章</button>`;
      elements.articleFooter.querySelector("button").addEventListener("click", () => deleteLocalPost(post.slug));
    } else {
      const author = document.createElement("span");
      author.textContent = `作者：${config.author || ""}`;
      elements.articleFooter.replaceChildren(author);
      if (isAuthorMode) {
        const editButton = document.createElement("button");
        editButton.className = "edit-source-post";
        editButton.type = "button";
        editButton.textContent = "继续编辑";
        editButton.addEventListener("click", () => editArticle(post));
        elements.articleFooter.append(editButton);
      }
    }
    document.title = `${post.title} · ${config.title || "数学札记"}`;
    typeset(elements.articleBody);
    mountComments(post);
  }

  function deleteLocalPost(slug) {
    if (!window.confirm("确定删除这篇本地文章吗？此操作无法撤销。")) return;
    const remaining = getLocalPosts().filter((post) => post.slug !== slug);
    localStorage.setItem(localPostKey, JSON.stringify(remaining));
    location.hash = "#/";
  }

  function mountComments(post) {
    elements.comments.replaceChildren();
    const settings = config.giscus || {};
    if (post.local || !settings.repo || !settings.repoId || !settings.categoryId) {
      const empty = document.createElement("p");
      empty.className = "comments-empty";
      empty.textContent = post.local ? "本地文章暂不开放评论。" : "评论区将在网站公开发布后出现。";
      elements.comments.append(empty);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.repo = settings.repo;
    script.dataset.repoId = settings.repoId;
    script.dataset.category = settings.category || "Announcements";
    script.dataset.categoryId = settings.categoryId;
    script.dataset.mapping = settings.mapping || "specific";
    script.dataset.term = post.slug;
    script.dataset.strict = "0";
    script.dataset.reactionsEnabled = "1";
    script.dataset.emitMetadata = "0";
    script.dataset.inputPosition = "top";
    script.dataset.theme = settings.theme || "light";
    script.dataset.lang = "zh-CN";
    script.dataset.loading = "lazy";
    elements.comments.append(script);
  }

  function showView(id) {
    views.forEach((view) => { view.hidden = view.id !== id; });
    window.scrollTo(0, 0);
  }

  function route() {
    const hash = location.hash || "#/";
    if (hash.startsWith("#/article/")) {
      showView("article-view");
      renderArticle(decodeURIComponent(hash.slice("#/article/".length)));
    } else if (hash === "#/write" && isAuthorMode) {
      showView("write-view");
      document.title = `写作台 · ${config.title || "数学札记"}`;
      updatePreview();
    } else if (hash === "#/about") {
      showView("about-view");
      document.title = `关于 · ${config.title || "数学札记"}`;
    } else {
      showView("home-view");
      document.title = config.documentTitle || config.title || "我的数学札记";
      renderPostList(elements.searchInput.value);
    }
  }

  function parseFrontMatter(text) {
    const normalized = text.replace(/\r\n?/g, "\n");
    if (!normalized.startsWith("---\n")) return { meta: {}, content: normalized };
    const end = normalized.indexOf("\n---\n", 4);
    if (end < 0) return { meta: {}, content: normalized };
    const meta = {};
    normalized.slice(4, end).split("\n").forEach((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return;
      const key = line.slice(0, separator).trim();
      let value = line.slice(separator + 1).trim();
      const parseScalar = (input) => {
        const trimmed = input.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          try { return JSON.parse(trimmed); } catch { return trimmed.slice(1, -1); }
        }
        return trimmed.replace(/^'|'$/g, "");
      };
      if (key === "tags") value = value.replace(/^\[|\]$/g, "").split(",").map(parseScalar).filter(Boolean);
      else value = parseScalar(value);
      meta[key] = value;
    });
    return { meta, content: normalized.slice(end + 5) };
  }

  function slugify(value) {
    const latin = value.toLocaleLowerCase("zh-CN")
      .normalize("NFKD")
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-+|-+$/g, "");
    return latin || `note-${Date.now()}`;
  }

  function localToday() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  }

  function currentDraft() {
    return {
      mode: currentMode,
      slug: currentSlug,
      date: currentDate,
      title: elements.title.value.trim(),
      summary: elements.summary.value.trim(),
      tags: elements.tags.value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean),
      content: elements.body.value
    };
  }

  function hasMeaningfulDraft(draft = currentDraft()) {
    return Boolean(
      draft.title ||
      draft.summary ||
      draft.tags.length ||
      draft.content.trim() !== starterDraft.trim()
    );
  }

  function flashStatus(message) {
    elements.status.textContent = message;
    clearTimeout(flashStatus.timer);
    flashStatus.timer = setTimeout(() => { elements.status.textContent = ""; }, 2600);
  }

  function updatePreview() {
    elements.preview.innerHTML = markdownToHtml(elements.body.value);
    typeset(elements.preview);
  }

  function saveDraft() {
    persistDraft();
    flashStatus("草稿已保存");
  }

  function persistDraft() {
    localStorage.setItem(draftKey, JSON.stringify(currentDraft()));
  }

  function loadDraft() {
    let draft = null;
    try { draft = JSON.parse(localStorage.getItem(draftKey) || "null"); } catch { draft = null; }
    elements.title.value = draft?.title || "";
    elements.summary.value = draft?.summary || "";
    elements.tags.value = (draft?.tags || []).join(", ");
    elements.body.value = draft?.content || starterDraft;
    const editingPost = draft?.mode === "update"
      ? publishedPosts.find((post) => post.slug === draft.slug)
      : null;
    currentMode = editingPost ? "update" : "create";
    currentSlug = editingPost?.slug || "";
    currentDate = draft?.date || "";
    updateEditorMode();
  }

  function exportDraft() {
    const draft = currentDraft();
    const date = draft.date || localToday();
    const content = `---\ntitle: "${draft.title || "未命名文章"}"\ndate: ${date}\nsummary: "${draft.summary.replaceAll('"', '\\"')}"\ntags: [${draft.tags.join(", ")}]\n---\n\n${draft.content.trim()}\n`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
    link.download = `${draft.mode === "update" && draft.slug ? draft.slug : slugify(draft.title || "untitled")}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
    flashStatus("Markdown 已导出");
  }

  function publishLocal() {
    const draft = currentDraft();
    if (!draft.title) {
      elements.title.focus();
      flashStatus("请先填写标题");
      return;
    }
    const post = {
      ...draft,
      slug: `${slugify(draft.title)}-${Date.now().toString(36)}`,
      date: localToday(),
      local: true
    };
    const posts = getLocalPosts();
    posts.unshift(post);
    localStorage.setItem(localPostKey, JSON.stringify(posts));
    flashStatus("已加入本地文章列表");
  }

  function setPublishResult(kind, message, href = "") {
    elements.publishResult.hidden = false;
    elements.publishResult.className = `publish-result ${kind}`;
    const text = document.createElement("span");
    text.textContent = message;
    elements.publishResult.replaceChildren(text);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "查看线上文章";
      elements.publishResult.append(link);
    }
  }

  function updateEditorMode() {
    if (currentMode === "update") {
      const post = publishedPosts.find((item) => item.slug === currentSlug);
      elements.mode.textContent = `正在编辑：${post?.title || elements.title.value.trim() || currentSlug}`;
    } else {
      elements.mode.textContent = "新文章";
    }
    elements.articlePicker.value = currentMode === "update" ? currentSlug : "";
    elements.deleteButton.hidden = currentMode !== "update";
    elements.deleteButton.disabled = !publisherReady;
    if (publisherReady && !elements.publishButton.disabled) {
      elements.publishButton.textContent = currentMode === "update" ? "更新到 GitHub" : "发布到 GitHub";
    }
  }

  function newArticle() {
    const draft = currentDraft();
    if (hasMeaningfulDraft(draft) && !window.confirm("新建文章会清空当前写作台。请确认草稿已经保存或导出。")) return;

    currentMode = "create";
    currentSlug = "";
    currentDate = "";
    elements.title.value = "";
    elements.summary.value = "";
    elements.tags.value = "";
    elements.body.value = starterDraft;
    elements.publishResult.hidden = true;
    persistDraft();
    updatePreview();
    updateEditorMode();
    elements.title.focus();
    flashStatus("已新建文章");
  }

  async function setupPublisher() {
    if (!isAuthorMode) return;
    try {
      const response = await fetch("/api/session", { cache: "no-store" });
      if (!response.ok) throw new Error("本地写作服务不可用。");
      const session = await response.json();
      if (!session.author || !session.token) throw new Error("无法建立写作会话。");
      authorToken = session.token;
      publisherReady = true;
      elements.publishButton.disabled = false;
      updateEditorMode();
    } catch {
      elements.publishButton.disabled = true;
      elements.publishButton.textContent = "发布服务未连接";
      setPublishResult("warning", "请从桌面的“Hydre05236 写作台”快捷方式进入，才能直接发布文章。");
    }
  }

  async function publishToGitHub() {
    const draft = currentDraft();
    const previousSlug = currentSlug;
    if (!draft.title) {
      elements.title.focus();
      return setPublishResult("error", "请先填写文章标题。");
    }
    if (!draft.summary) {
      elements.summary.focus();
      return setPublishResult("error", "请先填写文章摘要。");
    }
    if (!draft.content.trim()) {
      elements.body.focus();
      return setPublishResult("error", "文章正文不能为空。");
    }
    if (!publisherReady) return setPublishResult("error", "本地发布服务尚未连接。");

    elements.deleteButton.disabled = true;
    elements.publishButton.disabled = true;
    elements.publishButton.textContent = "正在发布";
    setPublishResult("working", "正在同步 GitHub、生成文章索引并发布……");

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Author-Token": authorToken
        },
        body: JSON.stringify(draft)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "发布失败，请稍后重试。");
      }

      currentMode = "update";
      currentSlug = result.post.slug;
      currentDate = result.post.date;
      const existingIndex = publishedPosts.findIndex((post) => post.slug === previousSlug);
      if (existingIndex >= 0) publishedPosts.splice(existingIndex, 1, result.post);
      else publishedPosts.unshift(result.post);
      populateArticlePicker();
      persistDraft();
      updateEditorMode();
      setPublishResult("success", `已推送到 GitHub（${result.commit}）。GitHub Pages 通常会在稍后更新。`, result.liveUrl);
    } catch (error) {
      setPublishResult("error", error.message || "发布失败，请稍后重试。");
    } finally {
      elements.publishButton.disabled = !publisherReady;
      updateEditorMode();
    }
  }

  async function deleteArticle() {
    if (currentMode !== "update" || !currentSlug) return;
    const post = publishedPosts.find((item) => item.slug === currentSlug);
    const title = post?.title || elements.title.value.trim() || currentSlug;
    if (!window.confirm(`\u786e\u5b9a\u8981\u4ece\u7f51\u7ad9\u548c GitHub \u4ed3\u5e93\u5220\u9664\u300a${title}\u300b\u5417\uff1f\u6b64\u64cd\u4f5c\u4e0d\u80fd\u4ece\u7f51\u7ad9\u6062\u590d\u3002`)) return;
    if (!publisherReady) return setPublishResult("error", "\u672c\u5730\u53d1\u5e03\u670d\u52a1\u5c1a\u672a\u8fde\u63a5\u3002");

    elements.publishButton.disabled = true;
    elements.deleteButton.disabled = true;
    elements.deleteButton.textContent = "\u6b63\u5728\u5220\u9664";
    setPublishResult("working", "\u6b63\u5728\u540c\u6b65 GitHub\u3001\u91cd\u5efa\u6587\u7ae0\u7d22\u5f15\u5e76\u5220\u9664\u2026\u2026");

    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Author-Token": authorToken
        },
        body: JSON.stringify({ slug: currentSlug })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");

      const existingIndex = publishedPosts.findIndex((post) => post.slug === currentSlug);
      if (existingIndex >= 0) publishedPosts.splice(existingIndex, 1);
      currentMode = "create";
      currentSlug = "";
      currentDate = "";
      elements.title.value = "";
      elements.summary.value = "";
      elements.tags.value = "";
      elements.body.value = starterDraft;
      elements.publishResult.hidden = true;
      populateArticlePicker();
      persistDraft();
      updatePreview();
      updateEditorMode();
      elements.title.focus();
      setPublishResult("success", `\u5df2\u4ece GitHub \u5220\u9664\u300a${title}\u300b\uff08${result.commit}\uff09\u3002`);
    } catch (error) {
      setPublishResult("error", error.message || "\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");
    } finally {
      elements.deleteButton.textContent = "\u5220\u9664\u6587\u7ae0";
      elements.publishButton.disabled = !publisherReady;
      updateEditorMode();
    }
  }

  function editArticle(post) {
    const sameArticle = currentMode === "update" && currentSlug === post.slug;
    if (!sameArticle && hasMeaningfulDraft() && !window.confirm("打开已有文章会替换当前写作台内容。请确认草稿已经保存或导出。")) {
      elements.articlePicker.value = currentMode === "update" ? currentSlug : "";
      return false;
    }

    currentMode = "update";
    currentSlug = post.slug;
    currentDate = post.date || "";
    elements.title.value = post.title || "";
    elements.summary.value = post.summary || "";
    elements.tags.value = (post.tags || []).join(", ");
    elements.body.value = post.content || "";
    persistDraft();
    updatePreview();
    updateEditorMode();
    elements.publishResult.hidden = true;
    location.hash = "#/write";
    flashStatus("已载入已有文章");
    return true;
  }

  function setMode(mode) {
    elements.workspace.classList.remove("mode-split", "mode-edit", "mode-preview");
    elements.workspace.classList.add(`mode-${mode}`);
    document.querySelectorAll(".mode-button").forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (mode !== "edit") updatePreview();
  }

  function setIndependentScroll(enabled) {
    elements.workspace.classList.toggle("independent-scroll", enabled);
    flashStatus(enabled ? "已启用独立滚动" : "已恢复自动高度");
  }

  function populateArticlePicker() {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "编辑已有文章";
    const options = publishedPosts.map((post) => {
      const option = document.createElement("option");
      option.value = post.slug;
      option.textContent = post.title;
      return option;
    });
    elements.articlePicker.replaceChildren(placeholder, ...options);
    elements.articlePicker.value = currentMode === "update" ? currentSlug : "";
  }

  function setupEditor() {
    populateArticlePicker();
    loadDraft();
    updatePreview();
    let previewTimer;
    let autosaveTimer;
    const queueAutosave = () => {
      clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(persistDraft, 700);
    };
    elements.body.addEventListener("input", () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(updatePreview, 240);
      queueAutosave();
    });
    [elements.title, elements.summary, elements.tags].forEach((input) => input.addEventListener("input", queueAutosave));
    document.querySelector("#save-draft").addEventListener("click", saveDraft);
    document.querySelector("#new-article").addEventListener("click", newArticle);
    document.querySelector("#export-post").addEventListener("click", exportDraft);
    document.querySelector("#publish-local").addEventListener("click", publishLocal);
    elements.publishButton.addEventListener("click", publishToGitHub);
    document.querySelectorAll(".mode-button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
    elements.independentScroll.addEventListener("change", () => setIndependentScroll(elements.independentScroll.checked));
    elements.deleteButton.addEventListener("click", deleteArticle);
    elements.articlePicker.addEventListener("change", () => {
      const post = publishedPosts.find((item) => item.slug === elements.articlePicker.value);
      if (post) editArticle(post);
    });
    document.querySelector("#import-file").addEventListener("change", async (event) => {
      const [file] = event.target.files;
      if (!file) return;
      const parsed = parseFrontMatter(await file.text());
      elements.title.value = parsed.meta.title || file.name.replace(/\.(md|markdown)$/i, "");
      elements.summary.value = parsed.meta.summary || "";
      elements.tags.value = Array.isArray(parsed.meta.tags) ? parsed.meta.tags.join(", ") : "";
      elements.body.value = parsed.content.trim();
      currentMode = "create";
      currentSlug = "";
      currentDate = parsed.meta.date || "";
      elements.articlePicker.value = "";
      persistDraft();
      updatePreview();
      updateEditorMode();
      flashStatus("草稿已导入为新文章");
      event.target.value = "";
    });
    setupPublisher();
  }

  function setupMathCanvas() {
    const canvas = document.querySelector("#math-canvas");
    const context = canvas.getContext("2d");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerX = 0.76;
    let pointerY = 0.45;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(0);
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      const cx = width * pointerX;
      const cy = height * pointerY;
      const scale = Math.min(width, height) * (width < 600 ? 0.43 : 0.38);
      const phase = time * 0.00007;
      context.fillStyle = "#e7e3da";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(24,24,22,0.11)";
      context.lineWidth = 1;
      const step = width < 600 ? 42 : 56;
      for (let x = cx % step; x < width; x += step) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
      for (let y = cy % step; y < height; y += step) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }

      const project = (u, v) => {
        const fivefold = 0.62 + 0.13 * Math.cos(5 * u + 2 * v) + 0.08 * Math.cos(3 * v);
        const depth = Math.sin(2 * u - v);
        const localX = scale * (fivefold * Math.cos(u) + 0.18 * Math.cos(u + 2 * v));
        const localY = scale * (0.66 * fivefold * Math.sin(u) + 0.16 * Math.sin(3 * v - u));
        const turn = phase + 0.18 * Math.sin(v);
        return {
          x: cx + localX * Math.cos(turn) - depth * scale * 0.14 * Math.sin(turn),
          y: cy + localY + depth * scale * 0.12
        };
      };

      context.lineWidth = 1.15;
      for (let latitude = 0; latitude < 17; latitude += 1) {
        const v = latitude / 16 * Math.PI * 2;
        context.strokeStyle = latitude % 3 === 0 ? "rgba(140,41,56,0.64)" : "rgba(140,41,56,0.3)";
        context.beginPath();
        for (let stepIndex = 0; stepIndex <= 180; stepIndex += 1) {
          const u = stepIndex / 180 * Math.PI * 2;
          const point = project(u, v);
          if (stepIndex === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
        }
        context.stroke();
      }

      context.lineWidth = 1;
      for (let meridian = 0; meridian < 15; meridian += 1) {
        const u = meridian / 15 * Math.PI * 2;
        context.strokeStyle = meridian % 5 === 0 ? "rgba(23,106,102,0.7)" : "rgba(23,106,102,0.32)";
        context.beginPath();
        for (let stepIndex = 0; stepIndex <= 160; stepIndex += 1) {
          const v = stepIndex / 160 * Math.PI * 2;
          const point = project(u, v);
          if (stepIndex === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
        }
        context.stroke();
      }

      context.fillStyle = "rgba(24,24,22,0.68)";
      context.font = "12px 'Cascadia Code', monospace";
      context.fillText("Σ zᵢ⁵ = 0 ⊂ ℂP⁴", Math.max(16, Math.min(width - 150, cx + scale * 0.25)), Math.max(28, cy - scale * 0.86));
      context.fillText("c₁(X) = 0", Math.max(16, Math.min(width - 90, cx + scale * 0.58)), Math.min(height - 24, cy + scale * 0.72));

      if (!reducedMotion && frame < 1000000) {
        frame = requestAnimationFrame(draw);
      }
    };

    canvas.closest(".hero").addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = 0.68 + ((event.clientX - rect.left) / rect.width) * 0.13;
      pointerY = 0.38 + ((event.clientY - rect.top) / rect.height) * 0.14;
    });
    addEventListener("resize", resize);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(draw);
  }

  applyConfig();
  if (isAuthorMode) setupEditor();
  setupMathCanvas();
  elements.searchInput.addEventListener("input", (event) => renderPostList(event.target.value));
  addEventListener("hashchange", route);
  route();
})();
