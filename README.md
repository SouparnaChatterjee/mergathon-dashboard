# ⚡ CircuitVerse Mergathon Leaderboard & Dashboard

Welcome to the **CircuitVerse Mergathon Dashboard** repository! This is a high-premium, real-time analytics dashboard built to track contributor activity, merged pull requests, closed issues, reviews, and team standings during the CircuitVerse open-source mergathon hackathons.

Designed with modern glassmorphic aesthetics, glowing gradients, responsive charts, and an automated data-fetching pipeline, this dashboard is built to drive engagement, foster healthy competition, and provide event organizers with powerful administration tools.

---

## 🎨 Key Features

* **Overview KPI Cards**: At-a-glance stats including total activities, active contributors, and code activity distributions.
* **Interactive Recharts Visuals**: 
  * Wavy glowing activity sparklines showing real-time trends.
  * Interactive Recharts Donut charts showing distribution of PRs vs Issues vs Reviews.
  * Side-by-side historical trend lines and team score comparisons on the Analytics page.
* **Overlapping Avatar Stack**: Visually stunning, animated stacked developer profiles fetched dynamically.
* **Responsive Leaderboard Table**: Clean table layout with strict column widths, sorting, and user rank badges (Gold, Silver, Bronze).
* **Smart Team Builder & Auto-Balancer**: 
  * Located at `/admin`.
  * Features a **Snake-Draft Auto-Balancer** algorithm that automatically groups registered contributors by score to balance out average points.
  * Outputs live, formatted YAML configurations for quick deployment.
* **Cron-Driven GitHub Aggregator**: Completely automated GitHub Action workflow that pulls live PRs, Issues, and Reviews on a schedule, updating scores without needing a full website rebuild.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16 (App Router + Turbopack)
* **Language**: TypeScript
* **Styling**: Premium Vanilla CSS + Glassmorphism
* **Icons**: Lucide React
* **Charts**: Recharts
* **Task Runner**: Node `tsx` for high-performance script execution

---

## 🚀 Getting Started

Follow these instructions to clone the repository and spin up the development environment locally.

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* **Node.js**: `v20.x` or higher
* **npm**: `v10.x` or higher (or `yarn` / `pnpm`)

### 2. Clone the Repository
```bash
git clone https://github.com/CircuitVerse/mergathon-dashboard.git
cd mergathon-dashboard
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Local Development Configurations
This project is configured with a robust fallback mechanism: **it does not require a GitHub Token to build or run locally!**
If you wish to test live GitHub API aggregation, create a `.env.local` file in the root folder:
```env
GITHUB_TOKEN=your_personal_access_token_here
```
*(If no token is supplied, the database generator will gracefully fall back to generating highly realistic open-source mock contributions.)*

### 5. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to view the dashboard live.

---

## ⚙️ Data Pipeline & Team Registration

The data display is managed by a single static file located at `/public/data/mergathon-data.json`. This is generated automatically by running the local ETL script.

### Registering Teams & Members
To add teams or register participants, open [config.yaml](file:///c:/Projects/mergathon-circuitverse/config.yaml) in the root of the project:
```yaml
event:
  name: "CircuitVerse Mergathon 2025"
  startDate: "2025-05-22"
  endDate: "2025-05-25"

teams:
  - name: "Team Alpha"
    color: "#3b82f6"
    members:
      - "dev-sarah"
      - "coder-alex"
```

### Manually Regenerating the Leaderboard
To sync your local data file with the updated `config.yaml` or fetch the latest GitHub activity:
```bash
npm run generate:leaderboard
```

---

## 🤝 How to Contribute

### 1. Find or Create an Issue
* Browse our repository **Issues** tab to find tasks labeled `good-first-issue`, `bug`, or `feature-request`.
* Leave a comment on the issue requesting to be assigned before you start writing code.

### 2. Standard Branching Convention
Create a descriptive feature branch from `main`:
```bash
git checkout -b feature/your-awesome-feature
# OR
git checkout -b bugfix/fix-some-ui-alignment
```

### 3. Maintain Code Quality & Formatting
* Keep styling rules inside `src/app/globals.css`. Ensure you use CSS variables inside `:root` to preserve the premium dark palette.
* Do not introduce ad-hoc utility styling unless necessary; rely on the built-in design system tokens (`--border-primary`, `--bg-card`, etc.).
* Run the Next.js linter before staging your commits:
  ```bash
  npm run lint
  ```

### 4. Create a Pull Request
* Commit your modifications with clear, descriptive commit messages.
* Push your branch to GitHub and open a **Pull Request (PR)** against the `main` branch.
* In your PR description, explain:
  1. What changes were introduced.
  2. How you tested the changes (e.g. build verifies successfully, layout tests on mobile viewports).
  3. Include a screenshot or screen recording if you made visual UI changes.

---

## 📦 Production Builds & Deployment

To compile the application into fully optimized production assets:
```bash
npm run build
```
This project is configured with `output: 'export'`, meaning it generates a fully static pre-rendered site inside the `out/` folder. This folder can be dragged and dropped into Netlify, hosted on Vercel, or served via GitHub Pages for zero-cost, high-performance static hosting.
