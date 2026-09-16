// Derives the design system's CSS from the site's own Stylus sources, so the
// exported bundle can never drift from what lunaparker.dev actually ships.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const stylus = require('stylus');

export const REPO = path.resolve(import.meta.dirname, '../../..');

/** Compile a .styl file to plain CSS. */
export function compileStyl(relPath) {
  const file = path.join(REPO, relPath);
  const css = stylus(fs.readFileSync(file, 'utf8')).set('filename', file).render();
  return stripLegacyKeyframes(css).trim();
}

/**
 * Pull the <style lang="stylus"> block out of a Vue SFC and compile it.
 * `scoped` is a Vue compiler concern, so the raw block yields clean selectors.
 */
export function compileSfcStyle(relPath) {
  const src = fs.readFileSync(path.join(REPO, relPath), 'utf8');
  const m = src.match(/<style[^>]*lang="stylus"[^>]*>([\s\S]*?)<\/style>/);
  if (!m) throw new Error(`no stylus <style> block in ${relPath}`);
  return stripLegacyKeyframes(stylus(m[1]).render()).trim();
}

/** Split CSS into top-level rules, respecting nested braces in @media etc. */
export function topLevelRules(css) {
  const rules = [];
  let depth = 0, start = 0, selStart = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        rules.push({
          selector: css.slice(selStart, start).trim(),
          body: css.slice(start + 1, i).trim(),
          full: css.slice(selStart, i + 1).trim(),
        });
        selStart = i + 1;
      }
    }
  }
  return rules;
}

/**
 * Drop the @-moz-/@-webkit-/@-o-keyframes duplicates Stylus emits. Every
 * browser the site targets supports unprefixed keyframes, and in an exported
 * design system the copies are pure noise.
 */
export function stripLegacyKeyframes(css) {
  return topLevelRules(css)
    .filter((r) => !/^@-(moz|webkit|o)-keyframes/.test(r.selector))
    .map((r) => r.full)
    .join('\n\n');
}

/**
 * Partition compiled CSS into token rules and everything else.
 * A token rule is a :root (optionally attribute-qualified) selector whose body
 * declares nothing but custom properties — that is exactly what belongs in
 * tokens.css, and it keeps app.styl's accent override from being duplicated
 * into the component layer.
 */
export function partitionTokens(css) {
  const tokens = [], rest = [];
  for (const r of topLevelRules(css)) {
    const rootish = /^:root(\[[^\]]*\])?$/.test(r.selector);
    const onlyVars = r.body.length > 0 && r.body
      .split(';').map((d) => d.trim()).filter(Boolean)
      .every((d) => d.startsWith('--'));
    (rootish && onlyVars ? tokens : rest).push(r.full);
  }
  return { tokens: tokens.join('\n\n'), rest: rest.join('\n\n') };
}

export const banner = (title, sources) => `/* ${'='.repeat(74)}
   ${title}
   GENERATED — do not edit. Built by scripts/design-system/build.mjs from:
${sources.map((s) => `     ${s}`).join('\n')}
   Run \`npm run design-system\` to rebuild.
   ${'='.repeat(74)} */\n`;
