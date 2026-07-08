"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { timeline, severityColors } from "@/lib/constants/timeline";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils/cn";

export function OperatorLogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Scroll tracking to grow the timeline vertical line downwards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="operator-log">
      <SignalLine className="mb-8" />
      <SectionHeader
        chapter="005"
        title="Operator Log"
        description="Incident-style timeline of key operational milestones."
      />

      <div ref={containerRef} className="relative max-w-3xl mx-auto mt-16 pl-6 sm:pl-8">
        
        {/* Dynamic Vertical Scroll Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-zinc-900/60 rounded-full select-none">
          {!reducedMotion && (
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-accent-amber origin-top shadow-[0_0_12px_#f59e0b] rounded-full"
            />
          )}
        </div>

        <FadeInStagger className="space-y-12">
          {timeline.map((entry) => (
            <div key={entry.id} className="relative pl-6">
              
              {/* Pulsing Status Checkpoint Node */}
              <div className="absolute left-[-26px] top-1.5 z-10 flex items-center justify-center select-none">
                <span className={cn(
                  "h-3.5 w-3.5 rounded-full border bg-zinc-950 flex items-center justify-center relative border-opacity-50",
                  severityColors[entry.severity],
                  entry.severity === "deploy" ? "text-emerald-400" :
                  entry.severity === "research" ? "text-blue-400" :
                  entry.severity === "compete" ? "text-indigo-400" :
                  entry.severity === "init" ? "text-zinc-400" :
                  "text-accent-amber"
                )}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {!reducedMotion && (
                    <span className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping" />
                  )}
                </span>
              </div>

              {/* Milestone Details Card */}
              <FadeInItem>
                <div
                  className={cn(
                    "panel rounded-2xl border-l-2 p-5 transition-all duration-300 hover:border-white/10 hover:shadow-lg",
                    severityColors[entry.severity]
                  )}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-text-muted select-none">
                    <span>{entry.timestamp}</span>
                    <span className="text-accent-amber font-semibold">{entry.code}</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-medium text-text-primary">{entry.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary font-mono">{entry.description}</p>
                </div>
              </FadeInItem>
            </div>
          ))}
        </FadeInStagger>
      </div>

      <FadeIn className="mt-12 max-w-3xl mx-auto panel rounded-2xl border-l-2 border-l-amber-500 p-5 sm:p-6 bg-zinc-950/20">
        <p className="font-mono text-xs text-accent-amber select-none">NEXT</p>
        <p className="mt-2 font-display text-base sm:text-lg text-text-primary">
          Deploying into SOC operations. Ready for mission assignment.
        </p>
      </FadeIn>
    </SectionWrapper>
  );
}
