# Assignment: About, browser support, and Help

- Id: `help-about-browser`
- Surface: Help
- People: 1 person
- Site: https://gifos.app

## Before you start

- Test on https://gifos.app in a current browser. A normal visit runs the published release. Copy the small build label in the bottom-left corner into the report. That label is the build you tested.
- Stay on that build unless you are comparing a bug. If you switch, say so.
- Names on screen are `A` and `B`, not real names.
- Do not put a live meeting, broadcast, or invite link in the report. Leave the room when you finish.
- Do not put passwords, payment details, or network addresses in the report.
- Copy `templates/REPORT.md`, keep its headings, and set the id below. Result is `pass`, `fail`, or `blocked`.
- The pass/fail record is the harness: open `harness/index.html` and press Run, or have an agent call `gifosHarness.run()` in a browser on https://gifos.app. Save `gifos-harness-report.json` with the report.
- A meeting debug log, when this suite needs one, comes from the product: More → Settings, turn on the debug switch, then use the download in that dialog. Do not invent an Export button. `harness/export-meet-debug.js` is only an optional console helper.
- Other runs: write `log.txt` (what you opened and what the screen said).
- Check with `node harness/validate-report.js <folder>` before you email info@crowdconceptsinc.com or open a results pull request. A bug you can fix belongs on nwcnwc/gifos-app or nwcnwc/gifos-apps-source, described in `AGENTS.md`.


## Steps

1. Open https://gifos.app/about.html. The page should explain that every app is a GIF, that meetings are peer-to-peer, and that the store installs free GIFs. It should link to the store, to https://gifos.app/llms.txt, to https://github.com/nwcnwc/gifos-app, and to browser support. Record the contact address printed on the page (the live site shows support@gifos.app).
2. Open https://gifos.app/browser-support.html from that page's link (or the About footer). It should say which browsers are known to work for the Home Screen, for meetings, and for broadcasts, and it should be willing to say when a browser was not checked. Quote one sentence. Do not treat a browser marked "not checked" as a test failure.
3. On the Home Screen, open **Meeting**, start a call, and press **Help** in the header. The dialog title is "How this meeting works". It should mention Stage, Row, and the stadium, and controls including Blur, Hand, Invite, Run app, Record / CC, and Settings. Close it and leave the call. You do not need a second seat. If you opened a meeting, download the debug log from More → Settings. Otherwise `log.txt` is enough, because this suite is about the help text. The harness report covers the same pages without joining a room.
4. Open any installed app (Welcome, Notes, or 2048) and press **Help**. You should get that app's help, and the OS adds its own footer about Invite and Save. Record the app name and the help title.
5. Write `log.txt` (and the ndjson file if you captured one) with the three titles you saw.

## Expected

About, browser support, meeting Help, and an app's Help all open and describe the product you are actually looking at.

## Fail the run if

A linked page 404s, meeting Help is empty, or an app's Help button does nothing.

`log.txt` is required if you did not capture `meet-debug.ndjson`. The checker accepts either for this id because the id does not start with `meet-`.
