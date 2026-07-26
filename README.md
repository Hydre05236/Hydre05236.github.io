# Hydre05236 的数学札记

一个无需安装依赖的个人数学博客。正文使用 Markdown，公式由 MathJax 渲染，评论使用 Giscus。

在线地址：<https://hydre05236.github.io/>

公开站点不提供写作入口。写作台仅在 `localhost` 或 `127.0.0.1` 本地预览时开放，文章发布权限由 GitHub 仓库写入权限控制。

## 本地预览

需要 Node.js 18 或更新版本：

```powershell
npm run dev
```

打开 `http://127.0.0.1:4173`。

## 修改个人信息

编辑 `config.js` 中的 `title`、`author`、`description`、`about` 与 `github`。

## 发布文章

1. 在网页的“写作台”中写作并导出 Markdown，或直接在 `posts` 目录新建 `.md` 文件。
2. 运行 `npm run posts`。
3. 将整个 `math-blog` 目录部署到 GitHub Pages、Netlify 或其他静态托管服务。

写作台中的“加入本地文章列表”只用于预览，数据保存在当前浏览器。公开文章以 `posts` 目录中的 Markdown 文件为准。

## 启用公开评论

1. 将网站放入公开 GitHub 仓库，并在仓库中启用 Discussions。
2. 在 [giscus.app](https://giscus.app/zh-CN) 选择 `Hydre05236/Hydre05236.github.io` 和讨论分类。
3. 把生成配置中的 `repo`、`repo-id`、`category`、`category-id` 填入 `config.js` 的 `giscus` 字段。

访客随后可以使用 GitHub 账号在每篇公开文章下评论。
