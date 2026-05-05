<script setup lang="ts">
const repoUrl = 'https://github.com/LunaParker/lunaparker.github.io'
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero__container">
      <div class="hero__intro">
        <div class="stagger hero__intro-text">
          <div class="label hero__kicker">
            <span>— Developer · Designer · Student</span>
          </div>
          <p class="body-lg hero__lede">
            Full-stack web developer with 8+ years of experience building tailored digital solutions. Finishing an Honours BCS with a Security Specialization at Conestoga College.
          </p>
          <div class="hero__cta-row">
            <a href="#projects" class="btn btn-brand">View my work <UiIcon name="arrow" :size="18" /></a>
            <a href="#contact" class="btn btn-outlined">Get in touch</a>
          </div>
        </div>

        <div class="stagger hero__intro-meta">
          <UiAvailabilityPill />
          <div class="mono hero__intro-meta-line">Ontario, Canada</div>
          <div class="mono hero__intro-meta-line">Remote · EST</div>
        </div>
      </div>

      <h1 aria-label="Luna Parker" class="hero__wordmark">
        <span class="hero__wordmark-luna gradient-text">LUNA</span>
        <span class="hero__wordmark-parker">Parker.</span>
      </h1>

      <div class="hero__footer">
        <div class="label hero__footer-cue">Scroll to explore</div>
        <div class="mono hero__footer-meta">
          <span
            class="hero__portfolio-trigger"
            tabindex="0"
            aria-describedby="hero-portfolio-popover"
          >
            PORTFOLIO v4 · EST. 2026
            <span
              id="hero-portfolio-popover"
              class="hero__portfolio-popover"
              role="tooltip"
            >
              <span class="hero__portfolio-popover-label">Built with</span>
              <span class="hero__portfolio-popover-body">
                <strong>Vue 3</strong>, <strong>Nuxt</strong> and <strong>Stylus</strong> on the front. <strong>Cloudflare Pages</strong> serves the static site; the contact form runs on a <strong>Cloudflare Worker</strong>.
              </span>
              <a
                :href="repoUrl"
                target="_blank"
                rel="noreferrer"
                class="btn btn-filled hero__portfolio-popover-btn"
              >
                <UiIcon name="github" :size="14" :stroke="2" /> View source
              </a>
            </span>
          </span>
          <span class="hero__footer-meta-divider">·</span>
          <a :href="repoUrl" target="_blank" rel="noreferrer">SOURCE CODE</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.hero
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: flex-end
  padding: 140px 0 40px
  position: relative

.hero__container
  width: 100%

.hero__intro
  display: flex
  justify-content: space-between
  align-items: flex-start
  gap: 48px
  flex-wrap: wrap
  margin-bottom: 40px

.hero__intro-text
  max-width: 52ch

.hero__intro-meta
  display: flex
  flex-direction: column
  gap: 10px
  align-items: flex-end
  margin-left: auto

.hero__intro-meta-line
  font-size: 12px
  color: var(--on-surface-variant)

.hero__kicker
  color: var(--on-surface-variant)
  margin-bottom: 24px

.hero__lede
  color: var(--on-surface-variant)
  font-size: 1.25rem
  line-height: 1.55
  margin-bottom: 28px

.hero__cta-row
  display: flex
  gap: 12px
  align-items: center
  flex-wrap: wrap

.hero__wordmark
  font-family: var(--font-display)
  font-size: clamp(4rem, 16vw, 16rem)
  font-weight: 800
  letter-spacing: -0.06em
  line-height: 0.86
  margin: 0
  display: block
  max-width: 100%

.hero__wordmark-luna
  display: block

.hero__wordmark-parker
  display: block
  color: var(--on-surface)
  font-style: italic
  font-weight: 300
  text-indent: 0.5em

.hero__footer
  margin-top: 32px
  display: flex
  justify-content: space-between
  align-items: baseline
  flex-wrap: wrap
  gap: 16px
  padding-top: 18px
  border-top: 1px solid var(--outline-variant)

