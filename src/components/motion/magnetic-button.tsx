"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { springSnappy } from "@/lib/utils/motion";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  pullRadius?: number;
  pullStrength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  pullRadius = 80,
  pullStrength = 0.35,
  onClick,
  as = "button",
  href,
  target,
  rel,
  disabled,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < pullRadius) {
      setPosition({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: springSnappy,
    whileHover: reducedMotion ? {} : { scale: 1.02 },
    whileTap: reducedMotion ? {} : { scale: 0.98 },
  };

  const handleClick = (e: MouseEvent) => {
    if (onClick) onClick();
    if (as === "a" && href) {
      // Allow caller-provided onClick to run, then perform navigation.
      if (target === "_blank") {
        window.open(href, target);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <motion.div
      ref={ref as any}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
