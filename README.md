# lunaparker.github.io

Personal developer + designer portfolio for Luna Parker. Built with Nuxt 3 + TypeScript + SCSS. Deploys to Cloudflare Pages on push to `master` and serves at `shyowlstudios.com` (and intended `lunaparker.dev`).

## Stack

- **Nuxt 3** (Vue 3, Vite) — file-based routing, SSG for static hosting
- **TypeScript** — strict, `.nuxt/tsconfig.json` auto-generated
- **SCSS** (`sass-embedded`) for all styles
- **@nuxt/fonts** — Plus Jakarta Sans, Roboto Flex, JetBrains Mono from Google Fonts
- **@nuxt/eslint** — flat config at `eslint.config.mjs`

## Development

Prereqs: **Node 22+**, npm 10+.

```bash
npm install          # installs deps and runs `nuxt prepare` to generate .nuxt types
npm run dev          # starts Nuxt dev server at http://localhost:3000
npm run lint         # runs ESLint over the project
```

Edit any file under `components/`, `pages/`, `composables/`, or `assets/css/` and the dev server hot-reloads.

## Production build

The site is shipped as static HTML (no Node server at runtime).

```bash
npm run generate     # writes .output/public/ — the deployable static bundle
npm run preview      # serves .output/public/ at http://localhost:3000 for local sanity-check
```

Output is in `.output/public/`. Both `index.html` and `writing/*.html` are pre-rendered; `public/*` files (including `privacy.html` and its CSS deps) are copied over verbatim.

## Deploy

GitHub Actions handles deploy on push to `master`, shipping to **Cloudflare Pages** (project: `lunaparker-portfolio`):

- `.github/workflows/deploy.yml` — runs `npm ci && npx nuxi generate`, then `wrangler pages deploy .output/public` via `cloudflare/wrangler-action`.
- Custom domain (`shyowlstudios.com`) is bound to the Pages project in the Cloudflare dashboard. The Worker route `shyowlstudios.com/api/contact*` takes precedence over Pages, so the contact form keeps working unchanged.

First-time setup:

1. Create the Pages project: `cd /tmp && npx wrangler pages project create lunaparker-portfolio --production-branch=master` (or via the Cloudflare dashboard).
2. Generate a Cloudflare API token with **Account → Cloudflare Pages → Edit** scope and grab your account ID.
3. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub repo secrets (**Settings → Secrets and variables → Actions**).
4. After the first deploy, attach `shyowlstudios.com` (and `www`) to the Pages project under **Pages → lunaparker-portfolio → Custom domains**. Cloudflare will swap the existing DNS records automatically since the zone is on the same account.

Manual deploy: trigger the workflow from the Actions tab (it has `workflow_dispatch`), or run `npx wrangler pages deploy .output/public --project-name=lunaparker-portfolio` locally after `npm run generate`.

## Project layout

```
app.vue                 # root component; renders NuxtLayout + NuxtPage
layouts/default.vue     # <SiteNav> + <slot> + <SiteFooter> frame
pages/
  index.vue             # home — Hero + all section components
  writing/
    index.vue           # writing list
    [slug].vue          # single post; 404s for unknown slugs

components/
  Ui/                   # shared primitives (Icon, Chip, SkillChip, M3Field, …)
  Hero/Wordmark.vue     # oversized-wordmark hero variant (the shipped default)
  sections/             # About, Experience, Projects, Writing, Skills, Contact
  ProjectCard.vue, BlogCard.vue, SiteNav.vue, SiteFooter.vue

composables/useData.ts  # single readonly DATA source — Luna's bio, projects, blog, skills, services

assets/css/
  tokens.scss           # M3 OKLCH token system (verbatim from the design prototype)
  base.scss             # reset, type scale, button/chip/card primitives
  app.scss              # View-Transitions CSS + finalized accent override (indigo)

public/
  privacy.html          # legacy privacy page (served at /privacy.html)
  css/bulma.min.css     # its stylesheet dep
  css/privacy.css
```

## Design system

Colours come from M3 tonal palette generated at runtime via `oklch()` + `color-mix()` from two CSS vars — `--accent-h` (hue) and `--accent-c` (chroma). The shipped accent is indigo `H=265 C=0.19`; brand gradient (`#8A2387 → #E94057 → #F27121`) is reserved for emphasis (LUNA wordmark, hero CTA, footer wordmark, contact heading, featured-post glow).

Dark mode follows OS preference automatically (`prefers-color-scheme`); no toggle UI is shipped.

## PhpStorm

Module config in `.idea/lunaparker-portfolio.iml` excludes `.nuxt/`, `.output/`, `.data/`, `node_modules/`, `dist/` from indexing. Per-user workspace state (workspace.xml, shelf, etc.) is gitignored at `.idea/.gitignore`.

Make sure **Vue.js** and **TypeScript** language services are enabled in Settings. No plugins beyond the defaults bundled with PhpStorm 2023+.

## License

All rights reserved. This is a personal portfolio; please don't repurpose the design or content without asking.
