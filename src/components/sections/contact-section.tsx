"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/constants/site";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils/cn";

const connectionPaths = [
  {
    id: "soc",
    label: "SOC & Blue Team Roles",
    description: "Security operations, monitoring, and incident response internships.",
    action: "Email Inquiry",
    href: `mailto:${siteConfig.links.email}?subject=SOC%20Internship%20Inquiry`,
    external: false,
  },
  {
    id: "pentest",
    label: "Penetration Testing",
    description: "Offensive security assessments and red team opportunities.",
    action: "Email Inquiry",
    href: `mailto:${siteConfig.links.email}?subject=Penetration%20Testing%20Opportunity`,
    external: false,
  },
  {
    id: "collab",
    label: "Collaboration & Tools",
    description: "Open source security tooling and project collaboration.",
    action: "GitHub Profile",
    href: siteConfig.links.github,
    external: true,
  },
  {
    id: "network",
    label: "Professional Network",
    description: "Connect for industry insights and professional growth.",
    action: "LinkedIn Connection",
    href: siteConfig.links.linkedin,
    external: true,
  },
];

export function ContactSection() {
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.links.email);
    setToast("Email copied to clipboard");
    setCopied(true);
    setTimeout(() => {
      setToast(null);
      setCopied(false);
    }, 2500);
  };

  return (
    <SectionWrapper id="establish-connection" className="bg-bg-elevated relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <motion.div 
        initial={{ opacity: 0.3, scale: 0.95 }}
        whileInView={{ opacity: 0.75, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 hero-mesh" 
      />

      <div className="relative z-10">
        <SignalLine className="mb-8" />
        <SectionHeader
          chapter="007"
          title="Establish Connection"
          description={siteConfig.responseTime}
        />

        <FadeIn>
          <h3 className="font-display text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
            Let&apos;s build something secure.
          </h3>
          <p className="mt-4 max-w-xl text-base text-text-secondary">
            Open to internship opportunities in SOC operations, penetration testing, and security engineering.
          </p>
        </FadeIn>

        {/* Staggered Rising Contact Path Cards */}
        <FadeInStagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {connectionPaths.map((path) => (
            <FadeInItem key={path.id}>
              <a
                href={path.href}
                target={path.external ? "_blank" : undefined}
                rel={path.external ? "noopener noreferrer" : undefined}
                className="panel group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:border-accent-blue/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.03)]"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-lg font-medium text-text-primary">{path.label}</h4>
                  <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue" />
                </div>
                <p className="mt-2 flex-1 text-sm text-text-secondary">{path.description}</p>
                <span className="mt-4 font-mono text-xs text-accent-blue group-hover:underline transition-all">
                  {path.action} →
                </span>
              </a>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Highlighted Final CTA Button */}
        <FadeIn className="mt-8">
          <button
            onClick={copyEmail}
            className={cn(
              "panel inline-flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-sm text-text-secondary transition-all duration-300 hover:border-accent-amber/50 hover:bg-accent-amber/5 hover:text-text-primary hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] border-accent-amber/40 bg-accent-amber/[0.01] active:scale-[0.98] cursor-pointer"
            )}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
            ) : (
              <Copy className="h-4 w-4 text-accent-amber" />
            )}
            <span className={cn(copied ? "text-emerald-400 font-semibold" : "text-text-primary")}>
              {copied ? "Copied Address" : siteConfig.links.email}
            </span>
          </button>
        </FadeIn>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-50 rounded-xl glass px-4 py-2.5 font-mono text-xs text-text-primary border border-white/10 shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
