<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const version = '0.1.0'
const files = `https://files.lunaparker.dev/basic-auth-gateway/v${version}`
const storeUrl = 'https://chromewebstore.google.com/detail/basic-auth-gateway/djheidmbcimneicefamggggpkchbepnn'
// The extension manifest's own description
const summary = 'Signs you in to the DEV and staging sites you choose, with a password from your Keychain or Windows Credential Manager.'

type Arch = 'arm64' | 'x86_64'
const macs: { arch: Arch, label: string }[] = [
  { arch: 'arm64', label: 'Apple silicon' },
  { arch: 'x86_64', label: 'Intel' },
]
const macFile = (arch: Arch) => `basic-auth-gateway-macos-${arch}`
const mac = ref<Arch>('arm64')

definePageMeta({ viewTransition: true })

const title = 'Basic Auth Gateway | Luna Parker'
useHead({ title })
useSeoMeta({
  description: summary,
  ogTitle: title,
  ogDescription: summary,
  twitterTitle: title,
  twitterDescription: summary,
})

// macOS menu: same keyboard model as ThemeToggle
const open = ref(false)
const buttonEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

function setItemRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) itemRefs.value[index] = el
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    itemRefs.value[0]?.focus()
  }
}

function close(returnFocus = true) {
  if (!open.value) return
  open.value = false
  if (returnFocus) buttonEl.value?.focus()
}

function choose(arch: Arch) {
  mac.value = arch
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'Tab') {
    close(false)
    return
  }
  const items = itemRefs.value
  const current = items.indexOf(document.activeElement as HTMLElement)
  let next = -1
  if (e.key === 'ArrowDown') next = (current + 1) % items.length
  if (e.key === 'ArrowUp') next = (current - 1 + items.length) % items.length
  if (e.key === 'Home') next = 0
  if (e.key === 'End') next = items.length - 1
  if (next >= 0) {
    e.preventDefault()
    items[next]?.focus()
  }
}

function onDocumentDown(e: MouseEvent) {
  const target = e.target as Node
  if (menuEl.value?.contains(target) || buttonEl.value?.contains(target)) return
  close(false)
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('mousedown', onDocumentDown, true)
    document.addEventListener('keydown', onKeydown, true)
  }
  else {
    document.removeEventListener('mousedown', onDocumentDown, true)
    document.removeEventListener('keydown', onKeydown, true)
    itemRefs.value = []
  }
})

// Install commands
type Shell = 'windows' | 'mac'
const windowsCommands = ['cd ~\\Downloads', '.\\basic-auth-gateway.exe install']
const macCommands = computed(() => {
  const file = macFile(mac.value)
  return ['cd ~/Downloads', `xattr -c ${file}`, `chmod +x ${file}`, `./${file} install`]
})

const copied = ref<Shell | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copy(shell: Shell) {
  const lines = shell === 'mac' ? macCommands.value : windowsCommands
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
  }
  catch {
    return
  }
  copied.value = shell
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = null }, 2000)
}

onBeforeUnmount(() => {
  clearTimeout(copiedTimer)
  document.removeEventListener('mousedown', onDocumentDown, true)
  document.removeEventListener('keydown', onKeydown, true)
})
</script>

