## Usage modes

### Mode 1: ParaNote Reader (standalone)

Runs as a standalone web service providing a clean reading experience with comments.

| Feature | URL | Notes |
|------|-----|------|
| Clean reading | `/read?url=<URL>` | Extracts the body, removes ads and sidebars |
| Verbatim import | `/import?url=<URL>` | Keeps the original styling |
| Telegra.ph | `/p/<slug>` | Optimised for Telegra.ph |
| Admin UI | `/admin.html` | Comment management, block list, data import/export |

**Userscript**: visit `http://localhost:4000/paranote.user.js` to install it, then press
`Alt+P` on any page to enable comments.

### Mode 2: ParaNote plugin (embedded)

Adds paragraph comments to a blog or novel site.

**1. Mark the article body**

```html
<article data-na-root data-work-id="novel_001" data-chapter-id="chapter_001">
  <p>First paragraph…</p>
  <p>Second paragraph…</p>
</article>
```

**2. Include the script**

```html
<script async src="https://your-server/embed.js"
        data-site-id="my-site"
        data-api-base="https://your-server"></script>
```

---

