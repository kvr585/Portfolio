"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Command, Download, Check } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";
import { projects } from "@/lib/constants/projects";
import { staggerContainer, fadeUpItem, easeOut } from "@/lib/utils/motion";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { SignalLine } from "@/components/layout/signal-line";
import { GlobeCanvas } from "@/components/three/globe-canvas";
import { useCommandPalette, useRecruiterMode } from "@/components/providers/app-providers";
import { cn } from "@/lib/utils/cn";

const STATUS_ROTATION = [
  "Available for Cybersecurity Internship",
  "Building Android Credential Leakage Detector",
  "Last Updated: July 2026",
  "Open to SOC & Penetration Testing Roles"
];

export function HeroSection() {
  const { setOpen } = useCommandPalette();
  const { recruiterMode } = useRecruiterMode();
  const reducedMotion = useReducedMotion();

  // Dynamic Status Badge Ticker Control
  const [statusIndex, setStatusIndex] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  useEffect(() => {
    if (isTickerPaused) return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_ROTATION.length);
    }, 9000); // Slow 9-second premium information banner cycle

    return () => clearInterval(interval);
  }, [isTickerPaused]);

  // Stateful Resume Download Controller
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "success">("idle");
  const handleDownload = () => {
    setDownloadState("loading");
    setTimeout(() => {
      setDownloadState("success");
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Veera_Bhadhra_Rao_Resume.pdf";
      link.click();
      
      setTimeout(() => setDownloadState("idle"), 3000);
    }, 1200);
  };

  // Scroll storytelling calculations
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const textY = useTransform(scrollY, [0, 500], [0, -35]); // Text moves up slightly
  const missionY = useTransform(scrollY, [0, 500], [0, -12]); // Mission box moves up slower
  const terminalScale = useTransform(scrollY, [0, 500], [1, 1.03]);
  const terminalY = useTransform(scrollY, [0, 500], [0, -15]); // Terminal moves slower than text
  const gridY = useTransform(scrollY, [0, 500], [0, 30]); // Background moves slower

  return (
    <section
      id="operator-profile"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center overflow-hidden pt-16"
    >
      {/* Parallax Background Grid */}
      <motion.div 
        style={reducedMotion ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-0 grid-bg opacity-40" 
      />
      <div className="pointer-events-none absolute inset-0 hero-mesh" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <SignalLine className="mb-8 md:mb-12" delay={0.1} />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={reducedMotion ? undefined : staggerContainer}
            initial={reducedMotion ? undefined : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
            style={reducedMotion ? undefined : { scale: heroScale, opacity: heroOpacity }}
            className="order-2 lg:order-1"
          >
            {/* Parallax moving text container */}
            <motion.div style={reducedMotion ? undefined : { y: textY }} className="space-y-4">
              <motion.p
                variants={fadeUpItem}
                className="font-mono text-xs uppercase tracking-[0.12em] text-text-tertiary"
              >
                [ 001 ] {siteConfig.role}
              </motion.p>

              <motion.h1
                variants={fadeUpItem}
                className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
              >
                I build tools that make defenders <span className="text-blue-500">faster.</span>
              </motion.h1>

              <motion.p variants={fadeUpItem} className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary font-mono text-[13px]">
                <span className="text-text-primary">{siteConfig.name}</span>
                {" — "}
                {siteConfig.description}
              </motion.p>

              {/* Rotating Live Status Ticker */}
              <motion.div 
                variants={fadeUpItem} 
                onMouseEnter={() => setIsTickerPaused(true)}
                onMouseLeave={() => setIsTickerPaused(false)}
                className={cn(
                  "mt-6 inline-flex items-center gap-3 px-3 py-1.5 rounded-full border bg-zinc-950/40 select-none h-8 transition-all duration-300",
                  recruiterMode ? "border-accent-amber/40 bg-accent-amber/5 shadow-[0_0_10px_rgba(245,158,11,0.08)]" : "border-border-subtle"
                )}
                role="region"
                aria-label="Live Status Banner"
              >
                <StatusDot pulse={true} className={recruiterMode ? "bg-accent-amber shadow-[0_0_8px_#f59e0b]" : undefined} />
                
                <div className="h-4 overflow-hidden flex items-center min-w-[220px] sm:min-w-[260px]" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={statusIndex}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -7 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className={cn(
                        "font-mono text-[9px] tracking-wide uppercase truncate",
                        recruiterMode ? "text-accent-amber font-semibold" : "text-text-secondary"
                      )}
                    >
                      {STATUS_ROTATION[statusIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Inline Manual Controls inside Ticker Capsule */}
                <div className="hidden md:flex items-center gap-1 border-l border-zinc-800/80 pl-2">
                  <button
                    onClick={() => setStatusIndex((prev) => (prev - 1 + STATUS_ROTATION.length) % STATUS_ROTATION.length)}
                    className="text-text-muted hover:text-text-primary p-0.5 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-blue rounded"
                    aria-label="Previous message"
                  >
                    <span className="font-mono text-[9px] font-bold">&lt;</span>
                  </button>
                  <button
                    onClick={() => setStatusIndex((prev) => (prev + 1) % STATUS_ROTATION.length)}
                    className="text-text-muted hover:text-text-primary p-0.5 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-blue rounded"
                    aria-label="Next message"
                  >
                    <span className="font-mono text-[9px] font-bold">&gt;</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Stable Action Buttons Container (Not parallax offset) */}
            <motion.div variants={fadeUpItem} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton as="button" onClick={() => document.getElementById("deployments")?.scrollIntoView({ behavior: "smooth" })}>
                <Button size="lg">Explore Deployments</Button>
              </MagneticButton>
              <MagneticButton as="button" onClick={() => setOpen(true)}>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Command className="h-4 w-4" />
                  Open Command Palette
                </Button>
              </MagneticButton>
              
              <MagneticButton as="button" onClick={handleDownload}>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={downloadState === "loading"}
                  className={cn(
                    "gap-2 font-mono text-xs border-white/10 hover:border-accent-blue/40 bg-white/5 hover:bg-accent-blue/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 relative overflow-hidden",
                    recruiterMode && "border-accent-amber bg-accent-amber/5 text-accent-amber hover:border-accent-amber/80 hover:bg-accent-amber/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  )}
                >
                  {downloadState === "idle" && (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Resume</span>
                    </>
                  )}
                  {downloadState === "loading" && (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      <span>Retrieving...</span>
                    </>
                  )}
                  {downloadState === "success" && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 animate-bounce" />
                      <span>Resume downloaded</span>
                    </span>
                  )}
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Current Mission Panel */}
            <motion.div
              variants={fadeUpItem}
              style={reducedMotion ? undefined : { y: missionY }}
              className={cn(
                "mt-10 max-w-lg rounded-xl border p-4 font-mono text-[11px] leading-relaxed shadow-lg backdrop-blur-sm transition-all duration-300",
                recruiterMode 
                  ? "border-accent-amber/40 bg-accent-amber/5 shadow-[0_0_25px_rgba(245,158,11,0.06)]"
                  : "border-border-subtle bg-bg-panel/20"
              )}
            >
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-text-tertiary border-b border-border-subtle pb-2 mb-3 select-none">
                <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", recruiterMode ? "bg-accent-amber shadow-[0_0_6px_#f59e0b]" : "bg-blue-500")} />
                <span className={recruiterMode ? "text-accent-amber font-semibold" : undefined}>Current Mission</span>
              </div>
              <div className="grid grid-cols-3 gap-y-2 text-text-secondary">
                <div className="text-text-muted">BUILDING</div>
                <div className="col-span-2 text-text-primary">Android Credential Leakage Detector</div>
                
                <div className="text-text-muted">LEARNING</div>
                <div className="col-span-2 text-text-primary">Advanced Web Security & Networking</div>
                
                <div className="text-text-muted">SEEKING</div>
                <div className="col-span-2 text-text-primary font-bold text-emerald-400">SOC & Penetration Testing Internships</div>
                
                <div className="text-text-muted">LATEST FOCUS</div>
                <div className="col-span-2 text-text-primary text-blue-400 font-semibold">Python Security Tool Development</div>

                <div className="text-text-muted">LATEST UPDATE</div>
                <div className="col-span-2 text-accent-amber font-semibold">{siteConfig.latestUpdate}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column Terminal Panel Parallax */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            style={reducedMotion ? undefined : { scale: terminalScale, y: terminalY }}
            transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
            className="order-1 lg:order-2"
          >
            <GlobeCanvas />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="glass rounded-full px-4 py-2 font-mono text-xs text-text-tertiary">
                Network topology · Recon pipeline
              </div>
              <div className="hidden gap-2 sm:flex">
                {projects[0].modules.slice(0, 4).map((m) => (
                  <span
                    key={m.id}
                    className="rounded-md border border-border-subtle bg-bg-panel px-2 py-1 font-mono text-[10px] text-text-muted"
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-text-muted" />
        </motion.div>
      </div>
    </section>
  );
}
