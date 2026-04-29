<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <section id="experience" class="section experience">
    <div class="container">
      <UiSectionHeader
        kicker="02 — Experience"
        sub="Where I've worked, what I built, and the stacks I've carried."
      >
        <template #title>
          Eight years of shipping — agencies, enterprise, and my own consultancy.
        </template>
      </UiSectionHeader>

      <div class="experience__timeline">
        <div class="experience__rail" />

        <UiReveal
          v-for="(entry, i) in data.experience"
          :key="entry.id"
          :delay="i * 60"
          as="article"
          class="experience__entry"
        >
          <div
            class="experience__row"
            :class="i % 2 === 0 ? 'experience__row--left' : 'experience__row--right'"
          >
            <div class="experience__cell experience__cell--entry">
              <div class="experience__card">
                <div class="label mono experience__card-meta">
                  {{ entry.period }} · {{ entry.type }}
                </div>
                <h3 class="title experience__card-role">
                  {{ entry.role }}
                </h3>
                <div class="experience__card-org">
                  {{ entry.org }} · {{ entry.location }}
                </div>
                <p
                  v-if="entry.blurb"
                  class="experience__card-blurb"
                  :class="entry.bullets.length ? 'experience__card-blurb--with-bullets' : null"
                >
                  {{ entry.blurb }}
                </p>
                <ul v-if="entry.bullets.length > 0" class="experience__card-bullets">
                  <li
                    v-for="(b, j) in entry.bullets"
                    :key="j"
                    class="experience__card-bullet"
                  >
                    <span class="experience__card-bullet-dot" />
                    <span>{{ b }}</span>
                  </li>
                </ul>
                <div class="experience__card-stack">
                  <UiSkillChip v-for="s in entry.stack" :key="s" :tech="s" variant="tonal" />
                </div>
              </div>
            </div>

            <div class="experience__cell experience__cell--dot">
              <div class="experience__dot">
                <div class="experience__dot-inner" />
              </div>
            </div>

            <div class="experience__cell experience__cell--empty" />
          </div>
        </UiReveal>
      </div>

      <div class="experience__edu">
        <div class="label section-kicker experience__edu-kicker">
          <span>Education</span>
        </div>
        <div class="experience__edu-grid">
          <UiReveal
            v-for="(edu, i) in data.education"
            :key="edu.school"
            :delay="i * 80"
          >
            <div
              class="experience__edu-card"
              :class="i === 0 ? 'experience__edu-card--primary' : null"
            >
              <div class="label mono experience__edu-card-meta">
                {{ edu.period }}
              </div>
              <h3 class="experience__edu-card-school">
                {{ edu.school }}
              </h3>
              <div class="experience__edu-card-degree">{{ edu.degree }}</div>
              <div v-if="edu.specialization" class="experience__edu-card-spec">
                <UiChip :variant="i === 0 ? 'default' : 'tonal'">Spec: {{ edu.specialization }}</UiChip>
                <UiChip v-if="edu.gpa">GPA {{ edu.gpa }}</UiChip>
              </div>
              <p v-if="edu.status" class="experience__edu-card-status">
                {{ edu.status }}
              </p>
              <ul class="experience__edu-card-notes">
                <li
                  v-for="(n, j) in edu.notes"
                  :key="j"
                  class="experience__edu-card-note"
                >
                  <span class="experience__edu-card-note-dot" />
                  <span>{{ n }}</span>
                </li>
              </ul>
            </div>
          </UiReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.experience
  position: relative

.experience__timeline
  position: relative

.experience__rail
  position: absolute
  top: 18px
  bottom: 18px
  left: 50%
  width: 2px
  transform: translateX(-1px)
  background: linear-gradient(to bottom, transparent, var(--outline-variant) 6%, var(--outline-variant) 94%, transparent)

.experience__entry
  position: relative

.experience__row
  display: grid
  grid-template-columns: 1fr 40px 1fr
  gap: 0
  align-items: start

.experience__cell--dot
  grid-column: 2 / 3
  display: flex
  justify-content: center
  position: relative