<template>
  <article class="landing">
    <div class="container">
      <header class="landing__grid landing__head stagger">
        <!-- Inline copy of public/products/basic-auth-gateway.svg, so its dots can animate -->
        <svg class="landing__icon" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill="#6b4fbb" />
          <rect x="4" y="10" width="24" height="12" rx="3.5" fill="#fff" />
          <circle class="landing__dot" cx="10" cy="16" r="2.4" fill="#6b4fbb" />
          <circle class="landing__dot" cx="16" cy="16" r="2.4" fill="#6b4fbb" />
          <circle class="landing__dot" cx="22" cy="16" r="2.4" fill="#6b4fbb" />
        </svg>

        <div class="landing__main">
          <h1 class="landing__title">
            <span class="gradient-text">Basic Auth Gateway</span>
          </h1>
          <p class="landing__summary">
            {{ summary }}
          </p>

          <div class="landing__actions">
            <a class="btn btn-brand landing__btn" :href="`${files}/basic-auth-gateway.exe`">
              <UiIcon name="download" :size="18" class="landing__lead-icon" />
              <span>Download Host <span class="landing__qual">(Windows, x64)</span></span>
            </a>

            <div class="landing__menu-wrap">
              <button
                ref="buttonEl"
                type="button"
                class="btn btn-brand landing__btn"
                :class="{ 'landing__btn--open': open }"
                aria-haspopup="menu"
                :aria-expanded="open"
                aria-controls="mac-menu"
                @click="toggle"
              >
                <UiIcon name="download" :size="18" class="landing__lead-icon" />
                <span>Download Host <span class="landing__qual">(macOS)</span></span>
                <UiIcon name="chevDown" :size="16" class="landing__chev" />
              </button>

              <Transition name="landing-menu">
                <div
                  v-if="open"
                  id="mac-menu"
                  ref="menuEl"
                  class="landing__menu"
                  role="menu"
                  aria-label="Download the macOS host"
                >
                  <a
                    v-for="(m, i) in macs"
                    :key="m.arch"
                    :ref="el => setItemRef(el as Element | null, i)"
                    role="menuitem"
                    class="landing__item"
                    :href="`${files}/${macFile(m.arch)}`"
                    @click="choose(m.arch)"
                  >
                    <span class="landing__item-text">
                      <span class="landing__item-title">{{ m.label }}</span>
                      <span class="landing__item-file">{{ macFile(m.arch) }}</span>
                    </span>
                    <UiIcon name="download" :size="18" />
                  </a>
                </div>
              </Transition>
            </div>

            <a class="btn btn-outlined landing__btn" :href="storeUrl" target="_blank" rel="noopener">
              <UiIcon name="webStore" :size="18" />
              Chrome Extension
              <UiIcon name="arrowUpRight" :size="16" />
            </a>
          </div>
        </div>

        <dl class="landing__meta">
          <div>
            <dt class="label">
              Version
            </dt>
            <dd>{{ version }}</dd>
          </div>
          <div>
            <dt class="label">
              Checksums
            </dt>
            <dd><a class="landing__file-link" :href="`${files}/SHA256SUMS`">SHA256SUMS</a></dd>
          </div>
          <div>
            <dt class="label">
              Privacy
            </dt>
            <dd>
              <NuxtLink to="/basic-auth-gateway/privacy/">
                Privacy policy
              </NuxtLink>
            </dd>
          </div>
        </dl>
      </header>

      <section class="landing__grid landing__section" aria-labelledby="install-heading">
        <h2 id="install-heading" class="landing__h2">
          Install the host
        </h2>

        <div class="landing__column">
          <p class="landing__body">
            The host is a small helper program that keeps the password in your computer's own password store, outside the browser. After downloading it, run its install command once from a terminal; it needs no admin rights.
          </p>

          <div class="landing__cmds">
            <figure class="cmd">
              <figcaption class="cmd__head">
                <span class="label">Windows, in PowerShell</span>
                <button type="button" class="cmd__copy" @click="copy('windows')">
                  <UiIcon :name="copied === 'windows' ? 'check' : 'copy'" :size="16" />
                  <span>{{ copied === 'windows' ? 'Copied' : 'Copy' }}<span class="landing__sr"> the Windows commands</span></span>
                </button>
              </figcaption>
              <pre class="cmd__pre"><code>{{ windowsCommands.join('\n') }}</code></pre>
              <p class="cmd__note">
                SmartScreen may warn about it: choose More info, then Run anyway.
              </p>
            </figure>

            <figure class="cmd">
              <figcaption class="cmd__head">
                <span class="label">macOS, in Terminal</span>
                <span class="cmd__tools">
                  <span class="cmd__arch" role="group" aria-label="Mac chip">
                    <button
                      v-for="m in macs"
                      :key="m.arch"
                      type="button"
                      class="cmd__arch-btn"
                      :aria-pressed="mac === m.arch"
                      @click="mac = m.arch"
                    >{{ m.label }}</button>
                  </span>
                  <button type="button" class="cmd__copy" @click="copy('mac')">
                    <UiIcon :name="copied === 'mac' ? 'check' : 'copy'" :size="16" />
                    <span>{{ copied === 'mac' ? 'Copied' : 'Copy' }}<span class="landing__sr"> the macOS commands</span></span>
                  </button>
                </span>
              </figcaption>
              <pre class="cmd__pre"><code>cd ~/Downloads
