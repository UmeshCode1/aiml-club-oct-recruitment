# AIML Club OCT Recruitment 2026–27 | Official Announcement Portal
### AI & Machine Learning Club, Oriental College of Technology (OCT), Bhopal
**Tagline:** *Innovate • Implement • Inspire.*

Official announcement, informational circular, and campaign ecosystem for the 2026–27 recruitment drive of the AI & Machine Learning Club at Oriental College of Technology, Bhopal, Madhya Pradesh.

---

## 🌐 Official Ecosystem Destinations

| Portal / Resource | Destination | Role & Purpose |
| :--- | :--- | :--- |
| **Recruitment Announcement (Current Site)** | [https://info.aimlcluboct.in](https://info.aimlcluboct.in) | Candidate guidelines, 10-step application preview, dual-track selection process, 8-slide campaign storyboard, organization hierarchy, calendar reminders, and live countdown. |
| **Official Application Form (Confidential)** | *Released strictly on 21 Oct 2026 at 12:00 AM IST* | 10-step recruitment submission portal. Collects applications and automatically dispatches the Application Record PDF and unique screening QR code. |
| **Official Club Website** | [https://aimlcluboct.in](https://aimlcluboct.in) | Primary organization homepage detailing past hackathons, flagship projects, executive council, research, and workshop archives. |
| **Verified Social Directory Hub** | [https://social.aimlcluboct.in](https://social.aimlcluboct.in) | Centralized directory linking verified WhatsApp community groups, LinkedIn, Discord, Telegram, Instagram, GitHub, and YouTube. |

---

## 🏛️ Institutional Eligibility

- **Exclusivity:** Strictly and exclusively open to enrolled **1st, 2nd, and 3rd year engineering students of Oriental College of Technology (OCT), Bhopal**.
- **Branches:** Open across all engineering departments (CSE, AIML, IT, DS, EC, EX, ME, CE).
- **External Candidates:** Submissions from outside institutions or non-enrolled individuals will not be processed. Student credentials and enrollment records are verified during profile screening.
- **Registration Fee:** **Zero (₹0)** — Free for all eligible OCT students.

---

## ⏱️ Key Dates & Recruitment Lifecycle

- **Registration Opens:** Wednesday, 21 October 2026 at 12:00 AM IST (Midnight)
- **Registration Closes:** Sunday, 25 October 2026 at 11:59 PM IST (Strict 5-day window)
- **Stage 2 (Screening & Challenges):** 26–28 October 2026 (Shortlisted candidates notified via email/WhatsApp)
- **Stage 3 (Interviews & Inductions):** 29–31 October 2026

### Automated Lifecycle Engine (`app.js`)
The client application dynamically switches state based on real-time Indian Standard Time (IST = UTC +05:30):
1. **Pre-Registration (Before 21 Oct 2026, 12:00 AM IST):**
   - Displays real-time countdown to opening.
   - Action buttons guide students to the 10-step preparation preview (`#sec-application`).
   - Notice banner explains the informational nature of the page.
   - External application destination remains strictly locked and confidential.
2. **Active Registration Window (21–25 Oct 2026, 11:59 PM IST):**
   - Automatically switches timer to "Applications Close In".
   - Primary hero, sticky header, mobile drawer, and portal cards update to high-visibility "Apply Now" buttons.
   - Top banner updates with active live green indicator.
3. **Post-Closing (After 25 Oct 2026, 11:59 PM IST):**
   - Freezes countdown at `00:00:00:00` with "Registration Period Has Concluded".
   - Updates all CTAs to "Registrations Closed" linking to the Stage 2 evaluation timeline.
   - Marks opening and closing milestones as "Completed ✓" and highlights Stage 2 as in progress.

### Developer & QA Testing Hooks
You can preview any recruitment lifecycle state instantly in the browser console:
```javascript
// Test pre-registration state
window.__setTestDate("upcoming");

// Test active registration window (live apply buttons)
window.__setTestDate("live");

// Test post-closing state
window.__setTestDate("closed");

// Test a custom ISO timestamp
window.__setTestDate("2026-10-22T10:00:00+05:30");

// Restore real-time clock
window.__resetTestDate();
```
Or append URL query parameters directly:
- `?phase=upcoming`
- `?phase=live`
- `?phase=closed`
- `?redirect=apply` (triggers direct navigation to portal if live)

---

## 🎨 Design & Accessibility Standards

- **Brand Colors:** Exact color mapping from the authentic AIML Club OCT logo:
  - Deep Space Canvas: `#070a0f`
  - Neon Chartreuse / Lime: `#cbfb1f`
  - High-Voltage Cyan: `#00f0ff`
- **Dual Theme Support:** Dark and Light themes with WCAG 2.1 AAA accessible contrast tokens.
- **Logo Preservation:** The official high-resolution logo (`assets/logo.png`) is preserved bit-for-bit without distortion, color overlays, or CSS filters.
- **Campus Anchor:** Authentic high-resolution Oriental College of Technology campus photograph embedded in the hero banner.
- **Accessibility:** Semantic HTML5 hierarchy (`<h1>` through `<h4>`), ARIA live regions for dynamic announcements (`#a11y-announcements`), skip links, keyboard navigation traps for modals and drawers, and `@media (prefers-reduced-motion)` fallbacks.

---

## 📁 Campaign Storyboard Assets

Verified 8-part social media and campus campaign series (`1080×1350` high-resolution):
1. `assets/campaign/01-HOOK.png` — *The System Behind It*
2. `assets/campaign/02-PROBLEM.png` — *Fair & Transparent Flow*
3. `assets/campaign/03-APPLICATION.png` — *Multi-Dimension Form*
4. `assets/campaign/04-APPLICATION-RECORD.png` — *Application Record PDF*
5. `assets/campaign/05-CONFIRMATION.png` — *Email Confirmation + Unique QR*
6. `assets/campaign/06-CORE-TEAM-REVIEW.png` — *Dedicated Core Team Workspace*
7. `assets/campaign/07-SECURE-QR.png` — *Secure QR Screening*
8. `assets/campaign/08-CTA.png` — *Ready to Build With Us*

---

## 🏛️ Executive Council & Organizational Hierarchy

```
                                  [President]
                                       |
                              [Vice President]
                                       |
        +------------------------------+------------------------------+
        |                                                             |
[Operational Departments]                             [Director of Media & Creative Affairs]
  • Technical & AI/ML                                                 |
  • Events & Operations                       +-----------------------+-----------------------+
  • Public Relations & Outreach               |           |           |           |           |
  • Discipline & Protocol                  Graphics    Content    Social Media  Cinematography Videography
                                            Design     Writing    Management    & Photography  & Editing
```

---

## 💻 Local Testing & Preview

Run using any standard local server:
```bash
# Python 3
python -m http.server 3000

# Node.js
npx serve .
```

Open `http://localhost:3000` in your browser.

---

&copy; 2026 AI & Machine Learning Club, Oriental College of Technology, Bhopal. All rights reserved.
