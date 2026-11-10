# Assignment: Smoke test Excalidraw

- Id: `store-app-excalidraw`
- Surface: Store app excalidraw
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

1. Open https://gifos.app/store/excalidraw and install or open **Excalidraw**.
2. The left toolbar should include Selection, Rectangle, Diamond, Ellipse, Arrow, Line, Draw, Text, Eraser. Pick **Rectangle** and drag a box on the canvas.
3. Pick **Draw** and make a short stroke.
4. Press **Cmd/Ctrl+Z**. The stroke should undo. Redo if the control is shown (**Shift+Cmd/Ctrl+Z**).
5. Close the app and open the icon again. The rectangle should still be on the canvas. The store tagline says drawings save into the app's own file.

## Expected

You can draw, undo, and find the drawing still there after a reopen.

## Fail the run if

The canvas ignores the toolbar, undo does nothing, or a reopen is blank.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `excalidraw/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
