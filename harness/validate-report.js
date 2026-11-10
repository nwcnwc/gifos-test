#!/usr/bin/env node
/*
 * validate-report.js — check a GifOS test report folder.
 *
 *   node harness/validate-report.js results/2026-11-09-meet-create-join-octocat
 *   node harness/validate-report.js --self-test
 *
 * A folder passes when REPORT.md is filled in and the log looks like a real
 * export: meet-debug.ndjson or meet-debug.ndjson.gz for Meet, Cast, town hall,
 * and join assignments; log.txt is enough for Home Screen, store, help, and
 * payments assignments. Blocked runs may omit the log.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const HEADINGS = [
  '## Environment',
  '## Assignment',
  '## Steps',
  '## Expected',
  '## Actual',
  '## Result',
  '## Bugs',
];
const PLACEHOLDERS = [
  'FILL THIS',
  'Write what you saw here.',
  'PASTE THE LOG',
  '<assignment-id>',
  'YOUR-HANDLE',
];

function assignmentId(text) {
  var m = text.match(/^\s*-\s*Id:\s*`([a-z0-9][a-z0-9-]{0,80})`\s*$/m);
  return m ? m[1] : null;
}

function resultOf(text) {
  var parts = text.split(/^## Result\s*$/m);
  if (parts.length < 2) return null;
  var section = parts[1].split(/^## /m)[0];
  var m = section.match(/\b(pass|fail|blocked)\b/i);
  return m ? m[1].toLowerCase() : null;
}

function needsMeetLog(id) {
  return /^(meet|cast|town|join)-/.test(id);
}

function catalogSlugs() {
  var file = path.join(ROOT, 'assignments', 'store-catalog.md');
  if (!fs.existsSync(file)) return null;
  var text = fs.readFileSync(file, 'utf8');
  var slugs = new Set();
  var re = /^- `([a-z0-9][a-z0-9-]*)` —/gm;
  var m;
  while ((m = re.exec(text))) slugs.add(m[1]);
  return slugs;
}

function parseNdjson(text) {
  var errors = [];
  var lines = text.split(/\r?\n/).filter(function (l) { return l.trim().length > 0; });
  if (lines.length < 2) errors.push('fewer than 2 JSON lines');
  var meta = 0;
  var dump = 0;
  for (var i = 0; i < lines.length; i++) {
    var obj;
    try { obj = JSON.parse(lines[i]); }
    catch (e) {
      errors.push('line ' + (i + 1) + ' is not JSON');
      continue;
    }
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      errors.push('line ' + (i + 1) + ' is not a JSON object');
      continue;
    }
    if (obj.kind === 'meta' && obj.product === 'gifos-meet' && obj.exporter === 'gifos-test/export-meet-debug') meta++;
    var dumpObj = obj.debugDump;
    if (obj.kind === 'sample' && dumpObj && typeof dumpObj === 'object' && dumpObj.me && typeof dumpObj.me === 'object') dump++;
  }
  if (!meta) errors.push('no meta line from gifos-test/export-meet-debug');
  if (!dump) errors.push('no sample line whose debugDump.me is an object');
  return errors;
}

function readMaybeGzip(file) {
  var buf = fs.readFileSync(file);
  var errors = [];
  var gzName = file.endsWith('.gz');
  var gzMagic = buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b;
  if (gzName && !gzMagic) errors.push('name ends in .gz but the bytes are not gzip');
  var text;
  if (gzName || gzMagic) {
    try { text = zlib.gunzipSync(buf).toString('utf8'); }
    catch (e) {
      errors.push('gzip did not decompress');
      return { errors: errors, text: '' };
    }
  } else {
    text = buf.toString('utf8');
  }
  if (Buffer.byteLength(text) < 800 && buf.length < 800) errors.push('under 800 bytes (' + buf.length + ' on disk, ' + Buffer.byteLength(text) + ' of text)');
  else if (Buffer.byteLength(text) < 800) errors.push('decompressed log is under 800 bytes (' + Buffer.byteLength(text) + ')');
  if (text.indexOf('\0') !== -1) errors.push('log contains NUL bytes; this kit wants text ndjson, not a recording');
  return { errors: errors, text: text };
}

function privacyHits(text) {
  var hits = [];
  var scrubbed = text
    .replace(/\/(?:meet|cast|join)\/REDACTED\b/g, '/')
    .replace(/([?&#](?:v|j|s|av|room|code)=)REDACTED\b/gi, '$1')
    .replace(/\[ip\]/g, '')
    .replace(/\[email\]/g, '')
    .replace(/\[redacted\]/g, '');
  if (/\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/.test(scrubbed)) hits.push('contains an IPv4 address');
  if (/\b(?:[A-Fa-f0-9]{1,4}:){2,7}[A-Fa-f0-9:]{0,4}\b/.test(scrubbed)) hits.push('contains an IPv6 address');
  if (/\/(?:meet|cast|join)\/[A-Za-z0-9-]{6,}/.test(scrubbed)) hits.push('contains a meeting, cast, or join link');
  if (/[?&#](?:v|j|s)=[A-Za-z0-9-]{4,}/.test(scrubbed)) hits.push('contains a room id in a URL');
  if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(scrubbed.replace(/info@crowdconceptsinc\.com/g, '').replace(/support@gifos\.app/g, ''))) {
    hits.push('contains an email address other than the public results and support addresses');
  }
  return hits;
}

function validateDir(dir) {
  var errors = [];
  var warnings = [];
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return { ok: false, errors: ['not a directory: ' + dir], warnings: warnings };
  }
  var reportPath = path.join(dir, 'REPORT.md');
  if (!fs.existsSync(reportPath)) {
    return { ok: false, errors: ['missing REPORT.md'], warnings: warnings };
  }
  var report = fs.readFileSync(reportPath, 'utf8');
  if (report.trim().length < 200) errors.push('REPORT.md is under 200 characters');
  HEADINGS.forEach(function (h) {
    if (report.indexOf(h) === -1) errors.push('REPORT.md missing heading ' + h);
  });
  PLACEHOLDERS.forEach(function (mark) {
    if (report.indexOf(mark) !== -1) errors.push('REPORT.md still contains placeholder ' + JSON.stringify(mark));
  });
  var id = assignmentId(report);
  if (!id) errors.push('REPORT.md needs a line "- Id: `assignment-id`" under ## Assignment');
  var result = resultOf(report);
  if (!result) errors.push('## Result must include pass, fail, or blocked');
  if (id) {
    var known = path.join(ROOT, 'assignments', id + '.md');
    var slugMatch = /^store-app-([a-z0-9][a-z0-9-]*)$/.exec(id);
    if (id === 'store-app-any' || fs.existsSync(known)) {
      /* listed assignment */
    } else if (slugMatch) {
      var slugs = catalogSlugs();
      if (slugs && !slugs.has(slugMatch[1])) errors.push('store slug is not in assignments/store-catalog.md: ' + slugMatch[1]);
    } else if (!fs.existsSync(known)) {
      warnings.push('no assignments/' + id + '.md; use an id from assignments/README.md');
    }
  }

  var names = fs.readdirSync(dir);
  var meetLogs = names.filter(function (n) { return /^(meet-debug|debug)\.ndjson(\.gz)?$/.test(n); });
  var plain = names.indexOf('log.txt') !== -1;
  var blocked = result === 'blocked';
  if (id && needsMeetLog(id) && !blocked) {
    if (!meetLogs.length) errors.push('this assignment needs meet-debug.ndjson or meet-debug.ndjson.gz');
  } else if (!blocked && !meetLogs.length && !plain) {
    errors.push('need meet-debug.ndjson or log.txt');
  }
  meetLogs.forEach(function (name) {
    var loaded = readMaybeGzip(path.join(dir, name));
    loaded.errors.forEach(function (e) { errors.push(name + ': ' + e); });
    if (loaded.text) {
      parseNdjson(loaded.text).forEach(function (e) { errors.push(name + ': ' + e); });
      privacyHits(loaded.text).forEach(function (e) { errors.push(name + ': ' + e); });
    }
  });
  if (plain && !blocked) {
    var logText = fs.readFileSync(path.join(dir, 'log.txt'), 'utf8');
    if (logText.trim().length < 400) errors.push('log.txt is under 400 characters');
    PLACEHOLDERS.forEach(function (mark) {
      if (logText.indexOf(mark) !== -1) errors.push('log.txt still contains placeholder ' + JSON.stringify(mark));
    });
    privacyHits(logText).forEach(function (e) { errors.push('log.txt: ' + e); });
  }
  privacyHits(report).forEach(function (e) { errors.push('REPORT.md: ' + e); });

  names.forEach(function (name) {
    if (/\.(webm|mp4|mkv|mov|key|pem|p12|zip)$/i.test(name)) {
      errors.push('do not include ' + name + ' (recordings, keys, and archives stay off this repo)');
    }
  });

  return { ok: errors.length === 0, errors: errors, warnings: warnings, id: id, result: result };
}

