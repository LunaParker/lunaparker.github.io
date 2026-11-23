---
version: 1
slug: "pages-basic-auth-gateway-privacy-vue"
primary_target: "pages/basic-auth-gateway/privacy.vue"
related_targets: ["components/ProductPolicy.vue"]
---

# Product privacy policy pages

Scope: `/<product>/privacy/`, first `/basic-auth-gateway/privacy/`. Mode: Read.

Readers: Chrome Web Store reviewers checking the listing's policy link, and people deciding whether to install the extension. Their question: what does it store, where, and does anything leave my computer?

Source: the product repo's PRIVACY.md, copied verbatim into `content/<product>/privacy.md` and rendered at build. Copy is never reworded; the only presentational change is that the title's "for <product>" is carried by the product mark (kept in the h1 for assistive tech).

Constraints: portfolio world (tokens, Plus Jakarta Sans / Roboto Flex / JetBrains Mono, brand gradient); the product's icon and name are the identifying mark; light and dark; reusable for later products.

## Direction contract

THESIS: The structure is the contents. Each section's number and heading sit in a left margin beside its text, so a reader scans the margin to find "Removing your data" without a separate table of contents. Refuses the centred single column with a stacked kicker over a giant title.

OWN-WORLD: White (or near-black) ground under the site's two radial washes; ink headings in Plus Jakarta Sans 700-800, Roboto Flex body at 17px in on-surface-variant, mono numerals in the accent's text colour, one hairline per section spanning margin and column, the product's violet icon tile as the only foreign colour, brand-gradient title.

STORY: The reader learns which product this covers, when it was updated, and the one-paragraph answer, then finds any section by its margin head and reads it in a calm 66-character column.

FIRST VIEWPORT: Site nav. Left margin (about 300px): product icon tile at 56px with name and "Browser extension", then "Last updated" and the date. Right column (about 680px): "Privacy policy" in gradient display type up to 6rem, two lede paragraphs at 20px. Below, a hairline and section 01's margin head beside its first paragraphs.

FORM: Margin heads, position 4 of 7 on the ranked list. seed:de1f700761db8ca0. Signature interaction: margin heads stick beside their section while it scrolls, so the reader always sees where they are; one stagger entrance on the header.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Whether anything on the site links to product pages (none yet; the route is prerendered explicitly).
