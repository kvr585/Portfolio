export interface ProjectModule {
  id: string;
  label: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  name: string;
  tagline: string;
  role: string;
  outcome: string;
  accent: string;
  accentClass: string;
  github: string;
  technologies: string[];
  threatContext: string;
  problem: string;
  deployment: string;
  modules: ProjectModule[];
  features: string[];
  lessonsLearned: string;
  evidenceConsole: string;
  screenshotPath: string | null;
  flagship?: boolean;
  categoryBadge: string;
  pypiBadge?: string;
  installCmd?: string;
  isMvp?: boolean;
  mvpStatus?: string;
  futureRoadmap?: string;
}

export const projects: Project[] = [
  {
    id: "cyber-recon",
    slug: "recon",
    number: "01",
    name: "Cyber-Recon-Toolkit",
    tagline: "A modular, terminal-based network intelligence and reconnaissance platform published on PyPI.",
    role: "Solo Developer · 2025",
    outcome: "Developed a secure CLI-based assessment platform published on PyPI combining DNS enumeration, port scanning, WHOIS lookups, and log forensics into verified reports.",
    accent: "#F59E0B",
    accentClass: "border-l-amber-500",
    github: "https://github.com/kvr585/Cyber-Recon-Toolkit",
    technologies: ["Python", "Rich CLI", "python-whois", "dnspython", "reportlab", "tldextract"],
    threatContext:
      "Traditional network reconnaissance tools generate uncollated outputs, forcing security analysts to manually assemble evidence. This leads to reporting delays, data fragmentation, and unauthenticated forensic audit trails.",
    problem:
      "Integrating multiple disconnected command-line scanning tools into a single workflow, handling multithreaded network requests safely, and generating clean, watermarked PDF reports directly from Python.",
    deployment:
      "An integrated Python CLI framework distributed as a PyPI package installable via pip. Executes asynchronous port scanning, DNS resolution, banner grabbing, threat checks, and log analyzer queries. Outputs automated reports in PDF, JSON, and CSV formats.",
    modules: [
      { id: "whois", label: "WHOIS LOOKUP", description: "Collects registrar intelligence, domain status, nameservers, creation and expiration dates." },
      { id: "dns", label: "DNS ENUM", description: "Performs record lookup (A, AAAA, MX, NS, TXT) and CNAME discovery using dnspython." },
      { id: "ping", label: "PING SWEEP", description: "Multithreaded ICMP ping sweeps over /24 subnets for rapid live host discovery and latency checking." },
      { id: "port", label: "PORT SCANNER", description: "Asynchronous TCP port scanner mapping active services and capturing connection banner fingerprints." },
      { id: "log", label: "LOG ANALYZER", description: "Parses application logs, detecting suspicious activities, access patterns, and security events." },
      { id: "hash", label: "HASH GEN", description: "Calculates cryptographic file hashes (MD5, SHA-1, SHA-256, SHA-512) for secure integrity verification." },
      { id: "phish", label: "PHISHING CHK", description: "Analyzes URL syntax, checks HTTPS support, and scans for suspicious subdomains or keywords." },
      { id: "assess", label: "ASSESSMENT", description: "Orchestrates automated scans across target domains and aggregates findings." },
      { id: "report", label: "REPORTS", description: "Generates formatted JSON, CSV, and timestamped watermarked PDF forensic evidence reports." }
    ],
    features: [
      "Modular CLI design utilizing the Rich terminal interface.",
      "Asynchronous multithreaded host scans and port banner extraction.",
      "Watermarked PDF report generation with cryptographic hashes.",
      "Forensic log analysis and signature-based phishing URL verification."
    ],
    lessonsLearned:
      "Learned to manage socket timeouts and thread pools in Python to prevent network resource starvation. Gained experience using ReportLab for layout calculation and programmatic PDF compilation.",
    evidenceConsole:
      "toolkit > 4\n[+] Port Scanner initialized.\n[*] Scanning target: 127.0.0.1\n[*] Scanning ports 1 to 1024...\n[+] Port 22/tcp [OPEN] (ssh) - Banner: SSH-2.0-OpenSSH_8.9p1 Ubuntu-3\n[+] Port 80/tcp [OPEN] (http) - Banner: nginx/1.18.0\n[+] Port 443/tcp [OPEN] (https) - Banner: nginx/1.18.0\n[+] Scan complete. Writing reports/port_scan_report.json...",
    screenshotPath: "/projects/recon/port_scanner.png",
    flagship: true,
    categoryBadge: "Security Automation",
    pypiBadge: "📦 Published on PyPI",
    installCmd: "pip install cyber-recon-toolkit"
  },
  {
    id: "android-creds",
    slug: "android",
    number: "02",
    name: "Android Credential Leakage Detector",
    tagline: "Static and dynamic analysis scanner to identify exposed credentials and storage risks in APK files.",
    role: "Solo Developer · 2026",
    outcome: "Engineered a modular Python security tool decompiling APK files, extracting string configurations, and correlating runtime logs to generate comprehensive APK risk assessments.",
    accent: "#3B82F6",
    accentClass: "border-l-blue-500",
    github: "https://github.com/kvr585/android_credential_leakage_detector",
    technologies: ["Python", "Apktool", "Static Analysis", "ReportLab", "Tabulate", "Regex Heuristics"],
    threatContext:
      "Mobile applications frequently leak API keys, access tokens, and credentials in client-side smali bytecode or local SharedPreferences storage, creating immediate vectors for unauthorized backend API access.",
    problem:
      "Automating the extraction of static configuration variables and decompiled resources, parsing Android logs dynamically, and matching findings to calculate a unified risk score.",
    deployment:
      "A Python-based framework automating static APK decompilation, strings XML parsing, regex pattern matching, and dynamic runtime logcat/network packet evidence parsing. Features a correlation engine that flags escalated application risk based on combined static and runtime findings.",
    modules: [
      { id: "decompile", label: "APK DECOMPILE", description: "Invokes Apktool CLI in a subprocess to decompile target APKs into readable assets and Smali bytecode." },
      { id: "string", label: "STRINGS EXTRACT", description: "Extracts plaintext configurations from strings.xml and scans through compiled Smali directories." },
      { id: "vuln", label: "CRED SCANNER", description: "Runs regex checks for hardcoded credentials, JWTs, private keys, and API tokens." },
      { id: "logcat", label: "LOGCAT PARSE", description: "Audits logcat trace exports to detect runtime leakage of credentials, tokens, or sensitive values." },
      { id: "network", label: "HTTP PCAP", description: "Inspects network captures for plain HTTP requests, vulnerable endpoints, or authorization token exposures." },
      { id: "correlate", label: "CORRELATION", description: "Correlates static findings with runtime leakage, adjusting the total risk score dynamically." },
      { id: "report", label: "PDF ASSESSMENT", description: "Generates terminal summary tables and exports final security report PDFs." }
    ],
    features: [
      "Decompilation of Android resources and Smali code via Apktool.",
      "Regex-driven scan for 30+ service credentials and sensitive keys.",
      "Dynamic logcat and HTTP text capture parsing for credentials in transit.",
      "Risk correlation rules that escalate application vulnerability severity."
    ],
    lessonsLearned:
      "Acquired deep familiarity with APK structures, Android manifest rules, and Smali syntax. Discovered limits of static heuristics and resolved them by implementing a dual-mode correlation pipeline.",
    evidenceConsole:
      "python main.py samples/vulnerable.apk runtime_data/\n================ APK SECURITY REPORT ================\n+--------------------------+----------+\n| Metric                   | Value    |\n+--------------------------+----------+\n| Overall Risk             | HIGH     |\n| Static Findings          | 2        |\n| Dynamic Log Findings     | 0        |\n| Dynamic Network Findings | 0        |\n+--------------------------+----------+\n\n================ FINDING SUMMARY ================\n+-----------------------+---------+\n| Category              |   Count |\n+-----------------------+---------+\n| Hardcoded Credentials |       2 |\n+-----------------------+---------+",
    screenshotPath: "/projects/android/analysis_output.png",
    categoryBadge: "Mobile Security Research"
  },
  {
    id: "ai-soc-copilot",
    slug: "copilot",
    number: "03",
    name: "AI SOC Copilot",
    tagline: "An intelligent SOC investigation assistant coordinating Gemini-powered agents for automated threat analysis.",
    role: "Solo Developer · 2026",
    outcome: "Engineered a multi-agent framework utilizing FastAPI and React to coordinate 7 specialized security analyst agents, reducing threat validation cycles.",
    accent: "#8B5CF6",
    accentClass: "border-l-violet-500",
    github: "https://github.com/kvr585/ai-soc-copilot",
    technologies: ["FastAPI", "React", "Google Gemini API", "SQLite", "SQLAlchemy", "Tailwind CSS", "Recharts"],
    threatContext:
      "Security operations centers suffer from extreme alert fatigue, often taking hours to correlate raw syslog telemetry with threat intelligence databases and MITRE Attack matrix tactics.",
    problem:
      "Designing a clean system to orchestrate sequential Gemini LLM agents without structured JSON output format breaks, and ensuring persistent threat tracking.",
    deployment:
      "A local FastAPI + SQLite container orchestrating 7 specialized AI roles (Alert classification, Geo-IP lookup, command script parsing, timeline correlation, MITRE mapper, IOC indexing, containment recommendations). Outputs automatic markdown summaries.",
    modules: [
      { id: "alert", label: "ALERT AGENT", description: "Classifies incoming alerts and computes initial severity risk scores." },
      { id: "threat", label: "THREAT AGENT", description: "Extracts connection endpoints and coordinates automatic Geo-IP lookups." },
      { id: "log", label: "LOG AGENT", description: "Scans command-line logs for failed authentication events and privilege shifts." },
      { id: "timeline", label: "CORRELATION", description: "Organizes multi-vector alert indicators into a chronological incident timeline." },
      { id: "mitre", label: "MITRE ATT&CK", description: "Correlates detected security events directly with standard tactics/techniques." },
      { id: "ioc", label: "IOC AGENT", description: "Indexes extracted user credentials, domains, cryptographic hashes, and IP addresses." },
      { id: "responder", label: "RESPONSE AGENT", description: "Compiles action playbooks for containment, eradication, and long-term security configuration." }
    ],
    features: [
      "Multi-agent collaborative triaging pipeline powered by Google Gemini.",
      "Interactive cyber-defense dashboard showcasing Recharts statistics.",
      "Automated Executive Incident Report generator compiling Markdown.",
      "SQLite session history tracking utilizing SQLAlchemy ORM models."
    ],
    lessonsLearned:
      "Discovered how to coordinate agent schemas to prevent structured data format breaks in JSON outputs, and handled Debian PEP 668 externally-managed-environment errors on Kali Linux.",
    evidenceConsole:
      "POST /investigate HTTP/1.1\nHost: localhost:8000\nContent-Type: application/json\n\n[Alert Agent] Classifying alert: Brute-Force SSH Attempt\n[Threat Agent] Resolving Geo-IP for 185.220.101.9 (Region: Germany)\n[Log Agent] Scanning logs. Found 14 failed logins for user 'admin'\n[Correlation Agent] Chronology compiled. Attack duration: 42s\n[MITRE Agent] Mapped to T1110 (Brute Force)\n[Response Agent] containment playbook generated. Output: reports/report_20260708.md",
    screenshotPath: null,
    categoryBadge: "AI-assisted SOC Operations",
    isMvp: true,
    mvpStatus: "Functional Minimum Viable Product (MVP)",
    futureRoadmap: "Persistent PostgreSQL DB transition, live webhook support for real-time SIEM alerts, and customizable correlation playbook rules."
  },
  {
    id: "pingbro",
    slug: "pingbro",
    number: "04",
    name: "PingBro",
    tagline: "Cross-platform desktop notification client and operator workspace wellness assistant.",
    role: "Solo Developer · 2026",
    outcome: "Developed a zero-dependency desktop notification utility in Python featuring global hotkeys, single-instance locks, and fullscreen detection.",
    accent: "#10B981",
    accentClass: "border-l-emerald-500",
    github: "https://github.com/kvr585/PingBro",
    technologies: ["Python", "PyQt6", "pystray", "Win32 API", "PyInstaller", "winsound", "Single-Instance Mutex"],
    threatContext:
      "Security operators face fatigue and cognitive overload during long monitoring shifts, while system alerts can cause visual disruptions. A lightweight, cross-platform notifier is needed to manage scheduled reminders and wellness pauses safely.",
    problem:
      "Preventing multiple app instances, capturing keyboard hotkeys system-wide in background threads without hanging the Qt loop, and dynamically detecting if a fullscreen application is currently in focus.",
    deployment:
      "A desktop notification assistant built in Python. Features Click-to-Edit schedules, a unified reminder manager, native Windows toast notifications, fullscreen-app suppression checks, and a global keyboard panic hook (CTRL + SHIFT + X) to instantly terminate the GUI and background threads.",
    modules: [
      { id: "lock", label: "SINGLETON LOCK", description: "Binds port 58585 and creates system-level mutexes (Windows Mutex / Linux fcntl) to restrict running processes to a single instance." },
      { id: "sched", label: "SCHEDULER", description: "Maintains alarms and periodic timers, checking rules on a background daemon thread." },
      { id: "tray", label: "SYSTEM TRAY", description: "Integrates with system bar using pystray, allowing minimizing, configurations, and state switches." },
      { id: "hotkey", label: "GLOBAL PANIC", description: "Listens for CTRL + SHIFT + X to immediately tear down the app, release locks, and terminate clean." },
      { id: "safety", label: "FULLSCREEN SAFE", description: "Interrogates Windows active handle state to suppress invasive alarm window overlays during presentations or full-screen gaming." },
      { id: "hud", label: "DASHBOARD", description: "A PyQt6 GUI showing active lists, click-to-edit settings, logs, and a hydration tracking panel." }
    ],
    features: [
      "Single-instance process locking using platform Mutex and socket binding.",
      "Global shortcut instant shutdown hook (Ctrl+Shift+X) for emergency compliance.",
      "In-focus fullscreen window detection using native user32.dll APIs.",
      "Click-to-edit alarms dashboard, system tray, and hydration analytics."
    ],
    lessonsLearned:
      "Understood how to link Qt UI events with multithreaded Python tasks. Learned to integrate Windows DLL libraries natively using ctypes and manage background system tray behaviors.",
    evidenceConsole:
      "[Lock] Mutex acquired. Port 58585 bound. First instance active.\n[Scheduler] Thread started. Loaded 5 alarms.\n[Tray] Initializing system tray loop...\n[Hotkey] Global hotkey registered: Ctrl+Shift+X\n[Safety] Active window handle: 65538 (Fullscreen check: True - alarm suppressed)",
    screenshotPath: "/projects/pingbro/Dashboard.png",
    categoryBadge: "Desktop Engineering"
  },
  {
    id: "ecosnap",
    slug: "ecosnap",
    number: "05",
    name: "EcoSnap",
    tagline: "Waste tracking and management system designed for municipal reporting workflows.",
    role: "Team Lead · 2025",
    outcome: "Developed a waste tracking web portal and mobile app connecting citizens with municipal authorities, selected in the Top 45 of Vadodara Hackathon 6.0.",
    accent: "#6366F1",
    accentClass: "border-l-indigo-500",
    github: "https://github.com/kvr585/ecosnap-waste-management",
    technologies: ["React", "React Router", "Tailwind CSS", "Client Forms", "Prototype Validation"],
    threatContext:
      "Municipal waste workflows suffer from lack of digitized verification, leaving citizen reports unlogged and unresolved. An accessible client portal is required to prototype user registration, dashboard reports, and administrative management.",
    problem:
      "Designing a clean administrative interface, validating citizen reports on the client, and structuring local data stores to model real-world reporting cycles.",
    deployment:
      "A React-based citizen reporting dashboard. Features interactive forms, user login screens, routing logic, and simulated administration logs. Since this is an academic prototype, real-time database endpoints and geolocation maps are marked as pending assets.",
    modules: [
      { id: "auth", label: "PROTOTYPE AUTH", description: "Simulates logins for Citizens, Managers, and Admins to show role-based layouts." },
      { id: "form", label: "REPORT FORMS", description: "Handles input validation, category selection, and descriptions for waste reports." },
      { id: "admin", label: "MANAGEMENT HUD", description: "Simulates audit logs, task state updates, and lists reports sorted by submission date." },
      { id: "pending_gps", label: "GPS INTEGRATION", description: "[GPS integration pending - Asset unavailable in local repository]" },
      { id: "pending_db", label: "DATABASE FEED", description: "[Database connection pending - Prototype uses local JSON mock arrays]" }
    ],
    features: [
      "Role-Based User Interface Mockups.",
      "Form validation & client-side inputs.",
      "Audit Log Timeline View (Pending live backend connection)."
    ],
    lessonsLearned:
      "Created wireframes and coordinated workflows in a team of 4. Selected among the Top 45 finalist teams out of hundreds of entries in Vadodara Hackathon 6.0.",
    evidenceConsole:
      "// EcoSnap Client Instance\n[Auth] Session started: Role = Citizen (Mocked)\n[Form] Submitted Report: Waste Category = Electronic, Location = Vadodara\n[Database] [Live Database Offline - Data saved in Local Session Cache]\n[System] Status: Active Prototype",
    screenshotPath: null,
    categoryBadge: "Hackathon Project"
  },
];

export const globeModules = projects[0].modules.map((m) => m.label);
