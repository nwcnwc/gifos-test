# Checklist

Walk this before you email a result or open a pull request. Agents: do the steps, do not only quote them.

## While you test

- [ ] The assignment file is one of the files in `assignments/`, or `store-app-<slug>` with a slug from `assignments/store-catalog.md`.
- [ ] You used https://gifos.app. You did not type an address that is not on that site.
- [ ] You copied the bottom-left build badge into the report.
- [ ] Display names are `A`, `B`, and so on.
- [ ] You left every room you opened.

## The folder

- [ ] `REPORT.md` follows `templates/REPORT.md` and the headings are still there.
- [ ] `- Id: \`...\`` matches the assignment.
- [ ] `## Result` is `pass`, `fail`, or `blocked`, and that word matches what you saw.
- [ ] `gifos-harness-report.json` is the file the harness downloaded, from a run against https://gifos.app.
- [ ] A meeting debug log, if you joined a room by hand, is the Settings download (More → Settings, debug switch, then download), not a file you typed.
- [ ] A `blocked` run says what was missing (devices, permission, time at the keyboard).
- [ ] `node harness/validate-report.js <folder>` prints `ok`.

## Before it leaves your machine

- [ ] No live `/meet/`, `/cast/`, or `/join/` link.
- [ ] No password, API key, payment data, or wallet data.
- [ ] No People-list download, no recording, no `.key` or `.pem` file.
- [ ] No one else's network address. Search the folder for a dotted IPv4 address.
- [ ] No legal names.

## If you are also fixing the bug

- [ ] The fix is on `nwcnwc/gifos-app` or `nwcnwc/gifos-apps-source`, not mixed into the results folder.
- [ ] The diff is limited to the bug.
- [ ] You did not edit `versions/` and you did not run a release or signing step.
- [ ] The pull request says how you reproduced the bug and how you checked the fix.
