/*
 * suite.js — atomic checks against the live site https://gifos.app.
 *
 * The harness page (index.html) loads this file and runs gifosHarness.run().
 * An agent driving a real browser can also inject this file into a gifos.app
 * tab (Playwright addScriptTag, Puppeteer, or page.evaluate) and call
 * gifosHarness.run(). Fetch checks work from any page because gifos.app sends
 * Access-Control-Allow-Origin: *. When the document is itself a GifOS page,
 * run() adds DOM checks for that page.
 *
 * The human debug log is the switch and download inside Meet → More →
 * Settings. This suite only checks that those controls are present. It does
 * not replace that download.
 */
(function (root) {
  'use strict';

  var ORIGIN = 'https://gifos.app';
  var KNOWN_CATEGORIES = ['Games', 'Learning', 'Productivity', 'Creativity', 'Media', 'Social', 'Utilities', 'Developer', 'Health'];

  function pass(id, suite, name, detail) {
    return { id: id, suite: suite, name: name, ok: true, detail: detail || '' };
  }
  function fail(id, suite, name, detail) {
    return { id: id, suite: suite, name: name, ok: false, detail: String(detail || '').slice(0, 500) };
  }

  async function textOf(url) {
    var res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(url + ' HTTP ' + res.status);
    return { url: res.url, status: res.status, text: await res.text() };
  }

  async function headOf(url) {
    var res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return {
      url: res.url,
      status: res.status,
      type: res.headers.get('content-type') || '',
      length: res.headers.get('content-length')
    };
  }

  async function pool(items, limit, fn) {
    var out = new Array(items.length);
    var next = 0;
    async function worker() {
      while (next < items.length) {
        var i = next++;
        try { out[i] = await fn(items[i], i); }
        catch (e) { out[i] = { error: e && e.message ? e.message : String(e) }; }
      }
    }
    var n = Math.min(limit, items.length);
    var jobs = [];
    for (var w = 0; w < n; w++) jobs.push(worker());
    await Promise.all(jobs);
    return out;
  }

  function catalogTests(catalog) {
    var tests = [];
    var apps = catalog && Array.isArray(catalog.apps) ? catalog.apps : null;
    if (!apps) {
      tests.push(fail('store-catalog-shape', 'store-catalog', 'Catalog JSON has an apps array', 'missing apps'));
      return tests;
    }
    tests.push(apps.length >= 200
      ? pass('store-catalog-count', 'store-catalog', 'Catalog lists at least 200 apps', String(apps.length))
      : fail('store-catalog-count', 'store-catalog', 'Catalog lists at least 200 apps', String(apps.length)));
    var cats = Array.isArray(catalog.categories) ? catalog.categories : [];
    var catOk = cats.length > 0 && KNOWN_CATEGORIES.every(function (c) { return cats.indexOf(c) !== -1; });
    tests.push(catOk
      ? pass('store-catalog-categories', 'store-catalog', 'Catalog category list includes the live store categories', cats.join(', '))
      : fail('store-catalog-categories', 'store-catalog', 'Catalog category list includes the live store categories', cats.join(', ') || 'none'));
    var seen = {};
    var dup = '';
    apps.forEach(function (a) {
      if (!a || !a.slug) return;
      if (seen[a.slug]) dup = a.slug;
      seen[a.slug] = true;
    });
    tests.push(dup
      ? fail('store-catalog-unique-slugs', 'store-catalog', 'Catalog slugs are unique', 'duplicate ' + dup)
      : pass('store-catalog-unique-slugs', 'store-catalog', 'Catalog slugs are unique', String(apps.length)));

    apps.forEach(function (app) {
      var slug = app && app.slug ? String(app.slug) : '';
      var idBase = 'store-' + (slug || 'missing');
      if (!/^[a-z0-9][a-z0-9-]{0,80}$/.test(slug) || !app.name || !app.appId) {
        tests.push(fail(idBase + '-identity', 'store-catalog', slug + ' has slug, name, and appId', 'slug=' + slug));
      } else {
        tests.push(pass(idBase + '-identity', 'store-catalog', app.name + ' has slug, name, and appId', slug));
      }
      var ver = app && app.version ? String(app.version) : '';
      var appCats = app && Array.isArray(app.categories) ? app.categories : [];
      var verOk = /^\d+\.\d+(\.\d+)?$/.test(ver);
      var catsOk = appCats.length > 0 && appCats.every(function (c) { return cats.indexOf(c) !== -1; });
      tests.push(verOk && catsOk
        ? pass(idBase + '-version', 'store-catalog', (app.name || slug) + ' version and categories', ver + ' · ' + appCats.join(', '))
        : fail(idBase + '-version', 'store-catalog', (app.name || slug) + ' version and categories', 'version=' + ver + ' categories=' + appCats.join(',')));
      var tag = app && app.tagline ? String(app.tagline).trim() : '';
      tests.push(tag.length >= 8
        ? pass(idBase + '-tagline', 'store-catalog', (app.name || slug) + ' has a tagline', '')
        : fail(idBase + '-tagline', 'store-catalog', (app.name || slug) + ' has a tagline', 'length ' + tag.length));
      var sha = app && app.sha256 ? String(app.sha256) : '';
      var bytes = app && typeof app.bytes === 'number' ? app.bytes : 0;
      var cover = app && app.cover ? String(app.cover) : '';
      var artOk = /^[a-f0-9]{64}$/i.test(sha) && bytes >= 1000 && cover.indexOf('/apps/' + slug + '/') === 0;
      tests.push(artOk
        ? pass(idBase + '-artifact', 'store-catalog', (app.name || slug) + ' hash, size, and cover', bytes + ' bytes')
        : fail(idBase + '-artifact', 'store-catalog', (app.name || slug) + ' hash, size, and cover', 'sha=' + sha.slice(0, 12) + ' bytes=' + bytes + ' cover=' + cover));
    });
    return tests;
  }

  function gifTests(apps, heads) {
    return apps.map(function (app, i) {
      var slug = app.slug;
      var head = heads[i] || {};
      var name = (app.name || slug) + ' GIF is published';
      var id = 'store-' + slug + '-gif';
      if (head.error) return fail(id, 'store-gif', name, head.error);
      var len = head.length == null ? NaN : Number(head.length);
      var typeOk = /image\/gif/i.test(head.type || '');
      var sizeOk = len === app.bytes;
      if (head.status === 200 && typeOk && sizeOk) return pass(id, 'store-gif', name, String(len));
      return fail(id, 'store-gif', name, 'HTTP ' + head.status + ' type=' + (head.type || '') + ' length=' + head.length + ' catalog=' + app.bytes);
    });
  }

  function includesTests(suite, html, rows) {
    return rows.map(function (row) {
      var ok = html.indexOf(row.needle) !== -1;
      return ok
        ? pass(row.id, suite, row.name, '')
        : fail(row.id, suite, row.name, 'missing ' + JSON.stringify(row.needle).slice(0, 120));
    });
  }

  function meetNeedles(prefix) {
    var rows = [
      ['lobby-start', 'Lobby offers Start a call', 'Start a call'],
      ['lobby-anyone', 'Start a call says anyone with the link can join', 'Anyone with the link can join'],
      ['lobby-host', 'Lobby offers Host this call', 'Host this call'],
      ['lobby-join', 'Lobby offers Join a link', 'Join a link'],
      ['lobby-town', 'Lobby offers Start a town hall', 'Start a town hall'],
      ['lobby-stream', 'Lobby offers Stream to friends', 'Stream to friends'],
      ['lobby-muted', 'Lobby says you join muted with the camera off', 'You join muted, with the camera off'],
      ['lobby-appear', 'Lobby has a name and picture row', "This is how you'll appear"],
      ['dock-video', 'Dock has the video control', 'id="cam"'],
      ['dock-mic', 'Dock has the unmute control', 'id="mic"'],
      ['dock-react', 'Dock has Reactions', 'id="reactbtn"'],
      ['dock-chat', 'Dock has Chat', 'id="chatbtn"'],
      ['dock-cc', 'Dock has captions', 'id="ccdock"'],
      ['dock-share', 'Dock has Share screen', 'Share screen'],
      ['dock-more', 'Dock has More', 'id="bartoggle"'],
      ['dock-leave', 'Dock has Leave', 'id="leavebtn"'],
      ['leave-ask', 'Leave asks Leave the meeting?', 'Leave the meeting?'],
      ['fit', 'Fit / Scroll control is on the page', 'id="fitbtn"'],
      ['fit-label', 'Fit button starts as Fit', '>▦ Fit<'],
      ['more-hand', 'More menu has Hand', 'id="hand"'],
      ['more-captions', 'More menu has Captions', 'id="ccbtn"'],
      ['more-people', 'More menu has People', 'id="whobtn"'],
      ['more-transcript', 'More menu has Transcript', 'id="trbtn"'],
      ['more-questions', 'More menu has Questions', 'id="qabtn"'],
      ['blur-max', 'Blur offers Max', 'id="blur-max"'],
      ['blur-min', 'Blur offers Min', 'id="blur-min"'],
      ['blur-none', 'Blur offers No blur', 'No blur'],
      ['self-tile', 'Your video offers Tile', 'data-self-arr="tile"'],
      ['self-float', 'Your video offers Float', 'data-self-arr="float"'],
      ['self-strip', 'Your video offers Strip', 'data-self-arr="strip"'],
      ['self-hide', 'Your video offers Hide', 'data-self-arr="hidden"'],
      ['room-password', 'Room menu has Password', 'id="pwbtn"'],
      ['room-record', 'Room menu has Record', 'id="recbtn"'],
      ['room-stage', 'Room menu has Stage', 'id="stagebtn"'],
      ['room-run-app', 'Room menu has Run app', 'id="appbtn"'],
      ['settings-btn', 'More menu has Settings', 'id="setbtn"'],
      ['settings-title', 'Settings button describes meeting settings', 'Meeting settings'],
      ['help-title', 'Meeting help is titled How this meeting works', 'How this meeting works'],
      ['help-stage', 'Meeting help names the Stage', '<b>Stage</b>'],
      ['help-row', 'Meeting help names the Row', '<b>Row</b>'],
      ['help-stadium', 'Meeting help names the stadium', 'the stadium'],
      ['share-sheet', 'Share sheet is titled Share your screen', 'Share your screen'],
      ['share-choose', 'Share sheet can choose what to share', 'Choose what to share'],
      ['share-run-app', 'Share sheet offers Run app instead', 'Run app instead'],
      ['share-no-tab-audio', 'Share sheet says shared-tab sound does not travel', 'Sound from the shared tab'],
      ['vq-auto', 'Settings lists Auto video quality', 'data-vq=""'],
      ['vq-1080', 'Settings lists 1080p', '>1080p<'],
      ['vq-720', 'Settings lists 720p', '>720p<'],
      ['vq-480', 'Settings lists 480p', '>480p<'],
      ['vq-360', 'Settings lists 360p', '>360p<'],
      ['vq-240', 'Settings lists 240p', '>240p<'],
      ['vq-144', 'Settings lists 144p', '>144p<'],
      ['mix', 'Settings has the sound mix', 'id="mixpanel"'],
      ['timing-talk', 'Timing offers Conversation', 'data-timing="chat"'],
      ['timing-unison', 'Timing offers Unison', 'data-timing="unison"'],
      ['timing-song', 'Timing offers Song', 'data-timing="song"'],
      ['keys', 'Settings and help has Keys', 'id="keysbtn"'],
      ['transcript-download', 'Transcript panel can download the transcript', 'id="trdl"'],
      ['people-download', 'People panel can download its list', 'id="who-dl"'],
      ['host-mute', 'Host tools include Mute guests', 'Mute guests'],
      ['host-blur', 'Host tools include Blur guests', 'Blur guests'],
      ['host-video-off', 'Host tools include Turn video off', 'Turn video off'],
      ['host-share', 'Host tools include Allow screen share', 'Allow screen share'],
      ['run-app-sheet', 'Run app sheet is present', 'Run an app in this meeting'],
      ['rejoin', 'After leaving, Rejoin is offered', 'id="left-rejoin"'],
      ['you-left', 'After leaving, the page says You left', '>You left<'],
      ['cast-link', 'A broadcast tells people how they watch', 'People watch with this link'],
      ['debug-flag', 'The page honors a debug=on address flag', 'gifos_debug']
    ];
    return rows.map(function (r) {
      return { id: prefix + r[0], name: r[1], needle: r[2] };
    });
  }

  function settingsDebugTest(id, html) {
    var start = html.indexOf('id="set-modal"');
    var end = html.indexOf('id="share-modal"', start);
    var chunk = start === -1 ? '' : html.slice(start, end > start ? end : start + 25000);
    var hasDebug = /debug/i.test(chunk);
    var hasDownload = /download/i.test(chunk);
    var name = 'Meet Settings contains the debug switch and a download';
    if (!chunk) return fail(id, 'meet-settings', name, 'Settings dialog was not in the meeting page');
    if (hasDebug && hasDownload) return pass(id, 'meet-settings', name, 'found in the Settings dialog');
    return fail(id, 'meet-settings', name, 'Settings dialog has debug=' + hasDebug + ' download=' + hasDownload + '. Open More → Settings on a live meeting and use the debug switch and its download. This check looked only inside that dialog.');
  }

  function homeMenuTests(js) {
    var needles = [
      ['home-about', 'GifOS menu includes About GifOS', 'About GifOS'],
      ['home-store', 'GifOS menu includes App Store', 'App Store…'],
      ['home-arrange', 'GifOS menu includes Arrange icons', 'Arrange icons…'],
      ['home-backup', 'GifOS menu includes Back up Home Screen', 'Back up Home Screen…'],
      ['home-restore', 'GifOS menu includes Restore from backup', 'Restore from backup…'],
      ['home-trash', 'GifOS menu includes Empty Trash', 'Empty Trash'],
      ['home-settings', 'GifOS menu includes Settings', 'Settings…'],
      ['home-name', 'Settings includes Your name', 'Your name'],
      ['home-look', 'Settings includes Background and text', 'Background and text'],
      ['home-ai', 'Settings includes AI', '>AI<'],
      ['home-accounts', 'Settings includes Connected accounts', 'Connected accounts'],
      ['home-pay', 'Settings includes Payments', '>Payments<'],
      ['home-system', 'Settings includes System', '>System<'],
      ['home-storage', 'System includes Storage', '>Storage<'],
      ['home-updates', 'System includes Updates', '>Updates<'],
      ['home-connection', 'System includes Invite connection', 'Invite connection'],
      ['home-erase', 'Erase this computer is present and not the top menu', 'Erase this computer']
    ];
    return includesTests('home-screen', js, needles.map(function (r) {
      return { id: r[0], name: r[1], needle: r[2] };
    }));
  }

  function versionTests(info) {
    var tests = [];
    var current = info && info.current;
    var versions = info && Array.isArray(info.versions) ? info.versions : [];
    var builds = info && info.builds && typeof info.builds === 'object' ? info.builds : {};
    tests.push(/^\d+\.\d+\.\d+$/.test(String(current || ''))
      ? pass('site-version-current', 'site', 'version.json current is a release number', String(current))
      : fail('site-version-current', 'site', 'version.json current is a release number', String(current)));
    tests.push(versions.indexOf(current) !== -1
      ? pass('site-version-listed', 'site', 'Current release is in the versions list', String(current))
      : fail('site-version-listed', 'site', 'Current release is in the versions list', versions.join(', ')));
    versions.forEach(function (v) {
      var ok = /^\d+\.\d+\.\d+$/.test(String(v));
      tests.push(ok
        ? pass('site-version-' + v, 'site', 'Published version ' + v + ' is named like a release', v)
        : fail('site-version-' + v, 'site', 'Published version ' + v + ' is named like a release', String(v)));
    });
    var build = builds[current];
    tests.push(typeof build === 'number' && build > 0
      ? pass('site-version-build', 'site', 'Current release maps to a build number', String(build))
      : fail('site-version-build', 'site', 'Current release maps to a build number', String(build)));
    return tests;
  }

  function liveDomTests(doc) {
    if (!doc || !doc.getElementById) return [];
    var tests = [];
    function has(id, suite, name) {
      tests.push(doc.getElementById(id)
        ? pass('live-' + id, suite, name, 'in the live document')
        : fail('live-' + id, suite, name, 'not in the live document'));
    }
    if (doc.getElementById('sys-menu-btn') || doc.getElementById('add-btn')) {
      has('sys-menu-btn', 'home-live', 'Live Home Screen has the GifOS menu button');
      has('add-btn', 'home-live', 'Live Home Screen has Add');
    }
    if (doc.getElementById('lobby') || doc.getElementById('set-modal') || doc.getElementById('leavebtn')) {
      ['lob-open', 'lob-th-btn', 'lob-stream', 'cam', 'mic', 'chatbtn', 'leavebtn', 'fitbtn', 'setbtn', 'sharebtn', 'appbtn', 'stagebtn'].forEach(function (id) {
        has(id, 'meet-live', 'Live meeting page has #' + id);
      });
      var modal = doc.getElementById('set-modal');
      var text = modal ? (modal.innerText || modal.textContent || '') : '';
      var html = modal ? modal.innerHTML : '';
      var ok = /debug/i.test(text + html) && /download/i.test(text + html);
      tests.push(ok
        ? pass('live-settings-debug', 'meet-settings', 'Live Settings dialog has the debug switch and a download', '')
        : fail('live-settings-debug', 'meet-settings', 'Live Settings dialog has the debug switch and a download', modal ? 'dialog text has no debug download' : 'Settings dialog missing'));
    }
    return tests;
  }

  async function run(opts) {
    opts = opts || {};
    var origin = opts.origin || ORIGIN;
    var started = new Date().toISOString();
    var tests = [];
    var onProgress = typeof opts.onProgress === 'function' ? opts.onProgress : function () {};

    var catalogP = textOf(origin + '/apps/index.json');
    var runP = textOf(origin + '/run');
    var homeP = textOf(origin + '/');
    var aboutP = textOf(origin + '/about');
    var storeP = textOf(origin + '/store');
    var supportP = textOf(origin + '/browser-support');
    var versionP = textOf(origin + '/version.json');
    var llmsP = textOf(origin + '/llms.txt');
    var desktopP = textOf(origin + '/js/desktop.js');

    var catalogRaw, runHtml, homeHtml, aboutHtml, storeHtml, supportHtml, versionRaw, llms, desktopJs;
    try {
      var got = await Promise.all([catalogP, runP, homeP, aboutP, storeP, supportP, versionP, llmsP, desktopP]);
      catalogRaw = got[0]; runHtml = got[1]; homeHtml = got[2]; aboutHtml = got[3];
      storeHtml = got[4]; supportHtml = got[5]; versionRaw = got[6]; llms = got[7]; desktopJs = got[8];
    } catch (e) {
      return finish(started, [fail('site-fetch', 'site', 'Live site responded', e.message)], origin);
    }

    var catalog;
    try { catalog = JSON.parse(catalogRaw.text); }
    catch (e) { catalog = null; }
    tests = tests.concat(catalogTests(catalog));
    onProgress({ phase: 'catalog', done: tests.length });

    var apps = catalog && Array.isArray(catalog.apps) ? catalog.apps : [];
    var listings = await pool(apps, 8, async function (app) {
      var listing = await textOf(origin + '/apps/' + app.slug + '/app.json');
      var body = JSON.parse(listing.text);
      var gif = body && body.gif ? String(body.gif) : '';
      var url = gif.indexOf('https://') === 0 ? gif : (gif.charAt(0) === '/' ? origin + gif : '');
      if (!url) return { error: 'app.json has no gif path' };
      var head = await headOf(url);
      head.via = url.indexOf(origin) === 0 ? 'site' : 'listed-url';
      return head;
    });
    tests = tests.concat(gifTests(apps, listings));
    onProgress({ phase: 'gifs', done: tests.length });

    tests = tests.concat(includesTests('meet', runHtml.text, meetNeedles('meet-')));
    tests.push(settingsDebugTest('meet-settings-debug-download', runHtml.text));

    var info;
    try { info = JSON.parse(versionRaw.text); }
    catch (e) { info = null; }
    tests = tests.concat(versionTests(info));
    if (info && info.current) {
      try {
        var snap = await headOf(origin + '/versions/' + info.current + '/run.html');
        tests.push(snap.status === 200
          ? pass('site-snapshot-run', 'site', 'Published release still serves its meeting page', snap.url)
          : fail('site-snapshot-run', 'site', 'Published release still serves its meeting page', 'HTTP ' + snap.status));
        var snapHtml = await textOf(origin + '/versions/' + info.current + '/run');
        tests = tests.concat(includesTests('meet-release', snapHtml.text, meetNeedles('release-')));
        tests.push(settingsDebugTest('release-settings-debug-download', snapHtml.text));
      } catch (e) {
        tests.push(fail('site-snapshot-run', 'site', 'Published release still serves its meeting page', e.message));
      }
    }

    tests = tests.concat(homeMenuTests(desktopJs.text));
    tests = tests.concat(includesTests('site', homeHtml.text, [
      { id: 'home-title', name: 'Home page title names GifOS', needle: 'GifOS' },
      { id: 'home-menu-btn', name: 'Home page has the GifOS menu button', needle: 'id="sys-menu-btn"' },
      { id: 'home-add', name: 'Home page has Add', needle: 'id="add-btn"' },
      { id: 'home-channel', name: 'Home page carries the release channel loader', needle: 'GIFOS_VERSION' },
      { id: 'home-meet-route', name: 'Channel loader knows meet links', needle: 'meet|cast' },
      { id: 'home-cast-route', name: 'Channel loader knows cast links', needle: '\\/cast\\/' },
      { id: 'home-join-route', name: 'Channel loader knows join links', needle: '(?:join|meet|cast)' },
      { id: 'home-versions', name: 'Channel loader knows published /versions/ snapshots', needle: '/versions/' }
    ]));
    tests = tests.concat(includesTests('site', aboutHtml.text, [
      { id: 'about-title', name: 'About page asks what GifOS is', needle: 'What is GifOS' },
      { id: 'about-gif', name: 'About page says apps are GIFs', needle: 'GIF' },
      { id: 'about-meet', name: 'About page describes meetings', needle: 'Meeting' },
      { id: 'about-store', name: 'About page links to the store', needle: '/store' },
      { id: 'about-source', name: 'About page links to the public site repo', needle: 'github.com/nwcnwc/gifos-app' },
      { id: 'about-support', name: 'About page has a contact line', needle: 'id="gifos-contact"' }
    ]));
    tests = tests.concat(includesTests('store-page', storeHtml.text, [
      { id: 'store-heading', name: 'Store page says apps are GIFs', needle: 'Apps that are' },
      { id: 'store-search', name: 'Store page has app search', needle: 'Search apps' },
      { id: 'store-install-free', name: 'Store page says installing is free', needle: 'Installing is free' },
      { id: 'store-home', name: 'Store page links back to the Home Screen', needle: 'Home Screen' }
    ]));
    tests = tests.concat(includesTests('help', supportHtml.text, [
      { id: 'support-title', name: 'Browser support page is titled Which browsers work', needle: 'Which browsers work' },
      { id: 'support-meet', name: 'Browser support page talks about meetings', needle: 'meeting' },
      { id: 'support-broadcast', name: 'Browser support page talks about broadcasts', needle: 'broadcast' }
    ]));
    tests = tests.concat(includesTests('help', llms.text, [
      { id: 'llms-site', name: 'llms.txt names gifos.app', needle: 'gifos.app' },
      { id: 'llms-meeting', name: 'llms.txt points video chat at the built-in Meeting', needle: 'Meeting' },
      { id: 'llms-store', name: 'llms.txt mentions the store', needle: 'store' }
    ]));

    var named = {
      '2048': '2048',
      'chess-grandmaster': 'Chess Grandmaster',
      'excalidraw': 'Excalidraw',
      'monkeytype': 'Monkeytype',
      'qr-code': 'QR Code',
      'solitaire': 'Solitaire',
      'meeting-bot': 'Meeting Bot'
    };
    Object.keys(named).forEach(function (slug) {
      var app = apps.filter(function (a) { return a.slug === slug; })[0];
      var expect = named[slug];
      tests.push(app && app.name === expect
        ? pass('store-named-' + slug, 'store-named', 'Catalog name for ' + slug, expect)
        : fail('store-named-' + slug, 'store-named', 'Catalog name for ' + slug, app ? app.name : 'missing'));
    });

    if (opts.document !== false) {
      var doc = opts.document || (typeof document !== 'undefined' ? document : null);
      tests = tests.concat(liveDomTests(doc));
    }

    return finish(started, tests, origin);
  }

  function finish(started, tests, origin) {
    var passN = 0, failN = 0;
    tests.forEach(function (t) { if (t.ok) passN++; else failN++; });
    return {
      product: 'gifos-test-harness',
      target: origin,
      started: started,
      finished: new Date().toISOString(),
      summary: { total: tests.length, pass: passN, fail: failN, blocked: 0 },
      tests: tests
    };
  }

  var api = { run: run, liveDomTests: liveDomTests, ORIGIN: ORIGIN };
  root.gifosHarness = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof module === 'object' && require.main === module) {
    run({ document: false }).then(function (report) {
      var lines = report.tests.filter(function (t) { return !t.ok; }).map(function (t) {
        return 'FAIL ' + t.id + ' — ' + t.detail;
      });
      console.log(JSON.stringify(report.summary));
      console.log(lines.slice(0, 40).join('\n'));
      if (lines.length > 40) console.log('… ' + (lines.length - 40) + ' more failures');
    }).catch(function (e) {
      console.error(e);
      process.exit(1);
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
