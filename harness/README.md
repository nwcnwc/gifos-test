# Harness

Open [`index.html`](index.html) and press **Run**. The page loads [`suite.js`](suite.js) and checks the live site at https://gifos.app. Nobody has to watch. The result is `gifos-harness-report.json` (also returned by `gifosHarness.run()`).

```bash
node harness/validate-report.js --self-test
```

A browser on this page is enough for the fetch checks. If a browser blocks `file://` fetches, serve this folder (`python3 -m http.server`) and open `http://127.0.0.1:8000/harness/`.

## What an agent runs

From any page that can fetch gifos.app, including this harness:

```js
const report = await gifosHarness.run();
```

From a real browser already on the live site (Playwright, Puppeteer, Chrome DevTools, `page.evaluate`):

```js
await page.goto('https://gifos.app/run');
await page.addScriptTag({ path: 'harness/suite.js' });
const report = await page.evaluate(() => gifosHarness.run());
```

Injection adds DOM checks for the Home Screen or the meeting page in that tab. The same fetch checks still run. `report.summary` is `{ total, pass, fail, blocked }`. `report.tests` is one row per check: `{ id, suite, name, ok, detail }`.

The checks are the assignment themes, split into assertions that read the live catalog, the published GIF for each store app (size and type), the meeting page (lobby, dock, Fit, Stage, Run app, chat, record, town hall, stream), the Home Screen menu script, About, the store page, browser support, and `version.json`. A missing control fails. The suite does not click through a meeting and does not invent a view or an app.

## Debug log

In a meeting, open **More → Settings** (under Settings and help). Turn on the debug switch in that dialog, then use the download there. Save that file with the report. Do not look for a separate Export button.

`meet-settings-debug-download` (and the same check on the published release) fails when that dialog, as served, does not contain both the switch and a download.

[`export-meet-debug.js`](export-meet-debug.js) is optional. An agent that already has the meeting console open can paste it to sample `window.__gifosVideo`. It is not the human path.

## Checker

`validate-report.js` accepts a report folder that contains `REPORT.md` and `gifos-harness-report.json` from a full run (store catalog rows and Meet rows). A Settings debug download named `meet-debug.ndjson` or `meet-debug.ndjson.gz` still satisfies a meeting assignment when you are not attaching the harness report. `log.txt` still satisfies Home Screen, store, help, and payments notes.
