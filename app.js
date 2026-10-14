/**
 * AIML CLUB OCT - EXECUTIVE COUNCIL RECRUITMENT 2026
 * Official Client Script & Form Controller
 * Institutional Domain Logic for Oriental College of Technology, Bhopal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initDivisionFilter();
  initRoleSelection();
  initMultiStepForm();
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
   4. ROLE SELECTION BUTTONS (SHORTCUT TO FORM)
   ========================================================================== */
function initRoleSelection() {
  const roleButtons = document.querySelectorAll('.role-select-btn');
  const firstPrefSelect = document.getElementById('firstPreference');

  roleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.dataset.role;

      if (firstPrefSelect) {
        firstPrefSelect.value = role;
      }

      // Smooth scroll to apply section
      const applySection = document.getElementById('apply');
      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   5. MULTI-STEP APPLICATION FORM ENGINE
   ========================================================================== */
function initMultiStepForm() {
  const form = document.getElementById('recruitment-form');
  if (!form) return;

  let currentStep = 1;
  const totalSteps = 4;

  const stepSections = [
    document.getElementById('step-1-section'),
    document.getElementById('step-2-section'),
    document.getElementById('step-3-section'),
    document.getElementById('step-4-section')
  ];

  const stepIndicators = document.querySelectorAll('.form-stepper .form-step');

  // Next / Back buttons
  const btnToStep2 = document.getElementById('btn-to-step-2');
  const btnBackTo1 = document.getElementById('btn-back-to-step-1');
  const btnToStep3 = document.getElementById('btn-to-step-3');
  const btnBackTo2 = document.getElementById('btn-back-to-step-2');
  const btnToStep4 = document.getElementById('btn-to-step-4');
  const btnBackTo3 = document.getElementById('btn-back-to-step-3');

  // Navigation Logic
  if (btnToStep2) {
    btnToStep2.addEventListener('click', () => {
      if (validateStep1()) {
        goToStep(2);
      }
    });
  }

  if (btnBackTo1) {
    btnBackTo1.addEventListener('click', () => goToStep(1));
  }

  if (btnToStep3) {
    btnToStep3.addEventListener('click', () => {
      if (validateStep2()) {
        goToStep(3);
      }
    });
  }

  if (btnBackTo2) {
    btnBackTo2.addEventListener('click', () => goToStep(2));
  }

  if (btnToStep4) {
    btnToStep4.addEventListener('click', () => {
      if (validateStep3()) {
        updateStep4Review();
        goToStep(4);
      }
    });
  }

  if (btnBackTo3) {
    btnBackTo3.addEventListener('click', () => goToStep(3));
  }

  // Live SOP Character Counter
  const sopTextarea = document.getElementById('sop');
  const sopCounter = document.getElementById('sop-counter');
  if (sopTextarea && sopCounter) {
    sopTextarea.addEventListener('input', () => {
      const len = sopTextarea.value.trim().length;
      sopCounter.textContent = `${len} / 50 min characters`;
      if (len >= 50) {
        sopCounter.style.color = 'var(--brand-lime)';
      } else {
        sopCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  function goToStep(step) {
    currentStep = step;
    stepSections.forEach((sec, idx) => {
      if (sec) {
        if (idx + 1 === step) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      }
    });

    stepIndicators.forEach((ind, idx) => {
      const stepNum = idx + 1;
      if (stepNum === step) {
        ind.classList.add('active');
        ind.classList.remove('completed');
      } else if (stepNum < step) {
        ind.classList.remove('active');
        ind.classList.add('completed');
      } else {
        ind.classList.remove('active');
        ind.classList.remove('completed');
      }
    });
  }

  // Step 1 Validation
  function validateStep1() {
    let isValid = true;
    clearError('fullName');
    clearError('email');
    clearError('contactNo');
    clearError('enrollmentNo');
    clearError('department');
    clearError('semester');

    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName || fullName.length < 3) {
      showError('fullName', 'Please enter your full legal name.');
      isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    const contactNo = document.getElementById('contactNo').value.trim();
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!contactNo || !phoneRegex.test(contactNo)) {
      showError('contactNo', 'Please enter a valid 10-digit WhatsApp number.');
      isValid = false;
    }

    const enrollmentNo = document.getElementById('enrollmentNo').value.trim().toUpperCase();
    const enrollmentRegex = /^0126[A-Z0-9]{8,12}$/i;
    if (!enrollmentNo || !enrollmentRegex.test(enrollmentNo)) {
      showError('enrollmentNo', 'Must be a valid OCT enrollment number (starts with 0126).');
      isValid = false;
    }

    const department = document.getElementById('department').value;
    if (!department) {
      showError('department', 'Please select your academic department.');
      isValid = false;
    }

    const semester = document.querySelector('input[name="semester"]:checked');
    if (!semester) {
      showError('semester', 'Please select your current semester.');
      isValid = false;
    }

    return isValid;
  }

  // Step 2 Validation
  function validateStep2() {
    clearError('firstPreference');
    const firstPref = document.getElementById('firstPreference').value;
    if (!firstPref) {
      showError('firstPreference', 'Please select your primary department track.');
      return false;
    }
    return true;
  }

  // Step 3 Validation
  function validateStep3() {
    let isValid = true;
    clearError('sop');
    clearError('githubUrl');
    clearError('portfolioUrl');

    const sop = document.getElementById('sop').value.trim();
    if (!sop || sop.length < 50) {
      showError('sop', 'Please write at least 50 characters explaining your motivation.');
      isValid = false;
    }

    const github = document.getElementById('githubUrl').value.trim();
    if (github && !isValidUrl(github)) {
      showError('githubUrl', 'Please enter a valid URL (including https://).');
      isValid = false;
    }

    const portfolio = document.getElementById('portfolioUrl').value.trim();
    if (portfolio && !isValidUrl(portfolio)) {
      showError('portfolioUrl', 'Please enter a valid URL (including https://).');
      isValid = false;
    }

    return isValid;
  }

  // Step 4 Review Population
  function updateStep4Review() {
    const fullName = document.getElementById('fullName').value.trim();
    const enrollmentNo = document.getElementById('enrollmentNo').value.trim().toUpperCase();
    const department = document.getElementById('department').value;
    const semester = document.querySelector('input[name="semester"]:checked')?.value || '';
    const contactNo = document.getElementById('contactNo').value.trim();
    const email = document.getElementById('email').value.trim();
    const firstPref = document.getElementById('firstPreference').value;

    document.getElementById('rev-name').textContent = fullName;
    document.getElementById('rev-enrollment').textContent = enrollmentNo;
    document.getElementById('rev-dept').textContent = `${department} (${semester})`;
    document.getElementById('rev-contact').textContent = `${contactNo} • ${email}`;
    document.getElementById('rev-role').textContent = firstPref;
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    clearError('checkTruth');
    clearError('checkCode');

    const checkTruth = document.getElementById('check-truth').checked;
    const checkCode = document.getElementById('check-code').checked;

    let valid = true;
    if (!checkTruth) {
      showError('checkTruth', 'You must verify that your academic details are authentic.');
      valid = false;
    }
    if (!checkCode) {
      showError('checkCode', 'You must agree to the institutional code of conduct.');
      valid = false;
    }

    if (!valid) return;

    // Generate Official Docket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const docketId = `OCT-AIML-2026-${randomHex}`;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const submissionData = {
      docketId,
      timestamp,
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      contactNo: document.getElementById('contactNo').value.trim(),
      enrollmentNo: document.getElementById('enrollmentNo').value.trim().toUpperCase(),
      department: document.getElementById('department').value,
      semester: document.querySelector('input[name="semester"]:checked')?.value || '',
      firstPreference: document.getElementById('firstPreference').value,
      secondPreference: document.getElementById('secondPreference').value,
      githubUrl: document.getElementById('githubUrl').value.trim(),
      portfolioUrl: document.getElementById('portfolioUrl').value.trim(),
      sop: document.getElementById('sop').value.trim(),
      commitment: document.querySelector('input[name="commitment"]:checked')?.value || ''
    };

    // Store in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('aiml_oct_applications') || '[]');
      existing.push(submissionData);
      localStorage.setItem('aiml_oct_applications', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    // Populate Receipt Slip
    document.getElementById('rcpt-id').textContent = docketId;
    document.getElementById('rcpt-name').textContent = submissionData.fullName;
    document.getElementById('rcpt-enrollment').textContent = submissionData.enrollmentNo;
    document.getElementById('rcpt-role').textContent = submissionData.firstPreference;
    document.getElementById('rcpt-timestamp').textContent = timestamp;

    // Show Success State
    form.style.display = 'none';
    const successCard = document.getElementById('submission-success');
    if (successCard) {
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Reset Form for New Submission
  const resetBtn = document.getElementById('btn-reset-form');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      const successCard = document.getElementById('submission-success');
      if (successCard) successCard.style.display = 'none';
      goToStep(1);
    });
  }

  function showError(fieldId, message) {
    const errEl = document.getElementById(`error-${fieldId}`);
    const inputEl = document.getElementById(fieldId);
    if (errEl) errEl.textContent = message;
    if (inputEl) inputEl.classList.add('is-invalid');
  }

  function clearError(fieldId) {
    const errEl = document.getElementById(`error-${fieldId}`);
    const inputEl = document.getElementById(fieldId);
    if (errEl) errEl.textContent = '';
    if (inputEl) inputEl.classList.remove('is-invalid');
  }

  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }
}

/* ==========================================================================
   6. CAMPAIGN SLIDER & LIGHTBOX MODAL
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
  const counter = document.getElementById('slide-counter');

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
   7. FAQS ACCORDION
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
