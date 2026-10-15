/**
 * AIML CLUB OCT RECRUITMENT 2026–27 — IMMERSIVE CLIENT ENGINE
 * AI & Machine Learning Club, Oriental College of Technology (OCT), Bhopal
 * Tagline: Innovate • Implement • Inspire.
 * 
 * STRICT ACCESS & PRIVACY RULE:
 * - Before 21 October 2026 12:00 AM IST: Strictly locked. No access, no early links, no link display.
 * - Live Window (21–25 Oct 2026 11:59 PM IST): Dynamic unlock of 'Apply Now' buttons.
 * - Concluded (After 25 Oct 2026 11:59 PM IST): Relocked.
 */

'use strict';

/* ==========================================================================
   CONFIG & RECRUITMENT CONSTANTS
   ========================================================================== */
const RECRUITMENT_CONFIG = {
  institution: 'Oriental College of Technology, Bhopal',
  club: 'AI & Machine Learning Club – OCT',
  tagline: 'Innovate • Implement • Inspire.',
  session: '2026–27',
  
  // Strict Dates in Indian Standard Time (IST = UTC +05:30)
  openDateStr: '2026-10-21T00:00:00+05:30',
  closeDateStr: '2026-10-25T23:59:59+05:30',
  openTimestamp: new Date('2026-10-21T00:00:00+05:30').getTime(),
  closeTimestamp: new Date('2026-10-25T23:59:59+05:30').getTime(),

  urls: {
    club: 'https://aimlcluboct.in',
    social: 'https://social.aimlcluboct.in',
    circular: 'https://info.aimlcluboct.in'
  }
};

/**
 * STRICT ACCESS & PRIVACY GATE:
 * Returns the destination application form URL strictly during the live window (21-25 Oct 2026).
 * Before 21 October 2026 12:00 AM IST or after 25 October 2026 11:59 PM IST, returns null.
 * Kept encoded so raw destination string is never exposed before official opening.
 */
function getPortalDestination() {
  const now = getEffectiveTime();
  if (now < RECRUITMENT_CONFIG.openTimestamp || now > RECRUITMENT_CONFIG.closeTimestamp) {
    return null;
  }
  try {
    return atob('aHR0cHM6Ly9haW1sY2x1Ym9jdC56aXRlLnNv');
  } catch (e) {
    return null;
  }
}


/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initRecruitmentLifecycle();
  initSiteHeader();
  initSelectionTrackTabs();
  initApplicationRoadmap();
  initStoryboardCarousel();
  initLightboxModal();
  initCalendarAndShare();
  initProgressRingAndScrollTop();
  initScrollRevealObserver();
  initBentoCursorSpotlight();
  initMagneticButtons();
  initLenisSmoothScroll();
  checkAutoRedirect();
});

/* ==========================================================================
   A11Y ANNOUNCER & TOAST SYSTEM
   ========================================================================== */
