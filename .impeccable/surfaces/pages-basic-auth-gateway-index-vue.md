---
version: 1
slug: "pages-basic-auth-gateway-index-vue"
primary_target: "pages/basic-auth-gateway/index.vue"
related_targets: []
---

# Product landing pages

Scope: `/<product>/`, first `/basic-auth-gateway/`. Mode: Persuade.

Visitors: people on a team that shares a DEV or staging login, sent here to set the extension up, and anyone following the store listing back to its maker. They must leave with the host for their computer and the extension, and know the one command that installs the host.

Content (pinned by Luna): the product's icon and name, a one-sentence subtitle, and three actions: "Download Host (Windows, x64)", "Download Host (macOS)" opening a menu of Apple silicon and Intel, and "Chrome Extension". Also the release version, a link to the release's SHA256SUMS, a link to the product's privacy policy, and a short install hint. Hosts download from R2 at `files.lunaparker.dev/basic-auth-gateway/<tag>/`; the extension links to its Chrome Web Store listing (Private until Luna publishes it).

Copy: the subtitle is the extension manifest's own description; install facts come from the product README and are not embellished.

## Direction contract

THESIS: The landing and the policy are one family: the same 320px margin and text column, so the margin always holds the product and the column holds what to do with it. Refuses the centred icon-over-title stack and the feature-card grid of a stock download page.

OWN-WORLD: The portfolio's neutral ground and washes; the product icon at 160px with its violet-tinted shadow as the only foreign colour; the name in brand-gradient display type, Plus Jakarta Sans 800 up to 6rem, matching the policy title; the subtitle in Roboto Flex at 1.25rem; ink pills for the two hosts, an outlined pill for the store; mono label-over-value pairs under the icon; commands on surface-container blocks with 16px corners.

STORY: The visitor learns what it does in one sentence, downloads the host for their computer, adds the extension from the store, and runs the install command shown for the file they chose.

FIRST VIEWPORT: Nav. Margin: the 160px icon, then Version, Checksums and Privacy as label over value. Column: "Basic Auth Gateway" on two lines at 6rem, the subtitle at 1.25rem, the two host buttons side by side with the store button beneath; when the column is under 600px all three stack at full width. Below, a hairline and the "Install the host" margin head beside the commands.

FORM: seed: none (pinned) "features the product logo and name, a subtitle with a brief description, and then 3 buttons"; the world is the existing DESIGN.md system, since this page extends the portfolio rather than starting a new world. Signature interaction: choosing Apple silicon or Intel switches the install commands to that file's name; on load the icon's three password dots fill in one by one.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Whether the policy page links back to the landing page.
- A shared component for later products: extract when the second product arrives.
