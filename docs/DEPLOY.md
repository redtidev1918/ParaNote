## 部署

### 环境变量

```bash
# 初始化配置
paranote init

# 或手动创建
cp .env.example .env
nano .env
```

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 4000 | 服务端口 |
| `HOST` | 0.0.0.0 | 监听地址 |
| `DEPLOY_MODE` | full | `full` / `api` / `reader` |
| `STORAGE_TYPE` | file | `file` / `mongo` |
| `MONGO_URI` | - | MongoDB 连接串 |
| `ADMIN_SECRET` | - | 管理员密钥 |
| `SITE_SECRETS` | {} | JWT 密钥 (JSON 格式) |
| `ENABLE_PUPPETEER` | true | 启用 Puppeteer 抓取 |
| `PUPPETEER_HEADLESS` | true | 无头模式 |
| `RATE_LIMIT` | true | 启用速率限制 |
| `RATE_LIMIT_MAX` | 100 | 每分钟最大请求数 |

### 部署模式

| 模式 | 说明 | 内存占用 |
|------|------|----------|
| `full` | 首页 + 阅读器 + 所有 API | ~500MB |
| `api` | 仅核心 API，无抓取 | <100MB |
| `reader` | API + 阅读器，无首页 | ~500MB |

### Vercel 部署 (Serverless)

ParaNote 支持部署到 Vercel Serverless Functions（仅 API 模式）。

1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量：
   - `STORAGE_TYPE`: `mongo`
   - `MONGO_URI`: `mongodb+srv://...` (你的 MongoDB Atlas 连接串)
   - `ADMIN_SECRET`: (生成的随机密钥)
   - `SITE_SECRETS`: (你的 JWT 密钥 JSON)
4. 部署即可

> 注意：Serverless 模式下不支持 Puppeteer 抓取功能 (`/api/v1/fetch`)，仅提供评论服务 API。

### Cloudflare Workers 部署 (V8 Edge)

ParaNote 提供完全兼容 Edge 环境的重写版本，使用 MongoDB Atlas Data API。

注意：MongoDB Atlas Data API 已被官方[废弃](https://www.mongodb.com/docs/atlas/app-services/data-api/)并逐步停止服务，
新项目请优先考虑 Vercel + MONGO_URI 部署方式，或改用 MongoDB Atlas Functions / 官方驱动。
如仍需使用 Workers 版本，请自行评估 Data API 在你账户下的可用性。

1. **准备**: 在 MongoDB Atlas 开启 [Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/)，获取 URL 和 API Key。
2. **安装**: `npm install -g wrangler`
3. **配置**: 修改 `wrangler.toml` 中的 `ATLAS_API_URL` 等变量。
4. **设置密钥**:
   ```bash
   wrangler secret put ATLAS_API_KEY
   wrangler secret put SITE_SECRETS  # 例如 {"my-site":"secret"}
   wrangler secret put ADMIN_SECRET
   ```
5. **部署**: `wrangler deploy`

### Docker Compose (推荐)

```yaml
version: '3.8'
services:
  paranote:
    build: .
    ports:
      - "4000:4000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - ADMIN_SECRET=${ADMIN_SECRET}
    restart: always
```

```bash
docker-compose up -d
```

### Docker 命令行

```bash
# 完整部署
docker run -d -p 4000:4000 -v $(pwd)/data:/app/data paranote

# 低内存模式
docker run -d -p 4000:4000 -e DEPLOY_MODE=api -e ENABLE_PUPPETEER=false paranote
```

### 更新部署

```bash
git pull
docker-compose up -d --build
```

> 数据存储在 `/app/data` 卷中，重建容器不会丢失评论数据。

---

