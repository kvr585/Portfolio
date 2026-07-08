export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 30 };
export const springSmooth = { type: "spring" as const, stiffness: 200, damping: 25 };
export const springGentle = { type: "spring" as const, stiffness: 120, damping: 20 };

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};
