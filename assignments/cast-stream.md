# Assignment: Stream to friends

- Id: `cast-stream`
- Surface: Cast / broadcast
- People: 2 seats. The watcher does not need a camera
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

1. On the Meeting lobby, press **Stream to friends**. This opens the broadcast skin (the page title becomes Stream or Broadcast). The address you hand out on gifos.app is a `https://gifos.app/cast/…` link. Do not put the real link in the report.
2. Go live with the controls the page shows (a host password may be filled in for you). Do not copy that password into the report. On the host, turn on the Settings debug switch and download the log.
3. On a second seat, open the stream link. Meeting Help for a broadcast says watchers do not use a camera or microphone. Confirm the watcher is not prompted for a camera in order to see the stream. If the page does prompt, record the exact words.
4. Host: turn the camera on if the page asks, and confirm the watcher sees the picture. Host: send a chat line `live`. The watcher should see it.
5. Watcher: confirm you do not have a normal camera tile publishing yourself. The broadcast help says viewers watch, and chat is the back channel.
6. Host: if **Share screen** is shown, share a window briefly and confirm the watcher sees it, then stop. On a broadcast, Share screen is for the host.
7. Host: stop or leave. The watcher should see that the stream ended (an ended state, not a frozen "live" with no explanation). Record the words on screen.
8. Leave the debug download in the report folder.

## Expected

Stream to friends produces a watch link. A second seat can watch without becoming a camera participant. Chat from the host arrives. Ending the stream is visible to the watcher.

## Fail the run if

The watcher is forced into a normal two-way meeting, the picture never arrives, or leaving the host leaves the watcher on a live-looking screen with nobody there and no ended message.
