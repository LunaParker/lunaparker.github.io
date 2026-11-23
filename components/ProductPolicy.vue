<script setup lang="ts">
import { computed } from 'vue'
import type { Policy } from '~/utils/policy'

const props = defineProps<{
  product: { name: string, kind: string, icon: string, accent?: string }
  policy: Policy
}>()

// The product mark names the product, so the visible title drops its "for <product>" tail
const heading = computed(() => {
  const suffix = ` for ${props.product.name}`
  const title = props.policy.title
  return title.endsWith(suffix)
    ? { lead: title.slice(0, -suffix.length), rest: suffix }
    : { lead: title, rest: '' }
})

const number = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <article class="policy" :style="product.accent ? { '--product-accent': product.accent } : undefined">
    <div class="container">
      <header class="policy__grid policy__head stagger">
        <div class="policy__aside">
          <div class="policy__mark">
            <img :src="product.icon" alt="" width="56" height="56" class="policy__icon">
            <div>
              <span class="policy__product">{{ product.name }}</span>
              <span class="label policy__kind">{{ product.kind }}</span>
            </div>
          </div>
          <p v-if="policy.updated" class="policy__updated">
            <span class="label">Last updated</span>
            <time :datetime="policy.updatedIso ?? undefined">{{ policy.updated }}</time>
          </p>
        </div>
        <div class="policy__column">
          <h1 class="policy__title">
            <span class="gradient-text">{{ heading.lead }}</span><span v-if="heading.rest" class="policy__sr">{{ heading.rest }}</span>
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="policy__intro" v-html="policy.intro" />
        </div>
      </header>

      <section
        v-for="(section, i) in policy.sections"
        :id="section.id"
        :key="section.id"
        class="policy__grid policy__section"
        :aria-labelledby="`${section.id}-heading`"
      >
        <div class="policy__aside">
          <div class="policy__section-head">
            <span class="policy__num" aria-hidden="true">{{ number(i) }}</span>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h2 :id="`${section.id}-heading`" class="policy__h2" v-html="section.heading" />
          </div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="policy__column policy__body" v-html="section.html" />
      </section>

      <footer class="policy__grid policy__foot">
        <div class="policy__column">
          <NuxtLink to="/" class="btn btn-outlined">
            <UiIcon name="chev" :size="16" class="policy__back-icon" /> Back to portfolio
          </NuxtLink>
        </div>
      </footer>
    </div>
  </article>
</template>

<style scoped lang="stylus">
.policy
  // One right edge for lede and body: about 67ch of 17px body text
  --policy-measure: 40rem
  padding: clamp(7rem, 15vh, 9.5rem) 0 clamp(4rem, 10vh, 6rem)

.policy__grid
  display: grid
  grid-template-columns: 320px minmax(0, 1fr)
  column-gap: clamp(3rem, 5vw, 4.5rem)
  max-width: 1060px
  margin-inline: auto

.policy__head
  align-items: start
  padding-bottom: clamp(3rem, 7vh, 4.5rem)

.policy__mark
  display: flex
  align-items: center
  gap: 14px
  padding-top: 0.5rem

.policy__icon
  flex: none
  width: 56px
  height: 56px
  border-radius: 12px
  box-shadow: 0 10px 26px -10px unquote("color-mix(in oklch, var(--product-accent, #000) 70%, transparent)")

.policy__product
  display: block
  font-family: var(--font-display)
  font-size: 1.1875rem
  font-weight: 700
  letter-spacing: -0.015em
  line-height: 1.2
  color: var(--on-surface)

.policy__kind
  display: block
  margin-top: 4px
  color: var(--on-surface-variant)

.policy__updated
  display: grid
  gap: 6px
  margin-top: 2.25rem
  color: var(--on-surface-variant)

  time
    font-family: var(--font-display)
    font-size: 1.0625rem
    font-weight: 600
    color: var(--on-surface)

