# Assignment: Smoke test Chess Grandmaster

- Id: `store-app-chess-grandmaster`
- Surface: Store app chess-grandmaster
- People: 1 person
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

1. Open https://gifos.app/store/chess-grandmaster and install or open **Chess Grandmaster**.
2. Wait until the page leaves **Loading engine…** and says **Stockfish ready**. If it stays on Loading, wait long enough for a local engine to compile (a minute on a slow laptop) and record the last status line.
3. **New game**. Help says you pick Play as (White, Black, or random), a strength from Beginner through Grandmaster and **Stockfish (full)**, think time, and coaching. Pick White, Beginner, and the shortest think time. Start.
4. Tap a pawn, then tap a legal landing (dots are empty squares). The engine should reply with its own move without asking you for a network key.
5. Press **Take back** once. Help says that undoes your move and the engine's reply. Confirm it is your turn again.
6. You can stop. You do not need to finish the game.

## Expected

The engine becomes ready on this device and answers one move. Take back restores your turn.

## Fail the run if

Stockfish never becomes ready, a legal tap does nothing, the engine never replies, or Take back removes only one ply and leaves the engine's piece sitting there.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `chess-grandmaster/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
