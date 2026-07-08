export type SkillTier = 1 | 2 | 3;

export interface Skill {
  id: string;
  name: string;
  tier: SkillTier;
  context: string[];
  projects?: string[];
}

export const skills: Skill[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    tier: 1,
    context: ["Offensive recon", "Vulnerability assessment", "Security tooling", "Traffic analysis"],
    projects: ["Cyber-Recon-Toolkit", "Android Credential Leakage Detector"],
  },
  {
    id: "python",
    name: "Python",
    tier: 1,
    context: ["CLI tools", "PyQt6 Desktop Applications", "Automation & Scripting", "Decompilation subprocesses"],
    projects: ["Cyber-Recon-Toolkit", "PingBro", "Android Credential Leakage Detector"],
  },
  {
    id: "linux",
    name: "Linux / OS Admin",
    tier: 1,
    context: ["System administration", "Shell scripting", "Kali Linux setup", "Network service audit"],
    projects: ["Cyber-Recon-Toolkit", "PingBro"],
  },
  {
    id: "networking",
    name: "Networking",
    tier: 2,
    context: ["TCP/IP", "DNS records", "Port scanning & sweeps", "Wireshark packet analysis"],
    projects: ["Cyber-Recon-Toolkit", "Android Credential Leakage Detector"],
  },
  {
    id: "web-security",
    name: "Web Security",
    tier: 2,
    context: ["OWASP Top 10 testing", "API key scanner", "Phishing checker heuristics"],
    projects: ["Cyber-Recon-Toolkit", "Android Credential Leakage Detector"],
  },
  {
    id: "git",
    name: "Git / GitHub",
    tier: 2,
    context: ["Version control", "Collaborative project structure", "Open source tracking"],
  },
  {
    id: "react",
    name: "React / HTML5",
    tier: 2,
    context: ["Component architecture", "Frontend routing structures", "Client form validation"],
    projects: ["EcoSnap"],
  },
  {
    id: "tools",
    name: "Security Tools",
    tier: 3,
    context: ["Nmap scanning", "Burp Suite proxying", "Metasploit exploit verification"],
  },
  {
    id: "troubleshooting",
    name: "Technical Problem Solving",
    tier: 3,
    context: ["Log analysis debugging", "Thread synchronization", "Platform-specific hook overrides"],
    projects: ["PingBro"],
  },
];

export const tierLabels: Record<SkillTier, string> = {
  1: "Core Operator",
  2: "Deployment Stack",
  3: "Extended Tools",
};
