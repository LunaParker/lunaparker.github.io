// The design system's own README, shipped into the bundle. Kept as a module
// rather than a .md file so the repo keeps only CLAUDE.md and README.md.
export const readme = `# Luna Parker — Portfolio Design System

The system behind [lunaparker.dev](https://lunaparker.dev) and the Shy Owl Studios
studio page. Material 3 Expressive, expressed in OKLCH, with a fixed brand gradient
laid over an otherwise strictly neutral surface palette.

**This bundle is generated.** Every stylesheet in it is compiled from the site's
own Stylus sources by \`scripts/design-system/build.mjs\` in the portfolio repo, so
it cannot drift from what the site actually ships. Edit the source, re-run
\`npm run design-system\`, re-sync.

## The one idea

Every accent role is computed from two custom properties:

\`\`\`css
--accent-h: 265;   /* hue    */
--accent-c: 0.19;  /* chroma */
\`\`\`

\`secondary\` sits 60° clockwise of that hue, \`tertiary\` 50° counter-clockwise, and the
dark palette lifts lightness rather than swapping hue. Change those two lines and
every accent role re-derives, in both palettes, with no other edit.

Three accents ship:

| Selector | Accent | Where |
|---|---|---|
| \`:root\` | Indigo, h 265 / c 0.19 | lunaparker.dev |
| \`[data-accent="shy-owl"]\` | Magenta, h 333 / c 0.17 | the \`/shy-owl\` studio page |
| \`[data-accent="cyan"]\` | Cyan, h 195 / c 0.14 | the default the source ships before the indigo override |

Surfaces are excluded from the derivation. They are pure monochrome at every step, so
colour in the interface always means emphasis and never decoration. The brand gradient
is the single exception to the rule: fixed hex, identical in light and dark, which is
exactly what lets it read as a mark.

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

## Colour

Use \`primary\` for fills, where the surface does the contrast work, and \`primary-text\`
for type, where it cannot. They are identical in light; in dark, \`primary-text\` lifts
to L 0.86 so accent text stays readable on a near-black surface.

Set body copy in \`on-surface\` and secondary copy — captions, kickers, meta rows — in
\`on-surface-variant\`. Both clear 4.5:1 on \`surface\` and on every step of the container
ladder, in both palettes.

Reach for depth with tone, never shadow. Five neutral steps run from
\`surface-container-lowest\` to \`surface-container-highest\`; in light they descend from
white, in dark they climb from near-black. Because no step is tinted, an accent placed
on any of them reads the same.

Draw interactive borders in \`outline\` and dividers and resting card borders in
\`outline-variant\`. \`outline-variant\` sits near 1.4:1 — never give it a border that
carries meaning.

Ration \`secondary\` and \`tertiary\`. They exist to keep the M3 role set complete, not to
give the brand a second colour; \`tertiary\` mostly appears as the second radial wash on
the page background, at 6%.

One pair in the source misses the floor: white \`on-tertiary\` on a light \`tertiary\`
fill reads 4.45:1. It is kept exact. For small type prefer \`on-tertiary-container\` on a
\`tertiary-container\` panel.

## Type

Three families with fixed jobs:

- \`display\` — Plus Jakarta Sans. Headings and display type. Every \`h1\`–\`h6\` uses it.
- \`body\` — Roboto Flex, one variable file, wght 100–1000. Body, UI and form input.
- \`mono\` — JetBrains Mono. Labels, kickers, floated field labels and data.

The previews pull all three from Google Fonts; the live site self-hosts them through
\`@nuxt/fonts\`.

The scale is fluid: \`display-xl\` through \`title\` are \`clamp()\` expressions, so any size
quoted for them is the desktop end of a range rather than a fixed value. Display sizes
tighten their tracking as they grow: by \`display-xl\` the letter-spacing is −0.05em and
the leading has dropped below 1.

Hold body text to a 1.55–1.6 line-height and under about 65 characters a line. Set
kickers, field labels and data in \`label\`: 12px mono, uppercase, 0.08em tracking.

## Shape

Radius encodes what a thing is, so a component picks one step and keeps it:

| Token | | Use |
|---|---|---|
| \`shape-xs\` | 4px | Focus-ring rounding only |
| \`shape-sm\` | 8px | Chips |
| \`shape-md\` | 12px | Mobile nav links |
| \`shape-lg\` | 16px | Form fields, small panels |
| \`shape-xl\` | 28px | Cards, project tiles |
| \`shape-2xl\` | 36px | Large feature panels |
| \`shape-full\` | 9999px | Every button, nav link, skip link |

Because radius carries that signal, almost nothing needs a shadow at rest. The jump
from 8px chips to 28px cards to fully round buttons is doing the work a border or a
shadow would otherwise have to do.

There is no spacing scale. Layout spacing is written literally in \`components.css\`,
mostly in \`rem\` and \`clamp()\`; the \`container\` caps at 1440px with
\`clamp(1rem, 4vw, 3rem)\` of side padding, and a \`section\` takes
\`clamp(4rem, 10vh, 8rem)\` of vertical padding.

## Motion

Every duration is \`calc(n * var(--motion))\`. Never hard-code one: the
\`prefers-reduced-motion\` rule in \`tokens.css\` collapses the whole system by setting
\`motion\` to 0.01.

Reach for \`spring-gentle\` for colour and opacity — anything that must not bounce — and
\`spring-emphasized\` for view transitions and page-level morphs. Two overshooting
\`linear()\` springs sit alongside them: use \`--spring-fast\` for press, chip and tooltip
entry and card lift, and \`--spring-standard\` for staggered entry and scroll reveals.
All four, and the four durations \`--dur-short\` (180ms), \`--dur-med\` (360ms),
\`--dur-long\` (600ms) and \`--dur-xl\` (900ms), live in \`tokens.css\`.

Press is a uniform \`scale(0.96)\` on \`.btn\`.

## The brand gradient

\`brand-gradient\` is the Shy Owl signature and the one value that never re-derives:
plum \`#8a2387\` → rose \`#e94057\` → amber \`#f27121\`, at 90°, with \`brand-gradient-v\` at
180° and \`brand-gradient-135\` at 135°.

Ration it. A 12px dot beside a section kicker, the occasional display phrase, the studio
button on hover. As a background wash it flattens the neutral surfaces the rest of the
system depends on. Four places use it and no more: \`.gradient-text\` (background-clip,
one phrase, never a paragraph), \`.gradient-fill\` (always with white type — nothing else
clears all three stops), \`.section-kicker::before\` (the 12px dot), and
\`.btn-gradient:hover\`, where it cross-fades in on a \`::before\`.

## Components

The layer in \`components.css\`, by family. Each card in this system is a showcase page
carrying the real markup — copy from it rather than re-deriving the classes.

- **Buttons** — \`.btn\` plus one of \`.btn-filled\`, \`.btn-tonal\`, \`.btn-outlined\`,
  \`.btn-text\`, \`.btn-brand\`, \`.btn-gradient\`. All fully round. Hover inverts, it does
  not tint: \`.btn-filled\` swaps to \`on-surface\` on \`surface\` outright.
- **Chips** — \`.chip\`, with \`.chip-tonal\`, \`.chip-primary\` or \`.chip-linked\`. 8px
  radius, 0.8rem type, \`on-surface-variant\` by default.
- **Cards** — \`.card\` at \`shape-xl\` on \`surface-container\`, or \`.card-outlined\` on
  transparent with an \`outline-variant\` border. \`.project-card\` adds the featured,
  wide, tall and square tiles and the hover overlay.
- **Form fields** — \`.m3-field\`, with \`--active\`, \`--focused\` and \`--select\`
  modifiers. The label changes typeface on float, from 15px body sans to 11px mono
  uppercase, and takes \`primary-text\` while focused. It is the system's signature
  interaction; keep it.
- **Navigation** — \`.nav\`, transparent until \`.nav--scrolled\`, with \`.nav__link\`,
  \`.nav__cta\` and the \`.nav__mobile-panel\`.
- **Section header** — \`.section-header\` with \`.section-kicker\`, a numbered mono
  kicker preceded by the 12px gradient dot, a display title and an optional action.

There is no JavaScript in the bundle: this system is a stylesheet and a set of
specimens, not a component library. Consume it by loading \`tokens.css\` then
\`components.css\` and writing the markup yourself.

## Iconography

Icons are the system's own set, not a library: 29 Material-style outline glyphs on a
24×24 grid, \`fill: none\`, \`stroke: currentColor\`, stroke-width 1.75, round caps and
joins, rendered at 20px by default. They cover navigation and action (\`arrow\`,
\`arrowUpRight\`, \`chev\`, \`chevDown\`, \`close\`, \`menu\`, \`download\`, \`check\`), contact
(\`mail\`, \`phone\`, \`pin\`, \`github\`, \`linkedin\`), theming (\`sun\`, \`moon\`, \`tweaks\`,
\`sparkles\`), service marks (\`webDesign\`, \`webDev\`, \`wordpress\`, \`database\`, \`monitor\`,
\`custom\`, \`consult\`, \`a11y\`, \`shield\`) and three ornaments (\`heart\`, \`maple\`, \`dot\`).
The set lives in \`components/Ui/Icon.vue\` in the portfolio repo, which is both the
source of the glyphs and the component that renders them.

**Every icon in this system is Material-style, and stays that way.** Draw a new one to
match the set: 24×24 viewBox, outlined rather than filled, 1.75 stroke, round caps and
joins, geometry on whole or half units, one idea per glyph, legible at 20px. Reach for a
fill only where the shape needs weight, as \`dot\`, \`heart\` and the service marks do.
Don't mix idioms — no drop-ins from Lucide, Font Awesome, Phosphor or any other library,
even for a glyph the set lacks. Draw it, or redraw a Material Symbols outline at 1.75.

Because they stroke in \`currentColor\`, colour them by setting \`color\` on the parent —
\`var(--on-surface)\` normally, \`var(--primary-text)\` for an accent icon — and never bake
a token into the path.

## Writing

Write in the first person singular, sentence case, no emoji. Long sentences are fine
when they earn it — semicolons and parentheticals are part of the voice:

> I'm a full-stack developer; I've been building for the web since high school.

> I specialise in Laravel and WordPress (and, in practice, whatever else the problem
> calls for). After all, the right tool is rarely the trendiest one.

Set section kickers as a two-digit number, an em dash and one word, in \`label\`:
\`01 — About\`, \`03 — Projects\`. Keep display headings to a short clause with no full
stop — *I build the whole thing end-to-end*, *From client kickoff to deployed code*.
Prose uses Canadian spellings (*colour*, *specialise*); CSS property names stay
American, as CSS requires.
`;
