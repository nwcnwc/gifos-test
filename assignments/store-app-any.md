# Assignment: Smoke test any other store app

- Id: `store-app-any`
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
- Meet, Cast, town hall, and join runs: while the room is up, paste `harness/export-meet-debug.js` into that page's DevTools console and save `meet-debug.ndjson` next to the report. See `harness/README.md`.
- Other runs: write `log.txt` (what you opened and what the screen said).
- Check with `node harness/validate-report.js <folder>` before you email info@crowdconceptsinc.com or open a results pull request. A bug you can fix belongs on nwcnwc/gifos-app or nwcnwc/gifos-apps-source, described in `AGENTS.md`.


## Steps

Use this file when the app you want does not have its own assignment. The report id must be `store-app-<slug>`, and `<slug>` must be a backtick slug in `assignments/store-catalog.md`. Example: slug `pong` → id `store-app-pong`. Do not invent a slug. There are 206 apps in that list, taken from https://gifos.app/apps/index.json.

1. Open `https://gifos.app/store/<slug>`. The name and tagline should match the catalog line.
2. Install or open the app. It should appear on the Home Screen and open into its own UI, not a blank frame and not a certificate error.
3. Read **Help**. Do the smallest real action the help describes (one move, one click, one typed field). Use throwaway text. No passwords, no payment, no meeting links.
4. Close and reopen. If Help says work is saved in the file, the thing you just did should still be there. If Help says nothing is saved, write that.
5. `log.txt` names the slug, the button label, the action you took, and whether reopen matched Help.

## Expected

The listing, the icon, and Help agree, and one basic action works.

## Fail the run if

The slug 404s, Install fails, the app frame stays blank, or the basic action from Help does nothing.

## Code fix

App behavior: `nwcnwc/gifos-apps-source/<slug>/`. Store chrome and install: `nwcnwc/gifos-app`.