.experience__row--left .experience__cell--entry
  grid-column: 1 / 2
  padding: 0 36px 56px 0
  text-align: right

.experience__row--left .experience__cell--empty
  grid-column: 3 / 4

.experience__row--right .experience__cell--entry
  grid-column: 3 / 4
  padding: 0 0 56px 36px
  text-align: left

.experience__row--right .experience__cell--empty
  grid-column: 1 / 2

.experience__dot
  position: relative
  z-index: 1
  margin-top: 18px
  width: 18px
  height: 18px
  border-radius: 50%
  background: var(--surface)
  border: 2px solid var(--primary)
  display: grid
  place-items: center

.experience__dot-inner
  width: 8px
  height: 8px
  border-radius: 50%
  background: var(--primary)

.experience__card
  padding: 28px
  background: var(--surface-container)
  border: 1px solid var(--outline-variant)
  border-radius: 24px
  text-align: left
  display: inline-block
  max-width: 520px
  width: 100%
  transition: transform var(--dur-med) var(--spring-fast), border-color var(--dur-short) var(--spring-gentle)

.experience__card:hover
  transform: translateY(-4px)
  border-color: var(--primary)

.experience__card-meta
  color: var(--on-surface-variant)
  margin-bottom: 12px

.experience__card-role
  font-size: 1.5rem
  font-weight: 700
  letter-spacing: -0.02em
  margin-bottom: 4px

.experience__card-org
  font-size: 1rem
  color: var(--primary-text)
  font-weight: 600
  margin-bottom: 14px

.experience__card-blurb
  color: var(--on-surface-variant)
  margin-bottom: 14px

.experience__card-blurb--with-bullets
  margin-bottom: 18px

.experience__card-bullets
  list-style: none
  padding: 0
  margin: 0 0 18px
  display: grid
  gap: 10px

.experience__card-bullet
  display: grid
  grid-template-columns: auto 1fr
  gap: 12px
  color: var(--on-surface-variant)
  font-size: 0.95rem

.experience__card-bullet-dot
  margin-top: 9px
  width: 5px
  height: 5px
  border-radius: 50%
  background: var(--primary)

.experience__card-stack
  display: flex
  flex-wrap: wrap
  gap: 6px

.experience__edu
  margin-top: 80px

.experience__edu-kicker
  color: var(--on-surface-variant)
  margin-bottom: 24px

.experience__edu-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))
  gap: 20px

.experience__edu-card
  padding: 28px
  border-radius: 24px
  background: var(--surface-container)
  color: var(--on-surface)
  height: 100%

.experience__edu-card--primary
  background: var(--primary-container)
  color: var(--on-primary-container)

.experience__edu-card-meta
  opacity: 0.7
  margin-bottom: 14px

.experience__edu-card-school
  font-family: var(--font-display)
  font-size: 1.5rem
  font-weight: 700
  letter-spacing: -0.02em
  margin-bottom: 6px

.experience__edu-card-degree
  font-size: 0.95rem
  opacity: 0.85
  margin-bottom: 16px

.experience__edu-card-spec
  display: flex
  gap: 8px
  flex-wrap: wrap
  margin-bottom: 16px

.experience__edu-card-status
  font-size: 0.95rem
  font-weight: 500
  margin-bottom: 14px

.experience__edu-card-notes
  list-style: none
  padding: 0
  margin: 0
  display: grid
  gap: 8px

.experience__edu-card-note
  display: grid
  grid-template-columns: auto 1fr
  gap: 10px
  font-size: 0.9rem
  opacity: 0.85

.experience__edu-card-note-dot
  margin-top: 8px
  width: 4px
  height: 4px
  border-radius: 50%
  background: currentColor

@media (max-width: 860px)
  .experience__rail
    left: 18px

  .experience__row
    grid-template-columns: 36px 1fr

  .experience__cell--dot
    grid-column: 1 / 2

  .experience__row--left .experience__cell--entry,
  .experience__row--right .experience__cell--entry
    grid-column: 2 / 3
    padding: 0 0 40px 0
    text-align: left

  .experience__cell--empty
    display: none
</style>
