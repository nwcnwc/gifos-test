# Assignment: Home Screen menu, settings, and backup

- Id: `home-screen`
- Surface: Home Screen
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

1. Open https://gifos.app and let the Home Screen finish loading. Record the build badge.
2. You should see built-in icons including **Meeting**, **Broadcast**, and **App Store**, plus **Welcome** on a fresh computer. Names can sit in folders. Record what you actually see. A missing Meeting icon is a fail.
3. Press the **GifOS** button at the top (the word GifOS with a caret). The menu should include **About GifOS**, **App Store…**, **Arrange icons…**, **Back up Home Screen…**, **Restore from backup…**, **Empty Trash**, and **Settings…**.
4. Open **About GifOS** and close it. It should name the version and link to "What is GifOS?" and the source repository.
5. Open **Settings…**. The first page should include **Your name**, **Background and text**, **AI**, **Connected accounts**, **Payments**, and **System**. Open **System** and confirm **Storage**, **Updates**, and **Invite connection** are rows. Open **Updates** far enough to see that a release name is shown, then go back. Do not switch to the unreleased build for this assignment. Do not erase the computer.
6. Set your name to `A` under **Your name**, close Settings, and reopen it. The name should still be `A`.
7. **Back up Home Screen…** should offer to build a GIF backup. Start it only if you are willing to wait. If a GIF downloads, do not commit that GIF. Write "backup GIF downloaded" or the error text. Cancel if the control lets you cancel and you do not want the file.
8. Write `log.txt`.

## Expected

The menu and Settings match the labels above, the name sticks, and backup either produces a GIF or shows a clear error.

## Fail the run if

The Home Screen never appears, Meeting is absent on a fresh load, Settings is missing a section named above, or the name change is forgotten when you reopen Settings.

Do not press **Erase this computer**.
