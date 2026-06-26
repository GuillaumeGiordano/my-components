// One-off codemod: mirror width-based `@media` blocks as `@container` blocks so
// responsive styles also react to a `container-type` ancestor (e.g. ComponentPreview).
// Idempotent: skips a media block that is already followed by an identical @container twin.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

// Collect target files (all component .svelte files + lib root)
const files = execSync(
  'git ls-files "src/lib/**/*.svelte"',
  { cwd: process.cwd(), encoding: "utf8" },
)
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

// Features that are NOT valid in container queries → skip those media blocks.
const NON_CONTAINER = /(prefers-|hover|pointer|orientation|resolution|print|monochrome|scripting|light-level|-color|device-)/;

function matchBlock(src, openIndex) {
  // openIndex points at the `{`; return index just after the matching `}`.
  let depth = 0;
  for (let i = openIndex; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

let totalBlocks = 0;
const changedFiles = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const re = /@media([^{]*?)\{/g;
  let m;
  const inserts = []; // { at, text }

  while ((m = re.exec(src)) !== null) {
    const condRaw = m[1];
    if (!/(max-width|min-width|max-height|min-height|aspect-ratio|\bwidth\b|\bheight\b)/.test(condRaw))
      continue;
    if (NON_CONTAINER.test(condRaw)) continue;

    const openIndex = m.index + m[0].length - 1; // index of `{`
    const end = matchBlock(src, openIndex);
    if (end === -1) continue;

    const body = src.slice(openIndex + 1, end - 1); // between braces
    // Normalize condition: drop media types, keep the (feature) parts.
    const cond = condRaw
      .replace(/\b(screen|all|only)\b/g, "")
      .replace(/^\s*and\s+/i, "")
      .trim();

    const twin = `@container ${cond} {${body}}`;

    // Idempotency: is an identical @container twin already right after this block?
    const after = src.slice(end).replace(/^\s*/, "");
    if (after.startsWith(`@container ${cond} {`)) continue;

    // Match the indentation of the @media line for the inserted block.
    const lineStart = src.lastIndexOf("\n", m.index) + 1;
    const indent = src.slice(lineStart, m.index).match(/^\s*/)[0];

    inserts.push({ at: end, text: `\n\n${indent}${twin}` });
    totalBlocks++;
  }

  if (inserts.length === 0) continue;

  // Apply inserts back-to-front so offsets stay valid.
  let out = src;
  for (const ins of inserts.sort((a, b) => b.at - a.at)) {
    out = out.slice(0, ins.at) + ins.text + out.slice(ins.at);
  }
  writeFileSync(file, out);
  changedFiles.push(`${file} (+${inserts.length})`);
}

console.log(`Mirrored ${totalBlocks} block(s) across ${changedFiles.length} file(s):`);
for (const f of changedFiles) console.log("  " + f);
