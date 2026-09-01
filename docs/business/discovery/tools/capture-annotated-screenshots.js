/**
 * Capture annotated Cashello discovery screenshots.
 * Does not modify product code. Uses system Chrome + puppeteer-core (temp install).
 *
 * Usage:
 *   node docs/business/discovery/tools/capture-annotated-screenshots.js
 * Requires: npm run web (http://localhost:8081)
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const OUT_DIR = path.join(ROOT, 'docs/business/discovery/screenshots/annotated');
const SCREENS = require('../manifests/screens.json');
const ACTIONS = require('../manifests/actions.json');
const RECIPES = require('./capture-plan.js');

const BASE = process.env.QA_URL || 'http://localhost:8081';
const APP_W = 375;
const APP_H = 812;
const HEADER_H = 148;
const DPR = 2;
const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

function chromePath() {
  const found = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error('Chrome not found');
  return found;
}

function puppeteerCorePath() {
  const envPath = process.env.PUPPETEER_CORE;
  if (envPath) return envPath;
  const candidates = [
    path.join(os.tmpdir(), 'cashello-capture', 'node_modules', 'puppeteer-core'),
    path.join(ROOT, 'node_modules', 'puppeteer-core'),
  ];
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      'puppeteer-core not found. Install to %TEMP%/cashello-capture or set PUPPETEER_CORE.',
    );
  }
  return found;
}

function filenameOf(rel) {
  return path.basename(rel);
}

function allScreenshotTargets() {
  const map = new Map();
  for (const screen of SCREENS) {
    const shots =
      screen.screenshots && screen.screenshots.length
        ? screen.screenshots
        : [{ state: 'DEFAULT', path: screen.screenshot }];
    for (const shot of shots) {
      if (!shot.path) continue;
      map.set(filenameOf(shot.path), {
        screen,
        state: shot.state || 'DEFAULT',
        rel: shot.path.replace(/\\/g, '/'),
      });
    }
  }
  map.set('CAS-SUPPORT-002__sheet-guest.png', {
    screen: {
      screen_id: 'CAS-SUPPORT-002',
      name: 'Служба поддержки',
      route: '/legacy/home?guest=1',
      auth_state: 'GUEST',
      source_status: 'CODE_ONLY',
    },
    state: 'GUEST_SHEET',
    rel: 'screenshots/annotated/CAS-SUPPORT-002__sheet-guest.png',
  });
  map.set('CAS-SUPPORT-002__sheet-authorized.png', {
    screen: {
      screen_id: 'CAS-SUPPORT-002',
      name: 'Служба поддержки',
      route: '/legacy/home',
      auth_state: 'AUTHORIZED',
      source_status: 'CODE_ONLY',
    },
    state: 'AUTHORIZED_SHEET',
    rel: 'screenshots/annotated/CAS-SUPPORT-002__sheet-authorized.png',
  });
  return map;
}

function sourceLabel(status, screenId) {
  if (screenId === 'HOME-001' || status === 'FIGMA_AND_CODE') return 'FIGMA + CODE';
  return 'CODE_ONLY';
}

function authLabel(authState) {
  return authState === 'GUEST' ? 'NO' : 'YES';
}

async function waitForText(page, text, timeoutMs) {
  if (!text) return;
  await page.waitForFunction(
    (needle) =>
      (document.body && document.body.innerText ? document.body.innerText : '').includes(needle),
    { timeout: timeoutMs },
    text,
  );
}

async function clickByAria(page, label) {
  const handle = await page.evaluateHandle((needle) => {
    const nodes = Array.from(
      document.querySelectorAll('[aria-label], [accessibilitylabel], button, [role="button"]'),
    );
    const exact = nodes.find((el) => (el.getAttribute('aria-label') || '') === needle);
    if (exact) return exact;
    const partial = nodes.find((el) =>
      (el.getAttribute('aria-label') || '').toLowerCase().includes(needle.toLowerCase()),
    );
    return partial || null;
  }, label);
  const el = handle.asElement();
  if (!el) throw new Error(`aria not found: ${label}`);
  await el.click();
}

async function clickByText(page, needle) {
  const clicked = await page.evaluate((text) => {
    const want = text.toLowerCase();
    const all = Array.from(
      document.querySelectorAll('div,span,p,a,button,[role="button"],[aria-label]'),
    );
    const matches = all.filter((el) => {
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const own = (
        el.childNodes.length
          ? Array.from(el.childNodes)
              .filter((n) => n.nodeType === 3)
              .map((n) => n.textContent || '')
              .join('')
          : el.textContent || ''
      ).trim();
      return aria.includes(want) || own.toLowerCase().includes(want);
    });
    const best = matches.sort(
      (a, b) => (a.textContent || '').length - (b.textContent || '').length,
    )[0];
    if (!best) return false;
    best.click();
    return true;
  }, needle);
  if (!clicked) throw new Error(`text not found: ${needle}`);
}

async function typeInto(page, selector, text) {
  const sel = selector
    .split(',')
    .map((s) => s.trim())
    .join(',');
  await page.waitForSelector(sel, { timeout: 8000 });
  const el = await page.$(sel);
  if (!el) throw new Error(`input not found: ${selector}`);
  await el.click({ clickCount: 3 });
  await page.keyboard.type(text, { delay: 20 });
}

async function typeAriaContains(page, needle, text) {
  const handle = await page.evaluateHandle((label) => {
    const want = label.toLowerCase();
    const nodes = Array.from(
      document.querySelectorAll('input,textarea,[contenteditable="true"],[aria-label]'),
    );
    return (
      nodes.find(
        (el) =>
          (el.getAttribute('aria-label') || '').toLowerCase().includes(want) &&
          (el.tagName === 'INPUT' ||
            el.tagName === 'TEXTAREA' ||
            el.getAttribute('contenteditable') === 'true'),
      ) || null
    );
  }, needle);
  const el = handle.asElement();
  if (!el) {
    await typeInto(page, 'input,textarea', text);
    return;
  }
  await el.click({ clickCount: 3 });
  await page.keyboard.type(text, { delay: 20 });
}

async function pressDigits(page, digits) {
  for (const ch of String(digits)) {
    await clickByAria(page, ch);
    await new Promise((r) => setTimeout(r, 40));
  }
}

async function runStep(page, step) {
  if (step.wait) {
    await new Promise((r) => setTimeout(r, step.wait));
    return;
  }
  if (step.clickAria) {
    await clickByAria(page, step.clickAria);
    return;
  }
  if (step.clickText) {
    await clickByText(page, step.clickText);
    return;
  }
  if (step.digits) {
    await pressDigits(page, step.digits);
    return;
  }
  if (step.typeInto) {
    await typeInto(page, step.typeInto, step.text);
    return;
  }
  if (step.typeAriaContains) {
    await typeAriaContains(page, step.typeAriaContains, step.text);
    return;
  }
  if (typeof step.clickNth === 'number') {
    await page.evaluate((i) => {
      const nodes = Array.from(document.querySelectorAll('[role="button"],button'));
      if (nodes[i]) nodes[i].click();
    }, step.clickNth);
    return;
  }
  if (Array.isArray(step.clickXY) && step.clickXY.length === 2) {
    await page.mouse.click(step.clickXY[0], step.clickXY[1]);
    return;
  }
  if (typeof step.scrollY === 'number') {
    await page.evaluate((y) => {
      const nodes = Array.from(document.querySelectorAll('div'));
      const scrollable = nodes.find((el) => {
        const style = window.getComputedStyle(el);
        return (
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight + 40
        );
      });
      if (scrollable) scrollable.scrollTop = y;
      else window.scrollTo(0, y);
    }, step.scrollY);
  }
}

async function collectCallouts(page, screenId) {
  const actions = ACTIONS.filter((a) => a.screen_id === screenId && a.callout);
  const boxes = await page.evaluate(
    (items) => {
      function visible(el) {
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < 812;
      }
      function find(label) {
        const want = (label || '').toLowerCase();
        if (!want) return null;
        const nodes = Array.from(
          document.querySelectorAll('[aria-label],button,[role="button"],div,span,p,a'),
        );
        const scored = [];
        for (const el of nodes) {
          if (!visible(el)) continue;
          const aria = (el.getAttribute('aria-label') || '').toLowerCase();
          const text = (el.textContent || '').trim().toLowerCase();
          if (aria === want || text === want)
            scored.push({ el, score: 0, r: el.getBoundingClientRect() });
          else if (aria.includes(want) || text.includes(want))
            scored.push({
              el,
              score: want.length / Math.max(text.length, 1),
              r: el.getBoundingClientRect(),
            });
        }
        scored.sort((a, b) => a.score - b.score);
        return scored[0]
          ? { x: scored[0].r.left, y: scored[0].r.top, w: scored[0].r.width, h: scored[0].r.height }
          : null;
      }
      return items.map((item) => ({
        callout: item.callout,
        label: item.label,
        box: find(item.label),
      }));
    },
    actions.map((a) => ({ callout: a.callout, label: a.label })),
  );
  return boxes
    .filter((row) => row.box)
    .map((row) => {
      const b = row.box;
      let x = Math.max(4, b.x - 16);
      let y = Math.max(4, b.y + b.h / 2 - 9);
      if (x + 22 > APP_W) x = APP_W - 26;
      if (y + 18 > APP_H) y = APP_H - 22;
      return { n: row.callout, label: row.label, x, y };
    });
}

function annotationHtml({ meta, pngBase64, callouts }) {
  const markers = callouts
    .map((c) => `<div class="m" style="left:${c.x}px;top:${c.y}px">${c.n}</div>`)
    .join('');
  const legend = callouts
    .slice(0, 14)
    .map((c) => `[${c.n}] ${escapeHtml(c.label)}`)
    .join(' · ');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:#111;font-family:Segoe UI,Arial,sans-serif}
    .wrap{width:${APP_W}px;background:#161616;color:#f4f4f4}
    .head{height:${HEADER_H}px;box-sizing:border-box;padding:10px 12px 8px;background:#1b1b1b;border-bottom:1px solid #2c2c2c}
    .head .id{font-size:13px;font-weight:700;letter-spacing:.02em}
    .head .line{font-size:10px;line-height:1.35;color:#d8d8d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .legend{font-size:9px;line-height:1.3;color:#bdbdbd;margin-top:4px;max-height:28px;overflow:hidden}
    .stage{position:relative;width:${APP_W}px;height:${APP_H}px;background:#fff}
    .stage img{width:${APP_W}px;height:${APP_H}px;display:block}
    .m{position:absolute;width:18px;height:18px;border-radius:9px;background:#e11d48;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 1px #fff;pointer-events:none}
  </style></head><body><div class="wrap">
    <div class="head">
      <div class="id">SCREEN: ${escapeHtml(meta.screenId)} — ${escapeHtml(meta.name)}</div>
      <div class="line">NAME: ${escapeHtml(meta.name)}</div>
      <div class="line">ROUTE: ${escapeHtml(meta.route)}</div>
      <div class="line">STATE: ${escapeHtml(meta.state)} · SOURCE: ${escapeHtml(meta.source)} · AUTH: ${escapeHtml(meta.auth)}</div>
      <div class="legend">${legend || 'Interactive callouts resolved at runtime from visible controls.'}</div>
    </div>
    <div class="stage"><img src="${pngBase64}">${markers}</div>
  </div></body></html>`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function preparePage(page, recipe) {
  if (recipe.from === 'guest') {
    await page.goto(`${BASE}/legacy/home?guest=1`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await waitForText(page, 'Войти', 20000);
    await new Promise((r) => setTimeout(r, 400));
    for (const step of recipe.clicks || []) {
      await runStep(page, step);
      await new Promise((r) => setTimeout(r, 350));
    }
    return;
  }
  const url = `${BASE}${recipe.url}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
}

async function captureOne(browser, target, only) {
  const file = filenameOf(target.rel);
  if (only && !only.includes(file) && !only.includes(target.screen.screen_id))
    return { skipped: true };
  const recipe = RECIPES[file] || { url: target.screen.route, waitMs: 900 };
  const page = await browser.newPage();
  await page.setViewport({ width: APP_W, height: APP_H, deviceScaleFactor: DPR });
  page.setDefaultTimeout(12000);
  try {
    await preparePage(page, recipe);
    if (recipe.waitText) {
      try {
        await waitForText(page, recipe.waitText, recipe.waitMs || 12000);
      } catch {
        // continue; some copy differs slightly
      }
    } else {
      await new Promise((r) => setTimeout(r, recipe.waitMs || 900));
    }
    for (const step of recipe.steps || []) {
      try {
        await runStep(page, step);
        await new Promise((r) => setTimeout(r, 280));
      } catch (error) {
        process.stdout.write(`  step-warn ${file}: ${error.message}\n`);
      }
    }
    await new Promise((r) => setTimeout(r, 250));
    const callouts = await collectCallouts(page, target.screen.screen_id).catch(() => []);
    const stamp = `${Date.now()}-${file}`;
    const rawPath = path.join(os.tmpdir(), `cashello-raw-${stamp}.png`);
    const htmlPath = path.join(os.tmpdir(), `cashello-ann-${stamp}.html`);
    const raw = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: APP_W, height: APP_H },
    });
    fs.writeFileSync(rawPath, raw);
    const html = annotationHtml({
      meta: {
        screenId: target.screen.screen_id,
        name: target.screen.name,
        route: recipe.url || target.screen.route || '',
        state: target.state,
        source: sourceLabel(target.screen.source_status, target.screen.screen_id),
        auth: authLabel(target.screen.auth_state),
      },
      pngBase64: path.basename(rawPath),
      callouts,
    });
    fs.writeFileSync(htmlPath, html);
    const overlay = await browser.newPage();
    await overlay.setViewport({ width: APP_W, height: HEADER_H + APP_H, deviceScaleFactor: DPR });
    await overlay.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'load' });
    await overlay.waitForFunction(
      () => {
        const img = document.querySelector('img');
        return Boolean(img && img.complete && img.naturalWidth > 100);
      },
      { timeout: 8000 },
    );
    const outPath = path.join(OUT_DIR, file);
    await overlay.screenshot({ path: outPath, type: 'png' });
    await overlay.close();
    fs.unlinkSync(rawPath);
    fs.unlinkSync(htmlPath);
    await page.close();
    return { file, ok: true, callouts: callouts.length };
  } catch (error) {
    await page.close().catch(() => {});
    return { file, ok: false, error: error.message };
  }
}

async function main() {
  const only = process.argv.slice(2);
  if (require.main !== module && only.length === 0) {
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const puppeteer = require(puppeteerCorePath());
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: 'new',
    args: [
      '--hide-scrollbars',
      '--disable-gpu',
      '--no-first-run',
      '--allow-file-access-from-files',
    ],
  });
  const targets = [...allScreenshotTargets().values()];
  const failures = [];
  let ok = 0;
  for (const target of targets) {
    const result = await captureOne(browser, target, only.length ? only : null);
    if (result.skipped) continue;
    if (result.ok) {
      ok += 1;
      process.stdout.write(`OK ${result.file} callouts=${result.callouts}\n`);
    } else {
      failures.push(result);
      process.stdout.write(`FAIL ${result.file} ${result.error}\n`);
    }
  }
  await browser.close();
  process.stdout.write(`Captured ${ok}/${ok + failures.length}. Failures: ${failures.length}\n`);
  if (failures.length) {
    fs.writeFileSync(
      path.join(OUT_DIR, '_capture-failures.json'),
      JSON.stringify(failures, null, 2),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