function writeFile(dir, name, body) {
  fs.writeFileSync(path.join(dir, name), body);
}

function sampleNdjson(extraDump) {
  var meta = {
    t: '2026-11-09T00:00:00.000Z',
    kind: 'meta',
    product: 'gifos-meet',
    exporter: 'gifos-test/export-meet-debug',
    build: 'v0.9.24 · build 3930',
    href: 'https://gifos.app/meet/REDACTED',
    ua: 'test'
  };
  var dump = extraDump || {
    me: { peer: 'abc', name: 'A', coord: '0/0.0' },
    participants: 1,
    mosaic: { note: 'fixture ' + 'pad '.repeat(180) }
  };
  var sample = { t: '2026-11-09T00:00:02.000Z', kind: 'sample', debugDump: dump, pairs: [] };
  var end = { t: '2026-11-09T00:00:03.000Z', kind: 'end', samples: 1 };
  return JSON.stringify(meta) + '\n' + JSON.stringify(sample) + '\n' + JSON.stringify(end) + '\n';
}

function goodReport(id) {
  return [
    '# GifOS test report',
    '',
    '## Environment',
    '- Date: 2026-11-09',
    '- Tester: octocat',
    '- Build badge: v0.9.24 · build 3930',
    '- Browser: Chrome 130 on Linux',
    '- URL shape: https://gifos.app/ (published release)',
    '- Devices: one laptop',
    '',
    '## Assignment',
    '- Id: `' + id + '`',
    '- Title: sample',
    '',
    '## Steps',
    '1. Opened the live site and followed the assignment.',
    '2. Wrote down the build badge before judging the result.',
    '',
    '## Expected',
    'The product behaves as the assignment describes.',
    '',
    '## Actual',
    'It did, on this run. No extra windows and no error text.',
    '',
    '## Result',
    'pass',
    '',
    '## Bugs',
    'None.',
    '',
    '## Notes',
    'Self-test fixture.',
    ''
  ].join('\n');
}

