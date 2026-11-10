# Assignment: Two people in a room

- Id: `meet-two-people`
- Surface: Meet
- People: 2 seats
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

1. Seat A: Meeting → name `A` → **Start a call**. Copy the meet link. On A, turn on the Settings debug switch and download the log.
2. Seat B (another browser or a phone): open that link, name `B`, join. Both should show a count of two here.
3. A unmutes and says a short word ("check"). B should hear it. B unmutes and answers. A should hear it. Then both mute.
4. A turns video on. B should see A's picture (or A's picture with blur, if blur is not **No blur**). B turns video on. A should see B. Both turn video off.
5. A opens **Chat**, sends `hello from A`. B should see that line and send `hello from B`. Both should see both lines. Close chat.
6. A presses **Reactions** and **Yes** (the 👍 button). B should see a reaction. The exact animation can vary; the reaction has to be visible to the other seat.
7. A opens **More → Meeting → Hand** (or the hand reaction). B should see the hand. A lowers it.
8. Leave the debug download in the report folder. Both leave.

## Expected

Two seats share audio, video, chat, a reaction, and a raised hand. The status count is two while both are in the room.

## Fail the run if

One direction of audio or video never arrives, chat stays on one seat, or the count never shows both people. If a seat cannot grant the microphone, mark audio `blocked` and still score video and chat.
