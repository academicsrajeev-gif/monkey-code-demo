# Don Bosco Public School Hathaura - Digital School Management System

A complete, free digital school management system built for small private schools (80+ students, 7 teachers). Includes a public website, teacher/parent/admin portal (PWA), Supabase database, chatbot, and automation workflows.

## System Architecture

```
Public Website (React SPA)
  │
  ├── Public pages: Home, About, Admissions, Gallery, Events, Contact
  ├── Chatbot (Dialogflow + custom FAQ component)
  ├── Google Calendar embed
  └── Parent Portal (login-protected)

App Portal (same PWA, role-based)
  ├── Teacher: Mark Attendance, My Classes, Fee Entry, Resources
  ├── Parent: Child's Attendance, Fee Status, Badges, Homework
  └── Admin: Reports Dashboard, User Management, Data Export

Database: Supabase (PostgreSQL)
  ├── Students, Staff, Classes, Subjects
  ├── Attendance (student & teacher)
  ├── Fees & Fee Structure
  ├── Badges (gamification)
  ├── Resources (LMS)
  ├── Events, Gallery, Announcements
  └── Notifications Log

Automation: n8n (self-hosted)
  ├── Attendance alerts → WhatsApp
  ├── Fee reminders (monthly cron)
  ├── Perfect attendance badges (weekly)
  └── Event → Google Calendar sync

Notifications: WhatsApp Business API / Interakt
Chatbot: Dialogflow ES + n8n webhook
```

## Quick Start

### Prerequisites
- Node.js 18+
- A Supabase account (free: supabase.com)

### 1. Clone & Install
```bash
cd don-bosco-school
npm install
```

### 2. Set up Supabase
1. Create a project at https://supabase.com (select Mumbai/ap-south-1 region)
2. Go to SQL Editor → paste contents of `database/schema.sql` → Run
3. Go to Project Settings → API → copy `Project URL` and `anon public key`
4. Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm run preview
```

## Deployment

### Option A: Vercel (Free)
1. Push to GitHub
2. Import repo to Vercel
3. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Deploy — Vercel auto-detects Vite

### Option B: Netlify (Free)
1. Push to GitHub
2. Import to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables

### Option C: Cloudflare Pages (Free)
1. Push to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output: `dist`

## Installing as Android App (PWA)

When the website is deployed:
1. Open the site in Chrome on Android
2. Tap the three-dot menu → "Add to Home Screen"
3. Name it "Don Bosco School" → tap "Add"
4. The app opens like a native Android app

## Setting Up Automation (n8n)

### Option A: Self-hosted (Free)
```bash
# Deploy on Railway (railway.app) - free tier
# Or on Render (render.com) - free web service
```

1. Create n8n account or self-host
2. Import workflows from `automation/n8n-workflows/school-automations.json`
3. Configure credentials:
   - Supabase (PostgreSQL connection string)
   - WhatsApp/Interakt API key
   - Google Calendar OAuth

### Option B: Make.com (Free tier: 1000 ops/month)
Use the same logic — create scenarios for:
- Webhook: New attendance → check absences → send WhatsApp
- Schedule: Monthly fee reminders
- Schedule: Weekly badge awards

## Setting Up Dialogflow Chatbot

1. Go to https://dialogflow.cloud.google.com/
2. Create a new agent → select English
3. Import intents from `chatbot/dialogflow-agent/agent.json`
4. Enable fulfillment → set webhook URL to your n8n endpoint
5. Embed on website using the provided iframe code

## Setting Up WhatsApp Notifications

### Free Sandbox (Testing)
1. Apply for WhatsApp Business API access at https://business.whatsapp.com/
2. Use sandbox environment (free for 5 numbers)

### Production (₹999/month)
1. Sign up at https://interakt.co/ (Indian provider)
2. Get API key and approved templates
3. Add API key to n8n credentials

## Data Flow Examples

### Daily Attendance Flow
```
Teacher marks attendance in app
  → Supabase saves to `attendance` table
  → n8n webhook triggers
  → Checks consecutive absences
  → Sends WhatsApp alert to parent (1st absence)
  → Escalates to admin (3+ consecutive absences)
  → Friday: n8n cron awards "Perfect Week" badges
```

### Fee Reminder Flow
```
5th of every month
  → n8n cron triggers
  → Queries Supabase for pending/overdue fees
  → Sends WhatsApp reminders with amount + due date
  → Logs in notifications table
```

## File Structure
```
don-bosco-school/
├── public/                    # Static assets
│   └── favicon.svg
├── src/
│   ├── components/            # Shared components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Site footer
│   │   └── Chatbot.jsx        # FAQ chatbot widget
│   ├── pages/
│   │   ├── public/            # Public website pages
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── About.jsx      # School info
│   │   │   ├── Admissions.jsx # Fee structure + process
│   │   │   ├── Gallery.jsx    # Photo gallery
│   │   │   ├── Events.jsx     # Calendar + events
│   │   │   ├── Contact.jsx    # Contact form
│   │   │   └── ParentPortal.jsx
│   │   ├── app/               # Protected app pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TeacherAttendance.jsx
│   │   │   ├── TeacherClasses.jsx
│   │   │   ├── FeeEntry.jsx
│   │   │   ├── ParentView.jsx
│   │   │   ├── AdminReports.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── Resources.jsx
│   │   └── Login.jsx          # Role-based login
│   ├── lib/
│   │   └── supabase.js        # Supabase client + demo data
│   ├── App.jsx                # Router configuration
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind imports + theme
├── database/
│   └── schema.sql             # PostgreSQL schema
├── automation/
│   └── n8n-workflows/
│       └── school-automations.json
├── chatbot/
│   └── dialogflow-agent/
│       └── agent.json
├── vite.config.js
├── package.json
└── README.md
```

## Free Tier Limits

| Service | Limit | For Our School |
|---------|-------|----------------|
| Supabase | 500MB DB, 1GB storage, 50k users | Plenty for years |
| Vercel/Netlify | Unlimited bandwidth (fair use) | More than enough |
| n8n (self-hosted) | Unlimited | Free forever |
| Dialogflow ES | 180 req/min | ~50 queries/day = fine |
| WhatsApp (Interakt) | Paid after trial | ~₹999/mo |
| Google Calendar | Free | Unlimited |

## Upgrade Path (When Needed)

1. **Supabase Pro** ($25/mo): 8GB DB, never pauses, daily backups
2. **Custom Android App** (one-time ₹50k-1L): Flutter app connecting to same Supabase
3. **Google Workspace** ($6/user/mo × 7 = $42/mo): Custom domain email for teachers

## Training Notes

### Teachers (90-min session)
- Install PWA from Chrome
- 3 actions: Mark attendance, Check classes, Upload homework
- Run parallel (paper + digital) for 2 weeks

### Parents (WhatsApp + video)
- Send 1-page guide with screenshots
- 2-min screen recording video
- QR code at school entrance
- Office hours for help (first 2 weeks)

## License

Free for educational institutions. Built with React, Supabase, Tailwind CSS, and n8n.