function selfTest() {
  var tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gifos-report-'));
  var failures = [];
  function check(name, dir, expectOk) {
    var out = validateDir(dir);
    if (out.ok !== expectOk) {
      failures.push(name + ' expected ok=' + expectOk + ' got ' + out.ok + ' ' + JSON.stringify(out.errors));
    }
  }

  var passDir = path.join(tmp, 'pass');
  fs.mkdirSync(passDir);
  writeFile(passDir, 'REPORT.md', goodReport('meet-create-join'));
  writeFile(passDir, 'meet-debug.ndjson', sampleNdjson());
  check('good ndjson', passDir, true);

  var gzDir = path.join(tmp, 'gz');
  fs.mkdirSync(gzDir);
  writeFile(gzDir, 'REPORT.md', goodReport('cast-stream'));
  fs.writeFileSync(path.join(gzDir, 'meet-debug.ndjson.gz'), zlib.gzipSync(Buffer.from(sampleNdjson())));
  check('gzip ndjson', gzDir, true);

  var badDir = path.join(tmp, 'bad');
  fs.mkdirSync(badDir);
  writeFile(badDir, 'REPORT.md', goodReport('meet-create-join'));
  writeFile(badDir, 'meet-debug.ndjson', '{"kind":"meta"}\n{"kind":"sample"}\n' + 'x'.repeat(900));
  check('shallow ndjson rejected', badDir, false);

  var leakDir = path.join(tmp, 'leak');
  fs.mkdirSync(leakDir);
  var leakReport = goodReport('meet-two-people').replace('https://gifos.app/ (published release)', 'https://gifos.app/meet/amber-room-1');
  writeFile(leakDir, 'REPORT.md', leakReport);
  writeFile(leakDir, 'meet-debug.ndjson', sampleNdjson());
  check('room link rejected', leakDir, false);

  var storeDir = path.join(tmp, 'store');
  fs.mkdirSync(storeDir);
  writeFile(storeDir, 'REPORT.md', goodReport('store-browse-launch'));
  writeFile(storeDir, 'log.txt', 'Opened https://gifos.app/store and searched.\n'.repeat(20));
  check('store log.txt', storeDir, true);

  var blockedDir = path.join(tmp, 'blocked');
  fs.mkdirSync(blockedDir);
  writeFile(blockedDir, 'REPORT.md', goodReport('meet-larger-room').replace('\npass\n', '\nblocked\n'));
  check('blocked without log', blockedDir, true);

  var emptyDir = path.join(tmp, 'empty');
  fs.mkdirSync(emptyDir);
  writeFile(emptyDir, 'REPORT.md', '# stub\n');
  check('stub report', emptyDir, false);

  var slugDir = path.join(tmp, 'slug');
  fs.mkdirSync(slugDir);
  writeFile(slugDir, 'REPORT.md', goodReport('store-app-not-a-real-slug-zzzz'));
  writeFile(slugDir, 'log.txt', 'Looked for an app that is not in the catalog and stopped.\n'.repeat(12));
  check('unknown slug', slugDir, false);

  if (failures.length) {
    console.error('self-test failed\n' + failures.join('\n'));
    process.exit(1);
  }
  console.log('self-test passed (' + tmp + ')');
}

function main(argv) {
  if (argv.indexOf('--self-test') !== -1) {
    selfTest();
    return;
  }
  var dirs = argv.filter(function (a) { return a !== '--' && a.indexOf('-') !== 0; });
  if (!dirs.length) {
    console.error('Usage: node harness/validate-report.js <report-dir> [<report-dir>...]');
    console.error('       node harness/validate-report.js --self-test');
    process.exit(2);
  }
  var bad = 0;
  dirs.forEach(function (dir) {
    var out = validateDir(path.resolve(dir));
    if (out.ok) {
      console.log('ok  ' + dir + (out.id ? '  ' + out.id + '  ' + out.result : ''));
      out.warnings.forEach(function (w) { console.log('warn  ' + w); });
    } else {
      bad++;
      console.error('fail  ' + dir);
      out.errors.forEach(function (e) { console.error('  - ' + e); });
      out.warnings.forEach(function (w) { console.error('  warn  ' + w); });
    }
  });
  process.exit(bad ? 1 : 0);
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { validateDir: validateDir, parseNdjson: parseNdjson };
