export const metrics = {
  projects: { value: 4, label: "Deployments", subtext: "1 flagship CLI · 2 desktop tools · 1 prototype" },
  vulnerabilities: { value: 50, suffix: "+", label: "Lab Audits", subtext: "Conducted in controlled testing environments" },
  technologies: { value: 10, suffix: "+", label: "Technologies", subtext: "Python · PyQt6 · Linux · React · Nmap" },
} as const;

export const flagship = {
  name: "Cyber-Recon-Toolkit",
  modules: 9,
  stack: "Python Rich CLI",
  github: "https://github.com/kvr585/Cyber-Recon-Toolkit",
} as const;
