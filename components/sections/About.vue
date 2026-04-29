<script setup lang="ts">
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <UiSectionHeader kicker="01 — About">
        <template #title>
          I build the whole thing <span class="about__title-emphasis">end-to-end</span> — from client kickoff to deployed code.
        </template>
      </UiSectionHeader>

      <div class="about__grid">
        <UiReveal>
          <p class="body-lg about__bio about__bio--lede">
            I'm a full-stack developer; I've been building for the web since high school. Through my own consultancy, <b>Shy Owl Studios</b>, I've delivered dozens of websites and web applications for clients ranging from local businesses to nation-wide brands.
          </p>
          <p class="body-lg about__bio about__bio--muted">
            I specialise in Laravel and WordPress (and, in practice, whatever else the problem calls for). After all, the right tool is rarely the trendiest one. I pair the technical work with strong client relations, project management, and a genuine commitment to helping organisations thrive.
          </p>
          <p class="body-lg about__bio about__bio--muted">
            I'm currently pursuing an Honours Bachelor of Computer Science with a Security Specialisation at Conestoga, where I've deepened my understanding of low-level programming, secure systems design, and collaborative software development. I started my postsecondary studies at the University of Toronto (studying CS and philosophy); that year still shapes how I reason about complex problems.
            <UiAvailabilityPill compact />
          </p>
        </UiReveal>

        <UiReveal :delay="120">
          <div class="about__what-i-do-list">
            <div class="about__what-i-do-card">
              <div class="about__what-i-do-card-verb">Build.</div>
              <p class="about__what-i-do-card-body">High-performance websites and web applications using modern frameworks and battle-tested platforms.</p>
            </div>
            <div class="about__what-i-do-card">
              <div class="about__what-i-do-card-verb">Design.</div>
              <p class="about__what-i-do-card-body">User-friendly interfaces that align with an organization's brand and help them accomplish their goals.</p>
            </div>
            <div class="about__what-i-do-card">
              <div class="about__what-i-do-card-verb">Solve.</div>
              <p class="about__what-i-do-card-body">Custom software — from inventory systems to secure client portals — that makes businesses more productive.</p>
            </div>
            <div class="about__what-i-do-card">
              <div class="about__what-i-do-card-verb">Consult.</div>
              <p class="about__what-i-do-card-body">Direct collaboration with clients to identify requirements, recommend stacks, and manage timelines.</p>
            </div>
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  position: relative;
}

.about__title-emphasis {
  font-style: italic;
  font-weight: 300;
}

.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(24px, 4vw, 72px);
  align-items: start;
}

.about__bio {
  margin-bottom: 20px;
}

.about__bio--lede {
  font-size: 1.25rem;
  line-height: 1.55;
  color: var(--on-surface);
}

.about__bio--muted {
  color: var(--on-surface-variant);
}

.about__bio:last-child {
  margin-bottom: 0;
}

.about__what-i-do-list {
  display: grid;
  gap: 12px;
}

.about__what-i-do-card {
  padding: 22px 24px;
  background: var(--surface-container);
  border-radius: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: baseline;
  transition:
    background-color var(--dur-short) var(--spring-gentle),
    transform var(--dur-short) var(--spring-fast);
}

.about__what-i-do-card:hover {
  background: var(--surface-container-high);
  transform: translateX(4px);
}

.about__what-i-do-card-verb {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--primary-text);
  min-width: 100px;
}

.about__what-i-do-card-body {
  color: var(--on-surface-variant);
  margin: 0;
}

@media (max-width: 860px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
