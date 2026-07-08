import { siteConfig } from "@/lib/constants/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Cybersecurity Student",
    description: siteConfig.about,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "SOC Operations",
      "Python",
      "Network Security",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
