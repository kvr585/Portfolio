import { HeroSection } from "@/components/sections/hero-section";
import { OperatorStatusSection } from "@/components/sections/operator-status-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { OperatorLogSection } from "@/components/sections/operator-log-section";
import { VerifiedEventsSection } from "@/components/sections/verified-events-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OperatorStatusSection />
      <ProjectsSection />
      <CapabilitiesSection />
      <OperatorLogSection />
      <VerifiedEventsSection />
      <ContactSection />
    </>
  );
}
