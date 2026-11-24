# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** judging Luna Parker's work, experience and education, mostly from the home page (`/`). They arrive from a resume, LinkedIn or GitHub link and decide whether to get in touch.
- **Prospective freelance clients** of Shy Owl Studios, Luna's web development consultancy, on `/shy-owl/`. They decide whether to send an inquiry.

## Product Purpose

lunaparker.dev is Luna's portfolio and the home of Shy Owl Studios. It shows her experience, projects, skills and education, and its one action is getting in touch, through the contact form or by email.

It also hosts the public pages her own software needs, such as a browser extension's download page and the privacy policy its store listing links to.

## Positioning

The site is itself the work sample. Its look and feel is part of what it proves, so visual polish outranks shaving milliseconds (Luna's stated priority).

## Operating Context

- Statically generated Nuxt 3 site on Cloudflare Pages; a Cloudflare Worker handles the contact form behind Turnstile.
- Light and dark themes, following the OS by default with a manual toggle.
- Cloudflare Web Analytics (cookieless) is the only analytics, so the site has no consent banner.
- The repository is public.

## Capabilities and Constraints

- Routes: `/` (portfolio), `/shy-owl/` (studio page), `/privacy/` (the site's own privacy policy), `/writing/` (built but switched off until real posts exist).
- Product pages follow a pattern: `/<product>/` (a landing page with the product's downloads) and `/<product>/privacy/`. The first product is Basic Auth Gateway: `/basic-auth-gateway/` offers its native host for Windows and macOS and links to its Chrome Web Store listing, and `/basic-auth-gateway/privacy/` is the privacy policy that listing links to. More products may follow, so the layouts must work for any product.
- A product's policy text is written in that product's own repository; the site publishes it and must not reword it.
- List-shaped content lives in `composables/useData.ts`; one-off copy lives inline in the component that renders it.
- Personal details on the site stay to professional facts. Adding any new personal detail is Luna's decision, not a design default.

## Brand Commitments

- Name: Luna Parker. Studio: Shy Owl Studios. Public URL: `https://lunaparker.dev`. Contact: `luna@lunaparker.dev`.
- The magenta-to-orange brand gradient is the Shy Owl signature.
- `/shy-owl/` carries its own accent; the rest of the site shares one.
- Copy in Luna's voice never uses the em-dash character.
- A product page shows that product's own icon and name as its identifying mark, inside the portfolio's look.

## Evidence on Hand

- Experience, education, projects and skills: `composables/useData.ts`.
- Basic Auth Gateway: policy text in `~/PhpstormProjects/basic-auth-gateway/PRIVACY.md`, icon in that repo's `icon/icon.svg`.
- No testimonials, client logos or blog posts exist. Don't invent them.

## Product Principles

1. The site is the proof: every page, including legal ones, meets the same finish as the home page.
2. One action matters: make getting in touch easy, never noisy.
3. Product pages belong to the portfolio's world and name the product they serve.
4. Publish facts as written: product policies and personal facts are never paraphrased or embellished.
