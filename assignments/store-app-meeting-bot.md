# Assignment: Smoke test Meeting Bot (open only)

- Id: `store-app-meeting-bot`
- Surface: Store app meeting-bot
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

This is a smoke test of the listing and the first screen. Do not start the bot. Do not type a password you use anywhere else. Do not put a password in a link. Do not auto-join a meeting.

1. Open https://gifos.app/store/meeting-bot and install or open **Meeting Bot**. The catalog tagline is "A meeting bot you drive from another device."
2. The first screen should offer two modes, **RUN** and **CONTROL**, matching the app's Help. Open **Help** and confirm it describes those two modes: RUN is the bot on this computer, CONTROL is the remote.
3. Confirm the app does not join a meeting by itself when you only open it.
4. Stop. Do not press Start.

## Expected

The store listing installs, and the app shows RUN and CONTROL and stays idle until Start.

## Fail the run if

The listing is missing, the app opens straight into a meeting, or neither RUN nor CONTROL is on the screen or in Help.

A bug in this app's source is `meeting-bot/` in nwcnwc/gifos-apps-source. Do not copy passwords, admin-meeting links, or transcripts into the report.


## Log

Write `log.txt`. Include the store URL, the Install/Open label, and what the app showed. No Meet debug file is required.

## Code fix

A bug inside this app is fixed in nwcnwc/gifos-apps-source, directory `meeting-bot/`, not in gifos-test. A bug in the store page itself (install never finishes, listing 404) is nwcnwc/gifos-app.
