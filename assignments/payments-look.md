# Assignment: Look at Payments without paying

- Id: `payments-look`
- Surface: Payments
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

Do not enter a card number, bank account, wallet seed, or PayPal password. Do not complete a payment. Do not photograph a wallet address into the report.

1. On the Home Screen, open the **GifOS** menu → **Settings…** → **Payments**. Record every row label on that screen and whether each one says it is set up or not. Do not fill any of them in.
2. Open https://gifos.app/store. Installing is free. If a bar offers a tip or a paid feature, record its words and do not follow it. If the bar is absent, write "no pay bar".
3. Open one store app you already installed and look for a price or a pay button inside it. Many apps have none. Record what you see. Do not pay.
4. Write `log.txt` with those labels only. No account identifiers.

## Expected

You can read the Payments settings and the store's install story without spending money. Install stays available without paying.

## Fail the run if

The store blocks Install until you pay, or Payments settings crash when opened.

This assignment cannot fail because a payment method is "not set up". That is the state a fresh computer is in.
