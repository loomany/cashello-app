/**
 * Capture reconstruction auth screens at 375×812 (and optional taller).
 * Usage: node scripts/qa-legacy-auth.js
 * Requires: npm run web (default http://localhost:8081)
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const URL = process.env.QA_URL || 'http://localhost:8081';
const STEPS = [
  { step: 'iin', expect: 'Авторизация|Номер телефона|Далее' },
  { step: 'face', expect: 'Держите лицо внутри рамки|Отмена' },
  { step: 'documentFront', expect: 'Сканируйте лицевую сторону УДВ' },
  { step: 'documentTurn', expect: 'Переверните Удостоверение' },
  { step: 'documentBack', expect: 'Сканируйте оборотную сторону УДВ' },
  { step: 'phone', expect: 'Номер телефона' },
  { step: 'pinCreate', expect: 'Придумайте код доступа' },
  { step: 'pinError', expect: 'Коды не совпадают' },
];

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

function chromeBin() {
  const found = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error('Chrome not found');
  }
  return found;
}

function runChrome(args, timeoutMs, outFile) {
  return new Promise((resolve, reject) => {
    const child = spawn(chromeBin(), args, { stdio: ['ignore', outFile ? 'pipe' : 'ignore', 'ignore'] });
    const chunks = [];
    if (outFile && child.stdout) {
      child.stdout.on('data', (chunk) => chunks.push(chunk));
    }
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Chrome timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('exit', () => {
      clearTimeout(timer);
      if (outFile) {
        fs.writeFileSync(outFile, Buffer.concat(chunks));
      }
      resolve();
    });
  });
}

async function capture(step, width, height, suffix) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'paydala-qa-'));
  const bust = `${URL}/legacy/auth?qaStep=${step}&qa=${Date.now()}`;
  const out = path.resolve(process.cwd(), `tmp-qa-legacy-${step}${suffix}.png`);
  const dom = path.resolve(process.cwd(), `tmp-qa-legacy-${step}${suffix}.html`);
  const common = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    '--force-device-scale-factor=2',
    '--virtual-time-budget=15000',
  ];
  await runChrome([...common, '--dump-dom', bust], 50000, dom);
  await runChrome([...common, `--screenshot=${out}`, bust], 50000);
  return { out, dom, html: fs.readFileSync(dom, 'utf8') };
}

async function main() {
  const failures = [];
  for (const item of STEPS) {
    const result = await capture(item.step, 375, 812, '');
    const ok = new RegExp(item.expect).test(result.html);
    console.log(`${item.step} 375x812 ${ok ? 'PASS' : 'FAIL'} ${result.out}`);
    if (!ok) {
      failures.push(item.step);
    }
  }
  const tall = await capture('iin', 375, 900, '-tall');
  const tallOk = /Регистрация/.test(tall.html);
  console.log(`iin taller ${tallOk ? 'PASS' : 'FAIL'} ${tall.out}`);
  if (!tallOk) {
    failures.push('iin-tall');
  }
  if (failures.length) {
    console.error('QA failed:', failures.join(', '));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
