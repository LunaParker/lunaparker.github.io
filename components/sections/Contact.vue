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
  <section id="contact" class="section contact">
    <div class="container">
      <UiSectionHeader
        kicker="06 — Contact"
        sub="Whether you're hiring a co-op for Fall 2026, need a freelance dev, or just want to say hello — I'd love to hear from you."
      >
        <template #title>
          <span class="contact__title-gradient gradient-text">Let's work<br>together.</span>
        </template>
      </UiSectionHeader>

      <div class="contact__grid">
        <div>
          <div class="contact__rows">
            <a
              href="mailto:luna@shyowlstudios.com"
              class="contact__row contact__row--linked"
            >
              <div class="contact__row-icon"><UiIcon name="mail" :size="20" /></div>
              <div>
                <div class="label contact__row-label">Email</div>
                <div class="contact__row-value">luna@shyowlstudios.com</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
            </a>
            <a
              href="#"
              class="contact__row"
              @click="$event.preventDefault()"
            >
              <div class="contact__row-icon"><UiIcon name="pin" :size="20" /></div>
              <div>
                <div class="label contact__row-label">Location</div>
                <div class="contact__row-value">Ontario, Canada</div>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/luna-parker"
              target="_blank"
              rel="noreferrer"
              class="contact__row contact__row--linked"
            >
              <div class="contact__row-icon"><UiIcon name="linkedin" :size="20" /></div>
              <div>
                <div class="label contact__row-label">LinkedIn</div>
                <div class="contact__row-value">linkedin.com/in/luna-parker</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
            </a>
            <a
              href="https://github.com/lunaparker"
              target="_blank"
              rel="noreferrer"
              class="contact__row contact__row--linked"
            >
              <div class="contact__row-icon"><UiIcon name="github" :size="20" /></div>
              <div>
                <div class="label contact__row-label">GitHub</div>
                <div class="contact__row-value">github.com/lunaparker</div>
              </div>
              <UiIcon name="arrowUpRight" :size="18" />
            </a>
          </div>
        </div>

        <form
          class="contact__form"
          novalidate
          @submit="onSubmit"
        >
          <UiM3Field v-model="name" label="Name" />
          <UiM3Field v-model="email" label="Email" type="email" />
          <UiM3Field v-model="message" label="Message" multiline />

          <div ref="widgetEl" class="contact__turnstile" />

          <p
            v-if="errorMsg"
            class="contact__error"
            role="alert"
          >
            {{ errorMsg }}
          </p>

          <div class="contact__form-footer">
            <p class="mono contact__form-footer-meta">
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
.contact {
  position: relative;
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(24px, 4vw, 72px);
  align-items: start;
}

.contact__rows {
  display: grid;
  gap: 4px;
}

.contact__row {
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

.contact__row--linked {
  cursor: pointer;
}

.contact__row--linked:hover {
  padding-left: 14px;
}

.contact__row-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--surface-container);
  color: var(--on-surface);
  display: grid;
  place-items: center;
}

.contact__row-label {
  color: var(--on-surface-variant);
  margin-bottom: 4px;
}

.contact__row-value {
  font-weight: 500;
}

.contact__form {
  padding: clamp(24px, 3vw, 40px);
  border-radius: 28px;
  background: var(--surface-container);
  display: grid;
  gap: 18px;
}

.contact__turnstile {
  min-height: 65px;
}

.contact__error {
  margin: 0;
  font-size: 0.9rem;
  color: var(--error, #b3261e);
}

.contact__form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
}

.contact__form-footer-meta {
  font-size: 11px;
  color: var(--on-surface-variant);
}

@media (max-width: 860px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
