/**
 * Builds the "Luna Parker — Portfolio" design-system bundle into dist/.
 *
 * Both stylesheets are compiled from the site's own Stylus sources, so the
 * exported system cannot drift from what lunaparker.dev ships. Only the
 * preview pages and the small extras layer are authored here.
 *
 *   npm run design-system
 *
 * The system now lives as a Design System artifact, not the old Claude Design
 * project, and dist/ no longer maps onto it one-to-one: the artifact merges
 * tokens.css and components.css into a single components/bundle.css, and holds
 * the token values as project/tokens.json. A naive re-sync would re-split them
 * and overwrite the artifact's own guide, so port changes across deliberately
 * rather than uploading dist/ wholesale.
 *
 * Preview heights live on each card definition and must be MEASURED, not
 * guessed — estimating them was wrong by up to 826px. Serve dist/ and run this
 * in the page console:
 *
 *   const cards = await fetch('/_cards.json').then(r => r.json());
 *   const out = {};
 *   for (const c of cards) {
 *     const f = document.createElement('iframe');
 *     f.style.cssText = `position:fixed;left:-9999px;width:${c.width}px;height:400px`;
 *     document.body.appendChild(f);
 *     await new Promise((r) => { f.onload = r; f.src = '/' + c.path; });
 *     await new Promise((r) => setTimeout(r, 500));  // let webfonts settle
 *     const d = f.contentDocument;
 *     out[c.path] = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight) + 24;
 *     f.remove();
 *   }
 *   JSON.stringify(out);
 */
import fs from 'node:fs';
import path from 'node:path';
import { compileStyl, compileSfcStyle, partitionTokens, banner } from './lib/compile.mjs';
import { foundations } from './cards/foundations.mjs';
import { components } from './cards/components.mjs';
import { readme } from './cards/readme.mjs';

const HERE = import.meta.dirname;
const DIST = path.join(HERE, 'dist');

/* ---------------------------------------------------------------- stylesheets */

const appCss = compileStyl('assets/css/app.styl');
const { tokens: appTokens, rest: appComponents } = partitionTokens(appCss);

// tokens.styl declares the base accent; app.styl's :root override must follow
// it to win. The cyan preset just names tokens.styl's own default so it can be
// switched to like the other two.
const CYAN_PRESET = `/* Named by the export so tokens.styl's own default hue is switchable too. */
:root[data-accent="cyan"] {
  --accent-h: 195;
  --accent-c: 0.14;
}`;

const TOKENS = [
  banner('Luna Parker — Portfolio Design System / tokens', [
    'assets/css/tokens.styl',
    'assets/css/app.styl  (the :root accent override and data-accent presets)',
  ]),
  compileStyl('assets/css/tokens.styl'),
  '/* --- accent override + presets, from app.styl -------------------------- */',
  appTokens,
  CYAN_PRESET,
].join('\n\n');

const SFCS = [
  'components/Ui/M3Field.vue',
  'components/ProjectCard.vue',
  'components/SiteNav.vue',
];

const COMPONENTS = [
  banner('Luna Parker — Portfolio Design System / components', [
    'assets/css/base.styl',
    'assets/css/app.styl  (everything that is not a token)',
    ...SFCS.map((f) => `${f}  (scoped <style> block)`),
    'scripts/design-system/extras.css',
  ]),
  '/* --- base.styl ---------------------------------------------------------- */',
  compileStyl('assets/css/base.styl'),
  '/* --- app.styl ----------------------------------------------------------- */',
  appComponents,
  ...SFCS.map((f) => `/* --- ${f} ${'-'.repeat(Math.max(0, 62 - f.length))} */\n\n${compileSfcStyle(f)}`),
  '/* --- extras ------------------------------------------------------------- */',
  fs.readFileSync(path.join(HERE, 'extras.css'), 'utf8').trim(),
].join('\n\n');

const PREVIEW = fs.readFileSync(path.join(HERE, 'preview.css'), 'utf8');

/* ------------------------------------------------------------------- previews */

const FONTS = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto+Flex:wght@300..700&family=JetBrains+Mono:wght@400;500;600&display=swap">',
].join('\n  ');

function render(c) {
  return `<!-- @dsCard group="${c.group}" name="${c.name}" subtitle="${c.subtitle}" width="${c.width}" height="${c.height}" -->
<!DOCTYPE html>
<html lang="en" data-theme="light"${c.accent ? ` data-accent="${c.accent}"` : ''}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${c.name} — Luna Parker Design System</title>
  ${FONTS}
  <style>
${TOKENS}
${COMPONENTS}
/* === preview chrome (not part of the system) ============================= */
${PREVIEW}
${c.css || ''}
  </style>
</head>
<body>
  <main class="ds-page">
    <header class="ds-head">
      <h1 class="ds-title">${c.name}</h1>
      <p class="ds-desc">${c.desc}</p>
    </header>
${c.body}
  </main>
</body>
</html>
`;
}

/* ---------------------------------------------------------------------- write */

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const write = (rel, data) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

write('tokens.css', TOKENS + '\n');
write('components.css', COMPONENTS + '\n');
write('README.md', readme);

const cards = [...foundations, ...components];
for (const c of cards) write(c.path, render(c));
write('_cards.json', JSON.stringify(
  cards.map(({ path: p, name, subtitle, group, width, height }) =>
    ({ path: p, name, subtitle, group, width, height })), null, 2));

const kb = (n) => `${(n / 1024).toFixed(1)}kB`;
console.log(`design system -> ${path.relative(process.cwd(), DIST)}`);
console.log(`  tokens.css      ${kb(TOKENS.length)}`);
console.log(`  components.css  ${kb(COMPONENTS.length)}`);
console.log(`  README.md       ${kb(readme.length)}`);
console.log(`  ${cards.length} preview cards`);
