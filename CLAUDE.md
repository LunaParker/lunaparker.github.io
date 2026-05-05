# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Orientation

This repo has **two cooperating deployments**, both on Cloudflare:

1. **Static Nuxt 3 portfolio** at the repo root → built with `nuxt generate`, deployed to Cloudflare Pages (project `lunaparker-portfolio`), served at `lunaparker.dev`.
2. **Cloudflare Worker** at `worker/` (`shyowl-contact`) → handles the contact form. Verifies a Turnstile CAPTCHA, then forwards submissions to a private Discord webhook. Routed at `lunaparker.dev/api/contact*`. Worker routes take precedence over Pages, so they coexist on the same hostname.

`README.md` covers the Nuxt setup, build, deploy, and design system in depth. **Don't duplicate it; consult it.** This file documents the rest.

## Commands you'll actually use

```bash
# Nuxt site (repo root) — see README for the full list
npm run dev              # http://localhost:3000
npm run generate         # static bundle in .output/public/
npm run lint

# Worker (sub-package — separate node_modules + package.json)
cd worker
npm install              # one-time
npx wrangler dev         # local Worker at http://localhost:8787, reads worker/.dev.vars
npx wrangler deploy      # ships to Cloudflare; wrangler.toml is source of truth
npx wrangler secret put TURNSTILE_SECRET     # interactive — re-run if rotated
npx wrangler secret put DISCORD_WEBHOOK_URL  # interactive — re-run if rotated
npx wrangler tail        # stream live Worker logs
```

There are no tests in this repo.

## Where content lives

The split is by shape, not by topic:

- **`composables/useData.ts`** holds list-shaped data that grows over time: `experience`, `education`, `projects`, `blog`, `skills`. Section components consume it via `useData()`.
- **Static identity copy lives directly in the component that renders it.** Bio, about paragraphs, email, LinkedIn, GitHub, location, the four "what I do" cards, the services grid in Skills.vue — all inline as local `const`s or template literals. Don't grep `useData.ts` looking for them; they're next to the JSX.

Rule of thumb: if you'd add a new entry to a list (another job, another project, another blog post), it belongs in `useData.ts`. If it's a one-off fact about Luna or a fixed bit of marketing copy, it belongs inline in the component.

Notes:
- The `blog` array is currently **empty** — the Writing infrastructure (component, pages, BlogCard) is wired up and ready, but gated behind `runtimeConfig.public.writingEnabled` (default `false`). Flip via `NUXT_PUBLIC_WRITING_ENABLED=true` once `useData.ts.blog` has real posts. With the flag off, nothing links to `/writing`, so the static generator doesn't crawl those routes — direct visits to `/writing` on the deployed site 404. In dev (`npm run dev`) the routes remain reachable for previewing drafts.
- The services grid in `Skills.vue` is local to that file. It's a relic of the old agency framing but is currently rendered; remove it there if you want it gone.

## Contact form infrastructure

```
Contact.vue ──POST JSON──▶  lunaparker.dev/api/contact  ──▶  shyowl-contact Worker
   │                                                             │
   └─ Turnstile widget                                            ├─ verify Turnstile token
      (managed/visible mode)                                      └─ forward to Discord webhook
```

**Configuration variables (where things live):**

| Variable | Where set | Notes |
|---|---|---|
| `runtimeConfig.public.turnstileSiteKey` | `nuxt.config.ts` | Public site key, baked at build. Currently `0x4AAAAAADD0v3nrGLOgqLEF`. Override per-build with `NUXT_PUBLIC_TURNSTILE_SITE_KEY`. |
| `runtimeConfig.public.contactEndpoint` | `nuxt.config.ts` | Defaults to `https://lunaparker.dev/api/contact` (absolute, so it works from any deployed host). Override with `NUXT_PUBLIC_CONTACT_ENDPOINT`. |
| `runtimeConfig.public.writingEnabled` | `nuxt.config.ts` | `false` by default — hides the Writing section + nav item, and prevents `/writing*` from being statically generated. Set `NUXT_PUBLIC_WRITING_ENABLED=true` to re-enable when real posts exist. |
| `ALLOWED_ORIGINS` | `worker/wrangler.toml` `[vars]` | Comma-separated CORS allowlist. Currently: `lunaparker.dev`, `www.lunaparker.dev`, `lunaparker.github.io`, `localhost:3000`. |
| `TURNSTILE_SECRET` | Worker secret (`wrangler secret put`) | Cloudflare Turnstile secret key. Never committed. |
| `DISCORD_WEBHOOK_URL` | Worker secret (`wrangler secret put`) | Discord channel webhook (private channel `#website-contact-form`). Never committed. |
| Route binding `lunaparker.dev/api/contact*` | `worker/wrangler.toml` `[[routes]]` + Cloudflare dashboard | Both must agree. |

