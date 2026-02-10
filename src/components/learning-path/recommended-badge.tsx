"use client";

import { motion } from "framer-motion";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";

export function RecommendedBadge() {
  const { enabled, duration, intensity } = useSensoryAnimation();

  if (intensity === "none") {
    return (
      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
        Hier geht&apos;s weiter!
      </span>
    );
  }

  return (
    <motion.span
      className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block"
      animate={
        enabled
          ? {
              scale: [1, 1.05, 1],
            }
          : undefined
      }
      transition={
        enabled
          ? {
              duration: intensity === "expressive" ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration }
      }
    >
      Hier geht&apos;s weiter!
    </motion.span>
  );
}