.policy__title
  font-size: clamp(3rem, 7vw, 6rem)
  font-weight: 800
  letter-spacing: -0.045em
  line-height: 0.92
  padding-bottom: 0.06em

.policy__sr
  position: absolute
  width: 1px
  height: 1px
  margin: -1px
  overflow: hidden
  clip-path: inset(50%)
  white-space: nowrap

.policy__intro
  margin-top: 2rem
  font-size: 1.25rem
  line-height: 1.6
  color: var(--on-surface)
  max-width: var(--policy-measure)

  :deep(p + p)
    margin-top: 1rem

.policy__section
  padding: 1.75rem 0 1.25rem
  border-top: 1px solid unquote("color-mix(in oklch, var(--on-surface) 12%, transparent)")
  align-items: first baseline

// The aside itself sticks, so it can sit on the body's first baseline instead of stretching
.policy__section .policy__aside
  position: sticky
  top: 6rem
  container-type: scroll-state

.policy__section-head
  display: grid
  grid-template-columns: 2.75rem minmax(0, 1fr)
  align-items: baseline

.policy__num
  font-family: var(--font-mono)
  font-size: 0.8125rem
  font-weight: 500
  letter-spacing: 0.08em
  color: var(--primary-text)
  transition: color var(--dur-short) var(--spring-gentle)

// The head pinned beside the text you're reading darkens its number
@css {
  @container scroll-state(stuck: top) {
    .policy__num {
      color: var(--on-surface);
      font-weight: 600;
    }
  }
}

.policy__h2
  font-size: clamp(1.375rem, 1.8vw, 1.625rem)
  font-weight: 700
  letter-spacing: -0.025em
  line-height: 1.15
  color: var(--on-surface)

.policy__body
  font-size: 1.0625rem
  line-height: 1.7
  color: var(--on-surface-variant)

  :deep(p)
    margin: 0 0 1.125rem
    max-width: var(--policy-measure)

  :deep(ul)
    list-style: none
    padding: 0
    margin: 0 0 1.25rem
    display: grid
    gap: 0.75rem
    max-width: var(--policy-measure)

  :deep(li)
    position: relative
    padding-left: 1.25rem

  :deep(li)::before
    content: ''
    position: absolute
    left: 0
    top: 0.72em
    width: 5px
    height: 5px
    border-radius: 50%
    background: var(--primary)

  :deep(p:last-child), :deep(ul:last-child)
    margin-bottom: 0

  :deep(code)
    font-family: var(--font-mono)
    font-size: 0.875em
    padding: 0.12em 0.4em
    border-radius: var(--shape-xs)
    background: var(--surface-container-high)
    color: var(--on-surface)
    -webkit-box-decoration-break: clone
    box-decoration-break: clone

  // utils/policy.ts wraps each word: lines break at spaces, never at a hyphen
  :deep(code span)
    white-space: nowrap

  :deep(a)
    color: var(--primary-text)
    text-decoration: underline
    text-decoration-thickness: 1px
    text-underline-offset: 3px
    transition: opacity var(--dur-short)

  :deep(a:hover)
    opacity: 0.75

  :deep(strong)
    color: var(--on-surface)
    font-weight: 600

.policy__foot
  margin-top: 2.5rem
  padding-top: 2rem
  border-top: 1px solid unquote("color-mix(in oklch, var(--on-surface) 12%, transparent)")

  .policy__column
    grid-column: 2

.policy__back-icon
  transform: rotate(180deg)

@media (max-width: 960px)
  .policy__grid
    grid-template-columns: minmax(0, 1fr)

  .policy__head .policy__aside
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: space-between
    gap: 1rem 2rem
    margin-bottom: 2.25rem

  .policy__mark
    padding-top: 0

  .policy__updated
    margin-top: 0

  .policy__section .policy__aside
    position: static

  .policy__section-head
    margin-bottom: 0.875rem

  .policy__foot .policy__column
    grid-column: 1

@media (max-width: 600px)
  .policy__intro
    font-size: 1.125rem
</style>
