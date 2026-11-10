# Assignment: Smoke test Monkeytype

- Id: `store-app-monkeytype`
- Surface: Store app monkeytype
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

1. Open https://gifos.app/store/monkeytype and install or open **Monkeytype**.
2. You should see a word list and a way to pick **time**, **words**, or a **quote**. Choose **words** and **10** if those controls are there.
3. Click or tap the words and type the first three words, including spaces. Correct letters should register; a deliberate wrong letter should show as a mistake (help says mistakes go red).
4. Press **Tab**. Help says Tab starts a new test. The words should reset.
5. You do not have to finish a scored test. If you do, the result shows wpm and accuracy. Do not put personal best text that includes your real name into the report.

## Expected

Typing lands on the words, a wrong letter is visible, and Tab resets the test.

## Fail the run if

Keypresses do not affect the test, or Tab does nothing and there is no other "new test" control.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `monkeytype/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