xattr -c <span :key="`x-${mac}`" class="cmd__file">{{ macFile(mac) }}</span>
chmod +x <span :key="`c-${mac}`" class="cmd__file">{{ macFile(mac) }}</span>
./<span :key="`i-${mac}`" class="cmd__file">{{ macFile(mac) }}</span> install</code></pre>
              <p class="cmd__note">
                The host isn't signed, so macOS won't run the download until <code>xattr -c</code> clears its quarantine.
              </p>
            </figure>
          </div>
          <span class="landing__sr" aria-live="polite">{{ copied ? 'Copied to the clipboard' : '' }}</span>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped lang="stylus">
hairline = unquote("color-mix(in oklch, var(--on-surface) 12%, transparent)")

.landing
  --landing-measure: 40rem
  --product-accent: #6b4fbb
  padding: clamp(7rem, 15vh, 9.5rem) 0 clamp(4rem, 10vh, 6rem)

// Same grid as ProductPolicy, so a product's pages share one margin
.landing__grid
  display: grid
  grid-template-columns: 320px minmax(0, 1fr)
  column-gap: clamp(3rem, 5vw, 4.5rem)
  max-width: 1060px
  margin-inline: auto

.landing__head
  grid-template-areas: "icon main" "meta main"
  grid-template-rows: auto 1fr
  align-items: start
  padding-bottom: clamp(3.5rem, 8vh, 5rem)

.landing__icon
  grid-area: icon
  display: block
  width: 160px
  height: 160px
  // Matches the icon's own corner (rx 7 of 32)
  border-radius: 21.875%
  box-shadow: 0 26px 48px -22px unquote("color-mix(in oklch, var(--product-accent) 75%, transparent)")

// The password fills itself in, one dot at a time
.landing__dot
  transform-box: fill-box
  transform-origin: center
  animation: landing-dot var(--dur-med) var(--spring-fast) both

.landing__dot:nth-of-type(1)
  animation-delay: calc(520ms * var(--motion))

.landing__dot:nth-of-type(2)
  animation-delay: calc(660ms * var(--motion))

.landing__dot:nth-of-type(3)
  animation-delay: calc(800ms * var(--motion))

@keyframes landing-dot
  from
    transform: scale(0)

// Above the meta list, so the open macOS menu covers it when the columns stack
.landing__main
  grid-area: main
  position: relative
  z-index: 2
  container-type: inline-size

.landing__title
  font-size: clamp(3rem, 7vw, 6rem)
  font-weight: 800
  letter-spacing: -0.045em
  line-height: 0.92
  padding-bottom: 0.06em

.landing__summary
  margin-top: 1.75rem
  max-width: var(--landing-measure)
  font-size: 1.25rem
  line-height: 1.6
  color: var(--on-surface)

.landing__actions
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 0.75rem
  margin-top: 2.5rem

.landing__btn
  justify-content: center

// When the two host buttons can't share a row, every action takes the full width
@css {
  @container (max-width: 600px) {
    .landing__actions {
      flex-direction: column;
      align-items: stretch;
    }
    .landing__menu-wrap .landing__btn {
      width: 100%;
    }
    /* Wider than the button with tighter corners, so the corners clear the text beneath */
    .landing__menu-wrap .landing__menu {
      left: -12px;
      width: calc(100% + 24px);
      min-width: 0;
      border-radius: 16px;
    }
    .landing__menu .landing__item {
      border-radius: 10px;
    }
  }
}

