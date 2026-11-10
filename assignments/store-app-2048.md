# Assignment: Smoke test 2048

- Id: `store-app-2048`
- Surface: Store app 2048
- People: 1 person
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

1. Open https://gifos.app/store/2048 and install or open **2048** (Games). Tagline on the live catalog: race a friend to 2048, and come back to the board you left.
2. Help (**Help** in the app header) should describe a 4×4 grid, arrow keys / WASD / HJKL, swipe on a phone, and **R** or **New Game** for a fresh board. You do not have to finish a game.
3. Slide once. The board should change, and a new tile should appear if the slide moved something.
4. Note the score area at the top.
5. Close the tab. Open the icon again. The same board should return.
6. Press **New Game** only if you want a second board. Help says New Game does not throw away the board you were on; it moves into **Your games**. If you try this, confirm the previous board is still listed.

## Expected

The app matches its help: a 4×4 slide puzzle that keeps the board in the icon.

## Fail the run if

The board does not move, Help describes a different game, or a reopen shows a new random board with no sign of the one you left.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `2048/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
