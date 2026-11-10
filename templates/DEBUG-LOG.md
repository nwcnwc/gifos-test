# Debug log

## Human path

In a meeting on https://gifos.app, open **More → Settings and help → Settings**. Turn on the debug switch in that dialog, then use the download in the same dialog. Save the file next to `REPORT.md`.

That is the product's debug log. Do not look for a button named Export. The harness checks the served Settings dialog for the switch and the download (`meet-settings-debug-download`). If that check fails, say so in the report. Do not invent a different button.

Do not attach the People list (**Download this list**). It contains network addresses. A transcript download is optional and should be omitted if anyone said anything private. A recording from **Record** stays on the device.

## Harness report

The pass/fail record for a run of the atomic checks is `gifos-harness-report.json` from [`harness/index.html`](../harness/index.html). Put it in the same folder as `REPORT.md`. The checker treats that file as the machine-readable result.

## Optional agent helper

[`harness/export-meet-debug.js`](../harness/export-meet-debug.js) samples `window.__gifosVideo` and downloads `meet-debug.ndjson` when pasted into the meeting console. Use it only when you are already driving that page and you still need a structured capture. It is not a substitute for the Settings download, and it is not required to run the harness.

## Other notes

Home Screen, store, help, and payments notes can be `log.txt` when you are not attaching a harness report. A few hundred characters, no live room links, no passwords, no network addresses.
