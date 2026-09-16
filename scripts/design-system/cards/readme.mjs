// The design system's own README, shipped into the bundle. Kept as a module
// rather than a .md file so the repo keeps only CLAUDE.md and README.md.
export const readme = `# Luna Parker — Portfolio Design System

The system behind [lunaparker.dev](https://lunaparker.dev) and the Shy Owl Studios
studio page. Material 3 Expressive, expressed in OKLCH, with a fixed brand
gradient laid over an otherwise strictly neutral surface palette.

**This bundle is generated.** Every stylesheet in it is compiled from the site's
own Stylus sources by \`scripts/design-system/build.mjs\` in the portfolio repo, so
it cannot drift from what the site actually ships. Edit the source, re-run
\`npm run design-system\`, re-sync.

## The one idea

Every colour role is computed from two custom properties:

\`\`\`css
--accent-h: 265;   /* hue    */
--accent-c: 0.19;  /* chroma */
\`\`\`

Secondary sits 60° clockwise of that hue, tertiary 50° counter-clockwise, and
the dark palette lifts lightness rather than swapping hue. Change those two
lines and the whole system re-derives, in both palettes, with no other edit.

Three presets ship:

| Selector | Accent | Where |
|---|---|---|
| \`:root\` | Indigo, h 265 / c 0.19 | lunaparker.dev |
| \`[data-accent="shy-owl"]\` | Magenta, h 333 / c 0.17 | the \`/shy-owl\` studio page |
| \`[data-accent="cyan"]\` | Cyan, h 195 / c 0.14 | base system default |

Surfaces are deliberately excluded from this. They are pure monochrome at every
step, so colour in the interface always means emphasis and never decoration.
The brand gradient is the single exception to the derivation rule: it is fixed
hex, identical in light and dark, which is exactly what lets it read as a mark.

## Files

- **\`tokens.css\`** — every custom property: colour roles, both palettes, the
  brand gradient, the shape scale, springs and durations, the three families.
  Depends on nothing. Compiled from \`assets/css/tokens.styl\` plus the accent
  override in \`assets/css/app.styl\`.
- **\`components.css\`** — the component layer: type scale, buttons, chips, cards,
  the M3 field, navigation, section header, motion utilities. Requires
  \`tokens.css\`. Compiled from \`assets/css/base.styl\`, the non-token half of
  \`app.styl\`, and the scoped style blocks of \`M3Field.vue\`, \`ProjectCard.vue\`
  and \`SiteNav.vue\`.
- **\`foundations/\`**, **\`components/\`**, **\`patterns/\`** — one self-contained
  preview page per card. Each inlines both stylesheets, so it opens standalone.

To consume the system, take the two stylesheets; the previews are specimens,
not a dependency.

\`\`\`html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
\`\`\`

Fonts are Plus Jakarta Sans (display), Roboto Flex (body) and JetBrains Mono
(labels and data). The previews pull them from Google Fonts; the live site
self-hosts them through \`@nuxt/fonts\`.

## Rules worth keeping

- **Radius encodes what a thing is.** Chips 8px, fields 16px, cards 28px,
  every button fully round. A component picks one step and keeps it. Because
  radius carries that signal, almost nothing needs a shadow at rest.
- **Hover inverts, it does not tint.** Buttons swap fill and text colour
  outright. Press is a uniform \`scale(0.96)\`.
- **Use \`--primary\` for fills and \`--primary-text\` for type.** They are
  identical in light; in dark, \`--primary-text\` lifts to L 0.86 so accent text
  stays readable on a near-black surface.
- **Ration the gradient.** A 12px dot beside a section kicker, the occasional
  display phrase, the studio button on hover. As a background wash it flattens
  the neutral surfaces the rest of the system depends on.
- **Motion scales from one variable.** Every duration is
  \`calc(n * var(--motion))\`, so \`prefers-reduced-motion\` collapses the whole
  system by setting \`--motion\` to 0.01. Never hard-code a duration.
- **The field label changes typeface on float**, from 15px body sans to 11px
  mono uppercase. It is the system's signature interaction; keep it.

Hex values shown on the colour card are chroma-mapped references; the OKLCH
expressions are canonical.
`;
