# Assignment: Record on this device

- Id: `meet-record`
- Surface: Meet
- People: 1 or 2 seats
- Site: https://gifos.app

## Before you start

- Test on https://gifos.app in a current browser. A normal visit runs the published release. Copy the small build label in the bottom-left corner into the report. That label is the build you tested.
- Stay on that build unless you are comparing a bug. If you switch, say so.
- Names on screen are `A` and `B`, not real names.
- Do not put a live meeting, broadcast, or invite link in the report. Leave the room when you finish.
- Do not put passwords, payment details, or network addresses in the report.
- Copy `templates/REPORT.md`, keep its headings, and set the id below. Result is `pass`, `fail`, or `blocked`.
- Meet, Cast, town hall, and join runs: while the room is up, paste `harness/export-meet-debug.js` into that page's DevTools console and save `meet-debug.ndjson` next to the report. See `harness/README.md`.
- Other runs: write `log.txt` (what you opened and what the screen said).
- Check with `node harness/validate-report.js <folder>` before you email info@crowdconceptsinc.com or open a results pull request. A bug you can fix belongs on nwcnwc/gifos-app or nwcnwc/gifos-apps-source, described in `AGENTS.md`.


## Steps

1. Start a call. Start the debug export. If a second seat is handy, have them join so you can see whether they are told you are recording.
2. Open **More → Room → Record**. The tooltip says recording happens on your device, that everyone sees you are recording, and that blurred feeds stay blurred.
3. Start a recording. A second seat should get a visible indication that you are recording. Say the word "testing" if audio is on, or just wait a few seconds with video on.
4. Stop the recording. The indication should clear. The file stays on this device. Note the filename only if it appears, and do not copy the file into the report.
5. Stop the debug export. Leave.

## Expected

Record starts and stops locally, and another seat can tell that recording is happening. The media file is not part of the result you send.

## Fail the run if

Record does nothing, cannot be stopped, or a second seat is never told you are recording.

If the browser blocks the recorder, quote the message and use `fail` when the page gave no explanation, or `blocked` when the browser itself refused a permission you can name.
