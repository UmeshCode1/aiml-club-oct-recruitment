/**
 * OFFICIAL ANNOUNCEMENT CLIENT SCRIPT
 * AI & Machine Learning Club, Oriental College of Technology, Bhopal
 * High-performance, thermally-optimized, device-aware interactions (60/120fps)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initCountdown();
  initCopyButtons();
  initCalendarReminders();
  initSocialShareAndCalendar();
  initScrollEffects();
  initRevealObserver();
  initSectionSpy();
  initCampaignSlider();
  initInteractiveSteps();
  initSpotlightCards();
  initMagneticButtons();
  initFlowTrackTabs();
});

/* ==========================================================================
   1. UNIFIED SITE HEADER & MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initSiteHeader() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-apply-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile drawer on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   2. LIVE COUNTDOWN TIMER (HERO SECTION, THERMALLY CALIBRATED)
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
      const statusLbl = document.querySelector('.timer-headline-label');
      if (statusLbl) statusLbl.textContent = 'Registration Is Now OPEN!';
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

  // Battery / Thermal guard: pause ticker if tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  });
}

/* ==========================================================================
   3. COPY LINK TO CLIPBOARD
   ========================================================================== */
function initCopyButtons() {
  const btn = document.getElementById('btn-copy-link');
  const textEl = document.getElementById('copy-btn-text');
  const officialUrl = 'https://info.aimlcluboct.in';

  if (!btn) return;

  btn.addEventListener('click', async () => {
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

      if (textEl) {
        const originalText = textEl.textContent;
        textEl.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          textEl.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      }
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  });
}

/* ==========================================================================
   4. CALENDAR REMINDER (.ICS DOWNLOAD - RFC 5545 COMPLIANT)
   ========================================================================== */
function generateIcsBlob() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AIML Club OCT//Recruitment 2026-27//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:aiml-club-oct-recruitment-2026@aimlcluboct.in',
    'DTSTAMP:20261014T060000Z',
    'DTSTART:20261020T183000Z', // 21 Oct 2026 00:00 IST
    'DTEND:20261025T182900Z',   // 25 Oct 2026 23:59 IST
    'SUMMARY:AIML Club OCT Recruitment 2026-27 Opens',
    'DESCRIPTION:Registration opens for AI & Machine Learning Club Recruitment at Oriental College of Technology, Bhopal. Visit https://info.aimlcluboct.in to apply. Unique QR delivered in confirmation email.',
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

  return new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
}

function downloadIcsFile() {
  const blob = generateIcsBlob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'AIML_Club_OCT_Recruitment_2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

function initCalendarReminders() {
  const reminderBtns = [
    document.getElementById('btn-set-reminder'),
    document.getElementById('btn-hero-calendar'),
    document.getElementById('btn-download-ics')
  ];

  reminderBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', downloadIcsFile);
  });
}

/* ==========================================================================
   5. SOCIAL HANDLES SHARE & ALARM SUITE
   ========================================================================== */
