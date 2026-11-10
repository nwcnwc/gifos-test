# Assignment: Smoke test Solitaire

- Id: `store-app-solitaire`
- Surface: Store app solitaire
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

1. Open https://gifos.app/store/solitaire and install or open **Solitaire**. Help calls it Klondike: seven tableau columns, a stock, foundations ace through king.
2. Tap the stock once. Cards should move onto the waste. The draw-1 / draw-3 toggle can stay at whatever it already is; record which.
3. Move one face-up card by the rules the help states (tap to send it home, or drag onto a highlighted column). If the deal offers no legal move, press **Hint** or draw again until one exists. Record that you had to draw.
4. Press **Undo**. The move, draw, or recycle you just did should reverse.
5. Close the app and open it again. The same tableau should return, not a freshly shuffled deck. Help says a new game is what replaces the saved one, and **New** asks first if you have already moved.

## Expected

Stock, a legal move, and undo work, and the deal survives a reopen.

## Fail the run if

The stock does not draw, Undo does nothing, or a reopen shuffles a new game without asking.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `solitaire/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
