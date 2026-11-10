# Assignment: Microphone, camera, and blur

- Id: `meet-audio-video`
- Surface: Meet
- People: 1 or 2 people. A second seat is needed to judge what the other side sees
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

1. Start a call as in `meet-create-join` (seat `A`). If you have a second seat, join as `B` and do the checks from B's screen. On A, turn on the Settings debug switch and download the log.
2. Confirm the dock shows **Unmute** and a **Video** control whose accessible name is about the camera being off. The lobby already said you join muted, with the camera off.
3. Press **Unmute**. The browser may ask for the microphone. Allow it. The button should change to a mute control. Press it again and confirm you are muted. Record the exact labels.
4. Press **Video** (the control labeled to start video). Allow the camera if asked. Your tile should show a picture, not only your initial. Press it again and confirm the camera is off and the picture is gone.
5. Turn video on again. Open **More → Your video**. Blur offers **Max**, **Min**, and **No blur**. Press **Max**. If B is present, B should see A blurred. Press **No blur** and confirm the picture clears. You are the only one who should be able to change your own blur. The meeting Help text says only you control your camera.
6. If the browser has two cameras, **Flip** under Your video switches them. If Flip is absent, write "Flip not shown" — that is not a failure on a laptop with one camera.
7. Open **More → Settings and help → Settings**. Video quality lists **Auto**, **1080p**, **720p**, **480p**, **360p**, **240p**, and **144p**. Do not change it unless you are testing that the choice sticks: pick **360p**, close Settings, reopen, and confirm **360p** is still selected, then set **Auto** again.
8. Leave the debug download in the report folder, then leave the meeting.

## Expected

Mute and camera are off on entry, toggle on and off, and blur changes only the outgoing picture. Settings lists those quality steps and keeps a choice you made.

## Fail the run if

A control does the opposite of its label, the camera stays on after you turn it off, blur does nothing a second seat can see, or Settings loses the quality choice immediately.

If this computer has no microphone or no camera, mark those steps `blocked` and say which device was missing. Do not mark the whole run `pass`.
