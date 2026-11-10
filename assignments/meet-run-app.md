# Assignment: Run an app inside the meeting

- Id: `meet-run-app`
- Surface: Meet
- People: 2 seats, and one installed store app (2048 is enough)
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

1. On the Home Screen, install **2048** from the App Store if it is not already there (https://gifos.app/store/2048, **Install**). Confirm the icon is on the Home Screen.
2. A starts a call. B joins. On A, turn on the Settings debug switch and download the log.
3. On A, open **More → Room → Run app**. The sheet title is "Run an app in this meeting". It should list apps from this computer, and offer **Choose a GIF file…** plus a link field.
4. Pick **2048**. Both seats should see the same board, and both should be able to move a tile (arrow keys, WASD, HJKL, or a swipe). A move on one seat should show up on the other.
5. The meeting header should show the app name and **Stop app**. Press **Help** and confirm it is the app's help (2048's help talks about the 4×4 board), not only the meeting help. Close it.
6. Press **Stop app**. The board should leave the meeting. B should no longer be inside the board. The call should still be up: send a chat line to prove it.
7. Leave the debug download in the report folder, then leave.

## Expected

Run app shares 2048 live with the meeting. A move is visible to the other seat. Stop app returns to the call without ending it.

## Fail the run if

2048 will not launch from the sheet, the two seats see different boards, or Stop app ends the call or leaves a blank page.

If Install fails, that is a store bug: set Result to `fail` and say so, even though this file is a meeting assignment.
