"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { metrics, flagship } from "@/lib/constants/metrics";
import { siteConfig } from "@/lib/constants/site";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SignalLine } from "@/components/layout/signal-line";
import { SectionHeader } from "@/components/shared/section-header";
import { CountUp } from "@/components/motion/count-up";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils/cn";
import { staggerContainer, fadeUpItem } from "@/lib/utils/motion";

function Sparkline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={cn("h-8 w-full text-accent-amber/60", className)} aria-hidden="true">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        points="0,24 15,20 30,22 45,14 60,16 75,8 90,12 105,6 120,10"
      />
    </svg>
  );
}

function GitHubReposPanel() {
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${siteConfig.githubUsername}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.public_repos != null) setRepoCount(data.public_repos);
      })
      .catch(() => setRepoCount(null));
  }, []);

  return (
    <div className="panel group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30">
      <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">GitHub Repos</p>
      <p className="mt-3 font-display text-4xl font-medium tabular-nums text-text-primary">
        {repoCount !== null ? repoCount : <CountUp end={12} />}
      </p>
      <Sparkline className="mt-4" />
      <p className="mt-3 font-mono text-xs text-text-muted">
        {repoCount !== null ? "Live from GitHub API" : "Public repositories"}
      </p>
    </div>
  );
}

export function OperatorStatusSection() {
  return (
    <SectionWrapper id="operator-status">
      <SignalLine className="mb-8" />
      <SectionHeader
        chapter="002"
        title="Operator Status"
        status="Systems nominal"
      />

      <FadeInStagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FadeInItem className="md:col-span-2 lg:row-span-1">
          <div className="panel group h-full rounded-2xl border-l-2 border-l-amber-500 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/50">
            <p className="font-mono text-xs uppercase tracking-wider text-accent-amber">Flagship Deployment</p>
            <h3 className="mt-2 font-display text-2xl font-medium text-text-primary">{flagship.name}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {flagship.modules} modules · {flagship.stack} · Unified recon pipeline
            </p>
            <Sparkline className="mt-6" />
            <a
              href={flagship.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent-blue hover:underline"
            >
              View repository <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="panel group h-full rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">{metrics.projects.label}</p>
            <p className="mt-3 font-display text-4xl font-medium tabular-nums text-text-primary">
              <CountUp end={metrics.projects.value} />
            </p>
            <Sparkline className="mt-4" />
            <FadeIn delay={1.2}>
              <p className="mt-3 font-mono text-xs text-text-muted">{metrics.projects.subtext}</p>
            </FadeIn>
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="panel group h-full rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">{metrics.vulnerabilities.label}</p>
            <p className="mt-3 font-display text-4xl font-medium tabular-nums text-text-primary">
              <CountUp end={metrics.vulnerabilities.value} suffix={metrics.vulnerabilities.suffix} />
            </p>
            <Sparkline className="mt-4" />
            <p className="mt-3 font-mono text-xs text-text-muted">{metrics.vulnerabilities.subtext}</p>
          </div>
        </FadeInItem>

        <FadeInItem className="md:col-span-2 lg:col-span-1">
          <GitHubReposPanel />
        </FadeInItem>

        <FadeInItem className="md:col-span-2 lg:col-span-3">
          <div className="panel rounded-2xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">{metrics.technologies.label}</p>
                <p className="mt-2 font-display text-3xl font-medium tabular-nums text-text-primary">
                  <CountUp end={metrics.technologies.value} suffix={metrics.technologies.suffix} />
                </p>
                <p className="mt-1 font-mono text-xs text-text-muted">{metrics.technologies.subtext}</p>
              </div>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {["Python", "Linux", "React", "Firebase", "Git", "Networking", "Web Security", "Cloud"].map((tech) => (
                  <motion.span
                    key={tech}
                    variants={fadeUpItem}
                    className="rounded-lg border border-border-subtle bg-bg-base px-3 py-1.5 font-mono text-xs text-text-secondary select-none"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeInItem>
      </FadeInStagger>
    </SectionWrapper>
  );
}
