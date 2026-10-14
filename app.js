/**
 * OFFICIAL ANNOUNCEMENT CLIENT SCRIPT
 * AI & Machine Learning Club, Oriental College of Technology, Bhopal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCopyButton();
  initCalendarReminder();
});

/* ==========================================================================
   1. COUNTDOWN TIMER TO REGISTRATION OPENING (21 OCT 2026)
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

  function update() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      const title = document.querySelector('.countdown-title span');
      if (title) title.textContent = 'Registration Is Now OPEN!';
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

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. COPY LINK TO CLIPBOARD
   ========================================================================== */
function initCopyButton() {
  const copyBtn = document.getElementById('btn-copy-link');
  const copyText = document.getElementById('copy-btn-text');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const url = 'https://info.aimlcluboct.in';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const temp = document.createElement('textarea');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      if (copyText) copyText.textContent = 'Copied!';
      copyBtn.style.background = '#00f0ff';
      copyBtn.style.color = '#000';

      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy Link';
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  });
}

/* ==========================================================================
   3. CALENDAR REMINDER (.ICS DOWNLOAD)
   ========================================================================== */
function initCalendarReminder() {
  const reminderBtn = document.getElementById('btn-set-reminder');
  if (!reminderBtn) return;

  reminderBtn.addEventListener('click', () => {
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
  });
}
