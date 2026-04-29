<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const config = useRuntimeConfig()
const turnstileSiteKey = String(config.public.turnstileSiteKey ?? '')
const contactEndpoint = String(config.public.contactEndpoint ?? '/api/contact')

const name = ref('')
const email = ref('')
const message = ref('')
const turnstileToken = ref('')
const submitting = ref(false)
const sent = ref(false)
const errorMsg = ref('')

const widgetEl = ref<HTMLElement | null>(null)
let widgetId: string | null = null

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement | string, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
  }
}

useHead({
  script: turnstileSiteKey
    ? [{ src: 'https://challenges.cloudflare.com/turnstile/v0/api.js', async: true, defer: true }]
    : [],
})

function waitForTurnstile(timeoutMs = 8000): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const id = window.setInterval(() => {
      if (window.turnstile) {
        clearInterval(id)
        resolve()
      }
      else if (Date.now() - start > timeoutMs) {
        clearInterval(id)
        reject(new Error('Turnstile failed to load'))
      }
    }, 50)
  })
}

function resetTurnstile() {
  turnstileToken.value = ''
  if (widgetId && window.turnstile) window.turnstile.reset(widgetId)
}

onMounted(async () => {
  if (!turnstileSiteKey || !widgetEl.value) return
  try {
    await waitForTurnstile()
    widgetId = window.turnstile!.render(widgetEl.value, {
      sitekey: turnstileSiteKey,
      theme: 'auto',
      callback: (token: string) => { turnstileToken.value = token },
      'expired-callback': () => { turnstileToken.value = '' },
      'error-callback': () => { turnstileToken.value = '' },
    })
  }
  catch (e) {
    console.error('[contact] Turnstile failed to initialise', e)
  }
})

onBeforeUnmount(() => {
  if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
})

async function onSubmit(e: Event) {
  e.preventDefault()
  if (submitting.value) return

  errorMsg.value = ''
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    errorMsg.value = 'Please fill in name, email, and message.'
    return
  }
  if (turnstileSiteKey && !turnstileToken.value) {
    errorMsg.value = 'Please complete the CAPTCHA.'
    return
  }

  submitting.value = true
  try {
    const res = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
        turnstileToken: turnstileToken.value,
      }),
    })
    const body = await res.json().catch(() => ({})) as { ok?: boolean, error?: string }
    if (!res.ok || !body.ok) {
      errorMsg.value = body.error ?? 'Something went wrong. Please try again.'
      resetTurnstile()
      return
    }
    sent.value = true
    name.value = ''
    email.value = ''
    message.value = ''
    resetTurnstile()
    setTimeout(() => { sent.value = false }, 6000)
  }
  catch (err) {
    console.error('[contact] submit failed', err)
    errorMsg.value = 'Network error. Please try again.'
    resetTurnstile()
  }
  finally {
    submitting.value = false
  }
}

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
              href="mailto:luna@shyowlstudios.com"
              class="contact-row has-link"
            >
              <div class="contact-row__icon"><UiIcon name="mail" :size="20" /></div>
              <div>
                <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '4px' }">Email</div>
                <div :style="{ fontWeight: 500 }">luna@shyowlstudios.com</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
            </a>
            <a
              href="#"
              class="contact-row"
              @click="$event.preventDefault()"
            >
              <div class="contact-row__icon"><UiIcon name="pin" :size="20" /></div>
              <div>
                <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '4px' }">Location</div>
                <div :style="{ fontWeight: 500 }">Ontario, Canada</div>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/luna-parker"
              target="_blank"
              rel="noreferrer"
              class="contact-row has-link"
            >
              <div class="contact-row__icon"><UiIcon name="linkedin" :size="20" /></div>
              <div>
                <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '4px' }">LinkedIn</div>
                <div :style="{ fontWeight: 500 }">linkedin.com/in/luna-parker</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
            </a>
            <a
              href="https://github.com/lunaparker"
              target="_blank"
              rel="noreferrer"
              class="contact-row has-link"
            >
              <div class="contact-row__icon"><UiIcon name="github" :size="20" /></div>
              <div>
                <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '4px' }">GitHub</div>
                <div :style="{ fontWeight: 500 }">github.com/lunaparker</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
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
          novalidate
          @submit="onSubmit"
        >
          <UiM3Field v-model="name" label="Name" />
          <UiM3Field v-model="email" label="Email" type="email" />
          <UiM3Field v-model="message" label="Message" multiline />

          <div ref="widgetEl" class="turnstile-widget" />

          <p
            v-if="errorMsg"
            role="alert"
            :style="{ margin: 0, fontSize: '0.9rem', color: 'var(--error, #b3261e)' }"
          >
            {{ errorMsg }}
          </p>

          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginTop: '6px' }">
            <p class="mono" :style="{ fontSize: '11px', color: 'var(--on-surface-variant)' }">
              Typical reply within 1–2 business days
            </p>
            <button type="submit" class="btn btn-brand" :disabled="submitting">
              <template v-if="sent">
                Sent ✓
              </template>
              <template v-else-if="submitting">
                Sending…
              </template>
              <template v-else>
                Send message <UiIcon name="arrow" :size="16" />
              </template>
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
.contact-row__icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--surface-container);
  color: var(--on-surface);
  display: grid;
  place-items: center;
}

.turnstile-widget {
  min-height: 65px;
}

@media (max-width: 860px) {
  .contact-grid { grid-template-columns: 1fr !important; }
}
</style>