.landing__qual
  font-weight: 500
  opacity: 0.72
  transition: opacity var(--dur-short) var(--spring-gentle)

// On the accent fill a dimmed qualifier drops below 4.5:1
.landing__btn:hover .landing__qual, .landing__btn--open .landing__qual
  opacity: 1

.landing__chev
  margin-left: -0.15rem
  transition: transform var(--dur-short) var(--spring-fast)

.landing__btn--open
  background: var(--primary)
  color: var(--on-primary)

  .landing__chev
    transform: rotate(180deg)

.landing__menu-wrap
  position: relative

.landing__menu
  position: absolute
  top: calc(100% + 8px)
  left: 0
  z-index: 30
  width: max-content
  min-width: 100%
  padding: 8px
  display: grid
  gap: 2px
  background: var(--surface-container-high)
  border: 1px solid var(--outline-variant)
  border-radius: 24px
  box-shadow: 0 1px 2px unquote("color-mix(in oklch, var(--on-surface) 8%, transparent)"), 0 12px 32px -10px unquote("color-mix(in oklch, var(--on-surface) 22%, transparent)")
  transform-origin: top left

.landing__item
  display: flex
  align-items: center
  justify-content: space-between
  gap: 1.5rem
  padding: 10px 14px
  border-radius: 16px
  color: var(--on-surface)
  transition: background-color var(--dur-short) var(--spring-gentle)

.landing__item:hover, .landing__item:focus-visible
  background: unquote("color-mix(in oklch, var(--on-surface) 7%, transparent)")

.landing__item:focus-visible
  outline-offset: -2px
  border-radius: 16px

.landing__item svg
  flex: none

.landing__item-text
  display: grid
  gap: 2px

.landing__item-title
  font-size: 0.9375rem
  font-weight: 600

.landing__item-file
  font-family: var(--font-mono)
  font-size: 0.75rem
  white-space: nowrap
  color: var(--on-surface-variant)

.landing-menu-enter-active
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-med) var(--spring-fast)

.landing-menu-leave-active
  transition: opacity calc(var(--dur-short) * 0.7) var(--spring-gentle), transform calc(var(--dur-short) * 0.7) var(--spring-gentle)

.landing-menu-enter-from
  opacity: 0
  transform: scale(0.94) translateY(-6px)

.landing-menu-leave-to
  opacity: 0
  transform: scale(0.97) translateY(-2px)

// Label over value, as in the policy page's margin
.landing__meta
  grid-area: meta
  display: grid
  gap: 1.25rem
  margin: 2.5rem 0 0
  color: var(--on-surface-variant)

  div
    display: grid
    gap: 6px

  dd
    margin: 0
    font-family: var(--font-display)
    font-size: 1.0625rem
    font-weight: 600
    color: var(--on-surface)

  a
    color: var(--primary-text)
    text-decoration: underline
    text-decoration-thickness: 1px
    text-underline-offset: 3px
    transition: opacity var(--dur-short)

  a:hover
    opacity: 0.75

.landing__file-link
  font-family: var(--font-mono)
  font-size: 0.9375rem
  font-weight: 500

.landing__section
  padding-top: 1.75rem
  border-top: 1px solid hairline
  align-items: first baseline

.landing__h2
  font-size: clamp(1.375rem, 1.8vw, 1.625rem)
  font-weight: 700
  letter-spacing: -0.025em
  line-height: 1.15
  color: var(--on-surface)

.landing__body
  max-width: var(--landing-measure)
  font-size: 1.0625rem
  line-height: 1.7
  color: var(--on-surface-variant)

.landing__cmds
  display: grid
  gap: 1rem
  max-width: var(--landing-measure)
  margin-top: 1.75rem

.cmd
  margin: 0
  border-radius: var(--shape-lg)
  background: var(--surface-container)
  overflow: hidden

.cmd__head
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: space-between
  gap: 0.5rem 1rem
  padding: 0.625rem 0.625rem 0 1.25rem
  color: var(--on-surface-variant)

