# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Orientation

This repo has **two cooperating deployments**, both on Cloudflare:

1. **Static Nuxt 3 portfolio** at the repo root → built with `nuxt generate`, deployed to Cloudflare Pages (project `lunaparker-portfolio`), served at `shyowlstudios.com` (and intended `lunaparker.dev`).
2. **Cloudflare Worker** at `worker/` (`shyowl-contact`) → handles the contact form. Verifies a Turnstile CAPTCHA, then forwards submissions to a private Discord webhook. Routed at `shyowlstudios.com/api/contact*`. Worker routes take precedence over Pages, so they coexist on the same hostname.

`README.md` covers the Nuxt setup, build, deploy, and design system in depth. **Don't duplicate it; consult it.** This file documents the rest.

### Branches

- `master` holds the **old Shy Owl Studios agency site** — vanilla HTML + Bulma + jQuery-style JS. It's historical reference only (used during the redesign to make sure projects/copy weren't lost).
- `redesign/nuxt-portfolio` is the **canonical** branch and the rewrite. When in doubt about a pattern, look at this branch, not master.

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

## Content is data-driven

`composables/useData.ts` is the **single source of truth** for everything Luna-shaped: bio, experience, education, projects, blog posts, skills, services. Section components in `components/sections/` are thin wrappers that call `useData()` and render.

**To change copy, edit `useData.ts` — not the components.** A common mistake is to grep for a phrase, find it inside a Vue template, and edit it there; the actual content usually lives in `useData.ts` and is bound through props.

Notes:
- The `services` array is defined but **intentionally not rendered** anywhere — it's a relic from the old agency framing kept around in case it's wanted again. Don't wire it up without checking.
- The `blog` array currently holds **placeholder posts**, not real essays. The Writing section + nav item are gated behind `runtimeConfig.public.writingEnabled` (default `false`). Flip via `NUXT_PUBLIC_WRITING_ENABLED=true`. With the flag off, nothing links to `/writing`, so the static generator doesn't crawl those routes — direct visits to `/writing` on the deployed site 404. In dev (`npm run dev`) the routes remain reachable for previewing drafts.

## Contact form infrastructure

```
Contact.vue ──POST JSON──▶  shyowlstudios.com/api/contact  ──▶  shyowl-contact Worker
   │                                                             │
   └─ Turnstile widget                                            ├─ verify Turnstile token
      (managed/visible mode)                                      └─ forward to Discord webhook
```

**Configuration variables (where things live):**

| Variable | Where set | Notes |
|---|---|---|
| `runtimeConfig.public.turnstileSiteKey` | `nuxt.config.ts` | Public site key, baked at build. Currently `0x4AAAAAADD0v3nrGL0gqLEF`. Override per-build with `NUXT_PUBLIC_TURNSTILE_SITE_KEY`. |
| `runtimeConfig.public.contactEndpoint` | `nuxt.config.ts` | Defaults to `https://shyowlstudios.com/api/contact` (absolute, so it works from any deployed host). Override with `NUXT_PUBLIC_CONTACT_ENDPOINT`. |
| `runtimeConfig.public.writingEnabled` | `nuxt.config.ts` | `false` by default — hides the Writing section + nav item, and prevents `/writing*` from being statically generated. Set `NUXT_PUBLIC_WRITING_ENABLED=true` to re-enable when real posts exist. |
| `ALLOWED_ORIGINS` | `worker/wrangler.toml` `[vars]` | Comma-separated CORS allowlist. Currently: `shyowlstudios.com`, `www.shyowlstudios.com`, `lunaparker.dev`, `www.lunaparker.dev`, `lunaparker.github.io`, `localhost:3000`. |
| `TURNSTILE_SECRET` | Worker secret (`wrangler secret put`) | Cloudflare Turnstile secret key. Never committed. |
| `DISCORD_WEBHOOK_URL` | Worker secret (`wrangler secret put`) | Discord channel webhook (private channel `#website-contact-form`). Never committed. |
| Route binding `shyowlstudios.com/api/contact*` | `worker/wrangler.toml` `[[routes]]` + Cloudflare dashboard | Both must agree. |

**Local dev for the form:** Cloudflare ships test keys that always pass:

- Site key `1x00000000000000000000AA`
- Secret `1x0000000000000000000000000000000AA`

Drop the secret into `worker/.dev.vars` (template at `worker/.dev.vars.example`), run `wrangler dev`, then start Nuxt with `NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA NUXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8787 npm run dev`.

## Deployment topology

- **Pages**: Cloudflare Pages serves `.output/public/` from the `master` branch via `wrangler pages deploy` in the GH Actions workflow described in README. Project name is `lunaparker-portfolio`. GitHub repo needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets for the Action to authenticate.
- **DNS**: `shyowlstudios.com` and `lunaparker.dev` are both Cloudflare zones. Custom domains are bound to the Pages project via the Cloudflare dashboard (**Pages → lunaparker-portfolio → Custom domains**). The Worker route `shyowlstudios.com/api/contact*` takes precedence over Pages on the same hostname, so the contact form keeps working unchanged.
- **Worker** deploys are wholly independent of the site deploy — `wrangler deploy` from `worker/` is enough.
- The `public/` dir contains a legacy `privacy.html` + its CSS deps that are copied verbatim by Nuxt; don't break those paths.

## Known thin spots

These are real follow-ups, not pretend ones — flag them if relevant to the work:

- **"Resume" buttons in `components/SiteNav.vue` and `components/SiteFooter.vue` are dead** (`href="#"` with `@click.prevent`). A real PDF needs to be dropped in `public/` and the hrefs updated.
- **The Writing section ships placeholder content** and is currently disabled via `writingEnabled = false`. Replace `useData.ts.blog` with real posts and flip the flag when ready.
- **`useData.ts` content drifts out of sync with the actual resume/LinkedIn occasionally.** Treat it as the canonical site truth, but expect periodic reconciliation passes.

## Conventions

- Don't add new `*.md` files unless the user asks. CLAUDE.md and README.md are the only ones.
- Site copy → `useData.ts`. Component templates should bind values, not hardcode them.
- Secrets never enter the repo. Use `wrangler secret put` for Worker secrets; Nuxt `runtimeConfig.public.*` is **public** by definition (baked into the static bundle).
- The Worker's `.dev.vars` is gitignored (`worker/.gitignore`) — keep it that way.
