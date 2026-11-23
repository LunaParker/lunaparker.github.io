---
name: lunaparker.dev
description: Luna Parker's portfolio and the home of Shy Owl Studios, built so the site itself is the work sample.
colors:
  primary: "oklch(0.50 0.19 265)"
  primary-text: "oklch(0.50 0.19 265)"
  on-primary: "oklch(0.99 0 0)"
  primary-container: "oklch(0.92 0.05 265)"
  on-primary-container: "oklch(0.22 0.09 265)"
  secondary: "oklch(0.50 0.10 325)"
  secondary-container: "oklch(0.92 0.04 325)"
  on-secondary-container: "oklch(0.22 0.07 325)"
  tertiary: "oklch(0.55 0.11 215)"
  tertiary-container: "oklch(0.92 0.045 215)"
  error: "oklch(0.56 0.19 27)"
  shy-owl-primary: "oklch(0.50 0.17 333)"
  brand-plum: "#8A2387"
  brand-coral: "#E94057"
  brand-tangerine: "#F27121"
  surface: "oklch(1 0 0)"
  surface-container-low: "oklch(0.975 0 0)"
  surface-container: "oklch(0.955 0 0)"
  surface-container-high: "oklch(0.93 0 0)"
  surface-container-highest: "oklch(0.90 0 0)"
  on-surface: "oklch(0.14 0 0)"
  on-surface-variant: "oklch(0.40 0 0)"
  outline: "oklch(0.55 0 0)"
  outline-variant: "oklch(0.88 0 0)"
  primary-dark: "oklch(0.55 0.25 265)"
  primary-text-dark: "oklch(0.86 0.19 265)"
  primary-container-dark: "oklch(0.35 0.12 265)"
  surface-dark: "oklch(0.11 0 0)"
  surface-container-dark: "oklch(0.16 0 0)"
  surface-container-high-dark: "oklch(0.20 0 0)"
  on-surface-dark: "oklch(0.93 0 0)"
  on-surface-variant-dark: "oklch(0.74 0 0)"
  outline-variant-dark: "oklch(0.28 0 0)"
typography:
  display-xl:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 14vw, 14rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.05em"
  display-lg:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  display-md:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  display-sm:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Roboto Flex, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Roboto Flex, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
    fontFeature: "\"ss01\", \"cv11\""
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "28px"
  2xl: "36px"
  full: "9999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section-y: "clamp(4rem, 10vh, 8rem)"
  section-header-gap: "3rem"
  card-inset: "1.75rem"
  container-max: "1440px"
  reading-measure: "40rem"
components:
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  button-filled-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  button-outlined-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
  button-brand:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "0.85rem 1.5rem"
  button-brand-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.full}"
    padding: "0.5rem 0.75rem"
  chip:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.75rem"
  chip-primary:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.75rem"
  card:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.xl}"
    padding: "1.75rem"
  field:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "24px 18px 14px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
  nav-link-hover:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
  inline-code:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "0.12em 0.4em"
---

# Design System: lunaparker.dev

## Overview

**Creative North Star: "The Living Work Sample"**

The site is the proof of the work it describes, so the system is built from a small set of confident moves rather than decoration. A pure achromatic ground (white in light, near-black in dark) carries two faint radial washes in the accent and tertiary hues; on top of it sit oversized, tightly tracked Plus Jakarta Sans headlines, a calm Roboto Flex reading voice, and JetBrains Mono for anything that is metadata. Color is rationed: one derived accent family for interaction, and the magenta-to-orange brand gradient as a signature on display type and small marks.

Structure follows Material 3's vocabulary (tonal surface containers, a shape scale, filled, outlined and text buttons) but is tuned to feel expressive rather than stock: pill buttons that invert to ink on hover, spring easings with a slight overshoot, staggered entrances, and scroll-linked heading growth. Density is generous; sections breathe with viewport-relative padding, and reading surfaces hold a single measure.

Every route inherits one accent derived from two numbers. `/shy-owl/` changes those two numbers and nothing else, and product pages such as `/<product>/privacy/` stay in the portfolio's world while showing the product's own icon and name as their mark.

