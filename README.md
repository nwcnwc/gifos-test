# GifOS test kit

This repository is the public testing kit for [GifOS](https://gifos.app). People and AI agents use it to run written assignments against the live site, save a debug log and a report, and send the results back. When a run finds a real bug, the better follow-up is a small code fix on the product repository that owns the bug.

The site under test is **https://gifos.app**. Assignments describe only controls that are on that site today. A normal visit runs the published release. The build name is the small label in the bottom-left corner of the page (a version such as `v0.9.24 · build 3930`, or `edge · build …` if someone has chosen the unreleased build). Write down the label you actually see. Do not assume a version number from this README.

## Who this is for

Friends of the project, and agents working for them. You need a browser, a GitHub account if you will open a pull request, and whatever extra devices the assignment asks for. You do not need anyone's internal machines, a WebDriver setup, or a release script. Testers never cut a release.

## Run the harness

Open [`harness/index.html`](harness/index.html) and press **Run**. The page checks the live site: the store catalog and each app's published GIF, the meeting page (including the published release), the Home Screen menu, About, the store page, browser support, and `version.json`. It downloads `gifos-harness-report.json`. An agent can call `gifosHarness.run()` on that page, or inject `harness/suite.js` into a browser that is already on https://gifos.app. Watching the run is optional. Details are in [`harness/README.md`](harness/README.md).

The files in [`assignments/`](assignments/README.md) are the same themes, written so a person can see what each suite is about. The atomic checks live in the harness.

## Pick an assignment

Assignments live in [`assignments/`](assignments/README.md). Each file is a suite description. Start with one that matches the devices you have:

- One browser: create a meeting, store browse, help pages, Home Screen, a single store app.
- Two browsers or a browser and a phone: join, audio and video, leave and rejoin, screen share, views.
- Three or more: the several-person and larger-room assignments. If you cannot assemble the people, mark the run `blocked` instead of inventing a result.

Store app names and slugs are the live catalog, copied into [`assignments/store-catalog.md`](assignments/store-catalog.md). Do not invent apps.

## Run it

1. Run the harness, or read one assignment and follow it on https://gifos.app.
2. Copy [`templates/REPORT.md`](templates/REPORT.md) into a new folder and fill it in.
3. Save `gifos-harness-report.json` next to the report. For a meeting you joined by hand, also keep the debug download from **More → Settings** (the debug switch, then the download in that dialog). Other hand-written notes can be `log.txt`.
4. Check the folder:

```bash
node harness/validate-report.js path/to/your-report-folder
```

`pass` means the product did what the assignment says. `fail` means it did not. `blocked` means you could not run the assignment (no second device, no camera, permission denied by the person at the keyboard). A product bug is `fail`, not `blocked`.

## Three ways to send results

Use one path. Do not send the same run all three ways.

1. **Email.** Send the report and the log to [info@crowdconceptsinc.com](mailto:info@crowdconceptsinc.com). Subject: `GifOS test: <assignment-id> <pass|fail|blocked>`. The product pages also list [support@gifos.app](mailto:support@gifos.app) for ordinary product questions. Test results from this kit go to the results address above.
2. **A results pull request on this repository.** Fork [nwcnwc/gifos-test](https://github.com/nwcnwc/gifos-test), add one folder `results/YYYY-MM-DD-<assignment-id>-<handle>/` with `REPORT.md` and the log, and open a pull request. `<handle>` is a GitHub login or another short public handle, not a legal name. See [`results/README.md`](results/README.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md).
3. **A code-fix pull request on the product repository** when you have a real bug and a small fix. This is the path that saves the maintainer the most time. Results email and results pull requests are still useful when you cannot fix the code.

## Fix the code

| Bug is in | Repository | What it is |
| --- | --- | --- |
| Meetings, the Home Screen, the store page, join / cast / help pages, or anything else served at gifos.app | [nwcnwc/gifos-app](https://github.com/nwcnwc/gifos-app) | The files served at https://gifos.app |
| A store app's own behavior | [nwcnwc/gifos-apps-source](https://github.com/nwcnwc/gifos-apps-source) | Source for the GifOS store apps, one directory per slug |

Reproduce the bug on https://gifos.app first. Keep the fix small and limited to that bug. In the pull request, say what broke, where you saw it (build badge plus browser), and how you checked the fix. Do not refactor unrelated code.

In gifos-app, directories under `versions/` are published snapshots the live site still serves. Do not edit them. If your change touches routing or how `/meet/`, `/cast/`, `/join/`, or `/store/` load, those older snapshots must keep working. Do not publish a release, and do not run a release or signing step. The maintainer reviews the pull request and decides what reaches the live release.

Each product repository has its own `LICENSE`. Follow that file. Store apps keep the license named in their own directory. This test kit does not add a separate license.

Agents: follow [`AGENTS.md`](AGENTS.md) before opening either kind of pull request.

## What not to put in a report

- Passwords, API keys, payment details, wallet data, session cookies, or signing material.
- A live meeting, broadcast, or invite link. Anyone who has the link can join. Leave the room when the run is over.
- Other people's network addresses. The People panel in Meet can show them; do not download that list into a report.
- Real names of people who did not agree to appear in a public report. Use `A`, `B`, and so on.
- Screen recordings and meeting recordings. Those stay on your device. Say in the report whether Record started and stopped.

The debug-log script redacts addresses, room links, and password-like fields before it downloads. Read the file once before you email it or open a pull request. `node harness/validate-report.js` rejects a report that still contains an address or a live room link.

## Repository map

| Path | Purpose |
| --- | --- |
| `assignments/` | One markdown file per test, plus the store catalog |
| `templates/` | The report, and how the debug log is attached |
| `harness/` | The web harness (`index.html`), the checker, and a checklist |
| `results/` | Where results pull requests add a dated folder. Empty until then |

The checker has its own fixture test: `node harness/validate-report.js --self-test`.
