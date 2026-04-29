<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__wordmark gradient-text">
        Luna Parker
      </div>
      <div class="footer__bottom">
        <div class="mono footer__copyright">
          © 2026 Luna Parker
        </div>
        <div class="footer__links">
          <a href="https://github.com/lunaparker" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/luna-parker" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/Luna_Parker.pdf" target="_blank" rel="noopener">Resume</a>
          <NuxtLink to="/privacy">Privacy</NuxtLink>
          <span class="footer__credit">
            Made with ❤️ in 🍁 Canada
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 60px 0 40px;
  border-top: 1px solid var(--outline-variant);
  margin-top: 40px;
}

.footer__container {
  display: grid;
  gap: 40px;
}

.footer__wordmark {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 10rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.85;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.footer__copyright {
  font-size: 12px;
  color: var(--on-surface-variant);
}

.footer__links {
  display: flex;
  gap: 18px;
  font-size: 13px;
  color: var(--on-surface-variant);
  align-items: center;
  flex-wrap: wrap;
}

.footer__credit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
