<template>
  <div class="filter-bar">
    <button
      v-for="cat in categories"
      :key="cat.key"
      :class="['filter-pill font-mono', { 'filter-pill--active': modelValue === cat.key }]"
      @click="$emit('update:modelValue', cat.key)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
}

.filter-pill {
  padding: 0.45em 1.2em;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  color: var(--color-text-dim);
  transition: all 0.3s ease;
  background: var(--color-surface);
}

.filter-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter-pill--active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.filter-pill--active:hover {
  color: #fff;
}
</style>
