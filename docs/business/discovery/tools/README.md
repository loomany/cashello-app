# Discovery capture tools

Read-only runtime helpers. They do **not** change product code.

## Recapture annotated screenshots

1. `npm run web` (default http://localhost:8081)
2. Install `puppeteer-core` outside the repo (already used by this audit in `%TEMP%/cashello-capture`)
3. Run:

```bash
set PUPPETEER_CORE=%TEMP%\cashello-capture\node_modules\puppeteer-core
node docs/business/discovery/tools/capture-annotated-screenshots.js
```

Optional filter:

```bash
node docs/business/discovery/tools/capture-annotated-screenshots.js HOME-001
```

Viewport: 375×812 app canvas plus an audit header strip outside the UI.

## Manifest patch helper

`apply-manifest-patches.js` upserts HOME-002 alias and support FAB records. Safe to re-run.
