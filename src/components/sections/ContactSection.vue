<template>
  <section id="contact" class="contact">
    <DecorativeElement type="circle" class="contact-decor" />
    <div class="container">
      <SectionTitle
        title="Get in Touch"
        subtitle="I'm always open to new collaborations, commissions, and conversations."
        label="Contact"
      />

      <div class="contact-grid">
        <ScrollReveal direction="left" class="contact-info">
          <p class="contact-text">
            Whether you have a project in mind, a question about my work, or just want to say hello — feel free to reach out.
          </p>

          <div class="contact-methods">
            <a :href="'mailto:' + personalInfo.email" class="contact-email font-heading">
              {{ personalInfo.email }}
              <svg class="contact-email-arrow" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <div v-if="personalInfo.social.instagram" class="contact-social">
              <a :href="personalInfo.social.instagram" class="contact-social-link font-mono" target="_blank" rel="noopener">Instagram</a>
              <span class="contact-social-sep">/</span>
              <a :href="personalInfo.social.behance" class="contact-social-link font-mono" target="_blank" rel="noopener">Behance</a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" :delay="150" class="contact-form-col">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name" class="form-label font-mono">01 / Name</label>
              <input id="name" v-model="form.name" type="text" class="form-input" required placeholder="Your name" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label font-mono">02 / Email</label>
              <input id="email" v-model="form.email" type="email" class="form-input" required placeholder="you@example.com" />
            </div>
            <div class="form-group">
              <label for="message" class="form-label font-mono">03 / Message</label>
              <textarea id="message" v-model="form.message" class="form-input form-textarea" rows="4" required placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" class="form-submit font-mono" :disabled="submitted">
              <span v-if="!submitted">Send Message</span>
              <span v-else class="form-submitted">Message Sent</span>
              <svg v-if="!submitted" class="form-submit-arrow" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { personalInfo } from '@/data/portfolio'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import DecorativeElement from '@/components/ui/DecorativeElement.vue'

const form = reactive({ name: '', email: '', message: '' })
const submitted = ref(false)

function handleSubmit() {
  if (!form.name || !form.email || !form.message) return

  submitted.value = true
  const subject = `Project Inquiry from ${form.name}`
  const body = `${form.message}\n\n— ${form.name} (${form.email})`
  const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  setTimeout(() => {
    submitted.value = false
    form.name = ''
    form.email = ''
    form.message = ''
    window.open(mailto, '_blank')
  }, 600)
}
</script>

<style scoped>
.contact {
  position: relative;
  padding: var(--space-2xl) 0;
}

.contact-decor {
  bottom: 5%;
  left: -10%;
  opacity: 0.04;
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

@media (min-width: 640px) {
  .contact-grid {
    flex-direction: row;
    gap: var(--space-xl);
  }

  .contact-info {
    flex: 1;
  }

  .contact-form-col {
    flex: 1.2;
  }
}

.contact-text {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
  max-width: 400px;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-xl);
  color: var(--color-accent);
  transition: color 0.3s ease;
  font-weight: 600;
}

.contact-email:hover {
  color: var(--color-text);
}

.contact-email-arrow {
  transition: transform 0.3s ease;
}

.contact-email:hover .contact-email-arrow {
  transform: translateX(4px);
}

.contact-social {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.contact-social-link {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
  color: var(--color-text-dim);
}

.contact-social-link:hover {
  color: var(--color-accent);
}

.contact-social-sep {
  color: var(--color-border);
  font-size: 0.7rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  color: var(--color-text-dim);
}

.form-input {
  padding: 0.85em 0;
  border: none;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
  font: inherit;
  font-size: var(--text-base);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input::placeholder {
  color: var(--color-text-dim);
  opacity: 0.5;
}

.form-input:focus {
  border-color: var(--color-accent);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: var(--space-xs);
  padding: 0.85em 1.8em;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  border-radius: 100px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.form-submit:hover:not(:disabled) {
  background: var(--color-text);
  color: var(--color-bg);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(207, 96, 64, 0.25);
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.form-submit-arrow {
  transition: transform 0.3s ease;
}

.form-submit:hover:not(:disabled) .form-submit-arrow {
  transform: translateX(3px);
}
</style>
