"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export function SectionWrapper({ id, children, className, wide }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0.85, scale: 0.985 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative scroll-mt-20 py-20 md:py-24 lg:py-32", className)}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          wide ? "max-w-[1440px]" : "max-w-7xl"
        )}
      >
        {children}
      </div>
    </motion.section>
  );
}
