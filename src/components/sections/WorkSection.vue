<template>
  <section id="work" class="work">
    <DecorativeElement type="circle" class="work-decor" />
    <div class="container">
      <SectionTitle
        title="Selected Work"
        subtitle="A curated selection of recent projects across disciplines."
        label="Portfolio"
      />

      <ScrollReveal :delay="100">
        <FilterBar v-model="activeFilter" :categories="categories" />
      </ScrollReveal>

      <TransitionGroup name="work-grid" tag="div" class="work-grid">
        <router-link
          v-for="item in filteredItems"
          :key="item.id"
          :to="'/work/' + item.id"
          class="work-grid-item"
        >
          <ScrollReveal :delay="50 * (filteredItems.indexOf(item) % 3)">
            <WorkCard :item="item" />
          </ScrollReveal>
        </router-link>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolioItems, categories } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import WorkCard from '@/components/ui/WorkCard.vue'
import FilterBar from '@/components/ui/FilterBar.vue'
import DecorativeElement from '@/components/ui/DecorativeElement.vue'

const activeFilter = ref('all')

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter.value)
)
</script>

<style scoped>
.work {
  position: relative;
  padding: var(--space-2xl) 0;
}

.work-decor {
  top: 20%;
  right: -12%;
}

.work-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 640px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
}

@media (min-width: 1024px) {
  .work-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }
}

.work-grid-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.work-grid-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.work-grid-item {
  display: block;
  color: inherit;
}

.work-grid-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.work-grid-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

.work-grid-move {
  transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}
</style>