**Key Characteristics:**
- Achromatic surfaces; color comes only from the derived accent family and the brand gradient.
- Display type at weight 700 to 800 with negative tracking that tightens as size grows.
- Mono uppercase labels for metadata, numerals and field labels.
- Pill-shaped actions that invert to ink, with spring motion scaled by one multiplier.
- Light and dark from one token set, following the OS with a manual override.

## Colors

A neutral, chroma-zero ground with one OKLCH-derived accent family (indigo site-wide, magenta on `/shy-owl/`) and a three-stop brand gradient reserved for signature moments.

### Primary
- **Signal Indigo** (`primary`): filled buttons, focus rings, list bullets, the primary wash in the page background, link and hover borders on project cards. Derived from `--accent-h: 265` and `--accent-c: 0.19`, set in `assets/css/app.styl` over the default in `tokens.styl`.
- **Indigo Ink** (`primary-text`): accent-colored text such as text buttons, links inside reading copy, focused field labels and the policy section numerals. In dark mode it lifts to a light tint (`primary-text-dark`) so accent text stays legible on near-black.
- **Indigo Mist** (`primary-container`, `on-primary-container`): the tonal fill and ink for primary chips.
- **Studio Magenta** (`shy-owl-primary`): the same derivation with `--accent-h: 333` and `--accent-c: 0.17`, applied when `pages/shy-owl.vue` sets `data-accent="shy-owl"` on the root element. Every primary, secondary and tertiary role re-derives from it in both themes.

### Secondary
- **Muted Orchid** (`secondary`, `secondary-container`): the accent hue rotated +60 degrees at low chroma. Present in the token set for tonal fills; little shipped UI uses it.

### Tertiary
- **Lagoon** (`tertiary`, `tertiary-container`): the accent hue rotated -50 degrees. Its main shipped role is the second radial wash at the page's left edge (6% mix).

### Brand Gradient
- **Shy Owl Gradient** (`brand-plum` to `brand-coral` to `brand-tangerine`): the studio's signature, in 90, 180 and 135 degree variants. It fills display headlines as gradient text (the policy page's "Privacy policy" title), the Shy Owl button's hover state, poster route lines and soft blurs, and small marks.

### Neutral
- **Paper** (`surface`) and **Ink Night** (`surface-dark`): the page ground in each theme, pure achromatic.
- **Container steps** (`surface-container-low` through `surface-container-highest`): tonal layers for cards (container), fields, chips, inline code and the mobile nav panel (container-high).
- **Ink** (`on-surface`): headings, strong text, and the inverted fill of hovered buttons.
- **Graphite** (`on-surface-variant`): body copy on reading pages, nav links, secondary metadata.
- **Outline** (`outline`) and **Hairline** (`outline-variant`): outlined button strokes, and the 1px borders on cards, chips, fields, the scrolled nav and the footer.

### Named Rules
**The Neutral Ground Rule.** Surfaces carry zero chroma in both themes. Emphasis comes from the accent family and the brand gradient, never from tinting a surface.

**The Two Numbers Rule.** Every accent role derives from `--accent-h` and `--accent-c`. Re-theming a route means overriding those two custom properties on the root element, never redefining individual roles.

**The Signature Rule.** The brand gradient is a mark: display headlines, a button's hover, a line, a blur, a dot. It is not a page ground or a surface under body text.

## Typography

**Display Font:** Plus Jakarta Sans (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Roboto Flex (with ui-sans-serif, system-ui, sans-serif), the variable file via Fontsource
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Menlo, monospace), stylistic sets `ss01` and `cv11`

**Character:** A geometric display face pushed heavy and tight against a neutral, highly legible variable sans; the mono voice marks anything that is data rather than prose.

### Hierarchy
- **Display XL to SM** (800 to 700, fluid clamps from 14rem down to 3rem, line-height 0.88 to 1.05): hero wordmark, section titles, the footer wordmark, page titles such as the policy title (800, up to 6rem, -0.045em).
- **Headline** (600, clamp to 2.25rem, 1.15): sub-section heads.
- **Title** (600, clamp to 1.4rem, 1.3): card and item titles; the policy margin heads sit between title and headline (700, up to 1.625rem).
- **Body Large** (400, 1.125rem, 1.55): section subtitles and ledes; the policy lede runs at 1.25rem / 1.6.
- **Body** (400, 1rem, 1.6; the root is 16px / 1.55): running text. Long-form reading copy steps up to 1.0625rem / 1.7 in on-surface-variant.
- **Label** (500, 0.75rem, 0.08em, uppercase, mono): dates, product kinds, field labels when raised, and numerals.

All headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

### Named Rules
**The Tight Display Rule.** Display tracking tightens as size grows, from -0.01em at title size to -0.05em at the largest display. Never set large display type at default tracking.

**The Mono Means Data Rule.** JetBrains Mono is for metadata, numerals, field labels and inline code. Prose never sets in mono.

## Layout

A centered container (max 1440px) with a fluid gutter of `clamp(1rem, 4vw, 3rem)`. Sections pad vertically by `clamp(4rem, 10vh, 8rem)`, and section headers sit 3rem above their content with title and action baseline-aligned. The nav is fixed; it is transparent at the top and gains a 78% surface tint with a saturated blur and a hairline once scrolled. The page background's two radial washes are attached to the viewport so they stay in the corner they were authored for.

Reading pages hold one measure. The product policy layout uses a 1060px two-column grid (a 320px margin column and a flexible text column, gap `clamp(3rem, 5vw, 4.5rem)`), with every lede and body block capped at the shared 40rem measure so all text shares one right edge. Below 960px it collapses to one column and the margin heads stack above their text; below 600px the lede steps down to 1.125rem.

Breakpoints in use: 960px (policy grid), 860px (nav collapses to a toggle and panel), 720px (`hide-on-mobile`), 600px (policy lede).

### Named Rules
**The One Measure Rule.** A reading surface sets one maximum line length for every block of prose on it (40rem on product policies), so the right edge never jumps.

## Elevation & Depth

