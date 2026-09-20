## Deployment

### Environment variables

```bash
paranote init          # initialise configuration
# or manually:
cp .env.example .env
nano .env
```

| Variable | Default | Notes |
|------|--------|------|
| `PORT` | 4000 | Service port |
| `HOST` | 0.0.0.0 | Listen address |
| `DEPLOY_MODE` | full | `full` / `api` / `reader` |
| `STORAGE_TYPE` | file | `file` / `mongo` |
| `MONGO_URI` | - | MongoDB connection string |
| `ADMIN_SECRET` | - | Admin secret |
| `SITE_SECRETS` | {} | JWT secrets (JSON) |
| `ENABLE_PUPPETEER` | true | Enable Puppeteer fetching |
| `PUPPETEER_HEADLESS` | true | Headless mode |
| `RATE_LIMIT` | true | Enable rate limiting |
| `RATE_LIMIT_MAX` | 100 | Max requests per minute |

### Deployment modes

| Mode | Notes | Memory |
|------|----------|----------|
| `full` | Home page + reader + all APIs | ~500MB |
| `api` | Core APIs only, no fetching | <100MB |
| `reader` | APIs + reader, no home page | ~500MB |

### Vercel deployment (serverless)

ParaNote can be deployed to Vercel Serverless Functions (API mode only).

1. Fork this project on GitHub
2. Import the project in Vercel
3. Configure the environment variables:
   - `STORAGE_TYPE`: `mongo`
   - `MONGO_URI`: `mongodb+srv://…` (your MongoDB Atlas connection string)
   - `ADMIN_SECRET`: (a generated random secret)
   - `SITE_SECRETS`: (your JWT secrets JSON)
4. Deploy

> Note: serverless mode does not support Puppeteer fetching (`/api/v1/fetch`); only the comment service APIs are available.

### Cloudflare Workers deployment (V8 edge)

ParaNote provides a fully edge-compatible rewrite that uses the MongoDB Atlas Data API.

> ⚠️ **Note**: the MongoDB Atlas Data API has been [deprecated](https://www.mongodb.com/docs/atlas/app-services/data-api/) and is being retired.
> New projects should prefer Vercel + `MONGO_URI`, or Atlas Functions / the official driver.
> If you still need the Workers version, assess the Data API's availability in your account first.

1. **Prepare**: enable the [Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/) in MongoDB Atlas and obtain the URL and API key.
2. **Install**: `npm install -g wrangler`
3. **Configure**: set `ATLAS_API_URL` and friends in `wrangler.toml`.
4. **Secrets**:
   ```bash
   wrangler secret put ATLAS_API_KEY
   wrangler secret put SITE_SECRETS  # e.g. {"my-site":"secret"}
   wrangler secret put ADMIN_SECRET
   ```
5. **Deploy**: `wrangler deploy`

### Docker Compose (recommended)

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

### Docker command line

```bash
# full deployment
docker run -d -p 4000:4000 -v $(pwd)/data:/app/data paranote

# low-memory mode
docker run -d -p 4000:4000 -e DEPLOY_MODE=api -e ENABLE_PUPPETEER=false paranote
```

### Updating a deployment

```bash
git pull
docker-compose up -d --build
```

> Data lives in the `/app/data` volume, so rebuilding the container does not lose comments.

---

