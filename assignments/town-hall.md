# Assignment: Start a town hall

- Id: `town-hall`
- Surface: Town hall
- People: 2 seats
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

1. On the Meeting lobby, press **Start a town hall**. The host form should open with the title **Town hall** and the line that you host, people with the link watch, and they come on stage when you call them up.
2. The host password may already be filled in. Leave it. Do not copy it into the report. Name the hall `Hall` if a name field is editable. Press **Start**.
3. Copy the link for a watcher (it is still a meet link, with a town-hall mark). Do not paste the real link into the report. On the host, turn on the Settings debug switch and download the log.
4. Seat B opens the link. B should be watching, not publishing a camera. The page adds a town-hall class of controls: a watcher is not given the mic, camera, Run app, Share screen, or Record until they are brought on stage.
5. Host: confirm you can see that B is watching (a count or a hand queue). If the page shows a way to bring B on stage, use it, confirm B then gets mic or camera controls, then return B to watching. If you cannot find that control, record the buttons you do see. That missing control is a `fail` only if the lobby promised "come on stage when you call them up" and no such control exists anywhere you look (More, the person in People, a hand queue).
6. B raises a hand if **Hand** is available. Host should see it.
7. Host leaves. B should not be left in an unexplained live room. Record the screen.
8. Leave the debug download in the report folder.

## Expected

Town hall is a hosted watch-first room, distinct from **Start a call**. Watchers are not on camera by default. The host can see who is watching.

## Fail the run if

Start a town hall is missing, it opens an ordinary unhosted call, or a watcher is pushed on camera with no action from the host.
