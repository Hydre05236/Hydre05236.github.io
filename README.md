# Hydre05236 的数学札记

一个无需安装依赖的个人数学博客。正文使用 Markdown，公式由 MathJax 渲染，评论使用 Giscus。

在线地址：<https://hydre05236.github.io/>

公开站点不提供写作入口。写作台仅在 `localhost` 或 `127.0.0.1` 本地预览时开放，文章发布权限由 GitHub 仓库写入权限控制。

## 桌面写作与发布

双击桌面的“Hydre05236 写作台”快捷方式即可进入写作页面。草稿会自动保存在当前浏览器中；点击“发布到 GitHub”后，本地服务会：

1. 检查站点目录中没有无关改动，并与 GitHub 同步。
2. 将文章保存为 `posts/<文章名>.md`，更新文章索引。
3. 只提交文章及文章索引，然后推送到 `master` 分支。

GitHub Pages 通常会在推送后稍等片刻更新。已发布文章在本地打开时带有“继续编辑”按钮。公开站点仍然没有写作入口，访客只能阅读和评论。

“加入本地文章列表”只用于不发布的临时预览。Markdown 导出则作为离线备份方式。

## 手动启动

需要 Node.js 18 或更新版本：

```powershell
npm run dev
```

打开 `http://127.0.0.1:4173`。

## 修改个人信息

编辑 `config.js` 中的 `title`、`author`、`description`、`about` 与 `github`。

也可以运行 `npm run author` 启动写作台并自动打开浏览器。

## 启用公开评论

1. 将网站放入公开 GitHub 仓库，并在仓库中启用 Discussions。
2. 在 [giscus.app](https://giscus.app/zh-CN) 选择 `Hydre05236/Hydre05236.github.io` 和讨论分类。
3. 把生成配置中的 `repo`、`repo-id`、`category`、`category-id` 填入 `config.js` 的 `giscus` 字段。

访客随后可以使用 GitHub 账号在每篇公开文章下评论。
