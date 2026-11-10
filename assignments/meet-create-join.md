# Assignment: Create a meeting and join it

- Id: `meet-create-join`
- Surface: Meet
- People: 1 person, 2 browsers (a private window counts as the second seat)
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

1. Open https://gifos.app. On the Home Screen, open the **Meeting** icon. It is a built-in page, not a sandboxed GIF. The lobby should show **Meeting**, **Start a call** ("Anyone with the link can join"), **Host this call**, **Join a link**, **Start a town hall**, and **Stream to friends**. The preview says you join muted, with the camera off.
2. Set the name under "This is how you'll appear" to `A`.
3. Press **Start a call**. You should enter a room. The status line should show you as here (wording includes a count). The dock should show **Video**, **Unmute**, **Reactions**, **Chat**, **CC**, **More**, and **Leave**. **Share screen** appears when this browser can capture a screen.
4. A bar offers the link with **Copy** ("Send this link to friends"). On gifos.app that link is a `https://gifos.app/meet/…` address. Copy it, but do not paste the real link into the report. Write only "meet link copied".
5. Open a second browser window (a private window is fine) to the same link. Set the name to `B` if the lobby asks. You should land in the same room, muted, camera off.
6. On seat A, the count of people here should include B. Open **More → Meeting → People** and confirm both names are listed, then close it. Do not press **Download this list**.
7. Start `harness/export-meet-debug.js` in seat A's console before you leave, let it run a few samples, then stop it.
8. On both seats press **Leave**, confirm **Leave** in "Leave the meeting?", and stop.

## Expected

Both seats join one room from the copied link. Both stay muted with the camera off until someone turns a control on. The People list shows the names you typed. Leave ends the call for that seat.

## Fail the run if

- Start a call does not leave the lobby, or the second window does not enter the room.
- A seat's camera or microphone turns on by itself.
- The page errors, spins without a status line, or drops the second seat immediately.

## Pass with notes if

The second window must confirm a browser permission you dismiss on purpose. Mark the join step `blocked` only when the second window cannot be opened at all. A product error is `fail`.
