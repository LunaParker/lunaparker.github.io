<script setup lang="ts">
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
        <div class="mono hero__footer-meta">PORTFOLIO v4 · EST. 2026 · <a href="https://github.com/LunaParker/lunaparker.github.io" target="_blank" rel="noreferrer">SOURCE CODE</a></div>
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

.hero__footer-meta a
  color: inherit
  text-decoration: underline
  text-underline-offset: 3px
  transition: color var(--dur-short)

.hero__footer-meta a:hover
  color: var(--on-surface)
</style>
