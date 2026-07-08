export type LogSeverity = "init" | "build" | "compete" | "research" | "deploy" | "status";

export interface TimelineEntry {
  id: string;
  timestamp: string;
  code: string;
  title: string;
  description: string;
  severity: LogSeverity;
}

export const timeline: TimelineEntry[] = [
  {
    id: "start",
    timestamp: "2023-09",
    code: "INIT",
    title: "Started Bachelor of Engineering",
    description: "Began formal studies in Cyber Security at Parul University, Vadodara.",
    severity: "init",
  },
  {
    id: "recon",
    timestamp: "2025-02",
    code: "BUILD",
    title: "Released Cyber-Recon-Toolkit",
    description: "Built and published a modular Python-based reconnaissance toolkit for passive and active network intelligence gathering.",
    severity: "build",
  },
  {
    id: "pypi",
    timestamp: "2025-04",
    code: "DEPLOY",
    title: "Published on PyPI",
    description: "Published the reconnaissance toolkit as an installable Python package, making it available for direct installation via pip.",
    severity: "deploy",
  },
  {
    id: "hackathon",
    timestamp: "2025-09",
    code: "COMPETE",
    title: "Vadodara Hackathon 6.0",
    description: "Participated in Vadodara Hackathon 6.0 at Parul University, coding solutions with teammate peers.",
    severity: "compete",
  },
  {
    id: "pingbro",
    timestamp: "2026-03",
    code: "BUILD",
    title: "Released PingBro Notifier",
    description: "Engineered a PyQt6-based desktop wellness utility featuring Windows system mutexes and global keyboard panic listeners.",
    severity: "build",
  },
  {
    id: "android-detector",
    timestamp: "2026-06",
    code: "RESEARCH",
    title: "Android Secret Leakage Research",
    description: "Built the static and dynamic Android Credential Leakage Detector as a major final-year research project.",
    severity: "research",
  },
  {
    id: "volunteer",
    timestamp: "2026-06",
    code: "DEPLOY",
    title: "Registered Cyber Volunteer",
    description: "Enrolled in the national Cyber Crime Volunteers program under the NTR Commissionerate.",
    severity: "deploy",
  },
  {
    id: "seeking",
    timestamp: "2026-07",
    code: "STATUS",
    title: "Seeking Internship Opportunities",
    description: "Ready for SOC operations or penetration testing roles.",
    severity: "status",
  },
];

export const severityColors: Record<LogSeverity, string> = {
  init: "border-zinc-500",
  build: "border-amber-500",
  compete: "border-indigo-500",
  research: "border-blue-500",
  deploy: "border-emerald-500",
  status: "border-amber-500",
};