**Local dev for the form:** Cloudflare ships test keys that always pass:

- Site key `1x00000000000000000000AA`
- Secret `1x0000000000000000000000000000000AA`

Drop the secret into `worker/.dev.vars` (template at `worker/.dev.vars.example`), run `wrangler dev`, then start Nuxt with `NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA NUXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8787 npm run dev`.

## Analytics + cookie consent

Two analytics tools, with different consent posture:

- **Cloudflare Web Analytics** is auto-injected by the Cloudflare edge for `lunaparker.dev` (configured in the WA dashboard, no code change). Cookieless and unfingerprinted, so it runs on every visit regardless of consent — it's the always-on baseline.
- **Google Analytics 4** (`G-0M3HK86F42`) is gated behind explicit consent. The `nuxt-gtag` module is configured with `initMode: 'manual'` and Consent Mode v2 defaults (`analytics_storage: 'denied'`), so the gtag.js script tag does not load until the user clicks "Accept all" in the banner.

The banner itself is `@dargmuesli/nuxt-cookie-control`. The bridge between consent state and gtag lives at `plugins/consent-bridge.client.ts`, which watches `useCookieControl().cookiesEnabledIds` and toggles `gtag('consent', 'update', …)` + `useGtag().initialize()` / `disableAnalytics()` accordingly.

Theming: the library's `--cookie-control-*` CSS variables are remapped onto our M3 tokens in `assets/css/cookie-control.styl`. That file also patches the library's hard-coded Arial fallback and 0.25s linear transitions to use `--font-body` and `--spring-emphasized` so the banner reads as part of the site, not a third-party widget. Light/dark switching comes for free via tokens.styl.

If the GA4 ID needs rotating, update it in `nuxt.config.ts` under `gtag.id`. It's public by design (baked into gtag.js), so no secret handling needed.

## Deployment topology

- **Pages**: Cloudflare Pages serves `.output/public/` from the `master` branch via `wrangler pages deploy` in the GH Actions workflow described in README. Project name is `lunaparker-portfolio`. GitHub repo needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets for the Action to authenticate.
- **DNS**: `lunaparker.dev` is the Cloudflare zone. The custom domain is bound to the Pages project via the Cloudflare dashboard (**Pages → lunaparker-portfolio → Custom domains**). The Worker route `lunaparker.dev/api/contact*` takes precedence over Pages on the same hostname, so the contact form keeps working unchanged.
- **Worker** deploys are wholly independent of the site deploy — `wrangler deploy` from `worker/` is enough.
- The privacy policy lives at the Nuxt page `pages/privacy.vue` (route `/privacy`).

## Known thin spots

These are real follow-ups, not pretend ones — flag them if relevant to the work:

- **The Writing section is empty** — `useData.ts.blog` was emptied of placeholder posts before public release. Add real posts and flip `writingEnabled = true` when ready.
- **`useData.ts` (experience, education, projects) drifts out of sync with the actual resume/LinkedIn occasionally.** Treat it as the canonical site truth, but expect periodic reconciliation passes.

## Conventions

- Don't add new `*.md` files unless the user asks. CLAUDE.md and README.md are the only ones.
- List-shaped data → `useData.ts`. Static identity / one-off copy → inline in the consuming component.
- Secrets never enter the repo. Use `wrangler secret put` for Worker secrets; Nuxt `runtimeConfig.public.*` is **public** by definition (baked into the static bundle).
- The Worker's `.dev.vars` is gitignored (`worker/.gitignore`) — keep it that way.
