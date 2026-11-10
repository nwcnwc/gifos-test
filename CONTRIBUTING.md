# Contributing test results

Thank you for testing GifOS. This repository collects written results. Product fixes go to the product repositories, not here.

You can test without an account. You need a GitHub account only if you open a pull request.

## Run a test

1. Pick a file in [`assignments/`](assignments/README.md).
2. Follow it on https://gifos.app. Use the published release a normal visit opens, and write down the build label in the bottom-left corner.
3. Copy [`templates/REPORT.md`](templates/REPORT.md) and fill in every section. Under Result, write `pass`, `fail`, or `blocked`.
4. Attach the log described in [`templates/DEBUG-LOG.md`](templates/DEBUG-LOG.md).
5. From a checkout of this repo, run:

```bash
node harness/validate-report.js path/to/the/folder
```

Fix every line it prints before you send the folder.

## Send the folder

**Email.** To info@crowdconceptsinc.com. Subject: `GifOS test: <assignment-id> <pass|fail|blocked>`. Attach `REPORT.md` and the log. The site's own contact for product questions is support@gifos.app. Use the results address for this kit.

**Pull request.** Fork this repository and add one new folder:

```
results/YYYY-MM-DD-<assignment-id>-<handle>/
```

`<handle>` is your GitHub login or another short public handle. Put `REPORT.md` and the log in that folder and open a pull request against `main`. The description should list the assignment id, the result, the build badge, and the browser.

One assignment run per pull request. Do not overwrite someone else's folder.

## Privacy

Do not include passwords, keys, payment details, live meeting or invite links, other people's network addresses, or the People-list download. Use tester names such as A and B. Leave the room when you finish. Recordings stay on your device.

## A bug you can fix

A failing report is useful. A small pull request that fixes the bug is better.

- Site, meetings, store page, and Home Screen: [nwcnwc/gifos-app](https://github.com/nwcnwc/gifos-app).
- One store app: [nwcnwc/gifos-apps-source](https://github.com/nwcnwc/gifos-apps-source), in that app's directory.

Say what broke, which build and browser you used, and how you checked the fix. Keep the change limited to the bug. Do not edit published snapshots under `versions/` in gifos-app, and do not take any step that publishes a release. Those snapshots are what older visitors are still running; routing changes have to leave them working.

Read the `LICENSE` in the repository you are changing and follow it. This test kit does not set license terms of its own.

Agents working from these same rules should follow [AGENTS.md](AGENTS.md).
