<template>
  <div class="work-card">
    <div class="work-card-image">
      <div class="work-card-art" :style="{ background: placeholderColor }">
        <svg class="work-card-geo" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
          <rect :x="geo.x1" :y="geo.y1" :width="geo.w1" :height="geo.h1" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
          <circle :cx="geo.cx" :cy="geo.cy" :r="geo.r" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" />
          <line :x1="geo.lx1" :y1="geo.ly1" :x2="geo.lx2" :y2="geo.ly2" stroke="rgba(255,255,255,0.18)" stroke-width="0.6" />
        </svg>
      </div>
    </div>
    <div class="work-card-info">
      <p class="work-card-meta text-label">{{ item.category }} / {{ item.year }}</p>
      <h3 class="work-card-title font-heading">{{ item.title }}</h3>
      <p class="work-card-desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const palettes = [
  '#E8D5C8', '#D4C8BD', '#C5D4CB', '#D8D0C5',
  '#CDD6D0', '#E0D4C5', '#C8D0CC', '#DCD3C6',
]

const placeholderColor = palettes[props.item.title.length % palettes.length]

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const geo = computed(() => {
  const h = hashCode(props.item.id)
  return {
    x1: 30 + (h % 60),
    y1: 25 + ((h >> 3) % 50),
    w1: 60 + ((h >> 5) % 80),
    h1: 50 + ((h >> 7) % 60),
    cx: 120 + ((h >> 9) % 50),
    cy: 80 + ((h >> 11) % 50),
    r: 25 + ((h >> 13) % 40),
    lx1: 20 + ((h >> 15) % 40),
    ly1: 120 + ((h >> 17) % 25),
    lx2: 150 + ((h >> 19) % 40),
    ly2: 30 + ((h >> 21) % 25),
  }
})
</script>

<style scoped>
.work-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1),
              box-shadow 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

@media (hover: hover) and (pointer: fine) {
  .work-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  }
}

.work-card-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.work-card-art {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@media (hover: hover) and (pointer: fine) {
  .work-card:hover .work-card-art {
    transform: scale(1.05);
  }
}

.work-card-geo {
  width: 100%;
  height: 100%;
}

.work-card-info {
  padding: var(--space-sm) var(--space-sm) var(--space-md);
}

.work-card-meta {
  margin-bottom: var(--space-xs);
  font-size: 0.7rem;
}

.work-card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-xs);
  transition: color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .work-card:hover .work-card-title {
    color: var(--color-accent);
  }
}

.work-card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
