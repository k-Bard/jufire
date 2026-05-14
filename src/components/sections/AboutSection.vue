<template>
  <section id="about" class="about">
    <DecorativeElement type="dots" class="about-decor" />
    <div class="container">
      <SectionTitle
        title="About"
        subtitle="A brief introduction to who I am and what drives my creative practice."
        label="Who I Am"
      />

      <div class="about-grid">
        <ScrollReveal direction="left" class="about-visual">
          <div class="about-photo">
            <div class="about-photo-inner">
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <circle cx="60" cy="42" r="26" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M18 104 Q60 72 102 104" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" :delay="150" class="about-text-col">
          <div class="about-text">
            <p class="about-text-lead">
              {{ personalInfo.bio }}
            </p>
            <p>
              With over eight years of practice across photography, design, and motion, I approach each project as an opportunity to uncover a unique visual language — one that resonates emotionally and endures beyond trends.
            </p>
            <p>
              Currently based in Shanghai, I collaborate with studios, brands, and cultural institutions on projects that value craft, clarity, and a strong point of view.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup>
import { personalInfo } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import DecorativeElement from '@/components/ui/DecorativeElement.vue'
</script>

<style scoped>
.about {
  position: relative;
  padding: var(--space-2xl) 0;
  background: var(--color-bg-elevated);
}

.about-decor {
  top: 12%;
  right: 8%;
}

.about-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

@media (min-width: 640px) {
  .about-grid {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-xl);
  }

  .about-visual {
    flex: 0 0 38%;
  }

  .about-text-col {
    flex: 1;
  }
}

.about-photo {
  aspect-ratio: 4 / 5;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.about-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%);
}

.about-photo-inner {
  color: var(--color-accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-text {
  font-size: var(--text-base);
  line-height: 1.85;
  color: var(--color-text-muted);
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.about-text-lead {
  font-size: var(--text-lg);
  line-height: 1.75;
  color: var(--color-text);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-xs);
}
</style>
