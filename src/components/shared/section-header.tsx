import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { StatusDot } from "@/components/shared/status-dot";

interface SectionHeaderProps {
  chapter: string;
  title: string;
  description?: string;
  status?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  chapter,
  title,
  description,
  status,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-tertiary">
            [ {chapter} ]
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-base text-text-secondary">{description}</p>
          )}
        </div>
        {status && (
          <div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
            <StatusDot />
            {status}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
