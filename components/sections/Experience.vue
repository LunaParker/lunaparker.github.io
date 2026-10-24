<script setup lang="ts">
import { reactive } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()

// Three bullets per role up front; the rest stay in the page (for search and
// print) behind a per-role toggle
const VISIBLE_BULLETS = 3
const expanded = reactive<Record<string, boolean>>({})
</script>

<template>
  <section id="experience" class="section experience">
    <div class="container">
      <UiSectionHeader
        sub="Where I've worked, what I built, and the stacks I've carried."
      >
        <template #title>
          Eight years of shipping: agencies, enterprise, and my own consultancy.
        </template>
      </UiSectionHeader>

      <ol class="experience__list">
        <UiReveal
          v-for="(entry, i) in data.experience"
          :key="entry.id"
          :delay="i * 60"
          as="li"
          class="experience__item"
        >
          <div class="experience__when">
            <div class="experience__period">{{ entry.period }}</div>
            <div class="experience__type">{{ entry.type }}</div>
          </div>

          <div class="experience__body">
            <h3 class="experience__role">{{ entry.role }}</h3>
            <div class="experience__org">
              {{ entry.org }} <span class="experience__location">· {{ entry.location }}</span>
            </div>
            <p v-if="entry.blurb" class="experience__blurb">{{ entry.blurb }}</p>

            <ul v-if="entry.bullets.length > 0" :id="`experience-bullets-${entry.id}`" class="experience__bullets">
              <li
                v-for="(b, j) in entry.bullets"
                v-show="expanded[entry.id] || j < VISIBLE_BULLETS"
                :key="j"
                class="experience__bullet"
              >
                {{ b }}
              </li>
            </ul>
            <button
              v-if="entry.bullets.length > VISIBLE_BULLETS"
              type="button"
              class="experience__more"
              :aria-expanded="expanded[entry.id] ? 'true' : 'false'"
              :aria-controls="`experience-bullets-${entry.id}`"
              @click="expanded[entry.id] = !expanded[entry.id]"
            >
              {{ expanded[entry.id] ? 'Show fewer' : `Show all ${entry.bullets.length}` }}
              <UiIcon name="chevDown" :size="16" :stroke="2" class="experience__more-icon" :class="{ 'is-open': expanded[entry.id] }" />
            </button>

            <div class="experience__stack">
              <UiSkillChip v-for="t in entry.stack" :key="t" :tech="t" variant="tonal" />
            </div>
          </div>
        </UiReveal>
      </ol>

      <div class="experience__edu">
        <h3 class="headline experience__edu-heading">Education</h3>
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

// One newest-first column: dates in a narrow margin, each role at reading
// width beside them, joined by a single rule
.experience__list
  list-style: none
  margin: 0
  padding: 0

.experience__item
  display: grid
  grid-template-columns: 168px minmax(0, 68ch)
  gap: 0 40px

.experience__when
  padding-top: 6px
  text-align: right

.experience__period
  font-size: 0.9375rem
  font-weight: 600
  color: var(--on-surface)
  font-variant-numeric: tabular-nums

.experience__type
  margin-top: 2px
  font-size: 0.875rem
  color: var(--on-surface-variant)

.experience__body
  position: relative
  padding: 0 0 56px 32px
  border-left: 1px solid var(--outline-variant)

// Marker where each role meets the rule
.experience__body::before
  content: ''
  position: absolute
  top: 12px
  left: -5px
  width: 9px
  height: 9px
  border-radius: 50%
  background: var(--primary)
  box-shadow: 0 0 0 4px var(--surface)

.experience__item:last-child .experience__body
  padding-bottom: 8px

.experience__role
  font-family: var(--font-display)
  font-size: 1.5rem
  font-weight: 700
  letter-spacing: -0.02em
  line-height: 1.25
  margin: 0 0 4px

.experience__org
  font-size: 1rem
  font-weight: 600
  color: var(--primary-text)
  margin-bottom: 14px

.experience__location
  font-weight: 400
  color: var(--on-surface-variant)

.experience__blurb
  color: var(--on-surface-variant)
  margin: 0 0 16px

.experience__bullets
  list-style: disc
  margin: 0 0 12px
  padding-left: 1.1em
  display: grid
  gap: 8px
  color: var(--on-surface-variant)
  font-size: 0.95rem

.experience__bullet::marker
  color: var(--primary)

.experience__more
  display: inline-flex
  align-items: center
  gap: 4px
  margin: 0 0 16px
  padding: 4px 0
  border: 0
  background: none
  font: inherit
  font-size: 0.9375rem
  font-weight: 600
  color: var(--primary-text)
  cursor: pointer

.experience__more:hover
  text-decoration: underline
  text-underline-offset: 4px

.experience__more-icon
  transition: transform var(--dur-short) var(--spring-gentle)

.experience__more-icon.is-open
  transform: rotate(180deg)

.experience__stack
  display: flex
  flex-wrap: wrap
  gap: 6px

.experience__edu
  margin-top: 80px

.experience__edu-heading
  margin-bottom: 24px

.experience__edu-grid
  display: grid
  // min() lets the one column shrink below 320px on a 320px-wide screen;
  // unquoted so Stylus's own min() doesn't fold it to 100% at compile time
  grid-template-columns: repeat(auto-fit, minmax(unquote("min(320px, 100%)"), 1fr))
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

// Phones: dates move above each role, the rule stays on the left
@media (max-width: 720px)
  .experience__item
    grid-template-columns: minmax(0, 1fr)

  .experience__when
    display: flex
    gap: 6px
    align-items: baseline
    text-align: left
    padding: 0 0 6px 24px
    border-left: 1px solid var(--outline-variant)

  .experience__type::before
    content: '· '

  .experience__body
    padding-left: 24px
    padding-bottom: 40px

  .experience__body::before
    top: -22px
</style>
