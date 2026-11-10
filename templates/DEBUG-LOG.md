# Debug log

Put the log in the same folder as `REPORT.md`.

## Meet, Cast, town hall, and join assignments

The meeting page does not have an "Export debug log" button. It does keep a diagnostic object, `window.__gifosVideo`, which includes `debugDump()`. The script [`harness/export-meet-debug.js`](../harness/export-meet-debug.js) samples that object and downloads a real export:

- `meet-debug.ndjson` — one JSON object per line
- `meet-debug.ndjson.gz` — the same text, gzipped, when the capture is very large

How to capture it is in [`harness/README.md`](../harness/README.md). Start the capture while you are in the room, leave the capture running through the steps, then stop it and leave the room.

The script replaces room links, invite links, email addresses, and network addresses before download. Open the file and confirm you do not see a live `/meet/`, `/cast/`, or `/join/` code, or an IP address. If you do, delete the file and capture again. Do not hand-edit a fake log.

Optional and not a substitute for the ndjson file: add `debug=on` to the meeting address (query or hash) before you join. The page then prints `[clog]` lines in the console, and the script copies those lines into the ndjson while it is capturing.

Do not attach:

- the People list (**More → People → Download this list**). It contains network addresses.
- a transcript download, if anyone said anything private
- a recording file from **Record**

## Other assignments

Write `log.txt` in the report folder. Include the pages you opened, the labels you saw, and any console text that mattered. A few hundred characters is the minimum the checker accepts. The same privacy rules apply.

## Check

```bash
node harness/validate-report.js path/to/the/folder
```

The checker accepts ndjson and ndjson.gz, requires the Meet exporter's `meta` line and at least one `debugDump` sample for meeting runs, and rejects placeholders, live room links, and IP addresses.
