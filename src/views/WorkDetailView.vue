<template>
  <div class="detail">
    <DecorativeElement type="circle" class="detail-decor" />

    <div class="container">
      <ScrollReveal>
        <a href="#" class="detail-back font-mono" @click.prevent="goBackToWork">
          <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M11 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Work
        </a>
      </ScrollReveal>

      <template v-if="item">
        <ScrollReveal class="detail-visual-col">
          <div class="detail-visual">
            <div class="detail-visual-art" :style="{ background: placeholderColor }">
              <svg class="detail-geo" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
                <rect :x="geo.x1" :y="geo.y1" :width="geo.w1" :height="geo.h1" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
                <circle :cx="geo.cx" :cy="geo.cy" :r="geo.r" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
                <line :x1="geo.lx1" :y1="geo.ly1" :x2="geo.lx2" :y2="geo.ly2" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
                <circle :cx="geo.cx2" :cy="geo.cy2" :r="geo.r2" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
              </svg>
            </div>
          </div>
        </ScrollReveal>

        <div class="detail-content grid-2col">
          <ScrollReveal direction="left" class="detail-header-col">
            <p class="detail-meta text-label">{{ item.category }} &middot; {{ item.year }}</p>
            <h1 class="detail-title font-heading">{{ item.title }}</h1>
          </ScrollReveal>

          <ScrollReveal direction="right" :delay="150" class="detail-desc-col">
            <p class="detail-desc">{{ item.description }}</p>
            <p class="detail-desc-extra">
              This project was developed through an iterative process of research, sketching,
              and refinement — with close attention to materiality, composition, and the emotional
              resonance of the final piece. Each decision was guided by the core intent to create
              work that feels both intentional and organic.
            </p>
          </ScrollReveal>
        </div>
      </template>

      <div v-else class="detail-not-found">
        <p class="font-heading" style="font-size: var(--text-2xl); margin-bottom: var(--space-sm);">Project not found</p>
        <a href="#" class="font-mono" style="color: var(--color-accent);" @click.prevent="goBackToWork">← Back to Work</a>
      </div>

      <div v-if="item" class="detail-nav">
        <ScrollReveal :delay="200">
          <div class="detail-nav-inner">
            <a v-if="prevItem" :href="'#/work/' + prevItem.id" class="detail-nav-link font-mono">
              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M11 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ prevItem.title }}
            </a>
            <span v-else class="detail-nav-link detail-nav-link--ghost"></span>

            <a v-if="nextItem" :href="'#/work/' + nextItem.id" class="detail-nav-link font-mono detail-nav-link--next">
              {{ nextItem.title }}
              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <span v-else class="detail-nav-link detail-nav-link--ghost"></span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { portfolioItems } from '@/data/portfolio'

const router = useRouter()

function goBackToWork() {
  router.push({ name: 'home' }).then(() => {
    requestAnimationFrame(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    })
  })
}
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import DecorativeElement from '@/components/ui/DecorativeElement.vue'

const route = useRoute()
const itemId = route.params.id

const currentIndex = portfolioItems.findIndex((p) => p.id === itemId)
const item = currentIndex !== -1 ? portfolioItems[currentIndex] : null

const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null
const nextItem = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null

const palettes = [
  '#E8D5C8', '#D4C8BD', '#C5D4CB', '#D8D0C5',
  '#CDD6D0', '#E0D4C5', '#C8D0CC', '#DCD3C6',
]

const placeholderColor = item ? palettes[item.title.length % palettes.length] : '#E8D5C8'

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const geo = computed(() => {
  if (!item) return {}
  const h = hashCode(item.id + 'detail')
  return {
    x1: 70 + (h % 120),
    y1: 50 + ((h >> 3) % 100),
    w1: 120 + ((h >> 5) % 160),
    h1: 100 + ((h >> 7) % 140),
    cx: 240 + ((h >> 9) % 100),
    cy: 160 + ((h >> 11) % 100),
    r: 40 + ((h >> 13) % 60),
    cx2: 100 + ((h >> 15) % 200),
    cy2: 200 + ((h >> 17) % 80),
    r2: 20 + ((h >> 19) % 40),
    lx1: 30 + ((h >> 21) % 80),
    ly1: 280 + ((h >> 23) % 25),
    lx2: 320 + ((h >> 25) % 60),
    ly2: 60 + ((h >> 27) % 60),
  }
})
</script>

<style scoped>
.detail {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--space-2xl) + 64px) 0 var(--space-2xl);
}

.detail-decor {
  top: 10%;
  right: -15%;
  opacity: 0.04;
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  margin-bottom: var(--space-lg);
  transition: color 0.3s ease;
}

.detail-back:hover {
  color: var(--color-accent);
}

.detail-visual {
  margin-bottom: var(--space-lg);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.detail-visual-art {
  aspect-ratio: 2 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-geo {
  width: 100%;
  height: 100%;
}

.detail-content {
  margin-bottom: var(--space-lg);
}

.detail-meta {
  margin-bottom: var(--space-xs);
}

.detail-title {
  font-size: clamp(2.25rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.detail-desc {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.detail-desc-extra {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text-muted);
}

.detail-nav {
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.detail-nav-inner {
  display: flex;
  justify-content: space-between;
}

.detail-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  transition: color 0.3s ease;
  max-width: 45%;
}

.detail-nav-link:hover {
  color: var(--color-accent);
}

.detail-nav-link--next {
  text-align: right;
}

.detail-nav-link--ghost {
  visibility: hidden;
}

.grid-2col {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 640px) {
  .grid-2col {
    flex-direction: row;
    gap: var(--space-xl);
  }

  .detail-header-col {
    flex: 1;
  }

  .detail-desc-col {
    flex: 1.2;
    padding-top: var(--space-md);
  }
}

.detail-not-found {
  padding: var(--space-2xl) 0;
  text-align: center;
}
</style>
