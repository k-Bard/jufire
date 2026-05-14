<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-row">
        <div class="footer-brand">
          <span class="footer-logo font-heading">AC</span>
          <p class="footer-tagline font-mono">Visual Artist & Designer</p>
        </div>
        <div class="footer-links">
          <a v-for="link in socialLinks" :key="link.label" :href="link.url" class="footer-link font-mono" target="_blank" rel="noopener">
            {{ link.label }}
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy font-mono">&copy; {{ year }} — Crafted with care</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const socialLinks = [
  { label: 'Instagram', url: '#' },
  { label: 'Behance', url: '#' },
  { label: 'Email', url: 'mailto:hello@example.com' },
]
</script>

<style scoped>
.app-footer {
  padding: var(--space-lg) 0 var(--space-md);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
}

.footer-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

@media (min-width: 640px) {
  .footer-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-logo {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-accent);
}

.footer-tagline {
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
}

.footer-links {
  display: flex;
  gap: var(--space-md);
}

.footer-link {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-bottom {
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border);
}

.footer-copy {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  opacity: 0.5;
}
</style>
