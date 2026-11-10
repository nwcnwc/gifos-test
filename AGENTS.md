# Instructions for AI agents

You are testing GifOS, or fixing a bug you found while testing it. The product runs in the browser at https://gifos.app. The public source is [nwcnwc/gifos-app](https://github.com/nwcnwc/gifos-app) (the site) and [nwcnwc/gifos-apps-source](https://github.com/nwcnwc/gifos-apps-source) (store apps). This repository, [nwcnwc/gifos-test](https://github.com/nwcnwc/gifos-test), holds assignments, the report template, and the log harness.

Work from the assignment file and the live site. Do not invent screens, view names, app names, staging hosts, or meeting links. If a control is not where the assignment says, record that as the actual result. That is a finding. Do not "fix" the assignment by guessing a different UI.

## Pick work

1. Read `assignments/README.md` and choose one assignment you can run with the devices in front of you.
2. If you are testing a store app that does not have its own file, copy the steps in `assignments/store-app-any.md` and set the report id to `store-app-<slug>` using a slug from `assignments/store-catalog.md`. Prefer a slug that has no folder under `results/` yet.
3. Do the whole assignment before opening another one. A half-run is `blocked` with the reason, not a pass.

## Run an assignment

- Use a normal visit to https://gifos.app so you land on the published release. Record the bottom-left build badge verbatim.
- Stay on that build. The unreleased root build is a different product surface. Switch only when you are comparing a bug, and write that in the report. Do not publish or pin anything for other people.
- Two seats can be two browsers on one computer (one of them a private window) when the assignment says a second person. Use display names `A` and `B`.
- Allow the camera and microphone only when the assignment asks. Join stays muted with the camera off until you turn them on. That is the lobby text.
- When the assignment uses Meet, Cast, town hall, or an app invite, paste `harness/export-meet-debug.js` into the DevTools console of the meeting page while the room is up. See `harness/README.md`. Save `meet-debug.ndjson` (or `.ndjson.gz`) beside the report.
- For Home Screen, store, help, and payments assignments, write `log.txt` of at least a few hundred characters: pages opened, labels you saw, and anything that disagreed with the assignment.
- Fill `templates/REPORT.md`. Keep the headings. Set `- Id: \`the-id\``. Under `## Result`, put `pass`, `fail`, or `blocked` on its own line.
- Run `node harness/validate-report.js <folder>` and fix what it reports. Also walk `harness/CHECKLIST.md`.

## Results pull request on this repo

Fork `nwcnwc/gifos-test`. Branch `results/YYYY-MM-DD-<assignment-id>-<handle>`. Add only:

```
results/YYYY-MM-DD-<assignment-id>-<handle>/REPORT.md
results/YYYY-MM-DD-<assignment-id>-<handle>/meet-debug.ndjson
```

Use `meet-debug.ndjson.gz` or `log.txt` when that is the real artifact. Do not commit fake logs, empty placeholders, recordings, or keys. Open a pull request into `main`. The body should name the assignment id, the result word, the build badge, and the browser. One run per pull request.

Do not force-push. Do not add a results folder for a run you did not execute.

## Code-fix pull request

Take this path when you can reproduce a bug and the fix is small. The maintainer should only have to review it.

1. Reproduce on https://gifos.app. Save the report and the debug log first (email or a results pull request) if the bug is easy to lose.
2. Choose the repo. Site, meeting, store UI, join, cast, help, and Home Screen bugs go to `nwcnwc/gifos-app`. A bug inside one store app goes to `nwcnwc/gifos-apps-source`, in that app's directory (`<slug>/`).
3. Fork, branch from the default branch, and change only the lines the bug needs. No drive-by refactors, renames, or formatting sweeps.
4. Do not edit `versions/` in gifos-app. Those directories are published snapshots the site still serves. If you touch routing, the channel loader, or the `/meet/`, `/cast/`, `/join/`, or `/store/` paths, a published snapshot must still load its own files. Do not cut a release, do not run a deploy, and do not handle signing keys.
5. Follow the `LICENSE` already in the target repo. An app directory in gifos-apps-source keeps the license named in its `listing.json` and its own license files. Do not relicense anything.
6. In the pull request, include:
   - what you did, in one or two sentences
   - the bug: expected, actual, build badge, browser
   - how you verified (which assignment, what you clicked after the fix)
   - a link to the results report if you sent one
7. Verify the fix yourself. For a store app, `node test-all.js` in gifos-apps-source runs every `test.js` that exists; run the touched app's test if it has one. For the site, exercise the same clicks on a local copy of the changed page when you can, and say what you could not run.

Do not open the code fix against gifos-test. Do not mix a results folder into a product pull request.

## Privacy rules that override a helpful default

- Never commit or paste secrets, tokens, private keys, passwords, or payment data.
- Never commit a live `/meet/`, `/cast/`, or `/join/` link. The exporter writes `REDACTED` on purpose.
- Never commit the People-list download. It is a real Meet control and it contains network addresses.
- Never invent a personal name, a machine name, or an internal address to make a report look complete.
- If the debug object is missing, say so and attach the console error. Do not hand-write a fake ndjson file that only exists to satisfy the checker.

## Controls you can rely on

These are on the live Meet page. Use the labels in the product, not a paraphrase, when you write steps:

- Lobby: **Start a call**, **Host this call**, **Join a link**, **Start a town hall**, **Stream to friends**. The preview says you join muted, with the camera off.
- In the call, the dock has **Video**, **Unmute**, **Reactions**, **Chat**, **CC**, **Share screen** (when the browser can capture a screen), **More**, **Leave**.
- **More** groups **Meeting** (Hand, Captions, People, Transcript, Questions), **Your video** (Blur: Max, Min, No blur; You: Tile, Float, Strip, Hide), **Room** (Password, Record, Vote, Stage, Run app), **Host** (only after you host), **Settings and help** (Settings, Keys).
- The corner button reads **▦ Fit** and switches to **▦ Scroll**. That is the gallery control. Help names the room as **Stage**, **Row**, and **the stadium**. There is no separate menu of unreleased view names.
- **Help** in the meeting header opens "How this meeting works". **?** or **Keys** opens the shortcut list the page itself draws.
- A shared link on gifos.app is `https://gifos.app/meet/…`, a stream is `https://gifos.app/cast/…`, and an app invite is `https://gifos.app/join/…`. Do not copy the real code into the report.
- The Home Screen **GifOS** menu (top, with the caret) includes About GifOS, App Store, Arrange icons, Back up Home Screen, Restore from backup, Empty Trash, and Settings. Settings includes Your name, Background and text, AI, Connected accounts, Payments, and System (Storage, Updates, Invite connection).
- The store is https://gifos.app/store. Installing is free. An install lands on the Home Screen as a GIF.

Meeting Bot (`meeting-bot` in the catalog) is a real store app. A smoke test opens it and checks that **RUN** and **CONTROL** are on screen. Do not start it, do not put a password in a URL, and do not send it into a meeting.
