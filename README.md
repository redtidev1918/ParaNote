# ParaNote

**语言 / Language:** 中文 · [English](README.en.md)

> **轻量级段落评论服务 + 通用网页阅读器。**

[完整文档](https://redtidev1918.github.io/ParaNote/)

为任何网页提供沉浸式阅读体验和段落级评论互动。

[![npm version](https://img.shields.io/npm/v/paranote.svg)](https://www.npmjs.com/package/paranote)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/redtidev1918/ParaNote?style=social)](https://github.com/redtidev1918/ParaNote)

**[npm](https://www.npmjs.com/package/paranote)** | **[GitHub](https://github.com/redtidev1918/ParaNote)** | **[文档](https://redtidev1918.github.io/ParaNote/)**

## 目录

- [核心特性](#核心特性)
- [快速开始](#快速开始)
- [文档导航](#文档导航)
- [致谢](#致谢)

---

## 核心特性

- **双重模式** - 既是独立的阅读器，也是可嵌入的评论插件
- **段落级评论** - 精确到段落的互动，支持回复、点赞和删除
- **通用阅读模式** - 输入任意 URL，自动提取正文，生成纯净阅读页面
- **强力抗反爬** - 内置 Puppeteer + Stealth + BrowserForge，自动处理 Cloudflare 验证
- **模糊定位** - 采用内容指纹定位，即使原文段落增删，评论也能自动归位
- **现代 UI** - Hypothesis 风格的卡片式侧边栏，支持多彩头像和丝滑动画
- **移动端适配** - 专为手机优化的底部抽屉交互
- **匿名支持** - 自动生成访客身份，IP 防重复点赞
- **用户拉黑** - 管理员可拉黑恶意用户
- **CLI 管理** - 完整的命令行工具，无需 Web 界面即可管理

---

## 快速开始

### 方式一：npm 全局安装 (推荐)

```bash
npm install -g paranote

# 初始化配置
paranote init

# 启动服务
paranote start

# 查看帮助
paranote help
```

### 方式二：npx 直接运行

```bash
npx paranote start --port 4000
```

### 方式三：Docker

```bash
docker run -d -p 4000:4000 -v $(pwd)/data:/app/data paranote
```

### 方式四：作为项目依赖

```bash
npm install paranote
```

```javascript
import { startServer } from 'paranote';

// 启动服务器
await startServer({ port: 4000 });

// 或者更细粒度的控制
import { initStorage, server, config } from 'paranote';

await initStorage();
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

---

## 致谢

- **[Hypothesis](https://github.com/hypothesis/h)** - 开源网页注释系统，UI 设计灵感来源
- **[BrowserForge](https://github.com/daijro/browserforge)** - 智能浏览器指纹生成库

## 文档导航

README 只讲怎么上手；命令行、集成、部署与接口在[文档站](https://redtidev1918.github.io/ParaNote/)：

| 你想做什么 | 文档 |
| --- | --- |
| 用命令行 | [CLI 命令行工具](docs/CLI.md) |
| 两种使用模式 | [使用模式](docs/USAGE.md) |
| 把评论挂到自己站点 | [站长集成指南](docs/INTEGRATION.md) |
| 部署（Docker / 单机 / 边缘） | [部署](docs/DEPLOY.md) |
| 调 API | [API 参考](docs/API.md) |
| 改代码 | [开发](docs/DEVELOPMENT.md) |

## 许可证

MIT。
