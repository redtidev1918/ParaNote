## Development

```bash
npm install           # install dependencies
npm start             # start the dev server
npm test              # run tests
npm run test:watch    # watch mode
npm run test:coverage # coverage report
npm run lint          # lint
npm run build:embed   # build the minified embed.js
```

### Automated releases

The project releases through GitHub Actions: pushes to `main` and pull requests run lint +
tests (CI). To publish a new version:

```bash
# 1. bump the version (updates package.json, creates the tag and pushes)
npm version patch   # or minor / major
# the postversion script already runs git push && git push --tags
```

Pushing a `v*` tag makes the release pipeline run the full test suite, build
`dist/paranote.min.js`, publish to npm through
[npm Trusted Publishing (OIDC)](https://docs.npmjs.com/trusted-publishers), and create a
GitHub Release with generated notes.

#### One-time setup: npm Trusted Publisher

Credentials are issued on the fly via OIDC and are short-lived, so **no `NPM_TOKEN` secret is
needed**. Bind it once on npmjs.com:

1. Open the npm package page → **Settings → Trusted Publisher**
2. Fill in:
   - **Repository**: `redtidev1918/ParaNote`
   - **Workflow filename**: `release.yml` (must match `.github/workflows/release.yml`)
   - **Environment**: leave empty
3. Save; pushing a `v*` tag then releases automatically.

Requirements: the workflow runs on GitHub-hosted runners and npm CLI ≥ 11.5.1 (the release job
pins Node 24, which bundles npm 11.x).

> The npm package owners are `zoidberg-xgd` and `redtidev1918`; either can configure the
> Trusted Publisher and publish without renaming the package. Publishing from a new fork or
> account requires the package owner to bind it, or renaming to a scoped package such as
> `@yourname/paranote`. Without OIDC you can fall back to a repository `NPM_TOKEN` secret plus
> `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` on the publish step.

Version history: [CHANGELOG.md](CHANGELOG.md).

### Project layout

```text
├── index.js           # npm package entry
├── server.js          # main server entry
├── config.js          # configuration
├── storage.js         # storage abstraction
├── storage-file.js    # file storage
├── storage-mongo.js   # MongoDB storage
├── fetcher.js         # web fetching
├── browser-forge.js   # browser fingerprint generation
├── utils.js           # utilities
├── bin/paranote.js    # CLI entry
├── routes/api.js      # API routes
├── routes/static.js   # static file routes
├── public/            # embed.js, loader.js, userscript, pages, admin UI
└── tests/             # 240+ test cases
```

### Technical details

**Fuzzy anchoring**: saving a comment records a paragraph "fingerprint" (the first 32
characters). On load, if the paragraph index does not match, the front end searches the whole
page for that fingerprint and corrects the comment's position.

**Low-memory mode**: `ENABLE_PUPPETEER=false` disables Chrome, bringing memory below 100MB at
the cost of not being able to fetch Cloudflare-protected sites.

---

