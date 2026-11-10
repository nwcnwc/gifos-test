# Assignment: Browse the store and launch an app

- Id: `store-browse-launch`
- Surface: Store
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

1. Open https://gifos.app/store (the Home Screen **App Store** icon and the **GifOS** menu item **App Store…** should land on the same store). The heading is "Apps that are GIFs". Search is **Search apps…**. Category chips come from the catalog (Games, Learning, Productivity, Creativity, Media, Social, Utilities, Developer, Health, and All).
2. Confirm **Installing is free** is the story on the page. A tip or "pay to feature" bar is hidden unless the site has a public tip link configured. If you see a pay button, do not pay. Record the label.
3. Type `2048` into search. Open the **2048** card. The address should be https://gifos.app/store/2048. The page should show the name, the tagline about racing a friend to 2048, and an **Install** (or **Open** / **Update** if this browser already has it).
4. Press **Install** if it is not installed. When it finishes, go to the Home Screen and find the 2048 icon. Open it. You should get a 4×4 board, not a download error and not a blank frame.
5. Make one slide (arrow key or swipe). A tile should move or merge.
6. Close the app and open the icon again. The board you just changed should still be there (the store tagline says you come back to the board you left).
7. Write `log.txt` with the category chips you saw, the button label (Install, Open, or Update), and what happened on the second open.

## Expected

Search finds the real 2048 listing, install puts an icon on the Home Screen, the app runs, and a move survives a close.

## Fail the run if

The catalog does not load, 2048 is missing, Install errors, the icon never appears, or the board is empty or different after you reopen it.

This assignment does not use the Meet debug script. `log.txt` is the log.
