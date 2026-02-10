# Mathe-App: Neuroinklusive Grundschulmathematik

> Eine Lern-App fuer Addition & Subtraktion (Klasse 1-4) nach Universal Design for Learning, speziell fuer neurodivergente Kinder

## Vision
Eine Mathe-Lern-App, die neurodivergente Kinder (ADHS, Dyskalkulie, ASS, LRS, Hochbegabung) mit individuellen Lernpfaden, multimodalen Zugaengen und waehlbaren Sensorik-Profilen beim Erlernen von Addition und Subtraktion unterstuetzt.

---

## Aktueller Status
Requirements Phase - Feature Specs geschrieben, bereit fuer Solution Architect

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui (copy-paste components)

### Backend
- **Database:** Supabase (PostgreSQL with Auth)
- **State Management:** React useState / Context API
- **Data Fetching:** React Server Components / fetch

### Deployment
- **Hosting:** Vercel (oder Netlify)

---

## Features Roadmap

### Didaktisches Fundament
- [PROJ-1] Didaktisches Konzept: Addition & Subtraktion Lernpfad Klasse 1-4 → 🔵 Planned → [Spec](/features/PROJ-1-addition-subtraktion-lernpfad.md)

### Core Features (MVP)
- [PROJ-2] Onboarding & Profil-Setup → 🔵 Planned → [Spec](/features/PROJ-2-onboarding-profil-setup.md)
- [PROJ-3] Einstufungstest → 🔵 Planned → [Spec](/features/PROJ-3-einstufungstest.md)
- [PROJ-4] Aufgaben-Engine (Core) → 🔵 Planned → [Spec](/features/PROJ-4-aufgaben-engine.md)
- [PROJ-5] Hilfe-System (3 Stufen) → 🔵 Planned → [Spec](/features/PROJ-5-hilfe-system.md)
- [PROJ-6] Belohnungs- & Meilenstein-System → 🔵 Planned → [Spec](/features/PROJ-6-belohnungssystem.md)
- [PROJ-7] Pausen & Selbstregulation → 🔵 Planned → [Spec](/features/PROJ-7-pausen-selbstregulation.md)
- [PROJ-8] Elternbereich → 🔵 Planned → [Spec](/features/PROJ-8-elternbereich.md)
- [PROJ-9] Lernpfad-Navigation → 🔵 Planned → [Spec](/features/PROJ-9-lernpfad-navigation.md)

### Content
- [PROJ-10] Content: Klasse 1 Module (M1.1-M1.10) → 🔵 Planned → [Spec](/features/PROJ-10-content-klasse1.md)
- [PROJ-11] Content: Klasse 2 Module (M2.1-M2.8) → 🔵 Planned → [Spec](/features/PROJ-11-content-klasse2.md)
- [PROJ-12] Content: Klasse 3 Module (M3.1-M3.9) → ⚪ Backlog
- [PROJ-13] Content: Klasse 4 Module (M4.1-M4.8) → ⚪ Backlog

### Empfohlene Build-Reihenfolge
1. PROJ-2 (Onboarding) → 2. PROJ-4 (Aufgaben-Engine) → 3. PROJ-9 (Navigation) → 4. PROJ-10 (Content K1)
5. PROJ-5 (Hilfe) → 6. PROJ-6 (Belohnungen) → 7. PROJ-7 (Pausen) → 8. PROJ-3 (Einstufung)
9. PROJ-8 (Eltern) → 10. PROJ-11 (Content K2)

---

## Status-Legende
- ⚪ Backlog (noch nicht gestartet)
- 🔵 Planned (Requirements geschrieben)
- 🟡 In Review (User reviewt)
- 🟢 In Development (Wird gebaut)
- ✅ Done (Live + getestet)

---

## Development Workflow

