# 📊 GDPVal RealWorks Dashboard

> Interactive experiment analytics for the GDPVal benchmark.
> **[→ Live Dashboard](https://hyeonsangjeon.github.io/gdpval-realworks/)**

---

## What This Is

A React dashboard that visualizes LLM experiment results on **220 real-world expert tasks** across 11 sectors and 55 occupations. Compare prompt strategies, track sector-level performance, and drill into individual task outcomes — all without a backend server.

- **Static JSON** generated at build time → zero API calls at runtime
- **GitHub Pages** auto-deployed on every push to `main`
- **HuggingFace** lazy-loads per-task data on the Experiment Detail page

---

## Data Flow

```mermaid
flowchart TD
    subgraph Sources
        R["batch-runner/results — report_data.json"]
        E["batch-runner/experiments — YAML configs"]
        P["batch-runner/prompts — prompt templates"]
        G["data/grades — external grading"]
    end

    subgraph Build["npm run aggregate · build-time"]
        S1["aggregate-reports.mjs"]
        S2["aggregate-grades.mjs"]
        S3["aggregate-experiments.mjs"]
    end

    subgraph Generated["public/generated/"]
        J1["reports-index.json"]
        J2["grades-index.json"]
        J3["prompt-architecture.json"]
    end

    subgraph Hooks["React Hooks"]
        H1["useReports"]
        H2["useGrades"]
        H3["useExperimentPrompt"]
    end

    subgraph UI["Dashboard Pages"]
        D["Dashboard.tsx — tabs"]
        X["ExperimentDetail.tsx — drill-down"]
    end

    R & E --> S1 --> J1
    G --> S2 --> J2
    E & P --> S3 --> J3
    J1 --> H1 --> D & X
    J2 --> H2 --> D
    J3 --> H3 --> X
```

> Task-level data (220 rows per experiment) is **not** bundled — it is fetched from HuggingFace on demand when you open an experiment detail page.

---

## Features

### Leaderboard + Sector Heatmap

<p align="center">
  <img src="../docs/images/dashboard-leaderboard.png" alt="Leaderboard — KPI cards, experiment rankings table, sector heatmap" width="640" />
</p>

### Experiment Detail

<p align="center">
  <img src="../docs/images/dashboard-experiment-top.png" alt="Experiment Detail — KPI cards, execution summary" width="640" />
</p>

<p align="center">
  <img src="../docs/images/dashboard-experiment-sectors.png" alt="Sector Breakdown table and Quality Analysis" width="640" />
</p>

### Prompt Architecture Viewer

<p align="center">
  <img src="../docs/images/dashboard-prompt-architecture.png" alt="Prompt Architecture — system message, user prompt assembly, QA, config" width="640" />
</p>

| Feature | Tab / Page | What you see |
|---------|-----------|-------------|
| **KPI Cards** | main | Best Success Rate, Experiment count, Tasks count, Best QA Score |
| **Leaderboard** | Leaderboard | Ranked experiments — strategy, model, progress, success rate, Δ best, QA |
| **Sector Heatmap** | Leaderboard | 9 sectors × N experiments, color-coded success rate matrix |
| **Trend Charts** | Trends | Success Rate / QA Score / Latency trends across experiments |
| **Execution Errors** | Execution Errors | Error distribution, CONFIDENCE NameError banner, recovery funnel |
| **Grading Analysis** | Grading Analysis | External evaluation scores (OpenAI Evals integration) |
| **Experiment Detail** | /experiment/:id | 220-task table, sector/status filters, QA distribution, resume rounds |
| **Prompt Architecture** | /experiment/:id | System → User Prompt → QA → Config accordion viewer |
| **Dark / Light Theme** | global | Toggle in header |

---

## Tech Stack

```
React 18 · TypeScript · Vite · Tailwind CSS · Recharts · Framer Motion
```

- **Build-time** aggregate scripts turn YAML + JSON into static data
- **Runtime** is pure client-side React — no Node server, no database
- **Deployment** via GitHub Actions → GitHub Pages

---

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.tsx              # Main dashboard (tab routing)
│   ├── ExperimentDetail.tsx       # Per-experiment deep-dive
│   └── GradeDetail.tsx            # External grading detail
├── components/
│   ├── dashboard/
│   │   ├── LeaderboardView.tsx    # Leaderboard + sector heatmap
│   │   ├── TrendView.tsx          # Trend charts
│   │   ├── ErrorAnalysisView.tsx  # Error analysis
│   │   ├── GradingAnalysisView.tsx# Grading results
│   │   └── PromptArchitectureView.tsx # Prompt structure viewer
│   ├── ExperimentCard.tsx         # Experiment summary card
│   ├── ScopeBadge.tsx             # Self-assessed / graded badge
│   ├── Header.tsx                 # Global header
│   └── ui/                        # shadcn/ui primitives
├── hooks/
│   ├── useReports.ts              # Fetch reports-index.json
│   ├── useGrades.ts               # Fetch grades-index.json
│   ├── useExperimentPrompt.ts     # Fetch prompt-architecture.json
│   ├── useExperiments.ts          # Fetch experiments-index.json
│   └── useIsMobile.ts             # Responsive breakpoint
├── types/
│   └── report.ts                  # TypeScript interfaces
├── contexts/
│   └── ThemeContext.tsx            # Dark / Light theme state
├── data/
│   └── tooltipTexts.ts            # UI tooltip strings
└── utils/
```

---

## Local Development

```bash
# Install dependencies
npm install

# Generate build-time data (required before first run)
npm run aggregate

# Dev server with hot reload
npm run dev
# → http://localhost:5173/gdpval-realworks/

# Production build
npm run build
npm run preview
```

> `npm run dev` automatically runs all aggregate scripts via the `predev` hook.

---

## How New Experiments Appear

The entire flow from experiment to dashboard is automated:

```
1. GitHub Actions runs batch experiment (triggered manually from Actions tab)
2. Pipeline completes → results uploaded to HuggingFace → PR auto-created
3. You review and merge the PR
4. deploy.yml auto-triggers on main push → aggregate scripts regenerate JSON → GitHub Pages redeploys
5. Dashboard shows new experiment on next page load
```

> No manual deploy button needed. Merging the PR is the only human step after triggering the experiment.

---

## Design System

For contributors working on dashboard UI:

| Element | Value |
|---------|-------|
| Page background | `bg-[#0a0a1a]` (dark) · `bg-gray-50` (light) |
| Card border | `rgba(255,255,255,0.06)` |
| Numbers / metrics | `font-mono` |
| Success rate colors | ≥96% `emerald` · ≥90% `amber` · <90% `red` |
| Charts | Recharts with dark tooltip `bg: #1a1a2e` |
| Animations | Framer Motion — fade-in + slide-up |
| Theme toggle | `ThemeContext.tsx` · class-based dark mode |