function announceA11y(msg) {
  const el = document.getElementById('a11y-announcements');
  if (el) {
    el.textContent = '';
    setTimeout(() => { el.textContent = msg; }, 50);
  }
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Clear existing toasts so multiple bubbles never stack up
  container.innerHTML = '';

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute('role', 'status');

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-lime)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  } else if (type === 'warning') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }

  toast.innerHTML = `${iconSvg}<div>${message}</div>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 2800);
}

/* ==========================================================================
   THEME TOGGLE SYSTEM (DARK / LIGHT SEGMENTED PILL)
   ========================================================================== */
function initThemeSystem() {
  const btnDark = document.getElementById('btn-theme-dark');
  const btnLight = document.getElementById('btn-theme-light');
  const legacyToggleBtn = document.getElementById('theme-toggle-btn');

  function applyTheme(nextTheme) {
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('aiml-oct-theme', nextTheme);
    } catch (e) {}

    if (btnDark && btnLight) {
      if (nextTheme === 'dark') {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
      } else {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
      }
    }
  }

  // Initial sync with active attribute
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(activeTheme);

  if (btnDark) {
    btnDark.addEventListener('click', () => applyTheme('dark'));
  }
  if (btnLight) {
    btnLight.addEventListener('click', () => applyTheme('light'));
  }

  if (legacyToggleBtn) {
    legacyToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}


/* ==========================================================================
   RECRUITMENT LIFECYCLE ENGINE — REAL TIME STRICT LOCK
   ========================================================================== */
function getEffectiveTime() {
  // STRICT REAL TIME ONLY: No premature bypass or simulation allowed
  return Date.now();
}

function getRecruitmentPhase(now) {
  if (now < RECRUITMENT_CONFIG.openTimestamp) {
    return 'upcoming';
  } else if (now <= RECRUITMENT_CONFIG.closeTimestamp) {
    return 'live';
  } else {
    return 'closed';
  }
}

function initRecruitmentLifecycle() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  const timerStatusText = document.getElementById('timer-status-text');
  const timerTargetTag = document.getElementById('timer-target-tag');

  const heroRegisterBtn = document.getElementById('btn-hero-register');
  const heroRegisterText = document.getElementById('btn-hero-register-text');
  const heroRegisterBadge = document.getElementById('btn-hero-register-badge');

  const headerCtaBtn = document.getElementById('header-cta-btn');
  const headerCtaLabel = document.getElementById('header-cta-label');

  const mobileCtaBtn = document.getElementById('mobile-cta-btn');
  const mobileCtaLabel = document.getElementById('mobile-cta-label');

  const statusBanner = document.getElementById('hero-status-banner');
  const statusBannerIcon = document.getElementById('status-banner-icon');
  const statusBannerText = document.getElementById('status-banner-text');

  const cardDateOpen = document.getElementById('card-date-open');
  const badgeDateOpen = document.getElementById('badge-date-open');
  const cardDateClose = document.getElementById('card-date-close');
  const badgeDateClose = document.getElementById('badge-date-close');

  const destPortalBadge = document.getElementById('dest-portal-badge');
  const portalVaultDesc = document.getElementById('portal-vault-desc');
  const btnVisitPortal = document.getElementById('btn-visit-portal');

  let currentRenderedPhase = null;
  let intervalId = null;

  function update() {
    const now = getEffectiveTime();
    const phase = getRecruitmentPhase(now);

    if (phase !== currentRenderedPhase) {
      currentRenderedPhase = phase;
      applyPhaseState(phase);
    }

    if (phase === 'upcoming') {
      const distance = RECRUITMENT_CONFIG.openTimestamp - now;
      renderTimeDigits(distance);
    } else if (phase === 'live') {
      const distance = RECRUITMENT_CONFIG.closeTimestamp - now;
      renderTimeDigits(distance);
    } else {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
    }
  }

  function renderTimeDigits(distance) {
    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
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

  function applyPhaseState(phase) {
    if (phase === 'upcoming') {
      // 1. Timer HUD
      if (timerStatusText) timerStatusText.textContent = 'Official Registration Opens In:';
      if (timerTargetTag) timerTargetTag.textContent = '21 Oct 2026 • 12:00 AM IST';

      // 2. Status Banner (Strictly locked: NO link and NO domain shown)
      if (statusBanner) statusBanner.className = 'recruitment-notice-bar';
      if (statusBannerIcon) {
        statusBannerIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
      }
      if (statusBannerText) {
        statusBannerText.innerHTML = '<strong>Recruitment Notice:</strong> Applications open strictly on <strong>21 October 2026 at 12:00 AM IST</strong> exclusively for enrolled Oriental College of Technology (OCT), Bhopal students. Early access is strictly disabled. Review the 10-step preparation roadmap below to prepare your submission in advance.';
      }

      // 3. Hero CTA (Points to blueprint, NO early portal access!)
      if (heroRegisterBtn) {
        heroRegisterBtn.href = '#sec-application';
        heroRegisterBtn.target = '_self';
        if (heroRegisterText) heroRegisterText.textContent = 'Registration Opens 21 October';
        if (heroRegisterBadge) heroRegisterBadge.textContent = 'Opens 21 Oct';
      }

      // 4. Header & Mobile CTAs
      if (headerCtaBtn) {
        headerCtaBtn.href = '#sec-application';
        headerCtaBtn.target = '_self';
      }
      if (headerCtaLabel) headerCtaLabel.textContent = 'Opens 21 Oct';

      if (mobileCtaBtn) {
        mobileCtaBtn.href = '#sec-application';
        mobileCtaBtn.target = '_self';
      }
      if (mobileCtaLabel) mobileCtaLabel.textContent = 'Registration Opens 21 Oct';

      // 5. Date Cards
      if (cardDateOpen) cardDateOpen.className = 'bento-date-card';
      if (badgeDateOpen) badgeDateOpen.textContent = 'STAGE 1 • OPENS 21 OCT';
      if (cardDateClose) cardDateClose.className = 'bento-date-card';
      if (badgeDateClose) badgeDateClose.textContent = 'DEADLINE • CLOSES 25 OCT';

      // 6. Portal Vault Card (Strictly Locked: NO link, NO domain shown)
      if (destPortalBadge) {
        destPortalBadge.className = 'vault-status-badge';
        destPortalBadge.textContent = 'LOCKED • STRICTLY OPENS 21 OCT 2026';
      }
      if (portalVaultDesc) {
        portalVaultDesc.innerHTML = 'The official recruitment application portal is strictly locked until <strong>Wednesday, 21 October 2026 at 12:00 AM IST</strong> exclusively for enrolled students of Oriental College of Technology (OCT), Bhopal. Early access is completely disabled. Please prepare your responses, GitHub links, and portfolios in advance.';
      }
      if (btnVisitPortal) {
        btnVisitPortal.href = '#sec-application';
        btnVisitPortal.target = '_self';
        btnVisitPortal.className = 'btn btn-lg btn-primary magnetic-btn';
        btnVisitPortal.innerHTML = '<span>Preview 10-Step Application Blueprint</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
      }

    } else if (phase === 'live') {
      // 1. Timer HUD
      if (timerStatusText) timerStatusText.textContent = '🔥 Applications Close In:';
      if (timerTargetTag) timerTargetTag.textContent = '25 Oct 2026 • 11:59 PM IST';

      // 2. Status Banner (Live)
      if (statusBanner) statusBanner.className = 'recruitment-notice-bar status-live';
      if (statusBannerIcon) {
        statusBannerIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-lime)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>';
      }
      if (statusBannerText) {
        statusBannerText.innerHTML = `<strong>🟢 REGISTRATIONS ARE CURRENTLY OPEN!</strong> The recruitment application window for 2026–27 is now live exclusively for Oriental College of Technology students. Submit your application before <strong>Sunday, 25 October 2026, 11:59 PM IST</strong>.`;
      }

      // 3. Hero CTA (Unlocked Apply Button strictly during live window)
      const liveDestination = getPortalDestination() || '#sec-application';
      if (heroRegisterBtn) {
        heroRegisterBtn.href = liveDestination;
        heroRegisterBtn.target = liveDestination.startsWith('http') ? '_blank' : '_self';
        heroRegisterBtn.rel = 'noopener noreferrer';
        if (heroRegisterText) heroRegisterText.textContent = 'Apply Now ⚡';
        if (heroRegisterBadge) heroRegisterBadge.textContent = 'Live Now';
      }

      // 4. Header & Mobile CTAs
      if (headerCtaBtn) {
        headerCtaBtn.href = liveDestination;
        headerCtaBtn.target = liveDestination.startsWith('http') ? '_blank' : '_self';
        headerCtaBtn.rel = 'noopener noreferrer';
      }
      if (headerCtaLabel) headerCtaLabel.textContent = 'Apply Now ⚡';

      if (mobileCtaBtn) {
        mobileCtaBtn.href = liveDestination;
        mobileCtaBtn.target = liveDestination.startsWith('http') ? '_blank' : '_self';
        mobileCtaBtn.rel = 'noopener noreferrer';
      }
      if (mobileCtaLabel) mobileCtaLabel.textContent = 'Apply Now ⚡';

      // 5. Date Cards
      if (cardDateOpen) cardDateOpen.className = 'bento-date-card card-active';
      if (badgeDateOpen) badgeDateOpen.textContent = '🟢 ACTIVE NOW • SUBMISSIONS OPEN';

      // 6. Portal Vault Card (Unlocked)
      if (destPortalBadge) {
        destPortalBadge.className = 'vault-status-badge badge-unlocked';
        destPortalBadge.textContent = '🟢 LIVE NOW • PORTAL UNLOCKED';
      }
      if (portalVaultDesc) {
        portalVaultDesc.innerHTML = `The official recruitment application portal is now <strong>ACTIVE</strong> for enrolled Oriental College of Technology students. Submit your application before Sunday, 25 October 2026 at 11:59 PM IST.`;
      }
      if (btnVisitPortal) {
        btnVisitPortal.href = liveDestination;
        btnVisitPortal.target = liveDestination.startsWith('http') ? '_blank' : '_self';
        btnVisitPortal.rel = 'noopener noreferrer';
        btnVisitPortal.className = 'btn btn-lg btn-primary magnetic-btn';
        btnVisitPortal.innerHTML = `<span>Open Application Form</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
      }

    } else if (phase === 'closed') {
      // 1. Timer HUD
      if (timerStatusText) timerStatusText.textContent = 'Registration Period Has Concluded';
      if (timerTargetTag) timerTargetTag.textContent = 'Concluded 25 Oct 2026 • 11:59 PM IST';

      // 2. Status Banner (Closed)
      if (statusBanner) statusBanner.className = 'recruitment-notice-bar status-closed';
      if (statusBannerIcon) {
        statusBannerIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
      }
      if (statusBannerText) {
        statusBannerText.innerHTML = '<strong>🔒 REGISTRATIONS HAVE CONCLUDED.</strong> The recruitment registration window for 2026–27 closed on 25 October 2026 at 11:59 PM IST. Profile screening, dossier verification, and Stage 2 domain challenge assignments are now active. Shortlisted applicants will receive notifications via their registered email & WhatsApp.';
      }

      // 3. Hero CTA
      if (heroRegisterBtn) {
        heroRegisterBtn.href = '#sec-dates';
        heroRegisterBtn.target = '_self';
        if (heroRegisterText) heroRegisterText.textContent = 'Registration Closed';
        if (heroRegisterBadge) heroRegisterBadge.textContent = 'Closed';
      }

      // 4. Header & Mobile CTAs
      if (headerCtaBtn) {
        headerCtaBtn.href = '#sec-dates';
        headerCtaBtn.target = '_self';
      }
      if (headerCtaLabel) headerCtaLabel.textContent = 'Closed';

      if (mobileCtaBtn) {
        mobileCtaBtn.href = '#sec-dates';
        mobileCtaBtn.target = '_self';
      }
      if (mobileCtaLabel) mobileCtaLabel.textContent = 'Registration Closed';

      // 5. Date Cards
      if (cardDateClose) cardDateClose.className = 'bento-date-card card-active';
      if (badgeDateClose) badgeDateClose.textContent = 'CONCLUDED • 25 OCT';

      // 6. Portal Vault Card (Closed State)
      if (destPortalBadge) {
        destPortalBadge.className = 'vault-status-badge';
        destPortalBadge.textContent = 'CONCLUDED • STAGE 2 IN PROGRESS';
      }
      if (portalVaultDesc) {
        portalVaultDesc.innerHTML = 'The registration window closed on 25 October 2026 at 11:59 PM IST. Evaluation and shortlisting are actively taking place.';
      }
      if (btnVisitPortal) {
        btnVisitPortal.href = '#sec-dates';
        btnVisitPortal.target = '_self';
        btnVisitPortal.className = 'btn btn-lg btn-outline magnetic-btn';
        btnVisitPortal.innerHTML = '<span>View Evaluation Timeline</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
      }
    }
  }

  update();
  intervalId = setInterval(update, 1000);

  // Background pause guard
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    } else {
      update();
      if (!intervalId) intervalId = setInterval(update, 1000);
    }
  });

  if (heroRegisterBtn) {
    heroRegisterBtn.addEventListener('click', (e) => {
      const p = getRecruitmentPhase(getEffectiveTime());
      if (p === 'upcoming') {
        showToast('Registration begins on 21 October 2026 at 12:00 AM IST. Application link is strictly locked until opening.', 'info');
      } else if (p === 'closed') {
        showToast('Registrations have ended. Candidate evaluation is underway.', 'warning');
      }
    });
  }
}

