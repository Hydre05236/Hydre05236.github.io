# 文章目录

每篇文章是一个独立的 Markdown 文件。可以复制下面的格式开始写作：

```markdown
---
title: "文章标题"
date: 2026-07-26
summary: "一句话摘要"
tags: [几何, 分析]
---

## 第一节

行内公式：$e^{i\pi}+1=0$。

$$
\int_M \Delta f\,\mathrm{d}V = 0.
$$
```

保存后，在网站目录运行 `npm run posts`。生成的文章会出现在首页。
