# Assignment: Fit, Scroll, stage, and your own video

- Id: `meet-views`
- Surface: Meet
- People: 2 seats. A third seat makes the stadium easier to see
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

Do not look for a view called Speaker, Gallery, or Grid in a menu. Those names are not on the live controls. The gallery control is the **▦ Fit** / **▦ Scroll** button. The stage is the **Stage** button. Help calls the rest of the room **Row** and **the stadium**.

1. A starts a call, B joins. On A, turn on the Settings debug switch and download the log. If you have a third seat, join them too.
2. Find **▦ Fit** (top corner; the accessible name starts as Gallery). Its tooltip is about fitting everyone on one screen, and pressing it to scroll. Press it. The label should become **▦ Scroll**. Scroll the room. Press again and confirm it returns to **▦ Fit**. Shortcut **Alt+F** is listed on the button; try it once and record whether it toggles the same way.
3. Open **More → Room → Stage**. The title tooltip is about stepping onto the stage so the room sees and hears the stage first. Step on. B should see A on the stage. Step off. The stage should clear.
4. Open **More → Your video**. Under **You**, press **Tile**, then **Float**, then **Strip**, then **Hide**.
   - Tile: you are a normal tile.
   - Float: a window you can drag. **Size** S/M/L and a corner (TL, TR, BL, BR) should appear. Drag it a short distance.
   - Strip: a band on one edge. **Place** should offer Bottom, Right, Left, Top.
   - Hide: your video is hidden on this screen. If the camera is on, say whether the other seat still sees you. Hide is local to your screen; the control's title says the camera still sends if it is on.
5. Return **You** to **Tile**.
6. Press **Full screen** in the header (the F control) if it is shown, then leave full screen. If the browser has no full screen (some phones), write "Full screen not offered".
7. Under Your video, if **Float** (picture-in-picture, "Float the meeting") is shown, press it and confirm a small window, then close it. If it is hidden, write "Float the meeting not shown". That follows the browser, not a missing assignment step.
8. Open **Help** and check the room section against what you saw: Stage, Row, the stadium. Close it.
9. Leave the debug download in the report folder, then leave.

## Expected

Fit and Scroll toggle. Stage presents you to the other seat and steps off. Tile, Float, Strip, and Hide each do what their titles say. Full screen and picture-in-picture follow the browser.

## Fail the run if

Fit does not change the layout, Stage never presents you, or a Your-video choice does nothing. A missing picture-in-picture button on a browser without that API is not a fail.
