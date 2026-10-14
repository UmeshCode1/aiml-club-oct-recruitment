/**
 * AIML CLUB OCT - EXECUTIVE COUNCIL RECRUITMENT 2026
 * Official Client Script & Interactivity
 * Institutional Information Portal for Oriental College of Technology, Bhopal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initDivisionFilter();
  initCampaignSlider();
  initFaqAccordion();
});

/* ==========================================================================
   1. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const timerEl = document.getElementById('countdown-timer');
  if (!timerEl) return;

  const targetDateStr = timerEl.dataset.target || '2026-11-05T23:59:59+05:30';
  const targetTime = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close when clicking any link
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ==========================================================================
   3. DIVISION TABS FILTER
   ========================================================================== */
function initDivisionFilter() {
  const tabs = document.querySelectorAll('.dept-tab');
  const cards = document.querySelectorAll('.role-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. CAMPAIGN SLIDER & LIGHTBOX MODAL
   ========================================================================== */
function initCampaignSlider() {
  const slides = document.querySelectorAll('.slide-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.querySelector('.lightbox-backdrop');

  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const slider = document.getElementById('campaign-slider');

  let activeIndex = 0;
  const total = slides.length;

  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    if (!modal || !modalImg) return;
    const slide = slides[index];
    if (!slide) return;

    activeIndex = index;
    const src = slide.dataset.src;
    const caption = slide.querySelector('.slide-overlay')?.textContent || `Slide ${index + 1} of ${total}`;

    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox((activeIndex + 1) % total);
    if (e.key === 'ArrowLeft') openLightbox((activeIndex - 1 + total) % total);
  });

  // Slider buttons
  if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 240, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -240, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. FAQS ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
