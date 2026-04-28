<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()

function sideFor(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right'
}

function entryColStyle(index: number) {
  const side = sideFor(index)
  return {
    gridColumn: side === 'left' ? '1 / 2' : '3 / 4',
    padding: side === 'left' ? '0 36px 56px 0' : '0 0 56px 36px',
    textAlign: side === 'left' ? 'right' : 'left',
  } as const
}

function emptyColStyle(index: number) {
  const side = sideFor(index)
  return { gridColumn: side === 'left' ? '3 / 4' : '1 / 2' }
}
</script>

<template>
  <section id="experience" class="section" :style="{ position: 'relative' }">
    <div class="container">
      <UiSectionHeader
        kicker="02 — Experience"
        sub="Where I've worked, what I built, and the stacks I've carried."
      >
        <template #title>
          Eight years of shipping — agencies, enterprise, and my own consultancy.
        </template>
      </UiSectionHeader>

      <div class="exp-timeline" :style="{ position: 'relative' }">
        <div
          class="exp-rail"
          :style="{
            position: 'absolute',
            top: '18px',
            bottom: '18px',
            left: '50%',
            width: '2px',
            transform: 'translateX(-1px)',
            background: 'linear-gradient(to bottom, transparent, var(--outline-variant) 6%, var(--outline-variant) 94%, transparent)',
          }"
        />

        <UiReveal
          v-for="(entry, i) in data.experience"
          :key="entry.id"
          :delay="i * 60"
          as="article"
          :style="{ position: 'relative' }"
        >
          <div
            :class="['exp-row', `exp-${sideFor(i)}`]"
            :style="{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 0, alignItems: 'start' }"
          >
            <div :style="entryColStyle(i)">
              <div class="exp-card">
                <div class="label mono" :style="{ color: 'var(--on-surface-variant)', marginBottom: '12px' }">
                  {{ entry.period }} · {{ entry.type }}
                </div>
                <h3 class="title" :style="{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }">
                  {{ entry.role }}
                </h3>
                <div :style="{ fontSize: '1rem', color: 'var(--primary-text)', fontWeight: 600, marginBottom: '14px' }">
                  {{ entry.org }} · {{ entry.location }}
                </div>
                <p v-if="entry.blurb" :style="{ color: 'var(--on-surface-variant)', marginBottom: (entry.bullets.length ? '18px' : '14px') }">
                  {{ entry.blurb }}
                </p>
                <ul
                  v-if="entry.bullets.length > 0"
                  :style="{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px', marginBottom: '18px' }"
                >
                  <li
                    v-for="(b, j) in entry.bullets"
                    :key="j"
                    :style="{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', color: 'var(--on-surface-variant)', fontSize: '0.95rem' }"
                  >
                    <span :style="{ marginTop: '9px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--primary)' }" />
                    <span>{{ b }}</span>
                  </li>
                </ul>
                <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '6px' }">
                  <UiSkillChip v-for="s in entry.stack" :key="s" :tech="s" variant="tonal" />
                </div>
              </div>
            </div>

            <div :style="{ gridColumn: '2 / 3', display: 'flex', justifyContent: 'center', position: 'relative' }">
              <div
:style="{
                position: 'relative',
                zIndex: 1,
                marginTop: '18px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--surface)',
                border: '2px solid var(--primary)',
                display: 'grid',
                placeItems: 'center',
              }">
                <div :style="{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }" />
              </div>
            </div>

            <div :style="emptyColStyle(i)" />
          </div>
        </UiReveal>
      </div>

      <div :style="{ marginTop: '80px' }">
        <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '24px' }">
          <span>Education</span>
        </div>
        <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }">
          <UiReveal
            v-for="(edu, i) in data.education"
            :key="edu.school"
            :delay="i * 80"
          >
            <div
:style="{
              padding: '28px',
              borderRadius: '24px',
              background: i === 0 ? 'var(--primary-container)' : 'var(--surface-container)',
              color: i === 0 ? 'var(--on-primary-container)' : 'var(--on-surface)',
              height: '100%',
            }">
              <div class="label mono" :style="{ opacity: 0.7, marginBottom: '14px' }">
                {{ edu.period }}
              </div>
              <h3 :style="{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }">
                {{ edu.school }}
              </h3>
              <div :style="{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '16px' }">{{ edu.degree }}</div>
              <div
                v-if="edu.specialization"
                :style="{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }"
              >
                <UiChip :variant="i === 0 ? 'default' : 'tonal'">Spec: {{ edu.specialization }}</UiChip>
                <UiChip v-if="edu.gpa">GPA {{ edu.gpa }}</UiChip>
              </div>
              <p v-if="edu.status" :style="{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '14px' }">
                {{ edu.status }}
              </p>
              <ul :style="{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }">
                <li
                  v-for="(n, j) in edu.notes"
                  :key="j"
                  :style="{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', fontSize: '0.9rem', opacity: 0.85 }"
                >
                  <span :style="{ marginTop: '8px', width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }" />
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

<style scoped lang="scss">
.exp-card {
  padding: 28px;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 24px;
  text-align: left;
  display: inline-block;
  max-width: 520px;
  width: 100%;
  transition:
    transform var(--dur-med) var(--spring-fast),
    border-color var(--dur-short) var(--spring-gentle);
}
.exp-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

@media (max-width: 860px) {
  .exp-rail { left: 18px !important; }
  .exp-row { grid-template-columns: 36px 1fr !important; }
  .exp-row > *:first-child {
    grid-column: 2 / 3 !important;
    padding: 0 0 40px 0 !important;
    text-align: left !important;
  }
  .exp-row > *:nth-child(2) { grid-column: 1 / 2 !important; }
  .exp-row > *:nth-child(3) { display: none !important; }
}
</style>
