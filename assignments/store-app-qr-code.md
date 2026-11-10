# Assignment: Smoke test QR Code

- Id: `store-app-qr-code`
- Surface: Store app qr-code
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

1. Open https://gifos.app/store/qr-code and install or open **QR Code**.
2. Help lists types **Text**, **Link**, **Phone**, **SMS**, **Email**, and **Contact**. Select **Link**.
3. Enter `gifos.app` (the app adds `https://` if you omit the scheme). A code should draw while you type.
4. If you can, point a phone camera at the screen. It should offer to open https://gifos.app. If you have no second camera, say so and treat the scan as `blocked`, not a product fail. The picture itself still has to appear.
5. Close and reopen. Help says the last code and a **Recent** list come back. Confirm the link is still there.

## Expected

A link becomes a QR picture, and the last code is still there after a reopen.

## Fail the run if

Typing does not draw a code, or a reopen forgets the code and shows no Recent list.

Do not encode a meeting link, a password, or a phone number you care about.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `qr-code/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
