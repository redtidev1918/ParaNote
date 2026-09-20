## 使用模式

### 模式一：ParaNote 阅读器 (独立使用)

作为独立 Web 服务运行，提供带评论功能的纯净阅读体验。

| 功能 | URL | 说明 |
|------|-----|------|
| 纯净阅读 | `/read?url=<URL>` | 提取正文，去除广告和侧边栏 |
| 原样导入 | `/import?url=<URL>` | 保留原始样式 |
| Telegra.ph | `/p/<slug>` | 针对 Telegra.ph 优化 |
| 管理后台 | `/admin.html` | 评论管理、黑名单、数据导入导出 |

**油猴脚本**：访问 `http://localhost:4000/paranote.user.js` 安装，在任意网页按 `Alt+P` 启用评论。

### 模式二：ParaNote 插件 (嵌入式使用)

为博客或小说站添加段落评论功能。

**1. 标记正文**

```html
<article data-na-root data-work-id="novel_001" data-chapter-id="chapter_001">
  <p>正文第一段...</p>
  <p>正文第二段...</p>
</article>
```

**2. 引入脚本**

```html
<script async src="https://your-server/embed.js" 
        data-site-id="my-site" 
        data-api-base="https://your-server"></script>
```

---

