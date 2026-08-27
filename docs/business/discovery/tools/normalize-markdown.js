/**
 * Replace Markdown's trailing-space hard breaks with backslash hard breaks.
 * This preserves rendered line breaks while keeping `git diff --check` clean.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const targets = [path.join(ROOT, 'README.md')];

function collectMarkdown(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collectMarkdown(target);
    else if (entry.isFile() && entry.name.endsWith('.md')) targets.push(target);
  }
}

collectMarkdown(path.join(ROOT, 'docs', 'business', 'discovery'));

for (const target of targets) {
  const original = fs.readFileSync(target, 'utf8');
  const normalized = original
    .replace(/ {2,}\r?$/gm, '\\')
    .replace(/[ \t]+\r?$/gm, '');
  if (normalized !== original) fs.writeFileSync(target, normalized);
}

console.log(`Normalized ${targets.length} Markdown files.`);