function initSocialShareAndCalendar() {
  const officialUrl = 'https://info.aimlcluboct.in';

  const fullBroadcastText = [
    '*AI & MACHINE LEARNING CLUB RECRUITMENT 2026–27*',
    '*Oriental College of Technology, Bhopal*',
    '',
    'Dear Students & Aspirants,',
    '',
    'Official recruitment for the AI & Machine Learning Club (Session 2026–27) opens on 21 October 2026.',
    '',
    '• Eligibility: 1st, 2nd, and 3rd year engineering students across ALL branches.',
    '• Domains: AI/ML Research, Full-Stack Development, UI/UX Design, Event Management, and PR/Outreach.',
    '• Dual Selection Architecture: Candidate Flow & Core Team Flow.',
    '• Secure Screening: Unique QR code issued via official confirmation email + PDF record.',
    '',
    'Official Portal & Details:',
    'https://info.aimlcluboct.in',
    '',
    'Important Dates:',
    '• Registration Opens: 21 October 2026 (00:00 IST)',
    '• Registration Closes: 25 October 2026 (11:59 PM IST)',
    '',
    'Visit the portal to inspect selection stages and set your calendar reminder.'
  ].join('\n');

  // 1. WhatsApp Direct
  const waBtn = document.getElementById('btn-share-wa');
  if (waBtn) {
    waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullBroadcastText)}`;
  }

  // 2. LinkedIn Post
  const liBtn = document.getElementById('btn-share-li');
  if (liBtn) {
    liBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(officialUrl)}`;
  }

  // 3. Twitter / X
  const xBtn = document.getElementById('btn-share-x');
  if (xBtn) {
    const xText = 'AI & Machine Learning Club Recruitment 2026–27 at Oriental College of Technology, Bhopal is opening soon! Check details & recruitment flows:';
    xBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(officialUrl)}&hashtags=AIMLClubOCT,Recruitment2026`;
  }

  // 4. Telegram
  const tgBtn = document.getElementById('btn-share-tg');
  if (tgBtn) {
    tgBtn.href = `https://t.me/share/url?url=${encodeURIComponent(officialUrl)}&text=${encodeURIComponent('AIML Club OCT Recruitment 2026–27 Official Announcement')}`;
  }

  // 5. Google Calendar 1-Click
  const gcalBtn = document.getElementById('btn-gcal');
  if (gcalBtn) {
    const gTitle = encodeURIComponent('AIML Club OCT Recruitment 2026–27 Opens');
    const gDetails = encodeURIComponent('Official registration opens for AI & Machine Learning Club at Oriental College of Technology, Bhopal. Visit https://info.aimlcluboct.in to apply.');
    const gLoc = encodeURIComponent('Oriental College of Technology, Bhopal');
    const gDates = '20261020T183000Z/20261025T182900Z';
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gTitle}&dates=${gDates}&details=${gDetails}&location=${gLoc}`;
  }

  // 6. Native Device Share
  const deviceShareBtn = document.getElementById('btn-device-share');
  const headerShareBtn = document.getElementById('header-share-btn');
  const heroShareBtn = document.getElementById('btn-hero-share');

  async function triggerNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AIML Club OCT Recruitment 2026–27',
          text: 'AI & Machine Learning Club Recruitment 2026–27 at Oriental College of Technology, Bhopal. Open to students from all branches.',
          url: officialUrl
        });
      } catch (err) {
        // Dismissed by user
      }
    } else {
      const shareSec = document.getElementById('sec-share');
      if (shareSec) {
        shareSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  if (deviceShareBtn) deviceShareBtn.addEventListener('click', triggerNativeShare);
  if (headerShareBtn) headerShareBtn.addEventListener('click', triggerNativeShare);
  if (heroShareBtn) heroShareBtn.addEventListener('click', triggerNativeShare);

  // 7. Copy Formatted Broadcast Notice
  const copyBroadcastBtn = document.getElementById('btn-copy-broadcast-text');
  const copyBroadcastLbl = document.getElementById('copy-broadcast-label');
  if (copyBroadcastBtn) {
    copyBroadcastBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(fullBroadcastText);
        } else {
          const temp = document.createElement('textarea');
          temp.value = fullBroadcastText;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }

        if (copyBroadcastLbl) copyBroadcastLbl.textContent = 'Copied to Clipboard!';
        copyBroadcastBtn.style.background = 'var(--brand-cyan)';
        copyBroadcastBtn.style.color = '#070a0f';

        setTimeout(() => {
          if (copyBroadcastLbl) copyBroadcastLbl.textContent = 'Copy Notice';
          copyBroadcastBtn.style.background = '';
          copyBroadcastBtn.style.color = '';
        }, 2200);
      } catch (err) {
        console.warn('Copy broadcast failed:', err);
      }
    });
  }

  // 8. Alarm Helper Button
  const alarmHelperBtn = document.getElementById('btn-alarm-helper');
  const alarmHelperLbl = document.getElementById('alarm-helper-label');
  if (alarmHelperBtn) {
    alarmHelperBtn.addEventListener('click', () => {
      downloadIcsFile();

      if (alarmHelperLbl) {
        const orig = alarmHelperLbl.textContent;
        alarmHelperLbl.textContent = 'Alarm & Calendar Downloaded!';
        alarmHelperBtn.style.background = 'var(--brand-lime)';
        alarmHelperBtn.style.color = '#070a0f';

        setTimeout(() => {
          alarmHelperLbl.textContent = orig;
          alarmHelperBtn.style.background = '';
          alarmHelperBtn.style.color = '';
        }, 2500);
      }
    });
  }
}

/* ==========================================================================
   6. HARDWARE-ACCELERATED SCROLL EFFECTS
   - Header scroll elevation & compact glassmorphism state
   - Top linear reading progress bar
   - Floating circular progress ring + scroll-to-top button
   - Parallax spatial depth on ambient glow orbs (desktop fine pointer)
   ========================================================================== */
function initScrollEffects() {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress');
  const scrollTopFloat = document.getElementById('scroll-top-float');
  const progressRingCircle = document.getElementById('progress-ring-circle');
  const glowTop = document.querySelector('.glow-top');
  const glowBottom = document.querySelector('.glow-bottom');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Progress ring circumference: 2 * Math.PI * 18 ≈ 113.1
  const ringCircumference = 113.1;
  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${ringCircumference}`;
    progressRingCircle.style.strokeDashoffset = `${ringCircumference}`;
  }

  // Smooth scroll to top on click
  if (scrollTopFloat) {
    scrollTopFloat.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressFraction = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        const progressPercent = progressFraction * 100;

        // 1. Header Elevation State
        if (header) {
          if (scrollTop > 35) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        // 2. Top Linear Reading Progress Bar
        if (progressBar) {
          progressBar.style.width = `${progressPercent}%`;
        }

        // 3. Floating Scroll-To-Top Button & Circular Progress Ring
        if (scrollTopFloat) {
          if (scrollTop > 320) {
            scrollTopFloat.classList.add('visible');
          } else {
            scrollTopFloat.classList.remove('visible');
          }
        }

        if (progressRingCircle) {
          const offset = ringCircumference - (progressFraction * ringCircumference);
          progressRingCircle.style.strokeDashoffset = `${offset}`;
        }

        // 4. Subtle Parallax Depth Shift for Ambient Glows (desktop only)
        if (isFinePointer) {
          if (glowTop) {
            glowTop.style.transform = `translate3d(0, ${scrollTop * 0.12}px, 0)`;
          }
          if (glowBottom) {
            glowBottom.style.transform = `translate3d(0, ${-scrollTop * 0.08}px, 0)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   7. REVEAL-ON-SCROLL OBSERVER
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
   8. SECTION SCROLLSPY (DESKTOP & MOBILE ACTIVE NAV LINK SYNCHRONIZATION)
   ========================================================================== */
function initSectionSpy() {
  const sectionIds = ['sec-overview', 'sec-dates', 'sec-flows', 'sec-slides', 'sec-instructions', 'sec-share', 'sec-portal'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const desktopLinks = document.querySelectorAll('.header-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        desktopLinks.forEach(link => {
          if (link.dataset.target === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.dataset.target === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-15% 0px -40% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   9. STORYBOARD SLIDER & HIGH-FIDELITY INTERACTIVE LIGHTBOX MODAL
   ========================================================================== */
function initCampaignSlider() {
  const slides = document.querySelectorAll('.slide-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCounter = document.getElementById('lightbox-counter');
  const modalCaption = document.getElementById('lightbox-caption');
  const downloadBtn = document.getElementById('lightbox-download-btn');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  const btnPrev = document.getElementById('lightbox-btn-prev');
  const btnNext = document.getElementById('lightbox-btn-next');
  const dotsContainer = document.getElementById('lightbox-dots');

  const slider = document.getElementById('campaign-slider');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const indicator = document.getElementById('slide-indicator');
  const slideDots = document.querySelectorAll('.slide-dot');

  let activeIndex = 0;
  const total = slides.length;

  const slideData = [
    {
      src: 'assets/campaign/01-HOOK.png',
      title: 'The System Behind It',
      caption: 'Recruitment shouldn’t be "Fill a form. Wait. Hope." We engineered a transparent, merit-driven evaluation framework from the ground up.'
    },
    {
      src: 'assets/campaign/02-PROBLEM-SOLUTION.png',
      title: 'Fair & Transparent Flow',
      caption: 'A dual-track architecture connecting aspiring student candidates with an experienced evaluation council through verified milestones.'
    },
    {
      src: 'assets/campaign/03-CANDIDATE-FLOW.png',
      title: 'Multi-Dimension Form',
      caption: 'Comprehensive profile capture assessing technical foundations, creative portfolios, and collaborative mindset with zero application fee.'
    },
    {
      src: 'assets/campaign/04-APPLICATION-RECORD.png',
      title: 'Application Record PDF',
      caption: 'Automated generation of verified candidate dossiers with anti-tamper timestamps and domain preference categorization.'
    },
    {
      src: 'assets/campaign/05-CONFIRMATION.png',
      title: 'Email Confirmation + Unique QR',
      caption: 'Every candidate receives an official email confirmation containing their verified application docket and personalized screening QR code.'
    },
    {
      src: 'assets/campaign/06-CORE-TEAM-REVIEW.png',
      title: 'Dedicated Core Team Workspace',
      caption: 'Executive council members evaluate, shortlist, and coordinate domain interactions without scheduling collisions.'
    },
    {
      src: 'assets/campaign/07-SECURE-QR.png',
      title: 'Secure QR Screening',
      caption: '1-second candidate lookup at live interactions by scanning the candidate\'s verified QR ticket directly from their email or PDF.'
    },
    {
      src: 'assets/campaign/08-CTA.png',
      title: 'Ready to Build With Us',
      caption: 'Welcoming appointed candidates into the AIML Club OCT family for real-world artificial intelligence projects, leadership, and mentorship.'
    }
  ];

  // Initialize Lightbox Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slideData.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `lightbox-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to Slide ${idx + 1}`);
      dot.addEventListener('click', () => openLightbox(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlideIndicator(idx) {
    if (indicator && slideData[idx]) {
      indicator.textContent = `Slide ${idx + 1} of ${total}: ${slideData[idx].title} • Click to open preview`;
    }
    slideDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  // Storyboard Dots Click
  slideDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const slide = slides[i];
      if (slide && slider) {
        slider.scrollTo({ left: slide.offsetLeft - 16, behavior: 'smooth' });
        activeIndex = i;
        updateSlideIndicator(i);
      }
    });
  });

  // Storyboard Item Click opens Lightbox
  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => openLightbox(idx));
  });

  function openLightbox(index) {
    if (!modal || !modalImg) return;
    const item = slideData[index];
    if (!item) return;

    activeIndex = index;

    // Smooth image transition
    modalImg.style.opacity = '0';
    modalImg.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
      modalImg.src = item.src;
      modalImg.alt = item.title;
      modalImg.style.opacity = '1';
      modalImg.style.transform = 'scale(1)';
    }, 80);

    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCounter) modalCounter.textContent = `Slide ${index + 1} of ${total}`;
    if (modalCaption) modalCaption.textContent = item.caption;
    if (downloadBtn) downloadBtn.href = item.src;

    // Update dots inside lightbox
    const lightboxDots = dotsContainer ? dotsContainer.querySelectorAll('.lightbox-dot') : [];
    lightboxDots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Synchronize underlying slider
    const currentSlide = slides[index];
    if (currentSlide && slider) {
      slider.scrollTo({ left: currentSlide.offsetLeft - 16, behavior: 'smooth' });
    }
    updateSlideIndicator(index);
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      openLightbox((activeIndex + 1) % total);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      openLightbox((activeIndex - 1 + total) % total);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox((activeIndex + 1) % total);
    if (e.key === 'ArrowLeft') openLightbox((activeIndex - 1 + total) % total);
  });

  // Touch Swipe on Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (modal) {
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 45;
    if (touchEndX < touchStartX - threshold) {
      // Swiped Left -> Next
      openLightbox((activeIndex + 1) % total);
    }
    if (touchEndX > touchStartX + threshold) {
      // Swiped Right -> Prev
      openLightbox((activeIndex - 1 + total) % total);
    }
  }

  // Storyboard Slider Prev/Next Controls
  if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 240, behavior: 'smooth' });
      activeIndex = (activeIndex + 1) % total;
      updateSlideIndicator(activeIndex);
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -240, behavior: 'smooth' });
      activeIndex = (activeIndex - 1 + total) % total;
      updateSlideIndicator(activeIndex);
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE FLOW STEP SELECTION & DYNAMIC INSPECTOR
   ========================================================================== */
function initInteractiveSteps() {
  const steps = document.querySelectorAll('.step-node');
  const inspBadge = document.getElementById('insp-badge');
  const inspTitle = document.getElementById('insp-title');
  const inspDesc = document.getElementById('insp-desc');

  steps.forEach(step => {
    function handleSelect() {
      steps.forEach(s => s.classList.remove('active-step'));
      step.classList.add('active-step');

      const track = step.dataset.track || 'Recruitment Pipeline';
      const stepNum = step.dataset.step || '';
      const name = step.dataset.name || step.querySelector('.node-name')?.textContent || '';
      const desc = step.dataset.desc || step.querySelector('.node-detail')?.textContent || '';

      if (inspBadge) {
        inspBadge.textContent = `${track.toUpperCase()} • STEP ${stepNum.toUpperCase()}`;
      }
      if (inspTitle) {
        inspTitle.textContent = `${name}`;
      }
      if (inspDesc) {
        inspDesc.textContent = desc;
      }
    }

    step.addEventListener('click', handleSelect);
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  });
}

/* ==========================================================================
   11. SPOTLIGHT CARDS (CURSOR PROXIMITY ILLUMINATION)
   Zero CPU/Battery overhead on mobile/touch screens
   ========================================================================== */
function initSpotlightCards() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.spotlight-card');
  if (!cards.length) return;

  cards.forEach(card => {
    let rect = null;
    let rafId = null;

    function updateCoords(e) {
      if (!rect) rect = card.getBoundingClientRect();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    }

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', updateCoords, { passive: true });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rect = null;
      card.style.setProperty('--mouse-x', '-999px');
      card.style.setProperty('--mouse-y', '-999px');
    }, { passive: true });
  });
}

/* ==========================================================================
   12. MAGNETIC BUTTONS (TACTILE MICRO-ATTRACTION)
   Subtly pulls buttons toward cursor with spring physics on desktop
   ========================================================================== */
function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const buttons = document.querySelectorAll('.magnetic-btn');
  buttons.forEach(btn => {
    let rect = null;
    let rafId = null;

    btn.addEventListener('mouseenter', () => {
      rect = btn.getBoundingClientRect();
      btn.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
    }, { passive: true });

    btn.addEventListener('mousemove', (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;
        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rect = null;
      btn.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
      btn.style.transform = 'translate3d(0, 0, 0)';
    }, { passive: true });
  });
}

/* ==========================================================================
   13. ANIMATED TRACK SWITCHER TABS (SPRING SLIDING PILL)
   ========================================================================== */
function initFlowTrackTabs() {
  const tabsWrapper = document.querySelector('.flow-track-tabs-wrapper');
  const slider = document.getElementById('flow-tab-slider');
  const tabBtns = document.querySelectorAll('.flow-tab-btn');
  const trackCandidate = document.getElementById('track-candidate');
  const trackCore = document.getElementById('track-core');

  if (!tabsWrapper || !slider || !tabBtns.length) return;

  function updateSliderPosition(activeBtn) {
    if (!activeBtn) return;
    const btnRect = activeBtn.getBoundingClientRect();
    const wrapperRect = tabsWrapper.getBoundingClientRect();
    const leftOffset = btnRect.left - wrapperRect.left + tabsWrapper.scrollLeft;
    slider.style.width = `${btnRect.width}px`;
    slider.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
  }

  const initialActive = tabsWrapper.querySelector('.flow-tab-btn.active') || tabBtns[0];
  setTimeout(() => updateSliderPosition(initialActive), 80);

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      updateSliderPosition(btn);

      const flow = btn.dataset.flow;
      if (flow === 'all') {
        if (trackCandidate) trackCandidate.classList.remove('is-hidden');
        if (trackCore) trackCore.classList.remove('is-hidden');
      } else if (flow === 'candidate') {
        if (trackCandidate) trackCandidate.classList.remove('is-hidden');
        if (trackCore) trackCore.classList.add('is-hidden');
      } else if (flow === 'core') {
        if (trackCandidate) trackCandidate.classList.add('is-hidden');
        if (trackCore) trackCore.classList.remove('is-hidden');
      }
    });
  });

  window.addEventListener('resize', () => {
    const active = tabsWrapper.querySelector('.flow-tab-btn.active');
    if (active) updateSliderPosition(active);
  }, { passive: true });
}