/* ==========================================================================
   SITE HEADER & MOBILE DRAWER
   ========================================================================== */
function initSiteHeader() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
      } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('drawer-open');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('drawer-open');
      });
    });
  }

  // Desktop Navigation ScrollSpy (Active Section Highlight)
  const desktopNavLinks = document.querySelectorAll('.header-nav-link[data-target]');
  if (desktopNavLinks.length) {
    const trackedSections = Array.from(desktopNavLinks)
      .map(link => document.getElementById(link.getAttribute('data-target')))
      .filter(Boolean);

    function updateNavScrollSpy() {
      const scrollPos = window.scrollY + 120;
      let activeSectionId = trackedSections[0]?.id || '';

      for (let i = 0; i < trackedSections.length; i++) {
        const sec = trackedSections[i];
        if (sec.offsetTop <= scrollPos) {
          activeSectionId = sec.id;
        }
      }

      desktopNavLinks.forEach(link => {
        if (link.getAttribute('data-target') === activeSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateNavScrollSpy, { passive: true });
    updateNavScrollSpy();
  }
}

/* ==========================================================================
   SELECTION TRACK TABS & STEP INSPECTOR
   ========================================================================== */
function initSelectionTrackTabs() {
  const tabCandidate = document.getElementById('tab-candidate');
  const tabCore = document.getElementById('tab-core');
  const paneCandidate = document.getElementById('pane-candidate');
  const paneCore = document.getElementById('pane-core');

  const inspectorTag = document.getElementById('inspector-tag');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorBody = document.getElementById('inspector-body');

  if (!tabCandidate || !tabCore) return;

  function setTrack(track) {
    if (track === 'candidate') {
      tabCandidate.classList.add('active');
      tabCandidate.setAttribute('aria-selected', 'true');
      tabCore.classList.remove('active');
      tabCore.setAttribute('aria-selected', 'false');
      paneCandidate.classList.add('active');
      paneCore.classList.remove('active');
    } else {
      tabCore.classList.add('active');
      tabCore.setAttribute('aria-selected', 'true');
      tabCandidate.classList.remove('active');
      tabCandidate.setAttribute('aria-selected', 'false');
      paneCore.classList.add('active');
      paneCandidate.classList.remove('active');
    }
  }

  tabCandidate.addEventListener('click', () => setTrack('candidate'));
  tabCore.addEventListener('click', () => setTrack('core'));

  const stepNodes = document.querySelectorAll('.flow-step-node');
  stepNodes.forEach(node => {
    node.addEventListener('click', () => {
      stepNodes.forEach(n => n.classList.remove('selected'));
      node.classList.add('selected');

      const title = node.getAttribute('data-title');
      const body = node.getAttribute('data-body');
      const trackType = node.getAttribute('data-track-type');

      if (inspectorTag) inspectorTag.textContent = `${trackType.toUpperCase()} TRACK STEP DETAILS`;
      if (inspectorTitle) inspectorTitle.textContent = title;
      if (inspectorBody) inspectorBody.textContent = body;
    });
  });
}

/* ==========================================================================
   INSIDE THE APPLICATION (10-STEP ROADMAP DATA)
   ========================================================================== */
const APPLICATION_STEPS = [
  {
    step: 1,
    title: 'Personal Details & OCT Enrollment',
    summary: 'Oriental College of Technology, Bhopal mein aapka enrollment verify karta hai. Apni college details, contact number aur WhatsApp details accurately enter karein.',
    items: [
      'Full Name (college record ke mutabiq) & Enrollment Number (0126AL24XXXX)',
      'College Email (agar ho), Personal Email & Active WhatsApp Number',
      'Branch (CSE, AIML, IT, EC, EX etc.), Current Semester & Academic Year'
    ]
  },
  {
    step: 2,
    title: 'Interests & Departments (8 Wings)',
    summary: '24 specialized tech aur creative areas of interest mein se choose karo, aur 8 club departments mein se apne top 2 choices declare karo.',
    items: [
      'Areas of Interest: AI, ML, Deep Learning, GenAI/LLMs, Web, App, Cloud/DevOps, UI/UX, etc.',
      'Department Selection: Top 2 choices (Technical, Events, Media, Design, PR, Anchors, Discipline, Community)',
      'Cross-functional interest matching aur squad placement alignment'
    ]
  },
  {
    step: 3,
    title: 'Skills, Tools & Profiles (1 se 5 Rating)',
    summary: 'Apne overall experience ko 1 (Beginner) se 5 (Advanced) tak rate karo, Jin tools par kaam kiya hai unhe select karo, aur profile URLs share karo.',
    items: [
      'Self-rating: 1 (Beginner) se 5 (Advanced) scale par honest rating',
      'Tools & Frameworks: Python, C++, React, Next.js, PyTorch, Figma, OpenCV, etc.',
      'GitHub profile, LinkedIn, Portfolio website URL, aur Resume/CV PDF upload'
    ]
  },
  {
    step: 4,
    title: 'Projects & Practical Experience',
    summary: 'Batao aapne ab tak kya build kiya hai ya seekha hai. Live URLs, GitHub repos, ya design Figma files share karo jinpar aapko proud feel hota hai.',
    items: [
      'GitHub repository links aur live working deployment links',
      'Kaunsi problem solve ki, tech stack kya use kiya, aur aapka actual role kya tha',
      'Hands-on builder mindset aur tech ke liye genuine curiosity'
    ]
  },
  {
    step: 5,
    title: 'Practical Domain Assessment',
    summary: 'Aapke selected department ke hisaab se ek real-world problem-solving scenario, jo aapki analytical thinking aur execution speed test karta hai.',
    items: [
      'Aapke primary chosen department se juda scenario-based mini-challenge',
      'Problem breakdown, practical logic, aur approach ki evaluation',
      'Ratta-maar theory ke bajaye practical problem-solving capability'
    ]
  },
  {
    step: 6,
    title: 'Motivation & Mindset (No AI Answers)',
    summary: 'Batao aap AIML Club OCT kyu join karna chahte ho. Hindi, English ya Hinglish mein likho — jo naturally aaye. We want real thinking, not AI copy-paste!',
    items: [
      'Apne khud ke shabdon mein likho — Hindi, English ya Hinglish welcome',
      'Strictly zero AI-generated text — genuine motivation aur fire matter karta hai',
      'Aap yahan kya seekhna, build karna aur contribute karna chahte ho'
    ]
  },
  {
    step: 7,
    title: 'Weekly Time Commitment (4–8 Hours)',
    summary: 'Club sprints, weekend hackathons, technical workshops aur project builds ke liye apna realistic weekly time commitment declare karo.',
    items: [
      'Dedicated weekly time (average 4–8 hours per week)',
      'Weekend hackathons, team sprints, aur physical meetups ke liye availability',
      'Active participation aur dependable team collaboration ka commitment'
    ]
  },
  {
    step: 8,
    title: 'Club Decorum, Ethics & Academic Integrity',
    summary: 'AIML Club OCT ke code of conduct aur rules ki formal acceptance: zero ego, peer respect, open-source spirit aur college discipline.',
    items: [
      'College discipline aur institutional decorum ka strict adherence',
      'Peer respect, collaborative culture, aur zero tolerance for toxicity',
      'Academic integrity aur honest work commitment'
    ]
  },
  {
    step: 9,
    title: 'Final Review & Details Verification',
    summary: 'Final submit dabane se pehle saare entered details, profile links, documents aur answers ko ek complete preview screen par cross-check kar lo.',
    items: [
      'Pichle sabhi steps ka complete multi-field dossier preview',
      'Contact details verify karo taaki interview/task notification miss na ho',
      'Final confirmation lock — ek baar submit hone ke baad changes allowed nahi hain'
    ]
  },
  {
    step: 10,
    title: 'Submission Confirmation & WhatsApp Community Join',
    summary: 'Form submit hone ke baad on-screen confirmation aayegi aur official WhatsApp group link milega. Sabhi shortlisting updates aur interview rounds WhatsApp par share kiye jayenge.',
    items: [
      'Instant submission confirmation & reference receipt',
      'Direct link to join Official AIML Club WhatsApp Community Group & Channel',
      'Shortlist results, task briefs & interview schedules informed on WhatsApp'
    ]
  }
];

function initApplicationRoadmap() {
  const buttons = document.querySelectorAll('.step-nav-pill-btn');
  const badgeEl = document.getElementById('preview-badge');
  const headingEl = document.getElementById('preview-heading');
  const summaryEl = document.getElementById('preview-summary');
  const chk1 = document.getElementById('chk-1');
  const chk2 = document.getElementById('chk-2');
  const chk3 = document.getElementById('chk-3');

  if (!buttons.length || !headingEl) return;

  function renderStep(idx) {
    const data = APPLICATION_STEPS[idx - 1];
    if (!data) return;

    if (badgeEl) badgeEl.textContent = `STEP ${String(data.step).padStart(2, '0')} OF 10`;
    if (headingEl) headingEl.textContent = data.title;
    if (summaryEl) summaryEl.textContent = data.summary;

    if (chk1 && data.items[0]) chk1.querySelector('span').textContent = data.items[0];
    if (chk2 && data.items[1]) chk2.querySelector('span').textContent = data.items[1];
    if (chk3 && data.items[2]) chk3.querySelector('span').textContent = data.items[2];
  }

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStep(idx + 1);
    });
  });
}

