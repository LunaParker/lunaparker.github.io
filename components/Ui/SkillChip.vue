<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, type Project } from '~/composables/useData'

const props = withDefaults(defineProps<{
  tech: string
  variant?: 'default' | 'primary' | 'tonal'
}>(), {
  variant: 'default',
})

const data = useData()

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

const techIndex = computed(() => {
  const idx: Record<string, { label: string, projects: Project[] }> = {}
  for (const p of data.value.projects) {
    for (const t of p.stack) {
      const k = norm(t)
      if (!idx[k]) idx[k] = { label: t, projects: [] }
      idx[k].projects.push(p as Project)
    }
  }
  return idx
})

const key = computed(() => norm(props.tech))
const hit = computed(() => techIndex.value[key.value])
const hasHit = computed(() => !!hit.value && hit.value.projects.length > 0)

const open = ref(false)
const pos = ref<'top' | 'bottom'>('bottom')
const wrapRef = ref<HTMLElement | null>(null)

const show = () => {
  if (!hasHit.value) return
  const r = wrapRef.value?.getBoundingClientRect()
  if (r) pos.value = r.top < 260 ? 'bottom' : 'top'
  open.value = true
}

const chipClass = computed(() =>
  `chip${props.variant === 'primary' ? ' chip-primary' : props.variant === 'tonal' ? ' chip-tonal' : ''}`,
)

const isGithub = (url: string) => /github\.com/i.test(url)
</script>

<template>
  <span
    ref="wrapRef"
    :style="{ position: 'relative', display: 'inline-block' }"
    @mouseenter="show"
    @mouseleave="open = false"
    @focusin="show"
    @focusout="open = false"
  >
    <button
      type="button"
      :tabindex="hasHit ? 0 : -1"
      :class="chipClass"
      :style="{
        cursor: hasHit ? 'help' : 'default',
        border: 0,
        font: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: 'none',
        background: hasHit ? 'color-mix(in oklch, var(--primary-container) 55%, var(--surface-container-high))' : undefined,
        color: hasHit ? 'var(--on-surface)' : undefined,
      }"
    >
      {{ tech }}
    </button>
    <div
      v-if="open && hasHit && hit"
      role="tooltip"
      :style="{
        position: 'absolute',
        [pos === 'top' ? 'bottom' : 'top']: 'calc(100% + 10px)',
        left: 0,
        zIndex: 30,
        minWidth: '260px',
        maxWidth: '340px',
        padding: '10px',
        borderRadius: '16px',
        background: 'var(--surface-container-highest)',
        border: '1px solid var(--outline-variant)',
        boxShadow: '0 18px 40px -10px color-mix(in oklch, #000 35%, transparent)',
        animation: 'tip-in var(--dur-short) var(--spring-fast)',
      }"
    >
      <div
        aria-hidden="true"
        :style="{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '14px',
          [pos === 'top' ? 'top' : 'bottom']: '100%',
        }"
      />
      <div class="label" :style="{ color: 'var(--on-surface-variant)', padding: '4px 8px 8px' }">
        Used in {{ hit.projects.length }} {{ hit.projects.length === 1 ? 'project' : 'projects' }}
      </div>
      <div :style="{ display: 'grid', gap: '2px' }">
        <a
          v-for="p in hit.projects"
          :key="p.id"
          :href="`https://${p.url}`"
          target="_blank"
          rel="noreferrer"
          class="skill-chip-link"
          :style="{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 10px',
            borderRadius: '10px',
            color: 'var(--on-surface)',
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'background-color var(--dur-short)',
          }"
          @click.stop
        >
          <div :style="{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }">
            <div :style="{ fontWeight: 600 }">{{ p.name }}</div>
            <div :style="{ fontSize: '11px', color: 'var(--on-surface-variant)' }">
              {{ p.role }} · {{ p.year }}
            </div>
          </div>
          <UiIcon :name="isGithub(p.url) ? 'github' : 'arrowUpRight'" :size="14" />
        </a>
      </div>
    </div>
  </span>
</template>

<style scoped lang="stylus">
@keyframes tip-in
  from
    opacity: 0
    transform: translateY(-4px)
  to
    opacity: 1
    transform: translateY(0)

.skill-chip-link:hover
  background: var(--surface-container)
</style>
