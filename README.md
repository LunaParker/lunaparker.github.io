# lunaparker.dev

Personal developer & designer portfolio for Luna Parker. Built with Nuxt 3 + TypeScript + Stylus, deployed as static HTML to Cloudflare Pages, with a small Cloudflare Worker handling the contact form. Lives at [lunaparker.dev](https://lunaparker.dev).

## Stack

- **Nuxt 3** (Vue 3, Vite) — file-based routing, SSG for static hosting
- **TypeScript** — strict, `.nuxt/tsconfig.json` auto-generated
- **Stylus** (indented syntax) for all styles
- **@nuxt/fonts** — Plus Jakarta Sans, Roboto Flex, JetBrains Mono via Google Fonts
- **@nuxt/eslint** — flat config at `eslint.config.mjs`
- **Cloudflare Pages** for static hosting
- **Cloudflare Workers** for the contact form API (Turnstile + Discord webhook)

## Quick start

Prereqs: **Node 22+**, npm 10+.

```bash
git clone https://github.com/lunaparker/lunaparker.github.io.git
cd lunaparker.github.io
npm install        # installs deps and runs `nuxt prepare` to generate .nuxt types
npm run dev        # http://localhost:3000
```

Edit anything under `components/`, `pages/`, `composables/`, or `assets/css/` and the dev server hot-reloads. The contact form Worker is a separate sub-package — see [Contact form Worker](#contact-form-worker) below if you need it running locally.

## Build

The site ships as static HTML with no Node server at runtime.

```bash
npm run generate   # writes .output/public/ — the deployable static bundle
npm run preview    # serves .output/public/ on http://localhost:3000 to sanity-check the build
npm run lint       # ESLint over the project
npm run icons      # regenerates favicons + OG card from the brand gradient
```

`.output/public/` is the artifact you ship to any static host.

## Contact form Worker

Located in `worker/` as a separate npm package. Verifies a Cloudflare Turnstile token, then forwards the submission to a private Discord webhook. Routed at `lunaparker.dev/api/contact*`.

```bash
cd worker
npm install
npx wrangler dev                              # local Worker on :8787, reads worker/.dev.vars
npx wrangler deploy                           # ships to Cloudflare; wrangler.toml is source of truth
npx wrangler secret put TURNSTILE_SECRET      # rotate Turnstile secret
npx wrangler secret put DISCORD_WEBHOOK_URL   # rotate Discord webhook
npx wrangler tail                             # stream live Worker logs
```

For local dev, Cloudflare ships test keys that always pass: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`. Drop the secret into `worker/.dev.vars` (template at `worker/.dev.vars.example`), then start the Nuxt dev server with:

```bash
NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA \
NUXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8787 \
npm run dev
```

`worker/.dev.vars` is gitignored — never commit real secrets.

## Deploy

GitHub Actions handles deploy on push to `master`, shipping to **Cloudflare Pages** (project: `lunaparker-portfolio`):

- `.github/workflows/deploy.yml` runs `npm ci && npx nuxi generate`, then `wrangler pages deploy .output/public` via `cloudflare/wrangler-action`.
- Custom domain `lunaparker.dev` is bound to the Pages project in the Cloudflare dashboard. The Worker route `lunaparker.dev/api/contact*` takes precedence over Pages on the same hostname.

First-time setup:

1. Create the Pages project: `npx wrangler pages project create lunaparker-portfolio --production-branch=master`.
2. Generate a Cloudflare API token (scope **Account → Cloudflare Pages → Edit**) and grab your account ID.
3. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub repo secrets (**Settings → Secrets and variables → Actions**).
4. After the first deploy, attach `lunaparker.dev` (and `www`) to the Pages project under **Pages → lunaparker-portfolio → Custom domains**.

Manual deploy: trigger the workflow from the Actions tab (it has `workflow_dispatch`), or run `npx wrangler pages deploy .output/public --project-name=lunaparker-portfolio` locally after `npm run generate`.

The Worker deploys independently of the site — `wrangler deploy` from `worker/` is enough.

## Project layout

```
app.vue                     # root component; renders NuxtLayout + NuxtPage
layouts/default.vue         # SiteNav + <slot> + SiteFooter frame
pages/
  index.vue                 # home — Hero + all section components
  privacy.vue               # privacy policy (route /privacy)
  writing/                  # gated behind writingEnabled flag (off by default)
    index.vue
    [slug].vue

components/
  Ui/                       # shared primitives (Icon, Chip, SkillChip, M3Field, …)
  Hero/Wordmark.vue         # oversized-wordmark hero
  sections/                 # About, Experience, Projects, Skills, Writing, Contact
  ProjectCard.vue, BlogCard.vue, SiteNav.vue, SiteFooter.vue

composables/useData.ts      # readonly data source — experience, education, projects, skills

assets/css/
  tokens.styl               # M3 OKLCH token system
  base.styl                 # reset, type scale, button/chip/card primitives
  app.styl                  # View Transitions CSS + accent override

public/                     # favicons, OG card, resume PDF, robots.txt, manifest

worker/                     # Cloudflare Worker for the contact form (separate package)
  src/index.ts
  wrangler.toml
```

## Configuration

Public runtime config lives in `nuxt.config.ts` under `runtimeConfig.public` and is overridable via env vars at build time:

| Variable | Default | Override |
|---|---|---|
| `siteUrl` | `https://lunaparker.dev` | `NUXT_PUBLIC_SITE_URL` |
| `contactEndpoint` | `https://lunaparker.dev/api/contact` | `NUXT_PUBLIC_CONTACT_ENDPOINT` |
| `turnstileSiteKey` | (production key) | `NUXT_PUBLIC_TURNSTILE_SITE_KEY` |
| `writingEnabled` | `false` | `NUXT_PUBLIC_WRITING_ENABLED` |

`runtimeConfig.public.*` is **public** by definition — it gets baked into the static bundle. Don't put secrets there. Worker secrets are handled separately via `wrangler secret put` (see [Contact form Worker](#contact-form-worker)).

## Design system

Colours come from an M3 tonal palette generated at runtime via `oklch()` + `color-mix()` from two CSS vars — `--accent-h` (hue) and `--accent-c` (chroma). The shipped accent is indigo `H=265 C=0.19`; the brand gradient (`#8A2387 → #E94057 → #F27121`) is reserved for emphasis (LUNA wordmark, hero CTA, footer wordmark, contact heading).

Dark mode follows OS preference automatically (`prefers-color-scheme`); no toggle UI is shipped.

## Editor

Module config in `.idea/lunaparker-portfolio.iml` excludes `.nuxt/`, `.output/`, `.data/`, `node_modules/`, and `dist/` from indexing. Per-user workspace state is gitignored at `.idea/.gitignore`. PhpStorm 2023+ with Vue.js and TypeScript language services enabled (no extra plugins required) works out of the box; VS Code with the Volar extension also works fine.

---

Copyright 2026 Luna Parker, all rights reserved.
