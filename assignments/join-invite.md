# Assignment: Join an app by invite link

- Id: `join-invite`
- Surface: Join
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

1. Install **Checkers** if needed: https://gifos.app/store/checkers. Open it from the Home Screen. Help describes a 10×10 board and three ways to play: **Computer**, **two here**, and **Play a friend**.
2. Choose **Play a friend**. Then press **Invite** in the bar above the app. The product builds a link shaped like `https://gifos.app/join/…`. Copy it. Do not put the real link in the report. Write down the choices the Invite sheet actually offers (how long the link works, and what happens if you disconnect). Record the labels you see.
3. Seat B opens the link. B should enter the same checkers game, not a blank Home Screen and not a video meeting.
4. A moves a piece. B should see that move. B moves. A should see it.
5. On A, open More → Settings, turn on the debug switch, and download the log.
6. A presses the header control that ends sharing (wording may be **Stop** or the invite sheet's revoke / new link). Record the label. B should stop receiving new moves after that, or should be told the session ended. Write which.

## Expected

Play a friend, then Invite, gives one link. The other seat lands in the same Checkers game and sees moves. Ending the share stops the session in a way the other seat can notice.

## Fail the run if

Invite does not produce a link, the link opens the wrong app, moves stay on one seat, or the link opens a video call with no board.

Home Screen → an app's **Meeting** button, if you see one, is a different door into a video room with the app. You do not have to press it for this assignment. If you do, say so, and then you are also in a meeting: capture the debug log there too.
