"use client";

import { cn } from "@/lib/utils/cn";

export function StatusDot({ className, pulse = true }: { className?: string; pulse?: boolean }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      {pulse && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-amber opacity-40" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-amber" />
    </span>
  );
}