/* ==========================================================================
   CAMPAIGN STORYBOARD CAROUSEL & LIGHTBOX
   ========================================================================== */
const STORYBOARD_SLIDES = [
  { src: 'assets/campaign/01-HOOK.png', title: 'The System Behind It • Official Announcement', desc: 'Oriental College of Technology, Bhopal ke liye recruitment session 2026–27 ka official announcement. A platform built by students, for students.' },
  { src: 'assets/campaign/02-PROBLEM.png', title: 'Fair & Transparent Selection Workflow', desc: 'Opaque selections ko alvida. Har applicant ka dossier ek open, structured aur unbiased framework se evaluate hota hai.' },
  { src: 'assets/campaign/03-APPLICATION.png', title: 'Comprehensive 10-Step Application Form', desc: 'Sirf marksheet nahi, aapki problem-solving ability, creative thinking aur execution skills ka thorough review.' },
  { src: 'assets/campaign/04-APPLICATION-RECORD.png', title: 'Submission Confirmation & Profile Record', desc: 'Form complete hone par accurate timestamp ke saath submission verify hoti hai aur candidate dossier log hota hai.' },
  { src: 'assets/campaign/05-CONFIRMATION.png', title: 'WhatsApp Community Join & Notifications', desc: 'Har applicant ko official WhatsApp link milta hai. Sabhi shortlisting results aur interview schedules WhatsApp par inform kiye jayenge.' },
  { src: 'assets/campaign/06-CORE-TEAM-REVIEW.png', title: 'Dedicated Core Team Evaluation Workspace', desc: 'Domain leads aur executive council ka unified screening workspace ensuring fair, prompt, and unbiased evaluation.' },
  { src: 'assets/campaign/07-SECURE-QR.png', title: 'Stage 2 Shortlisting & Campus Check-In', desc: 'OCT campus mein interviews, discussion rounds aur task submissions ke dauran smooth verification. Details WhatsApp par milengi.' },
  { src: 'assets/campaign/08-CTA.png', title: 'Ready to Build, Learn & Lead with Us?', desc: 'Join the premier artificial intelligence community at OCT Bhopal. Innovate, Implement, Inspire.' }
];

