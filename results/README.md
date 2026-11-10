# Results

Pull requests that submit a test run add one folder here. Do not commit sample logs, empty reports, or a run you did not perform.

## Folder name

```
results/YYYY-MM-DD-<assignment-id>-<handle>/
```

- `YYYY-MM-DD` is the date of the run.
- `<assignment-id>` is the id in the assignment file, such as `meet-create-join` or `store-app-2048`.
- `<handle>` is a GitHub login or another short public handle. Not a legal name.

Example: `results/2026-11-09-meet-create-join-octocat/`.

## Folder contents

Required:

- `REPORT.md` filled in from [`templates/REPORT.md`](../templates/REPORT.md)

One log, matching the assignment:

- `gifos-harness-report.json` from `harness/index.html` (the usual machine-readable result)
- `meet-debug.ndjson` or `meet-debug.ndjson.gz` when the file is the Settings debug download from a meeting
- `log.txt` for a hand-written Home Screen, store, help, or payments note

A `blocked` run may contain only `REPORT.md`.

Check before you push:

```bash
node harness/validate-report.js results/YYYY-MM-DD-<assignment-id>-<handle>
```

The pull request title can be `results: <assignment-id> <pass|fail|blocked>`. The body should include the build badge and the browser. One run per pull request.

Email is the other results path: info@crowdconceptsinc.com, with the same files attached. You do not need a folder here if you emailed the run.