Depth is tonal first: surfaces step through the neutral container scale and separate with 1px hairlines. Shadows are rare and soft, never offset hard, and usually appear as a response to state: a 4px halo ring around a hovered filled button, an accent-tinted glow under a hovered brand button, a deeper accent-mixed shadow under hovered studio project tiles. The resting exceptions are floating chrome (the theme toggle's popover) and the product icon tile, whose glow takes the product's own accent.

### Shadow Vocabulary
- **Halo ring** (`box-shadow: 0 0 0 4px color-mix(in oklch, var(--on-surface) 14%, transparent)`): filled button hover.
- **Accent glow** (`box-shadow: 0 4px 22px -2px color-mix(in oklch, var(--primary) 40%, transparent)`): brand button hover.
- **Product tint** (`box-shadow: 0 10px 26px -10px color-mix(in oklch, var(--product-accent, #000) 70%, transparent)`): the product icon tile in a policy header.
- **Floating panel** (`box-shadow: 0 1px 2px color-mix(in oklch, var(--on-surface) 8%, transparent), 0 12px 32px -10px color-mix(in oklch, var(--on-surface) 22%, transparent)`): popovers such as the theme toggle.

### Named Rules
**The Flat-at-Rest Rule.** Content surfaces sit flat. A shadow appears for state, for floating chrome, or to give a product's own icon its color.

## Shapes

Material's shape scale, applied with conviction: pills (`full`) for every button, nav link and the skip link; large 28px corners (`xl`) on cards and project cards; 16px (`lg`) on fields; 12px (`md`) on product icon tiles; 8px (`sm`) on chips; 4px (`xs`) on inline code and focus rings. Borders are 1px and use the hairline color. Round dots (5px list bullets in the accent, the radial washes) are the recurring small geometry.

## Components

### Buttons
Confident pills that invert to ink.
- **Shape:** fully rounded (9999px), 0.85rem by 1.5rem, weight 600 at 0.95rem, icon gap 0.6rem, never wrapping.
- **Filled:** accent fill with on-primary text; on hover it turns to ink with surface text and a 4px translucent halo. Used for the nav's "Get in touch".
- **Outlined:** transparent with a 1px outline stroke; on hover it fills with ink. The most used variant, including the policy page's "Back to portfolio".
- **Brand:** ink fill that turns to the accent with an accent glow on hover.
- **Text:** accent-ink label, tighter padding.
- **Shy Owl gradient:** ink fill whose hover cross-fades the 135-degree brand gradient in underneath the label, with a coral glow.
- **Press:** every button scales to 0.96 on `:active` with the fast spring.

### Chips
- **Style:** 8px corners, container-high fill, hairline border, 0.8rem weight 500 in on-surface-variant.
- **Variants:** tonal (10% ink mix, no border) and primary (primary-container fill and ink).

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** surface-container, or transparent with a hairline for the outlined variant.
- **Shadow Strategy:** flat at rest (see Elevation & Depth); project cards lift 6px and take an accent border on hover.
- **Internal Padding:** 1.75rem.

### Inputs / Fields
- **Style:** M3 filled field: container-high fill, 16px corners, hairline border, a 15px body-font label resting inside.
- **Focus:** the border turns accent and the label floats up into a mono uppercase 11px label in accent ink.

### Navigation
- **Style:** brand wordmark in display 800 at 17px; links at 14px weight 500 in on-surface-variant as pills that take a container-high fill on hover; the filled button as the single call to action.
- **Mobile:** below 860px a toggle opens a container-high panel with 20px corners and full-width links.

### Product Policy (signature component)
The reusable layout for `/<product>/privacy/` (`components/ProductPolicy.vue`), fed by the product's own policy markdown, parsed unchanged.
- **Mark:** the product's icon as a 56px tile with 12px corners and a shadow tinted by the per-product `accent`, beside the product name (display 700, 1.1875rem) and its kind as a mono label. "Last updated" follows as a label over the date in display 600.
- **Title:** the policy title in gradient text, display 800 up to 6rem; a trailing "for <product>" is kept for assistive tech but hidden, since the mark already names the product.
- **Margin heads:** each section opens with one hairline spanning both columns (`color-mix(in oklch, var(--on-surface) 12%, transparent)`), a two-digit mono numeral in accent ink, and its heading in the margin column. The margin head is sticky at 6rem from the top; when pinned (a `scroll-state(stuck: top)` container query) the numeral turns to ink at weight 600, so the reader sees which section they are in.
- **Body:** 1.0625rem / 1.7 in on-surface-variant at the 40rem measure; accent dot bullets; links in accent ink with a 1px underline offset 3px; strong text in ink.
- **Inline code:** mono at 0.875em on container-high with 4px corners and cloned box decoration; each word is its own non-wrapping span, so commands break only at spaces and never inside a hyphenated name.
- **Entrance:** the header uses the shared stagger entrance.

### Motion
Spring easings (`spring-fast` and `spring-standard` with overshoot, `spring-gentle` and `spring-emphasized` as cubic curves) drive every transition. Durations of 180, 360, 600 and 900ms are all multiplied by `--motion`, which reduced-motion preferences set to 0.01. Entrances stagger children by 80ms with a rise and slight scale; JS-revealed content self-reveals after 1400ms if hydration never lands. Page changes cross-fade through View Transitions at 500ms on the emphasized curve.

## Do's and Don'ts

### Do:
- **Do** reference color through the role tokens (`--primary`, `--primary-text`, `--on-surface-variant`) so light, dark and the `/shy-owl/` accent all follow automatically.
- **Do** use `--primary-text`, not `--primary`, for accent-colored text.
- **Do** re-theme a route by setting `--accent-h` and `--accent-c` on the root element, the way `data-accent="shy-owl"` does.
- **Do** scale every duration by `--motion` and use the spring easings for transitions.
- **Do** give each reading page one shared measure (40rem on product policies) and give a product page its own icon and name as its mark, with the product's accent only on the icon's shadow.
- **Do** author styles in indented Stylus, and wrap CSS `min()`, `max()`, `color-mix()` and space-separated `rgb()` in `unquote()`, because Stylus otherwise evaluates them at compile time. Write container queries that Stylus cannot parse inside an `@css` block.

### Don't:
- **Don't** tint surfaces with the accent hue; the ground stays achromatic in both themes.
- **Don't** fill a page ground or a body-text surface with the brand gradient.
- **Don't** set prose in JetBrains Mono, or set large display type at default tracking.
- **Don't** bring a product's accent into the page's own palette; it belongs to the product's icon tile only.
- **Don't** use hard, offset or ungraded shadows; depth is tonal, and shadows are soft and state-driven.
