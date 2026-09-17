<script setup lang="ts">
import { computed, ref } from 'vue'

const config = useRuntimeConfig()
const turnstileSiteKey = String(config.public.turnstileSiteKey ?? '')
const contactEndpoint = String(config.public.contactEndpoint ?? '/api/contact')

const PROJECT_TYPES = [
  'New website',
  'Website redesign',
  'Custom web application',
  'WordPress / WooCommerce',
  'Ongoing maintenance',
  'Something else',
]

const name = ref('')
const email = ref('')
const organization = ref('')
const projectType = ref('')
const message = ref('')
const submitting = ref(false)
const sent = ref(false)
const errorMsg = ref('')

const firstName = computed(() => name.value.trim().split(' ')[0] || 'friend')
const sentName = ref('friend')

const widgetEl = ref<HTMLElement | null>(null)
const { token: turnstileToken, reset: resetTurnstile } = useTurnstile(widgetEl, turnstileSiteKey)

async function onSubmit(e: Event) {
  e.preventDefault()
  if (submitting.value) return

  errorMsg.value = ''
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    errorMsg.value = 'Please fill in your name, email, and message.'
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
        organization: organization.value,
        projectType: projectType.value,
        source: 'shy-owl',
        turnstileToken: turnstileToken.value,
      }),
    })
    const body = await res.json().catch(() => ({})) as { ok?: boolean, error?: string }
    if (!res.ok || !body.ok) {
      errorMsg.value = body.error ?? 'Something went wrong. Please try again.'
      resetTurnstile()
      return
    }
    sentName.value = firstName.value
    sent.value = true
    name.value = ''
    email.value = ''
    organization.value = ''
    projectType.value = ''
    message.value = ''
    resetTurnstile()
  }
  catch (err) {
    console.error('[studio-contact] submit failed', err)
    errorMsg.value = 'Network error. Please try again.'
    resetTurnstile()
  }
  finally {
    submitting.value = false
  }
}

function sendAnother() {
  sent.value = false
}
</script>

<template>
  <section id="contact" class="section studio-contact">
    <div class="container">
      <div class="studio-contact__grid">
        <div>
          <div class="label section-kicker studio-contact__kicker"><span>Say hello</span></div>
          <h2 class="studio-contact__title">Let's build something good together.</h2>
          <p class="studio-contact__intro">
            Tell us about your organization and what you're trying to ship. We'll get back to you promptly.
          </p>
          <div class="studio-contact__rows">
            <div class="studio-contact__row">
              <UiIcon name="mail" :size="18" />
              <a href="mailto:hello@shyowlstudios.com">hello@shyowlstudios.com</a>
            </div>
            <div class="studio-contact__row">
              <UiIcon name="pin" :size="18" />
              <span>Greater Toronto Area · Working remotely worldwide</span>
            </div>
          </div>
        </div>

        <div class="studio-contact__card">
          <form
            v-if="!sent"
            class="studio-contact__form"
            novalidate
            @submit="onSubmit"
          >
            <UiM3Field v-model="name" label="Your name" />
            <div class="studio-contact__form-row">
              <UiM3Field v-model="email" label="Email" type="email" />
              <UiM3Field v-model="organization" label="Organization" />
            </div>
            <UiM3Field
              v-model="projectType"
              label="Project type"
              :options="PROJECT_TYPES"
              placeholder-option="Pick one…"
            />
            <UiM3Field v-model="message" label="Tell us about it" multiline />

            <div ref="widgetEl" class="studio-contact__turnstile" />

            <p
              v-if="errorMsg"
              class="studio-contact__error"
              role="alert"
            >
              {{ errorMsg }}
            </p>

            <div class="studio-contact__form-footer">
              <p class="mono studio-contact__form-footer-meta">
                We respect your time and your privacy.
              </p>
              <button type="submit" class="btn btn-gradient" :disabled="submitting">
                <template v-if="submitting">
                  Sending…
                </template>
                <template v-else>
                  Start a project <UiIcon name="arrow" :size="16" />
                </template>
              </button>
            </div>
          </form>

          <div v-else class="studio-contact__success">
            <div class="studio-contact__success-badge">
              <UiIcon name="check" :size="26" :stroke="2" />
            </div>
            <h3 class="studio-contact__success-title">Thanks, {{ sentName }}.</h3>
            <p class="studio-contact__success-body">We'll review your message and get back to you shortly.</p>
            <button type="button" class="btn btn-text" @click="sendAnother">Send another →</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.studio-contact__grid
  display: grid
  grid-template-columns: 1fr 1.2fr
  gap: unquote("clamp(2rem, 6vw, 5rem)")
  align-items: start

.studio-contact__kicker
  color: var(--on-surface-variant)
  margin-bottom: 1.25rem

.studio-contact__title
  font-family: var(--font-display)
  font-weight: 700
  font-size: unquote("clamp(2rem, 4.4vw, 3rem)")
  line-height: 1.05
  letter-spacing: -0.025em
  margin: 0

.studio-contact__intro
  margin-top: 1.5rem
  color: var(--on-surface-variant)
  line-height: 1.65
  font-size: 1.05rem
  max-width: 460px

.studio-contact__rows
  margin-top: 2.25rem
  display: grid
  gap: 1rem
  color: var(--on-surface-variant)

.studio-contact__row
  display: flex
  gap: 12px
  align-items: center

.studio-contact__row a
  color: var(--on-surface)
  text-decoration: none

.studio-contact__card
  background: var(--surface)
  border: 1px solid var(--outline-variant)
  border-radius: 24px
  padding: unquote("clamp(1.5rem, 3vw, 2.25rem)")

.studio-contact__form
  display: grid
  gap: 1.1rem

.studio-contact__form-row
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 1rem

.studio-contact__turnstile
  min-height: 65px

.studio-contact__error
  margin: 0
  font-size: 0.9rem
  color: var(--error, #b3261e)

.studio-contact__form-footer
  display: flex
  justify-content: space-between
  align-items: center
  gap: 12px
  flex-wrap: wrap

.studio-contact__form-footer-meta
  font-size: 11px
  color: var(--on-surface-variant)

.studio-contact__success
  padding: 2rem 0
  text-align: center

.studio-contact__success-badge
  width: 56px
  height: 56px
  border-radius: 50%
  background: var(--primary-container)
  color: var(--on-primary-container)
  display: grid
  place-items: center
  margin: 0 auto 1.25rem

.studio-contact__success-title
  font-family: var(--font-display)
  font-size: 1.4rem
  font-weight: 600
  letter-spacing: -0.015em
  margin: 0 0 0.6rem

.studio-contact__success-body
  color: var(--on-surface-variant)
  line-height: 1.6
  max-width: 360px
  margin: 0 auto 1.25rem

@media (max-width: 900px)
  .studio-contact__grid
    grid-template-columns: 1fr

  .studio-contact__form-row
    grid-template-columns: 1fr
</style>
