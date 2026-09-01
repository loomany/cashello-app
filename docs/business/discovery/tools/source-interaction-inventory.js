/**
 * Merge AST scan + manual classification into source interaction manifest.
 */
const fs = require('fs');
const path = require('path');
const { scanReachableSource, scanKey, REACHABLE_SOURCE_GLOBS } = require('./source-interaction-scan');
const { classifyInteraction, SYNTHETIC_GAPS, RUNTIME_DUPLICATE_MAPPINGS } = require('./source-interaction-classifications');

let interactionSeq = 0;

/** @param {{ source_file: string, line: number, interaction_kind: string, handler: string }} row */
function makeInteractionId(row) {
  interactionSeq += 1;
  const slug = row.source_file.split('/').pop()?.replace(/\.\w+$/, '') ?? 'src';
  return `SRC-${slug}-${String(interactionSeq).padStart(4, '0')}`;
}

/** @param {string} root */
function buildInventory(root) {
  interactionSeq = 0;
  const candidates = scanReachableSource(root).filter((row) => !row.interaction_kind.startsWith('component:'));

  /** @type {Array<object>} */
  const classified = [];
  /** @type {typeof candidates} */
  const unclassified = [];

  for (const row of candidates) {
    const classification = classifyInteraction(row, candidates);
    if (!classification?.mapping_status) {
      unclassified.push(row);
      continue;
    }
    classified.push({
      interaction_id: makeInteractionId(row),
      source_file: row.source_file,
      line: row.line,
      interaction_kind: row.interaction_kind,
      handler: row.handler,
      scan_key: scanKey(row),
      mapping_status: classification.mapping_status,
      catalog_action_id: classification.catalog_action_id ?? null,
      notes: classification.notes ?? null,
    });
  }

  for (const dup of RUNTIME_DUPLICATE_MAPPINGS) {
    const sourceRow = candidates.find((r) => scanKey(r) === dup.scan_key);
    if (!sourceRow) continue;
    classified.push({
      interaction_id: `${makeInteractionId(sourceRow)}-dup-${dup.catalog_action_id}`,
      source_file: sourceRow.source_file,
      line: sourceRow.line,
      interaction_kind: sourceRow.interaction_kind,
      handler: sourceRow.handler,
      scan_key: dup.scan_key,
      mapping_status: dup.mapping_status,
      catalog_action_id: dup.catalog_action_id,
      notes: dup.notes,
    });
  }

  const merged = [...classified, ...SYNTHETIC_GAPS];

  return {
    candidates,
    classified: merged,
    unclassified,
    stats: {
      source_candidates: candidates.length,
      classified_candidates: candidates.length,
      runtime_duplicates: RUNTIME_DUPLICATE_MAPPINGS.length,
      synthetic_gaps: SYNTHETIC_GAPS.length,
      unclassified: unclassified.length,
      manifest_total: merged.length,
    },
  };
}

/** @param {string} root */
function writeManifest(root) {
  const { classified, unclassified, stats } = buildInventory(root);
  if (unclassified.length > 0) {
    const sample = unclassified.slice(0, 20).map((r) => `${scanKey(r)} :: ${r.handler}`);
    throw new Error(
      `Unclassified source interactions: ${unclassified.length}\n${sample.join('\n')}`,
    );
  }
  const out = path.join(root, 'docs/business/discovery/manifests/source_interactions.json');
  const payload = {
    scan_meta: {
      scanned_at: new Date().toISOString().slice(0, 10),
      source_candidates: stats.source_candidates,
      classified_candidates: stats.classified_candidates,
      synthetic_gaps: stats.synthetic_gaps,
      unclassified: stats.unclassified,
      manifest_total: stats.manifest_total,
    },
    interactions: classified,
  };
  fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n');
  return stats;
}

module.exports = {
  REACHABLE_SOURCE_GLOBS,
  buildInventory,
  writeManifest,
};
