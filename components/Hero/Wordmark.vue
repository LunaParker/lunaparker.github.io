<script setup lang="ts">
</script>

<template>
  <section
    id="top"
    :style="{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingTop: '140px',
      paddingBottom: '40px',
      position: 'relative',
    }"
  >
    <div class="container" :style="{ width: '100%' }">
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap', marginBottom: '40px' }">
        <div class="stagger" :style="{ maxWidth: '52ch' }">
          <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '24px' }">
            <span>— Developer · Designer · Student</span>
          </div>
          <p class="body-lg" :style="{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', lineHeight: 1.55, marginBottom: '28px' }">
            Full-stack web developer with 8+ years of experience building tailored digital solutions. Finishing an Honours BCS with a Security Specialization at Conestoga College.
          </p>
          <div :style="{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }">
            <a href="#projects" class="btn btn-brand">View my work <UiIcon name="arrow" :size="18" /></a>
            <a href="#contact" class="btn btn-outlined">Get in touch</a>
          </div>
        </div>

        <div class="stagger" :style="{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }">
          <UiAvailabilityPill />
          <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">Ontario, Canada</div>
          <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">Remote · EST</div>
        </div>
      </div>

      <h1
        aria-label="Luna Parker"
        class="hero-wordmark"
        :style="{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 16vw, 16rem)',
          fontWeight: 800,
          letterSpacing: '-0.06em',
          lineHeight: 0.86,
          margin: 0,
          display: 'block',
          maxWidth: '100%',
        }"
      >
        <span
:style="{
          display: 'block',
          background: 'var(--brand-gradient)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }">LUNA</span>
        <span
:style="{
          display: 'block',
          color: 'var(--on-surface)',
          fontStyle: 'italic',
          fontWeight: 300,
          textIndent: '0.5em',
        }">Parker.</span>
      </h1>

      <div
:style="{
        marginTop: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        gap: '16px',
        paddingTop: '18px',
        borderTop: '1px solid var(--outline-variant)',
      }">
        <div class="label" :style="{ color: 'var(--on-surface-variant)' }">Scroll to explore</div>
        <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">PORTFOLIO v4 · EST. 2026</div>
      </div>
    </div>
  </section>
</template>