let currentSlideIdx = 0;

function initStoryboardCarousel() {
  const imgEl = document.getElementById('carousel-main-img');
  const counterEl = document.getElementById('slide-counter-tag');
  const titleEl = document.getElementById('slide-title-tag');
  const descEl = document.getElementById('slide-desc-tag');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dotsBar = document.getElementById('carousel-dots-bar');
  const figureBtn = document.getElementById('carousel-figure-btn');
  const trackEl = document.getElementById('storyboard-track');

  if (!imgEl) return;

  if (dotsBar) {
    dotsBar.innerHTML = '';
    STORYBOARD_SLIDES.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-indicator-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsBar.appendChild(dot);
    });
  }

  // Populate Interactive Horizontal Scroll Filmstrip
  if (trackEl) {
    trackEl.innerHTML = '';
    STORYBOARD_SLIDES.forEach((slide, idx) => {
      const chip = document.createElement('div');
      chip.className = `h-slide-chip ${idx === 0 ? 'active' : ''}`;
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-label', `View ${slide.title}`);
      
      const shortTitle = slide.title.includes('•') ? slide.title.split('•')[0].trim() : slide.title;
      chip.innerHTML = `
        <img src="${slide.src}" alt="${slide.title}" class="h-slide-thumb" loading="lazy" width="140" height="175" />
        <div class="h-slide-meta">
          <span class="h-slide-num">SLIDE ${String(idx + 1).padStart(2, '0')}</span>
          <span class="h-slide-title">${shortTitle}</span>
        </div>
      `;
      chip.addEventListener('click', () => goToSlide(idx));
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSlide(idx);
        }
      });
      trackEl.appendChild(chip);
    });

    // Smooth horizontal wheel translation on track
    trackEl.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackEl.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  function renderSlide(idx) {
    currentSlideIdx = idx;
    const slide = STORYBOARD_SLIDES[idx];
    if (!slide) return;

    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = slide.src;
      imgEl.alt = slide.title;
      imgEl.style.opacity = '1';
    }, 150);

    if (counterEl) counterEl.textContent = `SLIDE ${String(idx + 1).padStart(2, '0')} / 08`;
    if (titleEl) titleEl.textContent = slide.title;
    if (descEl) descEl.textContent = slide.desc;

    if (dotsBar) {
      const dots = dotsBar.querySelectorAll('.carousel-indicator-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    // Synchronize Horizontal Scroll Filmstrip Track
    if (trackEl) {
      const chips = trackEl.querySelectorAll('.h-slide-chip');
      chips.forEach((c, i) => {
        const isActive = i === idx;
        c.classList.toggle('active', isActive);
        if (isActive) {
          c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    }
  }

  function goToSlide(idx) {
    const nextIdx = (idx + STORYBOARD_SLIDES.length) % STORYBOARD_SLIDES.length;
    renderSlide(nextIdx);
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentSlideIdx - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentSlideIdx + 1));

  // Touch Swipe Gesture for Horizontal Carousel Navigation
  const stageEl = document.querySelector('.carousel-stage');
  if (stageEl) {
    let touchStartX = 0;
    let touchEndX = 0;
    stageEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stageEl.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentSlideIdx + 1);
        else goToSlide(currentSlideIdx - 1);
      }
    }, { passive: true });
  }

  if (figureBtn) {
    figureBtn.addEventListener('click', () => {
      openLightbox(STORYBOARD_SLIDES[currentSlideIdx].src);
    });
  }
}

