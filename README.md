# 🛡️ Veera Bhadhra Rao — Cybersecurity Engineering Portfolio

A production-grade cybersecurity portfolio showcasing specialized software engineering, security automation, and threat research. This repository demonstrates real, functional cybersecurity projects and developer tooling rather than mock designs or static templates.

*   **Security Automation**: Python scripts, log scrapers, and reporting compilers.
*   **AI-assisted SOC Workflows**: sequential LLM multi-agent alert triage systems.
*   **Android Security Research**: static APK Smali decompilation and regex token checks.
*   **Desktop Engineering**: zero-dependency PyQt6 task managers, system trays, and Win32 hooks.
*   **Open Source Python Tooling**: modules and packages published on PyPI.

---

## 🌐 Live Portfolio

Access the deployed portfolio and professional profiles directly:
*   **Live Portfolio**: [https://kvr585.github.io](https://kvr585.github.io)
*   **GitHub Repository**: [https://github.com/kvr585/PORTFOLIO](https://github.com/kvr585/PORTFOLIO)
*   **Professional Resume**: [https://kvr585.github.io/resume.pdf](https://kvr585.github.io/resume.pdf)
*   **LinkedIn Profile**: [https://linkedin.com/in/VeeraBhadhra](https://linkedin.com/in/VeeraBhadhra)

---

## 📷 Portfolio Previews

The screenshots showing the interactive visual layout will be placed below once generated.

### 1. Hero Showcase
*   *Interactive visual telemetry grid, active ticker controls, and operator stats:*
*   `[ Hero Section Screenshot Pending ]`

### 2. Deployments Workspace
*   *Detailed grid layout showcasing module tabs, capabilities, and dynamic console streams:*
*   `[ Deployments Section Screenshot Pending ]`

### 3. Secure Evidence Preview Vault
*   *Popup iframe previewer rendering verified PDF certificates and crime helper logs in-page:*
*   `[ Secure Certificate Preview Vault Screenshot Pending ]`

### 4. Connection Tunnel
*   *Tactile contact forms, copy-to-clipboard email scripts, and diagnostic system stats:*
*   `[ Connection Tunnel Screenshot Pending ]`

---

## ✨ Core Feature Set

*   **✓ SOC-Inspired interface**: A responsive visual design using glassmorphism borders, status meters, and gridlines.
*   **✓ Recruiter Mode Toggle**: Highlights credential mappings, student summaries, and outcomes tailored for hiring teams.
*   **✓ Secure Certificate Popups**: Instantly previews public PDF/image certificates in-page. Closeable with `Escape` or by clicking anywhere outside.
*   **✓ Interactive Command Palette**: Global search utilities triggered instantly via `⌘K` or `Ctrl+K`.
*   **✓ Modular Architecture Maps**: Interactive pipeline nodes showing the execution path of core utilities.
*   **✓ Dynamic Timeline Logging**: Scroll-driven incident logs drawing vertical milestones with pulsing halo indicators.
*   **✓ Smooth Momentum Scrolling**: Lenis-based smooth scrolling physics optimized for mouse wheels, touchpads, and keyboard arrows.
*   **✓ Responsive Layout**: Mobile-first grid layouts supporting small viewports and large desktops.
*   **✓ SEO Optimized**: Built-in meta tag descriptions, sitemap compilation, and title headers.
*   **✓ Accessibility Focused**: Passes WCAG contrast ratios, uses keyboard escape binds, and supports semantic navigation.

---

## 📦 Featured Projects

### 1. Cyber-Recon-Toolkit
*   **Status**: 📦 Published on PyPI
*   **Direct Command**:
    ```bash
    pip install cyber-recon-toolkit
    ```
*   **Links**: [GitHub Repository](https://github.com/kvr585/Cyber-Recon-Toolkit) | [PyPI Package Page](https://pypi.org/project/cyber-recon-toolkit/)
*   **Overview**: A modular Python-based reconnaissance framework combining DNS records validation, TCP port banner grabbing, WHOIS registry scraping, ICMP subnet sweeps, and log analysis queries. Automatically compiles watermarked PDF evidence reports with cryptographic file integrity signatures.

### 2. Android Credential Leakage Detector
*   **Links**: [GitHub Repository](https://github.com/kvr585/android_credential_leakage_detector)
*   **Overview**: A static and dynamic analysis utility designed to find exposed API tokens and credentials inside APK packages. Automates resource decompilation using Apktool, string regex matches, and local storage audits to compile unified vulnerability risk sheets.

### 3. AI SOC Copilot
*   **Status**: 🤖 Functional Minimum Viable Product (MVP)
*   **Links**: [GitHub Repository](https://github.com/kvr585/ai-soc-copilot)
*   **Overview**: An incident triage agent running on FastAPI and React. Coordinates a sequential pipeline of 7 Gemini-powered roles (Alert classifying, Geo-IP, Timeline compiling, MITRE mapping, IOC indexing, Containment playbooks) to generate markdown reports from raw syslog streams.

### 4. PingBro
*   **Links**: [GitHub Repository](https://github.com/kvr585/PingBro)
*   **Overview**: A PyQt6 desktop dashboard and task management assistant. Utilizes Win32 API handles and ctypes to monitor active applications, suppressing notifications during full-screen software, and features a global hotkey panic hook (`Ctrl+Shift+X`) to instantly terminate all background threads.

### 5. EcoSnap
*   **Status**: 🌍 Team Project (Vadodara Hackathon 6.0 Finalist)
*   **Links**: [GitHub Repository](https://github.com/kvr585/ecosnap-waste-management)
*   **Overview**: A citizen reporting dashboard connecting communities with municipal waste management. Features login mockups, client validation, and simulated administration logs. Selected among the Top 45 teams in the final round of Vadodara Hackathon 6.0.

---

## 🛠️ Tech Stack Categorization

*   **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Radix UI.
*   **Languages**: Python, TypeScript, Smali Bytecode, SQL, HTML/CSS.
*   **Animation**: Framer Motion, Lenis scroller.
*   **Deployment**: GitHub, Vercel Production CDN.
*   **Developer Tools**: PyInstaller, Win32 API / user32.dll, Apktool, ReportLab.

---

## 📂 Project Structure

```bash
├── public/                 # Static assets, PDFs, and verification credentials
│   ├── projects/           # Screenshots and visual proof folders
│   └── resume.pdf          # Professional developer resume PDF
├── src/
│   ├── app/                # Next.js App Router root layout and metadata configuration
│   ├── components/
│   │   ├── layout/         # Lenis smooth-scroll provider and grid frameworks
│   │   ├── motion/         # Framer Motion staggering and magnetic wrappers
│   │   ├── sections/       # Hero, Projects (Deployments), timeline logs, and contacts
│   │   ├── shared/         # Telemetry trackers, command palette, and button components
│   │   └── ui/             # Reusable UI styling components
│   ├── lib/
│   │   ├── constants/      # Core data models (projects.ts, achievements.ts, site.ts)
│   │   └── utils/          # Tailwind cn merge scripts and motion easing curves
```

---

## 🚀 Installation & Local Run

Follow these commands to clone and run the portfolio on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/kvr585/PORTFOLIO.git
cd PORTFOLIO
```

### 2. Install package dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 4. Build and start production bundle
```bash
npm run build
npm run start
```

---

## ⚙️ Configuration & Customization

The portfolio is driven entirely by constants, enabling rapid edits without code churn:
*   `src/lib/constants/site.ts`: Houses personal site metadata, contact emails, and social URLs.
*   `src/lib/constants/projects.ts`: Manages project listings, PyPI commands, logs, and sidebar features.
*   `src/lib/constants/achievements.ts`: Houses credentials, volunteer events, and links to public PDF certificates.
*   `public/resume.pdf`: Replace this file with your personal resume.

---

## ⚡ Vercel Deployment

Deployment to Vercel is fully automated:
1.  Push your local git changes to your GitHub repository.
2.  Log in to the [Vercel Dashboard](https://vercel.com/) and click **Import Project**.
3.  Select your `PORTFOLIO` repository.
4.  Vercel automatically detects Next.js build parameters. Click **Deploy**.
5.  Set up custom domains inside the Vercel Domain Settings panel.

---

## 🏆 Portfolio Highlights

*   📦 **Cyber-Recon-Toolkit** published on PyPI.
*   🤖 **AI SOC Copilot** multi-agent security framework MVP.
*   📱 **Android Static & Dynamic** credential leakage research.
*   💻 **Desktop Win32 & Qt** engineering tools.
*   🌍 **Top-45 Finalist Team** at Vadodara Hackathon 6.0.
*   ⚡ **Interactive dashboard** with smooth-scroll and cmdk palette.

---

## 📄 License

This repository is distributed under the terms of the MIT License. See [LICENSE](LICENSE) for more details.

---

## ✉️ Contact

*   **Website**: [https://kvr585.github.io](https://kvr585.github.io)
*   **GitHub**: [https://github.com/kvr585](https://github.com/kvr585)
*   **LinkedIn**: [https://linkedin.com/in/VeeraBhadhra](https://linkedin.com/in/VeeraBhadhra)
*   **Email**: [2303031260126@paruluniversity.ac.in](mailto:2303031260126@paruluniversity.ac.in)