// Wrapped controls stay on the right
.cmd__tools, .cmd__head > .cmd__copy
  margin-left: auto

.cmd__tools
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 0.5rem

.cmd__arch
  display: inline-flex
  padding: 3px
  border-radius: var(--shape-full)
  background: var(--surface-container-highest)

.cmd__arch-btn
  padding: 0.3rem 0.75rem
  border: 0
  border-radius: var(--shape-full)
  background: transparent
  color: var(--on-surface-variant)
  font: inherit
  font-size: 0.8125rem
  font-weight: 600
  cursor: pointer
  transition: background-color var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle)

.cmd__arch-btn:hover
  color: var(--on-surface)

.cmd__arch-btn[aria-pressed="true"]
  background: var(--on-surface)
  color: var(--surface)

.cmd__copy
  display: inline-flex
  align-items: center
  gap: 0.4rem
  padding: 0.4rem 0.75rem
  border: 0
  border-radius: var(--shape-full)
  background: transparent
  color: var(--on-surface)
  font: inherit
  font-size: 0.8125rem
  font-weight: 600
  cursor: pointer
  transition: background-color var(--dur-short) var(--spring-gentle), transform var(--dur-short) var(--spring-fast)

.cmd__copy:hover
  background: var(--surface-container-highest)

.cmd__copy:active
  transform: scale(0.96)

.cmd__pre
  margin: 0
  padding: 0.875rem 1.25rem 1rem
  overflow-x: auto
  font-family: var(--font-mono)
  font-size: 0.875rem
  line-height: 1.75
  color: var(--on-surface)

// Fades whichever edge has more to scroll to; a block that fits has no timeline, so no fade
@css {
  @property --fade-start {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }
  @property --fade-end {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }
  @supports (animation-timeline: scroll()) {
    .cmd__pre {
      mask-image: linear-gradient(to right, transparent, #000 var(--fade-start), #000 calc(100% - var(--fade-end)), transparent);
      animation: cmd-scroll-fade linear both;
      animation-timeline: scroll(self inline);
    }
  }
  @keyframes cmd-scroll-fade {
    from { --fade-start: 0px; --fade-end: 3rem; }
    to { --fade-start: 3rem; --fade-end: 0px; }
  }
}

// A switched chip flashes the file name it changed
.cmd__file
  border-radius: var(--shape-xs)
  animation: cmd-file var(--dur-long) var(--spring-gentle)

@keyframes cmd-file
  from
    background: unquote("color-mix(in oklch, var(--primary) 22%, transparent)")

.cmd__note
  padding: 0.875rem 1.25rem 1rem
  border-top: 1px solid hairline
  font-size: 0.875rem
  line-height: 1.55
  color: var(--on-surface-variant)

  code
    font-family: var(--font-mono)
    font-size: 0.875em
    padding: 0.12em 0.4em
    border-radius: var(--shape-xs)
    background: var(--surface-container-high)
    color: var(--on-surface)

.landing__sr
  position: absolute
  width: 1px
  height: 1px
  margin: -1px
  overflow: hidden
  clip-path: inset(50%)
  white-space: nowrap

@media (max-width: 960px)
  .landing__grid
    grid-template-columns: minmax(0, 1fr)

  .landing__head
    grid-template-areas: "icon" "main" "meta"
    grid-template-rows: none

  .landing__icon
    width: 96px
    height: 96px
    margin-bottom: 2rem
    box-shadow: 0 18px 34px -16px unquote("color-mix(in oklch, var(--product-accent) 75%, transparent)")

  .landing__meta
    display: flex
    flex-wrap: wrap
    gap: 1.25rem 2.5rem

  .landing__h2
    margin-bottom: 1rem

@media (max-width: 600px)
  .landing__summary
    font-size: 1.125rem

// Below 360px the download labels need the icons' width
@media (max-width: 359px)
  .landing__lead-icon, .landing__item svg
    display: none

  .cmd__head > .label
    flex-basis: 100%

  .cmd__tools
    margin-left: 0

  .cmd__head > .cmd__copy
    margin-left: -0.75rem
</style>
