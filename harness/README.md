# Harness

Small tools for a person or an agent on their own computer. Nothing here talks to a private lab, a WebDriver grid, or a remote machine.

| File | What it does |
| --- | --- |
| `export-meet-debug.js` | Paste into the Meet page console. Downloads `meet-debug.ndjson` |
| `validate-report.js` | Checks a report folder |
| `CHECKLIST.md` | The list to walk before you send a result |

Checker fixture (no browser):

```bash
node harness/validate-report.js --self-test
```

Check a folder you are about to send:

```bash
node harness/validate-report.js results/2026-11-09-meet-create-join-octocat
```

Node.js is enough. There is no package install.

## Export the Meet debug log

GifOS Meet's debug export is the `window.__gifosVideo` object on the live meeting page, not a menu item. `debugDump()`, `pairs()`, `monInfo()`, `stageInfo()`, `screenInfo()`, `grid()`, and `statusPlane()` are the read-only fields this script records. Confirmed against the Meet page served at https://gifos.app (`run.html` in [nwcnwc/gifos-app](https://github.com/nwcnwc/gifos-app)).

1. Join or start the room so the call controls are on screen.
2. Open DevTools and select the Console.
3. Paste the entire contents of `export-meet-debug.js` and press Enter.
4. Leave it running while you do the assignment steps. It samples every 2 seconds for 60 seconds.
5. To stop early: `gifosExportDebug.stop()`. To capture longer: `gifosExportDebug({ seconds: 180 })`.
6. The browser downloads `meet-debug.ndjson`. If the text is over about 1.5 million characters it downloads `meet-debug.ndjson.gz` instead.
7. Move that file into the report folder. Leave the room.

If the console says `window.__gifosVideo is not on this page`, you pasted it into the Home Screen or the store. Switch to the meeting tab and paste it there.

The file starts with a `kind: "meta"` line (`product` `gifos-meet`, `exporter` `gifos-test/export-meet-debug`) and then `kind: "sample"` lines whose `debugDump.me` is the local seat. That shape is what the checker requires, so a renamed text file full of notes will not pass a Meet assignment.

Addresses, `/meet/`, `/cast/`, and `/join/` codes, and object fields whose names look like passwords are removed before the download. Display names you typed are kept, so type `A` and `B`.

### More console detail

Before you enter the room, you can add `debug=on` to the address, for example a hash or query `debug=on`. The page remembers it for the tab and prints `[clog]` lines. The exporter copies those lines into the ndjson while it is running. You do not need this for a normal pass. Use it when a seat fails to connect and the report is a fail.

## What the checker enforces

- `REPORT.md` has the headings from the template, a real assignment id, and `pass`, `fail`, or `blocked`.
- Placeholders such as `YOUR-HANDLE` and `Write what you saw here.` are gone.
- Meet, Cast, town hall, and join ids need `meet-debug.ndjson` or `meet-debug.ndjson.gz` of at least 800 bytes, two or more JSON lines, a meta line from this exporter, and a sample with `debugDump.me`.
- Other ids need that ndjson file or a `log.txt` of at least 400 characters.
- `blocked` may omit the log.
- An id `store-app-<slug>` must use a slug listed in `assignments/store-catalog.md`.
- The report and the log must not contain an IP address, a live room link, or an unexpected email address. `info@crowdconceptsinc.com` and `support@gifos.app` are allowed.
- Recordings and key files in the folder are rejected.
