# Assignment: Chat, captions, transcript, and questions

- Id: `meet-chat`
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

1. A starts a call, B joins. On A, turn on the Settings debug switch and download the log.
2. Open **Chat** from the dock. The header should say the chat is private and gone when everyone leaves. Send `ping` from A and `pong` from B. Both lines should appear on both seats, with the sender's name.
3. Press the emoji button and send one emoji. It should appear in the compose field or the transcript of the chat. Send it.
4. Open the **Transcript** tab in that panel (also under **More → Meeting → Transcript**). The empty state says the meeting is written down and that anyone here can read or download the lines. You do not have to speak. If you do speak, say only the word "testing". Do not download the transcript into the report folder.
5. Press **CC** on the dock. It toggles captions on your screen. The control says the meeting is written down either way. Toggle it on and off. Record whether a caption line appeared. No speech means no caption line, and that is fine.
6. **Questions** is under More → Meeting. On an ordinary call that button is not shown until the room is hosted. Record whether you see **Questions**. Do not treat a hidden Questions button on a normal **Start a call** room as a failure. Hosted rooms are `town-hall` and **Host this call**.
7. Leave the debug download in the report folder, then leave. Do not attach a transcript file.

## Expected

Chat lines cross the room with names. Transcript opens and explains itself. CC toggles. Questions stays hidden on a room that was not hosted.

## Fail the run if

Chat does not cross, the transcript panel is missing, or CC cannot be toggled.
