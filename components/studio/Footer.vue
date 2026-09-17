<script setup lang="ts">
function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <footer class="studio-footer">
    <div class="container studio-footer__container">
      <div class="studio-footer__row">
        <div>
          <div class="studio-footer__wordmark">Shy Owl Studios</div>
          <p class="studio-footer__blurb">
            Web design &amp; development for organizations that need their software to last. Based in the Greater Toronto Area.
          </p>
          <div class="studio-footer__credit">
            Founded by <NuxtLink to="/">Luna Parker</NuxtLink>.
          </div>
        </div>
        <nav class="studio-footer__nav" aria-label="Footer">
          <a href="#services" @click="jump($event, 'services')">Services</a>
          <a href="#about" @click="jump($event, 'about')">About</a>
          <a href="#projects" @click="jump($event, 'projects')">Projects</a>
          <a href="#contact" @click="jump($event, 'contact')">Contact</a>
          <a href="mailto:hello@shyowlstudios.com">Email us</a>
          <NuxtLink to="/">Portfolio ↗</NuxtLink>
        </nav>
      </div>
      <div class="studio-footer__bottom">
        <div class="mono">© 2026 Shy Owl Studios.</div>
        <div class="mono">Discerning · Perceptive · Built to last.</div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="stylus">
.studio-footer
  padding: 3rem 0 2.5rem

.studio-footer__container
  display: grid
  gap: 2rem

.studio-footer__row
  display: grid
  grid-template-columns: 1fr auto
  gap: 2rem
  align-items: start

.studio-footer__wordmark
  font-family: var(--font-display)
  font-weight: 700
  font-size: 1rem
  margin-bottom: 1rem

.studio-footer__blurb
  color: var(--on-surface-variant)
  max-width: 380px
  line-height: 1.55
  margin: 0

.studio-footer__credit
  margin-top: 1.25rem
  font-size: 0.9rem
  color: var(--on-surface-variant)

.studio-footer__credit a
  color: var(--on-surface)
  text-decoration: none
  border-bottom: 1px solid var(--outline)

.studio-footer__nav
  display: grid
  grid-template-columns: auto auto
  gap: 0.5rem 2.5rem
  align-content: start

.studio-footer__nav a
  color: var(--on-surface-variant)
  font-size: 0.93rem
  text-decoration: none
  padding: 0.35rem 0
  transition: color var(--dur-short)

.studio-footer__nav a:hover
  color: var(--on-surface)

.studio-footer__bottom
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 1.5rem
  border-top: 1px solid var(--outline-variant)
  flex-wrap: wrap
  gap: 1rem
  font-size: 11px
  color: var(--on-surface-variant)

@media (min-width: 721px)
  .studio-footer__nav
    justify-items: end
    text-align: right

@media (max-width: 720px)
  .studio-footer__row
    grid-template-columns: 1fr
</style>
