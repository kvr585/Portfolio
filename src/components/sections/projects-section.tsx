"use client";

import { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  HelpCircle, 
  Terminal, 
  Calendar, 
  Star, 
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/constants/projects";
import { projects } from "@/lib/constants/projects";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useRecruiterMode } from "@/components/providers/app-providers";

function ArchitectureDiagram({ project }: { project: Project }) {
  const [activeModule, setActiveModule] = useState(project.modules[0]?.id ?? "");

  const active = project.modules.find((m) => m.id === activeModule);
  const activeIndex = project.modules.findIndex((m) => m.id === activeModule);

  return (
    <div className="panel rounded-2xl p-6 bg-zinc-950/20">
      <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">System Architecture & Execution Path</p>
      
      {/* Visual Pipeline Wires & Node Map */}
      <div className="relative mt-8 h-20 w-full bg-zinc-950/60 rounded-xl border border-border-subtle/50 flex items-center justify-between px-8 overflow-hidden select-none">
        
        {/* SVG Pipeline Wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line 
            x1="8%" y1="50%" x2="92%" y2="50%" 
            stroke="#27272a" strokeWidth="2" 
          />
          <line 
            x1="8%" y1="50%" 
            x2={`${(activeIndex / (project.modules.length - 1)) * 84 + 8}%`} 
            y2="50%" 
            stroke={project.accent} strokeWidth="2" 
            strokeOpacity="0.6"
          />
        </svg>

        {/* Dynamic Nodes for each module */}
        {project.modules.map((m, idx) => {
          const isNodeActive = m.id === activeModule;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={cn(
                "relative z-10 h-7 w-7 rounded-full flex items-center justify-center border font-mono text-[9px] font-bold transition-all cursor-pointer",
                isNodeActive 
                  ? "border-accent-amber bg-bg-panel text-accent-amber shadow-[0_0_12px_rgba(245,158,11,0.2)]" 
                  : "border-border-subtle bg-zinc-950 text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
              title={m.label}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          );
        })}

        {/* Live Packet Telemetry Dot Indicator */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.circle
            r="4.5"
            fill={project.accent}
            className="shadow-xl"
            animate={{
              cx: `${(activeIndex / (project.modules.length - 1)) * 84 + 8}%`,
              cy: "50%",
              scale: [1, 1.4, 1]
            }}
            transition={{
              cx: { type: "spring", stiffness: 70, damping: 15 },
              scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
          />
        </svg>
      </div>

      {/* Module Navigation Details */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-b border-border-subtle/40 pb-3 select-none">
        {project.modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={cn(
              "rounded px-2 py-1 font-mono text-[9px] uppercase tracking-wide border transition-all cursor-pointer",
              activeModule === module.id
                ? "border-accent-amber/50 bg-accent-amber/5 text-accent-amber"
                : "border-transparent text-text-muted hover:text-text-secondary"
            )}
          >
            {module.label}
          </button>
        ))}
      </div>

      {/* Active Module Info Box */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="mt-3 p-4 rounded-xl bg-zinc-950/30 border border-border-subtle/50"
          >
            <div className="flex justify-between items-center text-[9px] font-mono text-accent-amber uppercase tracking-wider mb-1.5">
              <span>MODULE {String(activeIndex + 1).padStart(2, "0")} ACTIVE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent-amber animate-pulse" />
            </div>
            <p className="font-semibold text-text-primary text-xs font-mono">{active.label}</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary font-mono">
              {active.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GithubRepoCard({ project }: { project: Project }) {
  const { recruiterMode } = useRecruiterMode();
  
  const repoMeta: Record<string, { lang: string; updated: string; commit: string }> = {
    recon: {
      lang: "Python",
      updated: "Jun 2025",
      commit: "feat: add PDF watermarked forensics module"
    },
    android: {
      lang: "Python",
      updated: "Mar 2026",
      commit: "feat: implement static smali leakage scanner"
    },
    copilot: {
      lang: "Python",
      updated: "Jul 2026",
      commit: "feat: implement Gemini multi-agent validation pipeline"
    },
    pingbro: {
      lang: "Python",
      updated: "May 2026",
      commit: "fix: suppress alarm overlays in fullscreen chrome"
    },
    ecosnap: {
      lang: "JavaScript",
      updated: "Nov 2025",
      commit: "docs: add pending geolocation notes"
    }
  };

  const meta = repoMeta[project.slug] || { lang: "Python", updated: "N/A", commit: "N/A" };

  return (
    <div className={cn(
      "panel rounded-xl p-4 border mt-4 font-mono text-[10px] text-text-secondary leading-relaxed transition-all duration-300",
      recruiterMode 
        ? "border-accent-amber/40 bg-accent-amber/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]" 
        : "border-border-subtle bg-zinc-950/40"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-[11px] font-semibold text-text-primary hover:text-accent-blue transition-colors">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              {project.github.replace("https://github.com/", "")}
            </a>
          </span>
          <p className="text-[10px] text-text-muted mt-1 font-sans leading-normal">
            {project.tagline}
          </p>
        </div>
        <span className={cn(
          "px-2 py-0.5 rounded-full border text-[9px] select-none transition-colors",
          recruiterMode ? "border-accent-amber/30 bg-accent-amber/10 text-accent-amber" : "border-border-subtle bg-bg-panel/40 text-text-muted"
        )}>
          {meta.lang}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border-subtle/50 pt-2 mt-2 text-text-muted select-none">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>Updated: <span className="text-text-secondary">{meta.updated}</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5" />
          <span>Stars: <span className="text-text-secondary">0</span></span>
        </div>
        <div className="col-span-2 flex items-start gap-1.5">
          <RefreshCw className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span className="truncate">Commit: <span className="text-text-secondary select-all font-mono">{meta.commit}</span></span>
        </div>
      </div>
    </div>
  );
}

function EvidenceFrame({ project }: { project: Project }) {
  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="border-b border-border-subtle bg-bg-panel/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-text-muted" />
          <p className="font-mono text-xs text-text-muted">Console Output Telemetry · {project.name}</p>
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
      </div>
      <div className="relative bg-bg-base p-6 font-mono text-xs leading-relaxed overflow-x-auto max-h-[300px]">
        <pre className="text-text-secondary whitespace-pre-wrap font-mono select-all">
          {project.evidenceConsole}
        </pre>
      </div>
    </div>
  );
}

function ScreenshotFrame({ project, onExpand }: { project: Project; onExpand: () => void }) {
  if (!project.screenshotPath) {
    return (
      <div className="panel rounded-2xl p-6 border-dashed border-border-strong flex flex-col items-center justify-center min-h-[240px] w-full">
        <HelpCircle className="h-8 w-8 text-text-muted mb-3" />
        <p className="font-mono text-xs text-text-tertiary select-none">COMING SOON</p>
        <p className="text-xs text-text-muted mt-2 text-center max-w-xs leading-relaxed font-sans">
          Real-time interface captures are coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="border-b border-border-subtle bg-bg-panel/80 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          <p className="font-mono text-[10px] text-text-muted ml-2 truncate max-w-[200px] sm:max-w-xs select-all">
            {project.screenshotPath}
          </p>
        </div>
        <button 
          onClick={onExpand}
          className="font-mono text-[9px] text-accent-blue uppercase select-none hover:underline cursor-pointer"
        >
          Expand
        </button>
      </div>
      <div 
        onClick={onExpand}
        className="bg-zinc-950/80 relative overflow-hidden p-3 flex items-center justify-center min-h-[260px] max-h-[500px] cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.screenshotPath}
          alt={`Screenshot showing the interface of ${project.name}`}
          className="w-full h-full max-h-[460px] object-contain hover:scale-[1.01] transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function ProjectChapter({ project, index, onExpandScreenshot }: { 
  project: Project; 
  index: number; 
  onExpandScreenshot: () => void;
}) {
  const { recruiterMode } = useRecruiterMode();
  const isFlagship = project.flagship;

  return (
    <div
      id={`project-${project.slug}`}
      className={cn(
        "scroll-mt-24 border-l-2 pl-6 md:pl-8 transition-all duration-300",
        project.accentClass,
        recruiterMode 
          ? "mb-16 md:mb-20 border-accent-amber/35 bg-accent-amber/[0.01]" 
          : isFlagship 
          ? "mb-32 md:mb-40 border-border-subtle" 
          : "mb-24 md:mb-32 border-border-subtle"
      )}
    >
      <div
        className={cn(
          "grid gap-10 lg:gap-16",
          isFlagship ? "lg:grid-cols-5" : "lg:grid-cols-2"
        )}
      >
        <div className={cn("lg:sticky lg:top-28 lg:self-start", isFlagship ? "lg:col-span-2" : "")}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] text-text-muted">
              Deployment {project.number} / {String(projects.length).padStart(2, "0")}
            </p>
            <span className="rounded-full bg-zinc-900 border border-border-subtle px-2 py-0.5 font-mono text-[9px] text-text-muted select-none">
              {project.categoryBadge}
            </span>
          </div>
          
          <h3 className={cn("mt-2 font-display font-medium text-text-primary flex flex-wrap items-center gap-2", isFlagship ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl")}>
            <span>{project.name}</span>
            {project.pypiBadge && (
              <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 font-mono text-[8px] text-blue-400 select-none">
                {project.pypiBadge}
              </span>
            )}
            {isFlagship && (
              <span className="inline-flex items-center rounded-full bg-accent-amber/10 border border-accent-amber/30 px-2 py-0.5 font-mono text-[8px] text-accent-amber select-none">
                Flagship Project
              </span>
            )}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.tagline}</p>
          
          {project.isMvp && (
            <div className="mt-3 rounded-lg border border-violet-500/30 bg-violet-950/5 px-3 py-2 font-mono text-[10px] text-violet-400 select-none flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>{project.mvpStatus}</span>
            </div>
          )}

          {/* PyPI direct install info block in project sidebar for flagship status */}
          {project.installCmd && (
            <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-950/5 p-4 font-mono text-[11px] text-blue-400 select-none">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-2 mb-2">
                <span className="font-bold text-[9px] uppercase tracking-wider">PyPI Installation</span>
                <span className="text-[9px] text-text-muted">v1.4.1 (Stable)</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <code className="text-accent-amber font-bold text-[10px] select-all bg-bg-base px-2 py-1 rounded border border-border-subtle">{project.installCmd}</code>
                <a 
                  href="https://pypi.org/project/cyber-recon-toolkit/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline font-bold text-[9px]"
                >
                  PyPI ↗
                </a>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-1 font-mono text-xs text-text-tertiary select-none">
            <p>{project.role}</p>
            <p className="text-accent-emerald/80">{project.outcome}</p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 select-none">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className={cn(
                  "rounded-md border px-2 py-1 font-mono text-[10px] transition-all duration-200",
                  recruiterMode 
                    ? "border-accent-amber bg-accent-amber/10 text-accent-amber font-semibold" 
                    : "border-border-subtle bg-bg-panel/40 text-text-muted"
                )}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Dedicated GitHub Repository Metadata Card */}
          <GithubRepoCard project={project} />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <MagneticButton as="a" href={project.github} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button 
                className={cn(
                  "gap-2 font-bold shadow-[0_0_15px_rgba(245,158,11,0.12)] border-transparent transition-all hover:scale-[1.01]",
                  recruiterMode
                    ? "bg-accent-amber text-zinc-950 hover:bg-accent-amber/90 border-accent-amber animate-pulse shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                    : "bg-accent-amber hover:bg-accent-amber/90 text-zinc-950"
                )}
              >
                GitHub Repository <ArrowUpRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-8 flex gap-1.5 select-none">
            {projects.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-accent-amber" : "w-1.5 bg-border-subtle"
                )}
              />
            ))}
          </div>
        </div>

        <div className={cn("space-y-8", isFlagship ? "lg:col-span-3" : "")}>
          {/* Threat Context */}
          <FadeIn>
            <div className="panel rounded-2xl border-l-2 border-red-500/50 bg-red-950/5 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-red-400 select-none">Threat Context</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary italic">{project.threatContext}</p>
            </div>
          </FadeIn>

          {/* Problem & Solution (Deployment) */}
          <FadeIn delay={0.05}>
            <div className="panel rounded-2xl p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary select-none">The Problem</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary select-none">The Deployment</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.deployment}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* System Map / Architecture Diagram */}
          <FadeIn delay={0.1}>
            <ArchitectureDiagram project={project} />
          </FadeIn>

          {/* Capabilities */}
          <FadeIn delay={0.15}>
            <div className="panel rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary select-none">Core Capabilities</p>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber select-none" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Visual Proof / Screenshots */}
          <FadeIn delay={0.2}>
            <ScreenshotFrame project={project} onExpand={onExpandScreenshot} />
          </FadeIn>

          {/* Evidence Console */}
          <FadeIn delay={0.25}>
            <EvidenceFrame project={project} />
          </FadeIn>

          {/* Lessons Learned */}
          <FadeIn delay={0.25}>
            <div className="panel rounded-2xl p-6 border-l-2 border-accent-emerald/40">
              <p className="font-mono text-xs uppercase tracking-wider text-accent-emerald select-none">Lessons Learned</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.lessonsLearned}</p>
            </div>
          </FadeIn>

          {/* Future Roadmap */}
          {project.futureRoadmap && (
            <FadeIn delay={0.3}>
              <div className="panel rounded-2xl p-6 border-l-2 border-violet-500/40 bg-violet-950/[0.01]">
                <p className="font-mono text-xs uppercase tracking-wider text-violet-400 select-none">Future Roadmap</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.futureRoadmap}</p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeScreenshotProject, setActiveScreenshotProject] = useState<Project | null>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveScreenshotProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SectionWrapper id="deployments">
      <SignalLine className="mb-8" />
      <SectionHeader
        chapter="003"
        title="Deployments"
        status="Forensics ready"
      />

      <div className="space-y-32">
        {projects.map((project, index) => (
          <ProjectChapter
            key={project.id}
            project={project}
            index={index}
            onExpandScreenshot={() => setActiveScreenshotProject(project)}
          />
        ))}
      </div>

      {/* Fullscreen Expand Image Modal */}
      {activeScreenshotProject && activeScreenshotProject.screenshotPath && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/95 p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200 font-mono"
          onClick={() => setActiveScreenshotProject(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeScreenshotProject.screenshotPath}
              alt={activeScreenshotProject.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-zinc-800"
            />
          </div>
          <p className="font-mono text-xs text-text-tertiary mt-4 select-none">
            [ Click anywhere to close ]
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
