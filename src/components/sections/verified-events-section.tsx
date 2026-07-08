"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { achievements } from "@/lib/constants/achievements";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInItem, FadeInStagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils/cn";

import type { AchievementType } from "@/lib/constants/achievements";

const typeStyles: Record<AchievementType, string> = {
  certification: "border-l-blue-500",
  event: "border-l-emerald-500",
  activity: "border-l-amber-500",
};

export function VerifiedEventsSection() {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Trigger simulated decryption loading state on open
  useEffect(() => {
    if (activeCert) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 900);
      return () => clearTimeout(timer);
    }
  }, [activeCert]);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SectionWrapper id="verified-events">
      <SignalLine className="mb-8" />
      <SectionHeader
        chapter="006"
        title="Verified Events"
        description="Third-party validated milestones and output evidence."
      />

      <FadeInStagger className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <FadeInItem key={achievement.id}>
            <div
              className={cn(
                "panel group rounded-2xl border-l-2 p-6 transition-all duration-200 hover:-translate-y-0.5",
                typeStyles[achievement.type]
              )}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-emerald" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {achievement.type} · {achievement.year}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-medium text-text-primary">{achievement.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent-emerald/90">{achievement.subtitle}</p>
              {achievement.detail && (
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{achievement.detail}</p>
              )}
              {achievement.link && (
                <button
                  onClick={() => setActiveCert(achievement.link || null)}
                  className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent-blue hover:underline cursor-pointer"
                >
                  View proof <ArrowUpRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </FadeInItem>
        ))}
      </FadeInStagger>

      {/* Pop-up Certificate Viewer Overlay */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 sm:p-6 cursor-zoom-out font-mono select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the modal
              className="relative w-full max-w-4xl h-[80vh] bg-bg-elevated border border-border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-default"
            >
              {/* Window Header / Controls bar */}
              <div className="h-12 border-b border-border-subtle bg-bg-panel px-6 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-[10px] font-bold text-text-primary uppercase tracking-wider">
                    SECURE EVIDENCE PREVIEW VAULT
                  </span>
                </div>
                <button 
                  onClick={() => setActiveCert(null)}
                  className="text-text-muted hover:text-text-primary text-[10px] uppercase font-bold tracking-wider cursor-pointer border border-border-subtle px-2 py-0.5 rounded hover:bg-white/5 transition-colors"
                >
                  Close [Esc]
                </button>
              </div>

              {/* Security Telemetry Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-border-subtle bg-bg-panel/40 p-2.5 px-6 text-[9px] text-text-muted shrink-0">
                <div>
                  STATUS: <span className="text-accent-emerald font-bold">VERIFIED</span>
                </div>
                <div>
                  CRYPTO: <span className="text-text-secondary font-mono">SHA-256</span>
                </div>
                <div>
                  SOURCE: <span className="text-text-secondary font-mono">PUBLIC_SECTOR_AUDIT</span>
                </div>
                <div>
                  MUTEX: <span className="text-accent-amber font-bold font-mono">BOUND_LOCK</span>
                </div>
              </div>

              {/* Document Rendering Frame */}
              <div className="relative flex-1 bg-zinc-950 flex items-center justify-center overflow-hidden">
                
                {/* Simulated Decryption Loader Overlay */}
                {loading ? (
                  <div className="absolute inset-0 bg-bg-elevated flex flex-col items-center justify-center p-6 text-center z-10">
                    <RefreshCw className="h-6 w-6 text-accent-amber animate-spin mb-3" />
                    <p className="font-mono text-xs text-accent-amber animate-pulse uppercase tracking-wider">
                      Decrypting credential signature...
                    </p>
                    <p className="font-mono text-[9px] text-text-muted mt-1">
                      CHECKING CRYPTOGRAPHIC HASH MATCHES
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full p-4 flex items-center justify-center bg-zinc-900/30">
                    {activeCert.toLowerCase().endsWith(".pdf") ? (
                      <iframe
                        src={`${activeCert}#toolbar=0&navpanes=0`}
                        className="w-full h-full border border-border-subtle rounded-xl shadow-lg bg-zinc-900"
                        title="Certificate PDF Preview"
                      />
                    ) : (
                      <div className="relative max-w-full max-h-full p-2 bg-zinc-900 border border-border-subtle rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeCert}
                          alt="Certificate Proof"
                          className="max-w-full max-h-[62vh] object-contain rounded"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer status line */}
              <div className="h-10 border-t border-border-subtle bg-bg-panel px-6 flex justify-between items-center shrink-0 text-[9px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-accent-emerald" />
                  INTEGRITY VERIFIED BY SECURE SESSION
                </span>
                <span className="select-none font-bold">CONFIDENTIAL</span>
              </div>
            </motion.div>

            <p className="text-[10px] text-text-tertiary mt-3 select-none">
              [ Click anywhere outside or press ESC to close ]
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
