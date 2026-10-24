<script setup lang="ts">
// Each verb links to one piece of work that backs it up. Client code stays
// private, so the proof points at the project card or the studio page.
const whatIDo = [
  {
    verb: 'Build',
    body: 'High-performance websites and web applications using modern frameworks and battle-tested platforms.',
    proof: 'QuickBooks Online sync for EYOLF\'s store',
    to: '#project-eyolf',
  },
  {
    verb: 'Design',
    body: 'User-friendly interfaces that align with an organization\'s brand and help them accomplish their goals.',
    proof: 'Belwood Lake Sailing Club brand refresh',
    to: '#project-blsc',
  },
  {
    verb: 'Solve',
    body: 'Custom software, from inventory systems to secure client portals, that makes businesses more productive.',
    proof: 'Jarvis Ryan\'s secure client portal',
    to: '#project-jarvis-ryan',
  },
  {
    verb: 'Consult',
    body: 'Direct collaboration with clients to identify requirements, recommend stacks, and manage timelines.',
    proof: 'Shy Owl Studios, my consultancy',
    to: '/shy-owl/',
  },
]
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <UiSectionHeader>
        <template #title>
          I build the whole thing end-to-end: from client kickoff to deployed code.
        </template>
      </UiSectionHeader>

      <div class="about__grid">
        <UiReveal>
          <p class="body-lg about__bio about__bio--lede">
            I'm a full-stack developer; I've been building for the web since high school. Through my own consultancy, <NuxtLink to="/shy-owl/" class="about__studio-link"><b>Shy Owl Studios</b></NuxtLink>, I've delivered dozens of websites and web applications for clients ranging from local businesses to nation-wide brands.
          </p>
          <p class="body-lg about__bio about__bio--muted">
            I specialise in Laravel and WordPress (and, in practice, whatever else the problem calls for). I pair the technical work with strong client relations, project management, and a genuine commitment to helping organisations thrive.
          </p>
          <p class="body-lg about__bio about__bio--muted">
            I started my postsecondary studies at the University of Toronto, studying CS and philosophy, and I'm now pursuing an Honours Bachelor of Computer Science with a Security Specialisation at Conestoga, where I've deepened my understanding of low-level programming, secure systems design, and collaborative software development.
          </p>
        </UiReveal>

        <UiReveal :delay="120">
          <ul class="about__what-i-do-list">
            <li v-for="item in whatIDo" :key="item.verb" class="about__what-i-do-row">
              <div class="about__what-i-do-verb">{{ item.verb }}.</div>
              <div>
                <p class="about__what-i-do-body">{{ item.body }}</p>
                <a v-if="item.to.startsWith('#')" :href="item.to" class="about__what-i-do-proof">
                  <span class="about__what-i-do-proof-text">{{ item.proof }}</span>
                  <UiIcon name="arrow" :size="14" :stroke="2" class="about__what-i-do-proof-icon" :style="{ transform: 'rotate(90deg)' }" />
                </a>
                <NuxtLink v-else :to="item.to" class="about__what-i-do-proof">
                  <span class="about__what-i-do-proof-text">{{ item.proof }}</span>
                  <UiIcon name="arrow" :size="14" :stroke="2" class="about__what-i-do-proof-icon" />
                </NuxtLink>
              </div>
            </li>
          </ul>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.about
  position: relative

.about__grid
  display: grid
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr)
  gap: clamp(24px, 4vw, 72px)
  align-items: start

.about__bio
  margin-bottom: 20px

.about__bio--lede
  font-size: 1.25rem
  line-height: 1.55
  color: var(--on-surface)

.about__bio--muted
  color: var(--on-surface-variant)

.about__studio-link
  color: inherit
  text-decoration: underline
  text-decoration-color: var(--outline)
  text-underline-offset: 4px
  transition: color var(--dur-short) var(--spring-gentle), text-decoration-color var(--dur-short) var(--spring-gentle)

.about__studio-link:hover
  color: var(--primary-text)
  text-decoration-color: currentColor

.about__bio:last-child
  margin-bottom: 0

// Ruled rows rather than boxed cards, so the proof link carries the weight
.about__what-i-do-list
  list-style: none
  margin: 0
  padding: 0
  border-top: 1px solid var(--outline-variant)

.about__what-i-do-row
  display: grid
  grid-template-columns: 120px 1fr
  gap: 20px
  align-items: baseline
  padding: 22px 0
  border-bottom: 1px solid var(--outline-variant)

.about__what-i-do-verb
  font-family: var(--font-display)
  font-size: 1.5rem
  font-weight: 800
  letter-spacing: -0.03em
  color: var(--primary-text)

.about__what-i-do-body
  color: var(--on-surface-variant)
  margin: 0 0 10px

.about__what-i-do-proof
  font-size: 0.9375rem
  font-weight: 500
  color: var(--on-surface)
  transition: color var(--dur-short) var(--spring-gentle)

// Underline the words only, not the gap before the arrow
.about__what-i-do-proof-text
  text-decoration: underline
  text-decoration-color: var(--outline)
  text-underline-offset: 4px
  transition: text-decoration-color var(--dur-short) var(--spring-gentle)

.about__what-i-do-proof:hover
  color: var(--primary-text)

.about__what-i-do-proof:hover .about__what-i-do-proof-text
  text-decoration-color: currentColor

.about__what-i-do-proof-icon
  display: inline-block
  vertical-align: -2px
  margin-left: 6px

@media (max-width: 860px)
  .about__grid
    grid-template-columns: 1fr

@media (max-width: 480px)
  .about__what-i-do-row
    grid-template-columns: 1fr
    gap: 6px
</style>