/* ==========================================================================
   LIGHTBOX MODAL
   ========================================================================== */
function openLightbox(src) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (modal && img) {
    img.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const backdrop = document.getElementById('lightbox-backdrop');

  function close() {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
  }

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) close();
  });
}

/* ==========================================================================
   CALENDAR SYNC & SOCIAL SHARE SUITE
   ========================================================================== */
function initCalendarAndShare() {
  // Google Calendar Link
  const gcalBtn = document.getElementById('btn-gcal');
  if (gcalBtn) {
    const gTitle = encodeURIComponent('AIML Club OCT Recruitment 2026-27 Opens');
    const gDetails = encodeURIComponent('Official recruitment registration opens for the AI & Machine Learning Club, Oriental College of Technology, Bhopal. Visit https://info.aimlcluboct.in to inspect the process.');
    const gLoc = encodeURIComponent('Oriental College of Technology, Bhopal');
    const gDates = '20261020T183000Z/20261025T182900Z';
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gTitle}&dates=${gDates}&details=${gDetails}&location=${gLoc}`;
  }

  // .ICS Download
  const icsBtn = document.getElementById('btn-download-ics');
  if (icsBtn) {
    icsBtn.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//AIML Club OCT//Recruitment 2026-27//EN',
        'BEGIN:VEVENT',
        'UID:aiml-club-oct-recruitment-2026@aimlcluboct.in',
        'DTSTAMP:20261015T000000Z',
        'DTSTART:20261020T183000Z',
        'DTEND:20261025T182900Z',
        'SUMMARY:AIML Club OCT Recruitment 2026-27 (Oriental College of Technology)',
        'DESCRIPTION:Official registration opens for AI & Machine Learning Club exclusively for students of Oriental College of Technology, Bhopal. Info: https://info.aimlcluboct.in',
        'LOCATION:Oriental College of Technology, Bhopal, Madhya Pradesh',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AIML_Club_OCT_Recruitment_2026.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded .ICS Calendar Event!', 'success');
    });
  }

  // Copy Announcement URL
  const copyBtn = document.getElementById('btn-copy-url');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = 'https://info.aimlcluboct.in';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Official circular URL copied to clipboard!', 'success');
        });
      }
    });
  }

  // WhatsApp Broadcast
  const waBtn = document.getElementById('btn-share-wa');
  if (waBtn) {
    const text = encodeURIComponent('AIML Club OCT Recruitment 2026–27 at Oriental College of Technology, Bhopal opens on 21 October 2026! Exclusively for OCT students: https://info.aimlcluboct.in');
    waBtn.href = `https://api.whatsapp.com/send?text=${text}`;
  }

  // LinkedIn Share
  const liBtn = document.getElementById('btn-share-li');
  if (liBtn) {
    liBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://info.aimlcluboct.in')}`;
  }

  // Hero Share Trigger
  const heroShareBtn = document.getElementById('btn-hero-share');
  if (heroShareBtn) {
    heroShareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'AIML Club OCT Recruitment 2026–27',
          text: 'Official recruitment circular for AI & Machine Learning Club, Oriental College of Technology, Bhopal. Opens 21 Oct 2026.',
          url: 'https://info.aimlcluboct.in'
        }).catch(() => {});
      } else {
        copyBtn?.click();
      }
    });
  }
}

