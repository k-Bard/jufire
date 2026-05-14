<template>
  <div class="section-title-wrap">
    <p v-if="label" class="section-label text-label">{{ label }}</p>
    <h2 class="section-title font-heading">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    <div class="section-rule">
      <div class="section-rule-accent"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  label: { type: String, default: '' },
})
</script>

<style scoped>
.section-title-wrap {
  margin-bottom: var(--space-lg);
}

.section-label {
  margin-bottom: var(--space-xs);
  color: var(--color-accent);
}

.section-title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.section-subtitle {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 460px;
  margin-bottom: var(--space-md);
}

.section-rule {
  width: 48px;
  height: 3px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.section-rule-accent {
  width: 60%;
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
}
</style>
