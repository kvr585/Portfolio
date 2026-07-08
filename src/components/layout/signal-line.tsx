"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SignalLineProps {
  className?: string;
  delay?: number;
}

export function SignalLine({ className, delay = 0 }: SignalLineProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={`signal-line w-full ${className ?? ""}`} />;
  }

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="signal-line absolute inset-0"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