.hero__footer-cue
  color: var(--on-surface-variant)

.hero__footer-meta
  font-size: 12px
  color: var(--on-surface-variant)
  display: inline-flex
  align-items: baseline
  gap: 6px
  flex-wrap: wrap

.hero__footer-meta-divider
  opacity: 0.6

.hero__footer-meta a
  color: inherit
  text-decoration: underline
  text-underline-offset: 3px
  transition: color var(--dur-short)

.hero__footer-meta a:hover
  color: var(--on-surface)

// Portfolio meta trigger + popover ----------------------------------
.hero__portfolio-trigger
  position: relative
  cursor: help
  text-decoration: underline dotted
  text-decoration-color: var(--outline)
  text-underline-offset: 3px
  outline: none
  border-radius: 4px
  transition: color var(--dur-short) var(--spring-gentle)

.hero__portfolio-trigger:hover,
.hero__portfolio-trigger:focus-visible
  color: var(--on-surface)
  text-decoration-color: var(--on-surface)

.hero__portfolio-popover
  position: absolute
  bottom: calc(100% + 14px)
  right: 0
  width: clamp(260px, 30vw, 340px)
  padding: 16px 18px 14px
  background: var(--surface-container-high)
  border: 1px solid var(--outline-variant)
  border-radius: 20px
  box-shadow: 0 1px 2px unquote("color-mix(in oklch, var(--on-surface) 8%, transparent)"), 0 16px 36px -12px unquote("color-mix(in oklch, var(--on-surface) 24%, transparent)")
  display: flex
  flex-direction: column
  gap: 10px
  text-align: left
  color: var(--on-surface)
  cursor: default
  pointer-events: none
  opacity: 0
  visibility: hidden
  transform: translateY(6px) scale(0.97)
  transform-origin: bottom right
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-med) var(--spring-fast), visibility 0s var(--dur-short)
  z-index: 5

// Hover bridge so cursor can travel from trigger to popover without closing
.hero__portfolio-popover::before
  content: ''
  position: absolute
  left: 0
  right: 0
  bottom: -14px
  height: 14px

.hero__portfolio-trigger:hover .hero__portfolio-popover,
.hero__portfolio-trigger:focus-visible .hero__portfolio-popover,
.hero__portfolio-trigger:focus-within .hero__portfolio-popover,
.hero__portfolio-popover:hover
  opacity: 1
  visibility: visible
  pointer-events: auto
  transform: translateY(0) scale(1)
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-med) var(--spring-fast), visibility 0s

.hero__portfolio-popover-label
  font-family: var(--font-mono)
  font-size: 11px
  font-weight: 500
  letter-spacing: 0.1em
  text-transform: uppercase
  color: var(--on-surface-variant)

.hero__portfolio-popover-body
  font-family: var(--font-body)
  font-size: 13px
  line-height: 1.5
  color: var(--on-surface-variant)
  letter-spacing: 0
  text-transform: none

.hero__portfolio-popover-body strong
  color: var(--on-surface)
  font-weight: 600

.hero__footer-meta a.hero__portfolio-popover-btn
  align-self: flex-start
  padding: 6px 14px
  font-size: 12px
  letter-spacing: 0
  text-transform: none
  font-family: var(--font-body)
  text-decoration: none
  color: var(--on-primary)
  margin-top: 4px

.hero__footer-meta a.hero__portfolio-popover-btn:hover
  text-decoration: none
  color: var(--surface)

// Hide popover entirely on touch / small screens — the SOURCE CODE link
// next to the trigger is sufficient for those contexts.
@media (max-width: 720px)
  .hero__portfolio-popover
    display: none

  .hero__portfolio-trigger
    cursor: inherit
    text-decoration: none

@media (hover: none) and (pointer: coarse)
  .hero__portfolio-popover
    display: none

  .hero__portfolio-trigger
    cursor: inherit
    text-decoration: none
</style>
