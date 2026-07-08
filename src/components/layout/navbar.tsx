"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { chapters } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { useCommandPalette, useRecruiterMode } from "@/components/providers/app-providers";
import { StatusDot } from "@/components/shared/status-dot";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { setOpen } = useCommandPalette();
  const { recruiterMode, setRecruiterMode } = useRecruiterMode();
  const [activeSection, setActiveSection] = useState<string>(chapters[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 120;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const section = document.getElementById(chapters[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = chapters.filter((c) => c.id !== "operator-profile");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#operator-profile" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-bg-panel font-mono text-xs font-medium text-text-primary">
            VB
          </div>
          <span className="hidden font-mono text-xs text-text-tertiary sm:inline">
            {chapters.find((c) => c.id === activeSection)?.number}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 font-mono text-xs transition-colors select-none",
                  isActive ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Recruiter Mode Toggle Switch */}
          <button
            onClick={() => setRecruiterMode(!recruiterMode)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[9px] uppercase font-bold transition-all duration-250 cursor-pointer select-none active:scale-[0.97]",
              recruiterMode
                ? "border-accent-amber bg-accent-amber/10 text-accent-amber shadow-[0_0_12px_rgba(245,158,11,0.18)] hover:border-accent-amber/80"
                : "border-border-subtle text-text-muted hover:border-border-strong hover:text-text-secondary"
            )}
            title="Toggle Recruiter Mode"
          >
            <span className={cn("h-1.5 w-1.5 rounded-full transition-all duration-300", recruiterMode ? "bg-accent-amber animate-pulse scale-110" : "bg-zinc-600")} />
            <span>Recruiter Mode</span>
          </button>

          <div className="hidden items-center gap-2 font-mono text-xs text-text-tertiary lg:flex">
            <StatusDot pulse={false} />
            <span>Active</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="gap-1.5 font-mono text-xs"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">⌘K</span>
          </Button>
          <Button variant="secondary" size="sm" asChild className="hidden sm:inline-flex">
            <a href="/resume.pdf" download>
              Resume
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
