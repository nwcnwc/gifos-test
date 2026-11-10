/*
 * export-meet-debug.js — optional agent helper, not the human debug log.
 *
 * People download the debug log from the meeting itself: More → Settings,
 * the debug switch, then the download in that dialog. This file is only for
 * an agent that already has the meeting page console open and wants a
 * newline-delimited sample of window.__gifosVideo.
 *
 * On the meeting page, open DevTools (F12 or Option-Command-I), open the
 * Console, paste this whole file, and press Enter. It samples for 60 seconds,
 * or until you run gifosExportDebug.stop(). The file is meet-debug.ndjson
 * (meet-debug.ndjson.gz when the text is very large).
 *
 *   gifosExportDebug({ seconds: 180, intervalMs: 2000 })
 *
 * Run it while the room is still up. Leave the room after the file downloads.
 * The script strips network addresses, room and invite links, and fields whose
 * names look like passwords. It does not read payment data or localStorage.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof window === 'undefined') return;
  window.gifosExportDebug = function (opts) { return api.start(opts); };
  window.gifosExportDebug.stop = function () { return api.stop(); };
  window.gifosExportDebug.redact = api.redact;
  if (window.__gifosVideo && !window.__gifosExportDebugActive) api.start();
  else if (!window.__gifosVideo) {
    console.warn('GifOS Meet debug export: window.__gifosVideo is not on this page. Open a meeting, broadcast, or town hall on https://gifos.app and paste this file there.');
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var active = null;

  function redactString(s) {
    var t = String(s);
    t = t.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, '[ip]');
    t = t.replace(/\b(?:[A-Fa-f0-9]{1,4}:){2,7}[A-Fa-f0-9:]{0,4}\b/g, '[ip]');
    t = t.replace(/([?&#](?:v|j|s|av|room|code)=)[^&#\s]+/gi, '$1REDACTED');
    t = t.replace(/(\/(?:meet|cast|join)\/)[A-Za-z0-9-]{1,64}/g, '$1REDACTED');
    t = t.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]');
    if (t.length > 8000) t = t.slice(0, 8000) + '…';
    return t;
  }

  var SECRET_KEY = /password|passwd|secret|token|cookie|authorization|credential/i;

  function redact(value, depth) {
    if (depth === undefined) depth = 0;
    if (value == null) return value;
    if (typeof value === 'string') return redactString(value);
    if (typeof value === 'number' || typeof value === 'boolean') return value;
    if (depth > 8) return '[max-depth]';
    if (Array.isArray(value)) {
      var arr = [];
      var n = Math.min(value.length, 80);
      for (var i = 0; i < n; i++) arr.push(redact(value[i], depth + 1));
      if (value.length > n) arr.push('[+' + (value.length - n) + ' more]');
      return arr;
    }
    if (typeof value === 'object') {
      var out = {};
      var keys = Object.keys(value);
      var m = Math.min(keys.length, 80);
      for (var k = 0; k < m; k++) {
        var key = keys[k];
        if (key === 'ip' || key === 'ips' || SECRET_KEY.test(key)) out[key] = '[redacted]';
        else out[key] = redact(value[key], depth + 1);
      }
      if (keys.length > m) out._truncatedKeys = keys.length - m;
      return out;
    }
    return redactString(value);
  }

  function badge() {
    try {
      var el = document.getElementById('gifos-build-float') || document.getElementById('build-badge');
      return el ? String(el.textContent || '').trim() : '';
    } catch (e) { return ''; }
  }

  function call(name) {
    var v = (typeof window !== 'undefined') ? window.__gifosVideo : null;
    if (!v || typeof v[name] !== 'function') return { missing: name };
    try { return redact(v[name]()); }
    catch (e) { return { error: redactString(e && e.message ? e.message : e) }; }
  }

  function sample() {
    var line = {
      t: new Date().toISOString(),
      kind: 'sample',
      debugDump: call('debugDump'),
      pairs: call('pairs'),
      monInfo: call('monInfo'),
      stageInfo: call('stageInfo'),
      screenInfo: call('screenInfo'),
      grid: call('grid'),
      statusPlane: call('statusPlane')
    };
    return line;
  }

  function meta() {
    var href = '';
    try { href = redactString(String(location.href)); } catch (e) {}
    var ua = '';
    try { ua = navigator.userAgent; } catch (e) {}
    return {
      t: new Date().toISOString(),
      kind: 'meta',
      product: 'gifos-meet',
      exporter: 'gifos-test/export-meet-debug',
      build: badge(),
      href: href,
      ua: ua
    };
  }

  function hookConsole(bucket) {
    if (typeof console === 'undefined' || console.__gifosExportHook) return function () {};
    var orig = console.log;
    console.log = function () {
      try {
        var parts = [];
        for (var i = 0; i < arguments.length; i++) parts.push(typeof arguments[i] === 'string' ? arguments[i] : JSON.stringify(arguments[i]));
        var text = parts.join(' ');
        if (text.indexOf('[clog]') !== -1 && bucket.length < 4000) {
          bucket.push({ t: new Date().toISOString(), kind: 'clog', line: redactString(text) });
        }
      } catch (e) {}
      return orig.apply(console, arguments);
    };
    console.__gifosExportHook = true;
    return function () {
      console.log = orig;
      try { delete console.__gifosExportHook; } catch (e) { console.__gifosExportHook = false; }
    };
  }

  function download(filename, blob) {
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 4000);
  }

  function finish(state) {
    if (!state || state.done) return;
    state.done = true;
    if (state.timer) clearInterval(state.timer);
    if (state.unhook) state.unhook();
    if (typeof state.mergeClogs === 'function') {
      var merge = state.mergeClogs;
      state.mergeClogs = null;
      merge();
    }
    if (active === state) active = null;
    try { window.__gifosExportDebugActive = false; } catch (e) {}
    state.lines.push(sample());
    state.samples++;
    state.lines.push({ t: new Date().toISOString(), kind: 'end', samples: state.samples });
    var text = state.lines.map(function (row) { return JSON.stringify(row); }).join('\n') + '\n';
    var name = 'meet-debug.ndjson';
    var blob;
    var huge = text.length > 1500000 && typeof CompressionStream === 'function';
    if (!huge) {
      blob = new Blob([text], { type: 'application/x-ndjson' });
      download(name, blob);
      console.log('GifOS Meet debug log saved: ' + name + ' (' + text.length + ' characters). Move it next to REPORT.md.');
      return;
    }
    var stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
    new Response(stream).blob().then(function (gz) {
      download('meet-debug.ndjson.gz', gz);
      console.log('GifOS Meet debug log saved: meet-debug.ndjson.gz');
    }).catch(function () {
      download(name, new Blob([text], { type: 'application/x-ndjson' }));
      console.log('GifOS Meet debug log saved: ' + name);
    });
  }

  function start(opts) {
    if (typeof window === 'undefined' || !window.__gifosVideo) {
      var err = new Error('window.__gifosVideo is missing. Paste this file into the console of an open GifOS Meet page on https://gifos.app.');
      if (typeof console !== 'undefined') console.warn(err.message);
      throw err;
    }
    if (active) finish(active);
    opts = opts || {};
    var seconds = Math.max(5, Math.min(900, Number(opts.seconds) || 60));
    var intervalMs = Math.max(500, Math.min(15000, Number(opts.intervalMs) || 2000));
    var lines = [];
    var clogs = [];
    lines.push(meta());
    lines.push(sample());
    var state = { lines: lines, samples: 1, done: false, timer: 0, unhook: hookConsole(clogs) };
    // Clog lines are merged at the end so the sample cadence stays stable.
    var origFinish = finish;
    state.mergeClogs = function () {
      for (var i = 0; i < clogs.length; i++) lines.push(clogs[i]);
    };
    active = state;
    try { window.__gifosExportDebugActive = true; } catch (e) {}
    state.timer = setInterval(function () {
      if (state.done) return;
      lines.push(sample());
      state.samples++;
    }, intervalMs);
    setTimeout(function () { origFinish(state); }, seconds * 1000);
    console.log('GifOS Meet debug capture started for ' + seconds + 's. Run gifosExportDebug.stop() to finish now. debug=on in the page address also prints [clog] lines, which this capture keeps.');
    return {
      stop: function () { origFinish(state); }
    };
  }

  function stop() {
    finish(active);
  }

  return { start: start, stop: stop, redact: redact, redactString: redactString };
});
