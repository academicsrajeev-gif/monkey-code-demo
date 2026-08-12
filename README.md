# Rajeev Ranjan — Senior Data Engineer Portfolio

A professional, dynamic single-page portfolio website for a Senior Data Engineer. Dark theme by default with a light-mode toggle, smooth animations, and real tech logos.

## Features

- **Hero** — tsParticles animated background, Typed.js cycling titles, glowing profile ring, floating tech logos, shimmer Download CV button
- **Navbar** — Glassmorphism sticky nav, smooth scroll, active-section highlighting, mobile hamburger menu
- **Skills** — Tab switcher by category with devicon logos, animated progress bars on scroll, neon glow hover
- **Experience** — Vertical animated timeline with company/client logos, "Current" pulse badge
- **Projects** — Glass cards with 3D tilt (vanilla-tilt.js) and category filters
- **Certifications** — Shimmer badge cards with verified checkmarks
- **Counters** — Animated statistics (CountUp.js): 7+ years, 50+ migrations, 83% faster, 1M+ records/day
- **Contact** — EmailJS-powered form, social links, location badges
- Page loader with "RR" monogram, scroll-to-top button, dark/light toggle (localStorage), fully responsive

## Tech Stack

| Purpose | Library | CDN |
|---------|---------|-----|
| Particle background | tsParticles | `cdn.jsdelivr.net/npm/tsparticles-slim` |
| Scroll animations | AOS | `unpkg.com/aos` |
| Timeline / micro animations | GSAP + ScrollTrigger | `cdnjs.cloudflare.com/ajax/libs/gsap` |
| Typing effect | Typed.js | `cdn.jsdelivr.net/npm/typed.js` |
| Number counters | CountUp.js | `cdnjs.cloudflare.com/ajax/libs/countup.js` |
| 3D card tilt | Vanilla-Tilt | `cdnjs.cloudflare.com/ajax/libs/vanilla-tilt` |
| Contact form | EmailJS | `cdn.jsdelivr.net/npm/@emailjs/browser` |
| Tech logos | Devicon | `cdn.jsdelivr.net/gh/devicons/devicon` |
| Company logos | CompaniesLogo + Wikimedia | `companieslogo.com/img/orig/[ticker]-[hash].svg` |
| Icons | Font Awesome 6 | `cdnjs.cloudflare.com/ajax/libs/font-awesome` |
| Fonts | Google Fonts (Poppins + Inter) | `fonts.googleapis.com` |

## File Structure

```
├── index.html     # Page structure & all content
├── style.css      # Themes, animations, responsive layout
├── script.js      # Library init, interactivity, EmailJS
├── assets/
│   └── Rajeev_Ranjan_CV.pdf   # Place the CV here
└── README.md      # This file
```

## Local Development

Because everything is loaded from CDNs, the site runs from any static file server — no build step required.

```bash
# Option A: Python
python3 -m http.server 5500

# Option B: Node (npx)
npx serve .

# Option C: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then open `http://localhost:5500` (or the port the server prints).

> Note: `companieslogo.com`, `upload.wikimedia.org`, `unpkg.com`, `cdn.jsdelivr.net`, `cdnjs.cloudflare.com` and `fonts.googleapis.com` require internet access.

## Configuration

### 1. CV Download

Create the folder and drop your resume file at:

```
assets/Rajeev_Ranjan_CV.pdf
```

The "Download CV" button in the hero downloads this file.

### 2. EmailJS Contact Form

The form currently uses placeholder IDs so it gracefully shows a fallback error. To make it live:

1. Create an account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (SMTP or Gmail) → note the **Service ID**
3. Create an Email Template → note the **Template ID**
4. In **Account → General**, copy your **Public Key**
5. In `script.js`, replace:

```js
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
```

with your actual Public Key, Service ID and Template ID.

### 3. Personalization

All personal data (name, experience, skills, projects, links) lives directly in `index.html` — edit the content sections there. Colors and theming live in the CSS custom properties at the top of `style.css`:

```css
--navy: #0A0E27;         /* background */
--cyan: #00D4FF;         /* primary accent */
--azure: #0078D4;        /* secondary accent */
--databricks: #FF6B35;   /* highlight accent */
```

## Deployment

### GitHub Pages

```bash
git init
git add .
git commit -m "feat: add data engineer portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then: repo **Settings → Pages → Source: Deploy from branch → main / (root)**. Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

### Vercel / Netlify

**Fastest — drag & drop (no git, no CLI):**

1. **Netlify**: go to https://app.netlify.com/drop → drag this whole folder onto the page → you get a `*.netlify.app` URL instantly.
2. **Vercel**: go to https://vercel.com/new → *Deploy manually / Import* → drag the folder → get a `*.vercel.app` URL.

**Via CLI:**

```bash
# Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=.

# Vercel
npm i -g vercel
vercel --prod
```

Both auto-detect this static project (no build step). `vercel.json` / `netlify.toml` are already included.

**Via GitHub repo:**

1. Push this folder to a GitHub repository.
2. On Vercel or Netlify: **New Project → Import the repo**.
3. Framework preset: **Other** (static site).
4. Build command: leave empty · Output directory: leave as root.
5. Deploy — you'll get a URL instantly.

### Cloudflare Pages / Firebase Hosting

- Cloudflare Pages: drag-and-drop the folder (or connect the repo) — no build settings needed.
- Firebase: `npx firebase-tools deploy --only hosting` after `firebase init hosting`.

## Custom Domain & HTTPS

- GitHub Pages / Netlify / Vercel all support custom domains and auto-provision HTTPS in their dashboard settings.

---

© Rajeev Ranjan — Senior Data Engineer | Azure · Databricks · AWS
