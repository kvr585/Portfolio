"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const dotY = useTransform(scrollYProgress, [0, 1], [0, 80]); // 80px range inside 80px line

  if (reducedMotion) return null;

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none"
      aria-hidden="true"
    >
      <span className="font-mono text-[7px] text-zinc-600 tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">
        SYS_RECON
      </span>
      <div className="relative w-[1px] h-20 bg-zinc-800/80 rounded-full">
        {/* Glowing dot moving with scroll percentage */}
        <motion.div 
          style={{ y: dotY }}
          className="absolute left-1/2 -translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-accent-amber border-2 border-zinc-950 shadow-[0_0_8px_#f59e0b]"
        />
      </div>
      <span className="font-mono text-[7px] text-zinc-600 tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">
        EOF_MEM
      </span>
    </div>
  );
}
