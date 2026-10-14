/**
 * OFFICIAL ANNOUNCEMENT CLIENT SCRIPT
 * AI & Machine Learning Club, Oriental College of Technology, Bhopal
 * High-performance, thermally-optimized, device-aware interactions (60/120fps)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCopyButtons();
  initCalendarReminders();
  initStickyTopButton();
  initScrollEffects();
  initRevealObserver();
  initSectionSpy();
  initCampaignSlider();
  initInteractiveSteps();
});

/* ==========================================================================
   1. COUNTDOWN TIMER (THERMALLY TUNED WITH PAGE VISIBILITY API)
   ========================================================================== */
function initCountdown() {
  const timerEl = document.getElementById('countdown-timer');
  if (!timerEl) return;

  const targetDateStr = timerEl.dataset.target || '2026-10-21T00:00:00+05:30';
  const targetTime = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  let intervalId = null;

  function update() {
    const now = Date.now();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      const title = document.querySelector('.countdown-title span');
      if (title) title.textContent = 'Registration Is Now OPEN!';
      if (intervalId) clearInterval(intervalId);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }

  function startTimer() {
    update();
    if (!intervalId) {
      intervalId = setInterval(update, 1000);
    }
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  startTimer();

  // Thermal/Battery Guard: Stop interval when page is in background or device is locked
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });
}

/* ==========================================================================
   2. COPY LINK TO CLIPBOARD (HERO + STICKY BAR)
   ========================================================================== */
function initCopyButtons() {
  const buttons = [
    { btn: document.getElementById('btn-copy-link'), text: document.getElementById('copy-btn-text') },
    { btn: document.getElementById('sticky-copy-btn'), text: document.querySelector('#sticky-copy-btn .btn-text') }
  ];

  const officialUrl = 'https://info.aimlcluboct.in';

  async function handleCopy(btnObj) {
    if (!btnObj.btn) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(officialUrl);
      } else {
        const temp = document.createElement('textarea');
        temp.value = officialUrl;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      buttons.forEach(b => {
        if (b.btn && b.text) {
          const originalText = b.text.textContent;
          b.text.textContent = 'Copied!';
          b.btn.classList.add('copied');
          setTimeout(() => {
            b.text.textContent = originalText;
            b.btn.classList.remove('copied');
          }, 2000);
        }
      });
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  }

  buttons.forEach(b => {
    if (b.btn) {
      b.btn.addEventListener('click', () => handleCopy(b));
    }
  });
}

/* ==========================================================================
   3. CALENDAR REMINDER (.ICS DOWNLOAD - HERO + STICKY BAR)
   ========================================================================== */
function initCalendarReminders() {
  const reminderBtns = [
    document.getElementById('btn-set-reminder'),
    document.getElementById('sticky-reminder-btn')
  ];

  function triggerDownload() {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AIML Club OCT//Recruitment 2026-27//EN',
      'BEGIN:VEVENT',
      'UID:aiml-club-oct-recruitment-2026@aimlcluboct.in',
      'DTSTAMP:20261014T054500Z',
      'DTSTART:20261020T183000Z', // 21 Oct 2026 00:00 IST
      'DTEND:20261025T182900Z',   // 25 Oct 2026 23:59 IST
      'SUMMARY:AIML Club OCT Recruitment 2026-27 Opens',
      'DESCRIPTION:AI & Machine Learning Club Recruitment Opens at Oriental College of Technology Bhopal. Visit https://info.aimlcluboct.in to apply.',
      'LOCATION:Oriental College of Technology, Bhopal',
      'URL:https://info.aimlcluboct.in',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:AIML Club OCT Recruitment Reminder',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'AIML_Club_OCT_Recruitment_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }

  reminderBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', triggerDownload);
  });
}

/* ==========================================================================
   4. STICKY TOP BUTTON (ONE-TAP SMOOTH SCROLL BACK TO TOP)
   ========================================================================== */
function initStickyTopButton() {
  const topBtn = document.getElementById('sticky-top-btn');
  if (!topBtn) return;

  topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. HARDWARE-ACCELERATED SCROLL EFFECTS (THROTTLED WITH RAF & PASSIVE)
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const stickyBar = document.getElementById('sticky-bar');

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // 1. Update Scroll Progress Bar (0% to 100%)
        if (progressBar && docHeight > 0) {
          const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }

        // 2. Toggle Floating Sticky Action Bar visibility
        if (stickyBar) {
          if (scrollTop > 220) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial run
}

/* ==========================================================================
   6. REVEAL-ON-SCROLL OBSERVER (AUTO-UNOBSERVE FOR 0% CPU RESIDUAL LOAD)
   ========================================================================== */
function initRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Once revealed, unobserve to free browser memory & stop CPU calculation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. STICKY SECTION SPY (UPDATES NAV PILLS & MOBILE STATUS VIA OBSERVER)
   ========================================================================== */
function initSectionSpy() {
  const sectionIds = ['sec-overview', 'sec-flows', 'sec-slides', 'sec-instructions', 'sec-portal'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navItems = document.querySelectorAll('.sticky-nav-item');
  const mobileLabel = document.getElementById('mobile-section-name');

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const sectionNames = {
    'sec-overview': 'Overview',
    'sec-flows': 'Selection Flows',
    'sec-slides': 'Storyboard',
    'sec-instructions': 'Notice Rules',
    'sec-portal': 'Portal Link'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        // Update Desktop sticky navigation active pill
        navItems.forEach(item => {
          if (item.dataset.target === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Update Mobile status breadcrumb
        if (mobileLabel && sectionNames[id]) {
          mobileLabel.textContent = sectionNames[id];
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-20% 0px -50% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   8. CAMPAIGN SLIDER & LIGHTBOX MODAL
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
    slide.addEventListener('click', () => openLightbox(idx));
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
   9. INTERACTIVE FLOW STEP SELECTION
   ========================================================================== */
function initInteractiveSteps() {
  const steps = document.querySelectorAll('.step-node');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      // Toggle active glow on click
      steps.forEach(s => s.classList.remove('active-step'));
      step.classList.add('active-step');
    });
  });
}