/* ==========================================================================
   PROGRESS RING & SCROLL TO TOP
   ========================================================================== */
function initProgressRingAndScrollTop() {
  const btn = document.getElementById('scroll-top-float');
  const circle = document.getElementById('progress-ring-circle');
  if (!btn || !circle) return;

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / (docHeight || 1), 0), 1);
    const offset = circumference - (progress * circumference);
    circle.style.strokeDashoffset = offset;

    if (scrollTop > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   AUTO-REDIRECT SUPPORT (Strictly blocked before 21 Oct)
   ========================================================================== */
function checkAutoRedirect() {
  try {
    const now = getEffectiveTime();
    const phase = getRecruitmentPhase(now);
    const params = new URLSearchParams(window.location.search);
    const shouldRedirect = params.get('redirect') === 'apply';

    if (phase !== 'live') {
      // STRICTLY BLOCK ALL REDIRECTS BEFORE 21 OCT!
      if (shouldRedirect) {
        showToast('Applications strictly open on 21 October 2026 at 12:00 AM IST. Early access is disabled.', 'warning');
        const sec = document.getElementById('sec-application');
        if (sec) {
          if (lenisInstance) {
            const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
            lenisInstance.scrollTo(sec, { offset: -(headerHeight + 14), duration: 1.1 });
          } else {
            sec.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      return;
    }

    const portalUrl = getPortalDestination();
    if (shouldRedirect && portalUrl) {
      showToast('Opening official application form...', 'success');
      setTimeout(() => {
        window.location.href = portalUrl;
      }, 1200);
    }
  } catch (e) {}
}

/* ==========================================================================
   LENIS SMOOTH SCROLL ENGINE & PARALLAX (MAESTROCLASS / LUXURY FRAMER STYLE)
   ========================================================================== */
let lenisInstance = null;

function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    // Graceful fallback for environments where CDN is restricted
    initFallbackSmoothScroll();
    return;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Parallax on Hero Campus Background
    const heroBg = document.querySelector('.hero-bg-image');
    lenisInstance.on('scroll', (e) => {
      const scrollY = e.scroll;
      if (heroBg && scrollY < window.innerHeight * 1.6) {
        heroBg.style.transform = `scale(1.05) translate3d(0, ${scrollY * 0.16}px, 0)`;
      }
    });

    // Smooth navigation anchor clicks with Lenis & dynamic header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
            lenisInstance.scrollTo(targetEl, { offset: -(headerHeight + 14), duration: 1.1 });
          }
        }
      });
    });

  } catch (err) {
    initFallbackSmoothScroll();
  }
}

function initFallbackSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 14);
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER (MAESTROCLASS INTERSECTION REVEALS)
   ========================================================================== */
function initScrollRevealObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   BENTO CARD RADIAL CURSOR SPOTLIGHT EFFECT
   ========================================================================== */
function initBentoCursorSpotlight() {
  const spotlightCards = document.querySelectorAll(
    '.bento-date-card, .dept-card, .flow-step-node, .portal-vault-card, .studio-suite-card, .innovation-showcase-card, .guidance-callout-card'
  );

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   MAGNETIC BUTTON SPRING HOVER INTERACTIONS
   ========================================================================== */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
