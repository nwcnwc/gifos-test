# Assignment: Share a screen

- Id: `meet-screen-share`
- Surface: Meet
- People: 2 seats. The sharer needs a browser that offers screen capture
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

1. A starts a call, B joins. On A, turn on the Settings debug switch and download the log.
2. On A, find **Share screen** on the dock. If this browser has no screen capture, the control is hidden. Write "Share screen not shown" and set Result to `blocked`. That is the product rule, not a bug.
3. Press **Share screen**. The sheet title is "Share your screen". It explains that a screen share is for something that is not a GifOS app, that it shows on the stage, that your camera pauses while you share, and that sound from the shared tab does not travel. Buttons include **Choose what to share…**, **Run app instead**, and **Cancel**.
4. Press **Cancel**. Nothing should be shared.
5. Open **Share screen** again and press **Choose what to share…**. Pick a window or a tab in the browser's own picker. B should see that content on the stage, and A's camera should pause. Talk from A's microphone should still be possible if A unmutes; the sheet says tab sound does not travel, so do not expect tab audio.
6. Press the control again to stop (it reads **Stop sharing** while active). B should lose the shared screen. A's camera should be available again.
7. Leave the debug download in the report folder. Both leave.

## Expected

The sheet matches the labels above. A chosen surface appears for the other seat and stops when sharing stops. Cancel shares nothing.

## Fail the run if

Choose what to share does not open a picker, B never sees the surface, stop leaves the share up, or the sheet claims tab audio will be heard (the live sheet says it will not).

Do not use Share screen to show a GifOS app. That path is the next assignment, **Run app**.
