<script setup lang="ts">
function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="about" class="section studio-about">
    <div class="container">
      <div class="studio-about__grid">
        <UiReveal>
          <div>
            <div class="label section-kicker studio-about__kicker"><span>About us</span></div>
            <h2 class="studio-about__title">We make complex problems simple.</h2>
            <div class="studio-about__body">
              <p>Based in Ontario, Canada, we're a small studio that partners with organizations around the world to solve their digital challenges.</p>
              <p>We work directly with you to find the right web solution (not the trendy one, not the over-engineered one) and ship it perfectly tuned to how your organization actually operates.</p>
              <p>Web design, web development, and custom software. WordPress, Laravel, Vue.js, Nuxt. Whatever the right tool is, we use it well.</p>
              <p class="studio-about__outro"><b>Reach out. We'd love to hear from you.</b></p>
            </div>
            <div class="studio-about__cta-row">
              <a href="#contact" class="btn btn-gradient" @click="jump($event, 'contact')">Start a project <UiIcon name="arrow" :size="16" /></a>
              <a href="#projects" class="btn btn-outlined" @click="jump($event, 'projects')">See client work</a>
            </div>
            <div class="studio-about__founder">
              <div class="mono studio-about__founder-label">Founded by</div>
              <NuxtLink to="/" class="studio-about__founder-link">
                Luna Parker
                <span class="studio-about__founder-role">· full-stack developer &amp; designer</span>
                <UiIcon name="arrow" :size="14" />
              </NuxtLink>
            </div>
          </div>
        </UiReveal>
        <UiReveal :delay="120">
          <div class="studio-about__photo-frame">
            <div class="studio-about__photo" role="img" aria-label="A great horned owl on a perch" />
            <div class="studio-about__accent-block" aria-hidden="true" />
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.studio-about
  background: var(--surface-container-low)

.studio-about__grid
  display: grid
  grid-template-columns: 1fr 1fr
  gap: unquote("clamp(2rem, 6vw, 5rem)")
  align-items: center

.studio-about__kicker
  color: var(--on-surface-variant)
  margin-bottom: 1.25rem

.studio-about__title
  font-family: var(--font-display)
  font-weight: 700
  font-size: unquote("clamp(2rem, 4.4vw, 3.2rem)")
  line-height: 1.05
  letter-spacing: -0.025em
  margin: 0 0 1.5rem
  background: linear-gradient(100deg, var(--primary) 0%, var(--tertiary) 100%)
  -webkit-background-clip: text
  background-clip: text
  color: transparent

.studio-about__body
  display: grid
  gap: 1rem
  color: var(--on-surface-variant)
  font-size: 1.08rem
  line-height: 1.65
  max-width: 560px

.studio-about__body p
  margin: 0

.studio-about__outro
  color: var(--on-surface)

.studio-about__cta-row
  display: flex
  gap: 12px
  margin-top: 1.75rem
  flex-wrap: wrap

.studio-about__founder
  margin-top: 2rem
  padding-top: 1.5rem
  border-top: 1px solid var(--outline-variant)
  max-width: 480px

.studio-about__founder-label
  font-size: 11px
  color: var(--on-surface-variant)
  text-transform: uppercase
  letter-spacing: 0.08em
  margin-bottom: 6px

.studio-about__founder-link
  display: inline-flex
  align-items: center
  gap: 8px
  color: var(--on-surface)
  text-decoration: none
  font-weight: 500
  font-size: 0.98rem

.studio-about__founder-role
  color: var(--on-surface-variant)
  font-weight: 400

.studio-about__photo-frame
  position: relative
  aspect-ratio: 4 / 5
  border-radius: 28px
  overflow: hidden
  border: 1px solid var(--outline-variant)

.studio-about__photo
  position: absolute
  inset: 0
  background-image: url("/images/shy-owl/about_owl.jpg")
  background-size: cover
  background-position: center

.studio-about__accent-block
  position: absolute
  left: -18px
  bottom: -18px
  width: 120px
  height: 120px
  border-radius: 24px
  background: var(--primary)
  opacity: 0.94

@media (max-width: 900px)
  .studio-about__grid
    grid-template-columns: 1fr
</style>
