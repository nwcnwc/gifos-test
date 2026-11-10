# Assignment: A room of three to six

- Id: `meet-several-people`
- Surface: Meet
- People: 3 to 6 seats. Browsers and phones can mix
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

1. If you cannot put three seats in one room, set Result to `blocked` and name the seats you do have. Do not pretend extra people joined.
2. Seat A starts a call and shares the link. Seats B, C, and any others join with names `B`, `C`, `D`, and so on. Start the debug export on A once the third seat is in.
3. Record the status count after each join. It should rise.
4. Look at the picture. With Fit on (the **▦ Fit** button), the room should keep faces on one screen: your row, and other people in the stadium mosaic when the room is past a single row. Open **Help** ("How this meeting works") and confirm it names **Stage**, **Row**, and **the stadium**. Close Help.
5. One seat (not A) unmutes and speaks. At least two other seats should hear them. That seat mutes.
6. One seat turns video on. The others should see that one picture. Turn it off.
7. A presses **More → Room → Stage** ("Step onto the stage"). Other seats should see A presented on the stage, not only as another equal tile. A presses Stage again to step off.
8. The last seat to join closes the tab without pressing Leave. Within a couple of minutes the status count on A should drop. The People list may still show them: that panel says people who left stay on the list. Record the count and whether People still lists them. Do not download the list.
9. Stop the debug export. Everyone leaves.

## Expected

The count tracks joins and a hard close. Audio from one seat reaches the others. Stage changes how that person is presented. Fit keeps the room on one screen.

## Fail the run if

The count sticks after a seat closes the tab for several minutes, Stage does nothing, or a third seat cannot join while the first two are fine.
