## 开发

```bash
npm install           # 安装依赖
npm start             # 启动开发服务器
npm test              # 运行测试
npm run test:watch    # 监听模式
npm run test:coverage # 覆盖率报告
npm run lint          # 代码检查
npm run build:embed   # 构建压缩版 embed.js
```

### 自动化发版

发版由 [release-please](https://github.com/googleapis/release-please) 驱动，不需要 PAT 或任何
token：

1. 用 Conventional Commits（`feat:`、`fix:` 等）把改动合入 `main`；`release-please` 会据提交
   更新 `CHANGELOG.md`、`package.json` 的 `version` 与 `.release-please-manifest.json`，并开出
   发版 PR。
2. 审核并合并该发版 PR。同一个 workflow run 内依次：运行完整测试套件 → 构建
   `dist/paranote.min.js` → 通过 npm
   [Trusted Publishing (OIDC)](https://docs.npmjs.com/trusted-publishers) 发布到 npm → 创建
   GitHub Release（自动生成更新日志）。

手动重跑：`release.yml` 也支持推送 `v*` 标签，或用 `workflow_dispatch` 填入已有 tag 重跑
（这两种场景不运行 release-please，其余步骤照常）。CI 的 lint 与测试在 push / PR 时独立运行。

#### 首次配置：npm Trusted Publisher

发布凭证由 OIDC 现场签发、短期有效，**无需配置 `NPM_TOKEN` secret**。首次使用前在 npmjs.com 做一次性绑定：

1. 打开 npm 包页面 → **Settings → Trusted Publisher**
2. 填入：
   - **Repository**: `redtidev1918/ParaNote`
   - **Workflow filename**: `release.yml`（必须与 `.github/workflows/release.yml` 文件名一致）
   - **Environment**: 留空（如需额外保护可在 npm 和 workflow 中配置同名 environment）
3. 保存后，推送 `v*` 标签即可自动发版

要求：workflow 运行在 GitHub 托管 Runner 上，npm CLI ≥ 11.5.1（发版 job 已固定使用 Node 24 自带的 npm 11.x）。

> 当前 npm 包的 owner 为 `zoidberg-xgd` 和 `redtidev1918`，两者均可直接配置 Trusted Publisher 并发布，
> 无需修改包名。若在新的 fork/账号下发布，需包所有者完成绑定，或将 `name` 改为 scope 包名（如 `@yourname/paranote`）。
> 不使用 OIDC 时可退回传统方式：仓库 Secret 配置 `NPM_TOKEN`，并给发布步骤加环境变量 `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`。

版本更新记录见 [CHANGELOG.md](CHANGELOG.md)。

### 目录结构

```
├── index.js           # npm 包入口
├── server.js          # 主服务入口
├── config.js          # 配置管理
├── storage.js         # 存储层抽象
├── storage-file.js    # 文件存储实现
├── storage-mongo.js   # MongoDB 存储实现
├── fetcher.js         # 网页抓取
├── browser-forge.js   # 浏览器指纹生成
├── utils.js           # 工具函数
├── bin/
│   └── paranote.js    # CLI 入口
├── routes/
│   ├── api.js         # API 路由
│   └── static.js      # 静态文件路由
├── public/
│   ├── embed.js       # 前端评论组件
│   ├── loader.js      # 自动加载器
│   ├── paranote.user.js # 油猴脚本
│   ├── index.html     # 首页
│   ├── reader.html    # 阅读器页面
│   └── admin.html     # 管理后台
└── tests/             # 测试文件 (240+ 测试用例)
```

### 技术细节

**模糊定位 (Fuzzy Anchoring)**：保存评论时记录段落「内容指纹」(前 32 字符)。加载时如果段落索引不匹配，前端自动全篇搜索指纹，将评论纠正到正确位置。

**低内存模式**：设置 `ENABLE_PUPPETEER=false` 禁用 Chrome，内存占用 <100MB，但无法抓取 Cloudflare 保护的网站。

---

