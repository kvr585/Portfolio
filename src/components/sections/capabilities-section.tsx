"use client";

import { useState } from "react";
import { skills, tierLabels, type SkillTier } from "@/lib/constants/skills";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils/cn";

const tierStyles: Record<SkillTier, string> = {
  1: "md:col-span-1 md:row-span-1 p-6",
  2: "md:col-span-1 p-5",
  3: "md:col-span-1 p-4",
};

const tierTitleSize: Record<SkillTier, string> = {
  1: "text-xl",
  2: "text-lg",
  3: "text-base",
};

export function CapabilitiesSection() {
  const [expandedTier, setExpandedTier] = useState<SkillTier | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const tiers: SkillTier[] = [1, 2, 3];

  return (
    <SectionWrapper id="capabilities">
      <SignalLine className="mb-8" />
      <SectionHeader
        chapter="004"
        title="Capabilities"
        description="Depth over breadth — contextual expertise, not skill percentages."
      />

      <div className="space-y-8">
        {tiers.map((tier) => {
          const tierSkills = skills.filter((s) => s.tier === tier);
          const isExpanded = expandedTier === null || expandedTier === tier;

          return (
            <div key={tier}>
              <button
                onClick={() => setExpandedTier(expandedTier === tier ? null : tier)}
                className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-secondary"
              >
                <span className="h-px w-8 bg-border-subtle" />
                Tier {tier} — {tierLabels[tier]}
                <span className="text-text-muted">({tierSkills.length})</span>
              </button>

              {isExpanded && (
                <FadeInStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {tierSkills.map((skill) => (
                    <FadeInItem key={skill.id}>
                      <button
                        onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                        className={cn(
                          "panel w-full rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-blue/30",
                          tierStyles[tier],
                          activeSkill === skill.id && "border-accent-blue/40"
                        )}
                      >
                        <h3 className={cn("font-display font-medium text-text-primary", tierTitleSize[tier])}>
                          {skill.name}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {skill.context.slice(0, activeSkill === skill.id ? undefined : 2).map((ctx) => (
                            <span
                              key={ctx}
                              className="rounded-md bg-bg-base px-2 py-0.5 font-mono text-[10px] text-text-muted"
                            >
                              {ctx}
                            </span>
                          ))}
                        </div>
                        {activeSkill === skill.id && skill.projects && (
                          <p className="mt-3 font-mono text-[10px] text-accent-blue">
                            Projects: {skill.projects.join(" · ")}
                          </p>
                        )}
                      </button>
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
