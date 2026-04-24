<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

function onSubmit(e: Event) {
  e.preventDefault()
  sent.value = true
  setTimeout(() => { sent.value = false }, 4000)
}

const rows = computed(() => [
  { icon: 'mail' as const, label: 'Email', val: data.value.luna.email, href: `mailto:${data.value.luna.email}` },
  { icon: 'pin' as const, label: 'Location', val: data.value.luna.location, href: null as string | null },
  { icon: 'linkedin' as const, label: 'LinkedIn', val: data.value.luna.linkedin, href: `https://${data.value.luna.linkedin}` },
  { icon: 'github' as const, label: 'GitHub', val: data.value.luna.github, href: `https://${data.value.luna.github}` },
])
</script>

<template>
  <section id="contact" class="section" :style="{ position: 'relative' }">
    <div class="container">
      <UiSectionHeader
        kicker="06 — Contact"
        sub="Whether you're hiring a co-op for Fall 2026, need a freelance dev, or just want to say hello — I'd love to hear from you."
      >
        <template #title>
          <span
:style="{
            background: 'var(--brand-gradient)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '100% 100%',
          }">Let's work<br>together.</span>
        </template>
      </UiSectionHeader>

      <div class="contact-grid" :style="{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 'clamp(24px, 4vw, 72px)', alignItems: 'start' }">
        <div>
          <div :style="{ display: 'grid', gap: '4px' }">
            <a
              v-for="row in rows"
              :key="row.label"
              :href="row.href || '#'"
              :target="row.href?.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer"
              class="contact-row"
              :class="{ 'has-link': !!row.href }"
              @click="!row.href && $event.preventDefault()"
            >
              <div
:style="{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'var(--surface-container)',
                color: 'var(--on-surface)',
                display: 'grid',
                placeItems: 'center',
              }">
                <UiIcon :name="row.icon" :size="20" />
              </div>
              <div>
                <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '4px' }">{{ row.label }}</div>
                <div :style="{ fontWeight: 500 }">{{ row.val }}</div>
              </div>
              <UiIcon v-if="row.href" name="arrowUpRight" :size="18" />
            </a>
          </div>
        </div>

        <form
          :style="{
            padding: 'clamp(24px, 3vw, 40px)',
            borderRadius: '28px',
            background: 'var(--surface-container)',
            display: 'grid',
            gap: '18px',
          }"
          @submit="onSubmit"
        >
          <UiM3Field v-model="name" label="Name" />
          <UiM3Field v-model="email" label="Email" type="email" />
          <UiM3Field v-model="message" label="Message" multiline />
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginTop: '6px' }">
            <p class="mono" :style="{ fontSize: '11px', color: 'var(--on-surface-variant)' }">
              Typical reply within 1–2 business days
            </p>
            <button type="submit" class="btn btn-brand">
              {{ sent ? 'Sent ✓' : 'Send message' }} <UiIcon v-if="!sent" name="arrow" :size="16" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 20px 4px;
  border-bottom: 1px solid var(--outline-variant);
  transition: padding var(--dur-short) var(--spring-gentle);
  cursor: default;
  color: inherit;
  text-decoration: none;
}
.contact-row.has-link { cursor: pointer; }
.contact-row.has-link:hover { padding-left: 14px; }

@media (max-width: 860px) {
  .contact-grid { grid-template-columns: 1fr !important; }
}
</style>
