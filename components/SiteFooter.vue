<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <footer :style="{ padding: '60px 0 40px', borderTop: '1px solid var(--outline-variant)', marginTop: '40px' }">
    <div class="container" :style="{ display: 'grid', gap: '40px' }">
      <div
:style="{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 10vw, 10rem)',
        fontWeight: 800,
        letterSpacing: '-0.06em',
        lineHeight: 0.85,
        background: 'var(--brand-gradient)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }">
        Luna Parker
      </div>
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }">
        <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">
          © 2026 Luna Parker
        </div>
        <div :style="{ display: 'flex', gap: '18px', fontSize: '13px', color: 'var(--on-surface-variant)', alignItems: 'center', flexWrap: 'wrap' }">
          <a :href="`https://${data.luna.github}`" target="_blank" rel="noreferrer">GitHub</a>
          <a :href="`https://${data.luna.linkedin}`" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#" @click.prevent>Resume</a>
          <span :style="{ display: 'inline-flex', alignItems: 'center', gap: '6px' }">
            Made with <UiIcon name="heart" :size="13" :style="{ color: '#E94057' }" /> in
            <UiIcon name="maple" :size="14" :style="{ color: '#FF0000' }" /> Canada
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