1. **Requirements Engineer** erstellt Feature Spec → User reviewt
2. **Solution Architect** designed Schema/Architecture → User approved
3. **PROJECT_CONTEXT.md** Roadmap updaten (Status: 🔵 Planned → 🟢 In Development)
4. **Frontend + Backend Devs** implementieren → User testet
5. **QA Engineer** führt Tests aus → Bugs werden gemeldet
6. **DevOps** deployed → Status: ✅ Done

---

## Environment Variables

For projects using Supabase:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

See `.env.local.example` for full list.

---

## Agent-Team Verantwortlichkeiten

- **Requirements Engineer** (`.claude/agents/requirements-engineer.md`)
  - Feature Specs in `/features` erstellen
  - User Stories + Acceptance Criteria + Edge Cases

- **Solution Architect** (`.claude/agents/solution-architect.md`)
  - Database Schema + Component Architecture designen
  - Tech-Entscheidungen treffen

- **Frontend Developer** (`.claude/agents/frontend-dev.md`)
  - UI Components bauen (React + Tailwind + shadcn/ui)
  - Responsive Design + Accessibility

- **Backend Developer** (`.claude/agents/backend-dev.md`)
  - Supabase Queries + Row Level Security Policies
  - API Routes + Server-Side Logic

- **QA Engineer** (`.claude/agents/qa-engineer.md`)
  - Features gegen Acceptance Criteria testen
  - Bugs dokumentieren + priorisieren

- **DevOps** (`.claude/agents/devops.md`)
  - Deployment zu Vercel
  - Environment Variables verwalten
  - Production-Ready Essentials (Error Tracking, Security Headers, Performance)

---

## Production-Ready Features

This template includes production-readiness guides integrated into the agents:

- **Error Tracking:** Sentry setup instructions (DevOps Agent)
- **Security Headers:** XSS/Clickjacking protection (DevOps Agent)
- **Performance:** Database indexing, query optimization (Backend Agent)
- **Input Validation:** Zod schemas for API safety (Backend Agent)
- **Caching:** Next.js caching strategies (Backend Agent)

All guides are practical and include code examples ready to copy-paste.

---

## Design Decisions

Document your architectural decisions here as your project evolves.

**Template:**
- **Why did we choose X over Y?**
  → Reason 1
  → Reason 2

---

## Folder Structure

```
ai-coding-starter-kit/
├── .claude/
│   └── agents/              ← 6 AI Agents (Requirements, Architect, Frontend, Backend, QA, DevOps)
├── features/                ← Feature Specs (Requirements Engineer creates these)
│   └── README.md            ← Documentation on how to write feature specs
├── src/
│   ├── app/                 ← Pages (Next.js App Router)
│   ├── components/          ← React Components
│   │   └── ui/              ← shadcn/ui components (add as needed)
│   └── lib/                 ← Utility functions
│       ├── supabase.ts      ← Supabase client (commented out by default)
│       └── utils.ts         ← Helper functions
├── public/                  ← Static files
├── PROJECT_CONTEXT.md       ← This file - update as project grows
└── package.json
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup Environment Variables (if using Supabase):**
   ```bash
   cp .env.local.example .env.local
   # Add your Supabase credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start using the AI Agent workflow:**
   - Tell Claude to read `.claude/agents/requirements-engineer.md` and define your first feature
   - Follow the workflow: Requirements → Architecture → Development → QA → Deployment

---

## Next Steps

1. **Define your first feature idea**
   - Think about what you want to build

2. **Start with Requirements Engineer**
   - Tell Claude: "Read .claude/agents/requirements-engineer.md and create a feature spec for [your idea]"
   - The agent will ask clarifying questions and create a detailed spec

3. **Follow the AI Agent workflow**
   - Requirements → Architecture → Development → QA → Deployment
   - Each agent knows when to hand off to the next agent

4. **Track progress via Git**
   - Feature specs in `/features/PROJ-X.md` show status (Planned → In Progress → Deployed)
   - Git commits track all implementation details
   - Use `git log --grep="PROJ-X"` to see feature history

---

**Built with AI Agent Team System + Claude Code**
