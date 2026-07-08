# 🛡️ Veera Bhadhra Rao — Cybersecurity Engineering Portfolio

A premium, interactive cybersecurity portfolio built with a **Cyber-Defense Operations Center (SOC) Console** aesthetic. Designed for maximum visual impact, professional storytelling, and showcasing automated threat analysis and mobile security tools.

Live Demo: [https://veera-portfolio.vercel.app](https://veera-portfolio.vercel.app) *(or your Vercel deployment link)*

---

## 🎨 Aesthetic & Interaction System

This portfolio is treated as an integrated security dashboard. It avoids standard templates in favor of a bespoke, immersive dark theme:
*   **SOC Command Console**: A custom layout mimicking cybersecurity interfaces with diagnostic metadata grids, live telemetry logs, and status monitors.
*   **Secure Evidence Preview Vault**: Built-in popup overlays to preview certifications, volunteer credentials, and hackathon achievements directly in-page without redirects.
*   **Command Palette (⌘K / Ctrl+K)**: Instant search and site navigation using a fully-styled command palette component.
*   **Progressive Reveals**: Fluid entrance animations, counting statistics, and staggered text displays.
*   **Precise Smooth Scroll**: Built with Lenis to deliver unified mouse, keyboard, and touch panning momentum.
*   **3D Hero Globe**: Integrates an interactive canvas showing geographic connection nodes and threat analysis traces.

---

## 🛠️ Technology Stack

*   **Core**: [Next.js 15](https://nextjs.org/) (App Router, SEO optimization, and metadata routing).
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for bulletproof type-safety.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) design system tokens and glassmorphism themes.
*   **Motion**: [Framer Motion](https://www.framer.com/motion/) for timeline growth, staggered entry reveals, and modal spring physics.
*   **Scroller**: [Lenis](https://lenis.darkroom.engineering/) for inertia-driven scroll physics.
*   **Icons**: [Lucide React](https://lucide.dev/) for diagnostic vector indicators.

---

## 📂 Project Architecture

```bash
├── public/                 # Static assets, PDFs, images, and credentials
├── src/
│   ├── app/                # Next.js App Router (pages and layouts)
│   ├── components/
│   │   ├── layout/         # Lenis scrollers, section wrappers, grid lines
│   │   ├── motion/         # Framer motion staggered reveals, magnetic animations
│   │   ├── sections/       # Hero, Projects (Deployments), Timeline, Contact
│   │   ├── shared/         # Command palette, telemetry scroll indicators, buttons
│   │   └── ui/             # Reusable UI component primitives
│   ├── lib/
│   │   ├── constants/      # Projects, achievements, site configurations
│   │   └── utils/          # Tailored tailwind class merging (cn) and motion easing
```

---

## 🚀 Getting Started

To run the portfolio locally:

### 1. Install dependencies
```bash
npm install
```

### 2. Run the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## ⚙️ Configuration & Customization

1.  **Personal Information**: Customize your contact info, social handles, and site metadata in `src/lib/constants/site.ts`.
2.  **Projects / Deployments**: Modify, add, or sync your project details and PyPI instructions in `src/lib/constants/projects.ts`.
3.  **Certificates & Achievements**: Update your credentials list in `src/lib/constants/achievements.ts` and place matching PDF/JPEG files inside the `/public` directory.
4.  **Resume**: Replace `/public/resume.pdf` with your updated professional resume.

---

## ⚡ Vercel Deployment

Deploying to Vercel is fully automated and zero-config:

1.  Push your codebase to a private/public GitHub repository.
2.  Connect your GitHub account to the [Vercel Dashboard](https://vercel.com/).
3.  Click **Import Project** and select your portfolio repository.
4.  Click **Deploy** — Vercel will automatically run Next.js build optimization and host your portfolio.
