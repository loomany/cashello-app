/**
 * Recapture guest SPA paths, support sheets, and QR generated state.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const OUT_DIR = path.join(ROOT, 'docs/business/discovery/screenshots/annotated');
const ACTIONS = require('../manifests/actions.json');

const BASE = process.env.QA_URL || 'http://localhost:8081';
const APP_W = 375;
const APP_H = 812;
const HEADER_H = 148;
const DPR = 2;

function chromePath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  return candidates.find((c) => fs.existsSync(c));
}

function puppeteerCorePath() {
  return (
    process.env.PUPPETEER_CORE ||
    path.join(os.tmpdir(), 'cashello-capture', 'node_modules', 'puppeteer-core')
  );
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function annotationHtml(meta, pngBase64, callouts) {
  const markers = callouts
    .map((c) => `<div class="m" style="left:${c.x}px;top:${c.y}px">${c.n}</div>`)
    .join('');
  const legend = callouts.map((c) => `[${c.n}] ${escapeHtml(c.label)}`).join(' · ');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:#111;font-family:Segoe UI,Arial,sans-serif}
    .wrap{width:${APP_W}px;background:#161616;color:#f4f4f4}
    .head{height:${HEADER_H}px;box-sizing:border-box;padding:10px 12px 8px;background:#1b1b1b;border-bottom:1px solid #2c2c2c}
    .id{font-size:13px;font-weight:700}
    .line{font-size:10px;line-height:1.35;color:#d8d8d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .legend{font-size:9px;line-height:1.3;color:#bdbdbd;margin-top:4px;max-height:28px;overflow:hidden}
    .stage{position:relative;width:${APP_W}px;height:${APP_H}px;background:#fff}
    .stage img{width:${APP_W}px;height:${APP_H}px;display:block}
    .m{position:absolute;width:18px;height:18px;border-radius:9px;background:#e11d48;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 1px #fff}
  </style></head><body><div class="wrap">
    <div class="head">
      <div class="id">SCREEN: ${escapeHtml(meta.screenId)} — ${escapeHtml(meta.name)}</div>
      <div class="line">NAME: ${escapeHtml(meta.name)}</div>
      <div class="line">ROUTE: ${escapeHtml(meta.route)}</div>
      <div class="line">STATE: ${escapeHtml(meta.state)} · SOURCE: ${escapeHtml(meta.source)} · AUTH: ${escapeHtml(meta.auth)}</div>
      <div class="legend">${legend}</div>
    </div>
    <div class="stage"><img src="data:image/png;base64,${pngBase64}">${markers}</div>
  </div></body></html>`;
}

async function waitText(page, text) {
  await page.waitForFunction(
    (needle) => (document.body.innerText || '').includes(needle),
    { timeout: 15000 },
    text,
  );
}

async function clickNthExact(page, text, index) {
  const ok = await page.evaluate(
    (needle, i) => {
      const nodes = Array.from(
        document.querySelectorAll('div,span,p,a,button,[role="button"]'),
      ).filter((el) => {
        const own = Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => (n.textContent || '').trim())
          .join('');
        return own === needle;
      });
      if (!nodes[i]) return false;
      nodes[i].click();
      return true;
    },
    text,
    index,
  );
  if (!ok) throw new Error(`nth text not found ${text}#${index}`);
}

async function clickText(page, needle) {
  const ok = await page.evaluate((text) => {
    const want = text.toLowerCase();
    const all = Array.from(
      document.querySelectorAll('div,span,p,a,button,[role="button"],[aria-label]'),
    );
    const match = all.find((el) => {
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const own = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => (n.textContent || '').trim())
        .join('')
        .toLowerCase();
      return aria.includes(want) || own.includes(want);
    });
    if (!match) return false;
    match.click();
    return true;
  }, needle);
  if (!ok) throw new Error(`text not found: ${needle}`);
}

async function typeAria(page, needle, text) {
  const handle = await page.evaluateHandle((label) => {
    const want = label.toLowerCase();
    return (
      Array.from(document.querySelectorAll('input,textarea')).find((el) =>
        (el.getAttribute('aria-label') || '').toLowerCase().includes(want),
      ) || document.querySelector('input,textarea')
    );
  }, needle);
  const el = handle.asElement();
  await el.click({ clickCount: 3 });
  await page.keyboard.type(text, { delay: 15 });
}

async function spaPush(page, href) {
  await page.evaluate((path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, href);
  await new Promise((r) => setTimeout(r, 700));
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
        const nodes = Array.from(
          document.querySelectorAll('[aria-label],button,[role="button"],div,span,p,a'),
        );
        for (const el of nodes) {
          if (!visible(el)) continue;
          const aria = (el.getAttribute('aria-label') || '').toLowerCase();
          const text = (el.textContent || '').trim().toLowerCase();
          if (aria === want || text === want || aria.includes(want) || text.includes(want)) {
            const r = el.getBoundingClientRect();
            return { x: r.left, y: r.top, w: r.width, h: r.height };
          }
        }
        return null;
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
    .map((row) => ({
      n: row.callout,
      label: row.label,
      x: Math.min(351, Math.max(4, row.box.x - 14)),
      y: Math.min(790, Math.max(4, row.box.y + row.box.h / 2 - 9)),
    }));
}

async function saveAnnotated(browser, page, meta, file) {
  const callouts = await collectCallouts(page, meta.screenId).catch(() => []);
  const raw = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: APP_W, height: APP_H },
  });
  const overlay = await browser.newPage();
  await overlay.setViewport({ width: APP_W, height: HEADER_H + APP_H, deviceScaleFactor: DPR });
  await overlay.setContent(annotationHtml(meta, raw.toString('base64'), callouts), {
    waitUntil: 'load',
  });
  await overlay.screenshot({ path: path.join(OUT_DIR, file), type: 'png' });
  await overlay.close();
  console.log('OK', file, 'callouts=' + callouts.length);
}

async function guestHome(page) {
  await page.goto(`${BASE}/legacy/home?guest=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitText(page, 'Войти');
  await new Promise((r) => setTimeout(r, 500));
}

async function main() {
  const puppeteer = require(puppeteerCorePath());
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: APP_W, height: APP_H, deviceScaleFactor: DPR });

  await guestHome(page);
  await clickNthExact(page, 'См. все', 0);
  await new Promise((r) => setTimeout(r, 700));
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'PAY-001',
      name: 'Каталог платежей',
      route: '/legacy/payment',
      state: 'GUEST',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'PAY-001__guest-browse.png',
  );

  await clickText(page, 'Ubet');
  await new Promise((r) => setTimeout(r, 500));
  try {
    await typeAria(page, 'телефон', '7771234567');
    await typeAria(page, 'Сумма', '1000');
  } catch (e) {
    console.log('fill-warn', e.message);
  }
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'PAY-002',
      name: 'Оплата услуги',
      route: '/legacy/payment/ubet',
      state: 'GUEST_FORM_FILLED',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'PAY-002__guest-filled.png',
  );

  await guestHome(page);
  await clickNthExact(page, 'См. все', 1);
  await new Promise((r) => setTimeout(r, 700));
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'LGC-SCR-111',
      name: 'История операций',
      route: '/legacy/history',
      state: 'GUEST',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'LGC-SCR-111__guest-history.png',
  );
  try {
    await clickText(page, 'Вывод');
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    console.log('history-row-warn', e.message);
  }
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'CAS-HIST-002',
      name: 'История — действия',
      route: '/legacy/history (sheet)',
      state: 'GUEST_SHEET',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'CAS-HIST-002__action-sheet-guest.png',
  );

  await guestHome(page);
  await spaPush(page, '/legacy/qr');
  await new Promise((r) => setTimeout(r, 800));
  try {
    await typeAria(page, 'Сумма', '1500');
  } catch (e) {
    console.log('qr-fill-warn', e.message);
  }
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'QR-001',
      name: 'QR-оплата',
      route: '/legacy/qr',
      state: 'GUEST_FORM_FILLED',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'QR-001__guest-filled.png',
  );

  await page.goto(`${BASE}/legacy/qr`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  try {
    await typeAria(page, 'Сумма', '1500');
    await clickText(page, 'Сгенерировать QR');
    await new Promise((r) => setTimeout(r, 500));
  } catch (e) {
    console.log('qr-gen-warn', e.message);
  }
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'QR-001',
      name: 'QR-оплата',
      route: '/legacy/qr',
      state: 'GENERATED',
      source: 'CODE_ONLY',
      auth: 'YES',
    },
    'QR-001__generated.png',
  );
  try {
    await clickText(page, 'Новая сумма');
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    console.log('qr-reset-warn', e.message);
  }
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'QR-001',
      name: 'QR-оплата',
      route: '/legacy/qr',
      state: 'DEFAULT_AFTER_RESET',
      source: 'CODE_ONLY',
      auth: 'YES',
    },
    'QR-001__reset.png',
  );

  await guestHome(page);
  await page.mouse.click(338, 700);
  await new Promise((r) => setTimeout(r, 500));
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'CAS-SUPPORT-002',
      name: 'Служба поддержки',
      route: 'overlay on /legacy/*',
      state: 'GUEST_SHEET',
      source: 'CODE_ONLY',
      auth: 'NO',
    },
    'CAS-SUPPORT-002__sheet-guest.png',
  );

  await page.goto(`${BASE}/legacy/home`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  await page.mouse.click(338, 718);
  await new Promise((r) => setTimeout(r, 500));
  await saveAnnotated(
    browser,
    page,
    {
      screenId: 'CAS-SUPPORT-002',
      name: 'Служба поддержки',
      route: 'overlay on /legacy/*',
      state: 'AUTHORIZED_SHEET',
      source: 'CODE_ONLY',
      auth: 'YES',
    },
    'CAS-SUPPORT-002__sheet-authorized.png',
  );

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
