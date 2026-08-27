/**
 * Mark state captures whose requested runtime transition was not confirmed.
 *
 * The PNG remains as a nearest-reachable base-state audit artifact, but must
 * not be treated as evidence that the requested state was reached.
 */
const fs = require('fs');
const path = require('path');

const DISCOVERY = path.resolve(__dirname, '..');
const screensPath = path.join(DISCOVERY, 'manifests', 'screens.json');
const catalogPath = path.join(DISCOVERY, 'PRODUCT_SCREEN_CATALOG.md');

const gapFiles = new Set([
  'CAS-AUTH-011__otp-filled.png',
  'LGC-SCR-031__open-account-sheet.png',
  'LGC-SCR-031__open-account-request-recorded.png',
  'LGC-SCR-034__download-sheet.png',
  'LGC-SCR-040__account-method-sheet.png',
  'LGC-SCR-036__cvv-visible.png',
  'LGC-SCR-039__limit-sheet.png',
  'LGC-SCR-039__limit-selected.png',
  'LGC-SCR-039__limit-applied.png',
  'LGC-SCR-070__accounts-selected-fx.png',
  'LGC-SCR-073__fx-filled.png',
  'LGC-SCR-073__over-balance-enabled.png',
  'CAS-TOPUP-001__saved-card-picker.png',
  'LGC-SCR-087__saved-card-selected.png',
  'LGC-SCR-081__cash-desk-selected.png',
  'LGC-SCR-091__card-camera.png',
  'LGC-SCR-092__card-selected.png',
  'CAS-WD-001__saved-card-picker.png',
  'CAS-WD-003__saved-phone-picker.png',
  'LGC-SCR-108__cash-desk-selected.png',
  'LGC-SCR-097__confirmation.png',
  'LGC-SCR-111__date-filtered.png',
  'CAS-HIST-001__calendar.png',
  'CAS-HIST-001__calendar-selected.png',
  'LGC-SCR-115__cancel-confirmation.png',
  'LGC-SCR-115__cancelled-rejected.png',
]);

const reason =
  'CAPTURE_GAP: requested runtime state transition was not confirmed; linked PNG is the nearest reachable base-state fallback and is not evidence of the requested state.';

function basename(value) {
  return value ? path.basename(value.replace(/\\/g, '/')) : null;
}

const screens = JSON.parse(fs.readFileSync(screensPath, 'utf8'));
const primaryGapScreens = [];

for (const screen of screens) {
  const primaryGap = gapFiles.has(basename(screen.screenshot));
  screen.screenshot_qa = primaryGap ? 'CAPTURE_GAP' : 'VALIDATED';

  if (primaryGap) {
    screen.no_screenshot_reason = reason;
    primaryGapScreens.push(screen.screen_id);
  } else {
    delete screen.no_screenshot_reason;
  }

  for (const shot of screen.screenshots || []) {
    const isGap = gapFiles.has(basename(shot.path));
    shot.capture_status = isGap ? 'CAPTURE_GAP' : 'CAPTURED';
    if (isGap) {
      shot.note = reason;
    }
  }
}

fs.writeFileSync(screensPath, `${JSON.stringify(screens, null, 2)}\n`);

let catalog = fs.readFileSync(catalogPath, 'utf8');
catalog = catalog.replace(/^\*\*Screenshot QA:\*\* CAPTURE_GAP — .*$(?:\r?\n)?/gm, '');

for (const screenId of primaryGapScreens) {
  const sectionStart = catalog.indexOf(`## ${screenId} —`);
  if (sectionStart < 0) continue;
  const nextSection = catalog.indexOf('\n## ', sectionStart + 4);
  const sectionEnd = nextSection < 0 ? catalog.length : nextSection;
  const section = catalog.slice(sectionStart, sectionEnd);
  const primaryLine = section.match(/^\*\*Primary screenshot:\*\*.*$/m);
  if (!primaryLine) continue;
  const replacement = `${primaryLine[0]}\n**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.`;
  const updated = section.replace(primaryLine[0], replacement);
  catalog = catalog.slice(0, sectionStart) + updated + catalog.slice(sectionEnd);
}

fs.writeFileSync(catalogPath, catalog);

console.log(
  JSON.stringify(
    {
      state_capture_gaps: gapFiles.size,
      primary_capture_gaps: primaryGapScreens.length,
      primary_gap_screen_ids: primaryGapScreens,
    },
    null,
    2,
  ),
);
