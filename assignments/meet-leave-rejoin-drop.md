# Assignment: Leave, rejoin, and a peer dropping

- Id: `meet-leave-rejoin-drop`
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

1. A starts a call. B joins. On A, turn on the Settings debug switch and download the log. Both names visible, count is two.
2. B presses **Leave**. The dialog title is "Leave the meeting?" Press **Stay**. B should still be in the room and A should still see B in the count.
3. B presses **Leave** again and then **Leave**. B should see "You left" with **Rejoin** and **Close**, and the note that the camera and microphone are off.
4. On A, the count should fall to one. People may still list B. Do not download that list.
5. On B, press **Rejoin**. B should return to the same room. A's count should show two again. Send a chat line `back` from B. A should see it.
6. B closes the browser tab without Leave (a dropped peer). Watch A's count. Record how long until it shows one person here. People may keep B on the list.
7. A presses **Leave** and **Leave**, then **Rejoin** on the "You left" dialog. A should get a room again. It may be the same room or a fresh one if everyone had gone; write which, judged by whether B can still open the original link and see A. Do not paste the link.
8. Leave the debug download in the report folder. Leave for good.

## Expected

Stay cancels leave. Leave drops that seat's media and lowers the other seat's count. Rejoin from "You left" works. A tab close is a drop: the count falls, even if People keeps the name.

## Fail the run if

Stay kicks you out, Leave does not change the other seat's count, Rejoin errors, or a dropped tab is still counted as here long after the page has had time to notice (write the elapsed time either way).
