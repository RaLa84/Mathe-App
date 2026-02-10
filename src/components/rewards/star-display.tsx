"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { cn } from "@/lib/utils";

interface StarDisplayProps {
  stufe: "bronze" | "silber" | "gold";
  erreicht: boolean;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const colorMap = {
  bronze: {
    fill: "text-amber-600",
    bg: "bg-amber-100",
    glow: "shadow-amber-200",
  },
  silber: {
    fill: "text-slate-400",
    bg: "bg-slate-100",
    glow: "shadow-slate-200",
  },
  gold: {
    fill: "text-yellow-500",
    bg: "bg-yellow-100",
    glow: "shadow-yellow-200",
  },
};

const sizeMap = {
  sm: { icon: "h-4 w-4", container: "w-8 h-8" },
  md: { icon: "h-6 w-6", container: "w-12 h-12" },
  lg: { icon: "h-10 w-10", container: "w-16 h-16" },
};

export function StarDisplay({
  stufe,
  erreicht,
  size = "md",
  animate = true,
}: StarDisplayProps) {
  const { enabled, duration } = useSensoryAnimation();
  const colors = colorMap[stufe];
  const sizes = sizeMap[size];
  const shouldAnimate = animate && enabled && erreicht;

  const star = (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        sizes.container,
        erreicht ? colors.bg : "bg-muted",
        erreicht && `shadow-md ${colors.glow}`
      )}
    >
      <Star
        className={cn(
          sizes.icon,
          erreicht ? colors.fill : "text-muted-foreground/30"
        )}
        fill={erreicht ? "currentColor" : "none"}
      />
    </div>
  );

  if (shouldAnimate) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration, type: "spring", stiffness: 200 }}
      >
        {star}
      </motion.div>
    );
  }

  return star;
}
