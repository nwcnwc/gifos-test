# Assignment: A larger room

- Id: `meet-larger-room`
- Surface: Meet
- People: As many seats as you can assemble, ideally 8 or more. blocked is an honest result
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

1. This assignment is only a pass when you actually seated the people. If you have fewer than 8 seats, you may still run it with what you have and set Result to `blocked` if you never reached 8, while writing what the smaller room did. A bug in that smaller room is still `fail`.
2. One person starts a call and distributes the link out of band (a chat you already have). Do not put the link in the report.
3. Ask everyone to join muted, camera off, with names `A`, `B`, `C`, continuing through the alphabet. On the starter's machine, turn on the Settings debug switch and download the log after people have arrived.
4. Record the status count at the start, at the peak, and after you ask one person to leave with the **Leave** button.
5. Press **▦ Fit**, then press it again so it reads **▦ Scroll**. Scroll the room. Press it again to return to Fit. Both states should be usable: Fit on one screen, Scroll moving through people.
6. One person steps on **Stage**, speaks a short word, and steps off. Note who could hear them and whether the stage picture was visible.
7. Open **Help** and confirm the page still describes Stage, Row, and the stadium at this size.
8. Leave the debug download in the report folder. Everyone leaves.

## Expected

The room accepts every seat you brought, the count moves as people join and leave, and Fit / Scroll both operate. Help's three names still match the screen.

## Fail the run if

Joins stop succeeding at a small number, the count is wildly wrong, Scroll or Fit does nothing, or the page becomes unusable (frozen controls, a blank feed, a reload loop).

There is no fixed maximum to "prove". Meeting Help says the meeting has no size limit. You are checking that the seats you have can all enter and see the room, not that the product held the whole planet.
