# ParaNote

**Language / 语言:** [中文](README.md) · English

📖 Full documentation: <https://redtidev1918.github.io/ParaNote/>

A lightweight paragraph-comment service plus a general-purpose web reader.

A lightweight paragraph-comment service plus a general-purpose web reader. It gives any web
page an immersive reading experience with paragraph-level comment interaction.

[![npm version](https://img.shields.io/npm/v/paranote.svg)](https://www.npmjs.com/package/paranote)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/redtidev1918/ParaNote?style=social)](https://github.com/redtidev1918/ParaNote)

**[npm](https://www.npmjs.com/package/paranote)** | **[GitHub](https://github.com/redtidev1918/ParaNote)** | **[Docs](https://redtidev1918.github.io/ParaNote/)**

## Contents

- [Core features](#core-features)
- [Quick start](#quick-start)
- [CLI](#cli)
- [Usage modes](#usage-modes)
- [Integration guide](#integration-guide)
- [Deployment](#deployment)
- [API reference](#api-reference)
- [Development](#development)

---

## Core features

- **Dual mode** — both a standalone reader and an embeddable comment plugin
- **Paragraph-level comments** — interaction precise to the paragraph, with replies, likes and deletion
- **Universal reader mode** — enter any URL, the article body is extracted automatically into a clean reading page
- **Strong anti-bot handling** — built-in Puppeteer + Stealth + BrowserForge, handling Cloudflare challenges automatically
- **Fuzzy anchoring** — comments are anchored by a content fingerprint, so they relocate automatically even when paragraphs are added or removed
- **Modern UI** — a Hypothesis-style card sidebar with colourful avatars and smooth animation
- **Mobile-friendly** — a bottom drawer interaction designed for phones
- **Anonymous support** — visitor identities are generated automatically, with per-IP like de-duplication
- **User blocking** — administrators can block abusive users
- **CLI management** — a complete command-line tool, so administration needs no web UI

---

## Quick start

### Option 1: global npm install (recommended)

```bash
npm install -g paranote

# initialise configuration
paranote init

# start the service
paranote start

# show help
paranote help
```

### Option 2: run directly with npx

```bash
npx paranote start --port 4000
```

### Option 3: Docker

```bash
docker run -d -p 4000:4000 -v $(pwd)/data:/app/data paranote
```

### Option 4: as a project dependency

```bash
npm install paranote
```

```javascript
import { startServer } from 'paranote';

// start the server
await startServer({ port: 4000 });

// or with finer-grained control
import { initStorage, server, config } from 'paranote';

await initStorage();
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

---

## Acknowledgements

- **[Hypothesis](https://github.com/hypothesis/h)** — open-source web annotation system; inspiration for the UI
- **[BrowserForge](https://github.com/daijro/browserforge)** — intelligent browser fingerprint generation

## Documentation

This README only covers the start; the CLI, integration, deployment, and API live on the docs site
<https://redtidev1918.github.io/ParaNote/>:

| What you want | Where |
| --- | --- |
| Command line | [CLI](docs/en/CLI.md) |
| The two usage modes | [Usage modes](docs/en/USAGE.md) |
| Put comments on your own site | [Integration guide](docs/en/INTEGRATION.md) |
| Deploy (Docker / single host / edge) | [Deployment](docs/en/DEPLOY.md) |
| Call the API | [API reference](docs/en/API.md) |
| Work on the code | [Development](docs/en/DEVELOPMENT.md) |

## License

MIT
