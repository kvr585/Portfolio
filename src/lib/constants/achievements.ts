export type AchievementType = "certification" | "event" | "activity";

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  subtitle: string;
  year: string;
  detail?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: "palo-alto-cyber",
    type: "certification",
    title: "Palo Alto Networks Cybersecurity Foundation",
    subtitle: "Student Certificate",
    year: "2025",
    detail: "Completed foundational security studies under the Palo Alto Networks Cybersecurity Academy.",
    link: "/2303031260126_Veerabhadhrarao_Cybersecurity_Foundation_Student_Certificate.pdf",
  },
  {
    id: "palo-alto-network",
    type: "certification",
    title: "Network Security Fundamentals",
    subtitle: "Student Certificate",
    year: "2025",
    detail: "Validated knowledge of network security components, threats, and mitigation strategies under Palo Alto Academy.",
    link: "/2303031260126_Veerabhadhrarao_Network_Security_Fundamentals_Student_Certificate.pdf",
  },
  {
    id: "vadodara-hackathon",
    type: "event",
    title: "Vadodara Hackathon 6.0",
    subtitle: "Hackathon Participant",
    year: "2025",
    detail: "Participated in the team hackathon held at Parul Institute of Engineering & Technology, focusing on building environmental tech solutions.",
    link: "/Vadodara_hackathon_6_certificate of achievement.pdf",
  },
  {
    id: "cyber-volunteer",
    type: "activity",
    title: "Cyber Crime Volunteer",
    subtitle: "Cyber Expert & Unlawful Content Reporter",
    year: "2026",
    detail: "Registered Cyber Volunteer under NTR Commissionerate, assisting in cyber safety awareness and identifying/reporting malicious content.",
    link: "/cyber_volounteer.pdf",
  },
];
