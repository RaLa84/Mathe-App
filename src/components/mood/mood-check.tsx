"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import type { MoodValue } from "@/stores/pause-store";

interface MoodCheckProps {
  type: "before" | "after";
  onSelect: (mood: MoodValue) => void;
  onSkip: () => void;
}

const MOODS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 5, emoji: "😊", label: "Sehr gut" },
  { value: 4, emoji: "🙂", label: "Gut" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 2, emoji: "😕", label: "Nicht so gut" },
  { value: 1, emoji: "😢", label: "Schlecht" },
];

export function MoodCheck({ type, onSelect, onSkip }: MoodCheckProps) {
  const { duration, intensity } = useSensoryAnimation();

  const title =
    type === "before" ? "Wie fuehlst du dich?" : "Wie fuehlst du dich jetzt?";

  return (
    <div className="min-h-screen sensory-bg p-4 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <motion.h2
          initial={intensity !== "none" ? { opacity: 0, y: -10 } : undefined}
          animate={intensity !== "none" ? { opacity: 1, y: 0 } : undefined}
          transition={intensity !== "none" ? { duration } : undefined}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h2>

        <div className="flex justify-center gap-3 flex-wrap">
          {MOODS.map((mood, i) => (
            <motion.div
              key={mood.value}
              initial={intensity !== "none" ? { opacity: 0, scale: 0.8 } : undefined}
              animate={intensity !== "none" ? { opacity: 1, scale: 1 } : undefined}
              transition={
                intensity !== "none"
                  ? { duration, delay: i * 0.08 }
                  : undefined
              }
            >
              <button
                onClick={() => onSelect(mood.value)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-[72px]"
                aria-label={`Stimmung: ${mood.label}`}
              >
                <span className="text-4xl" role="img" aria-hidden="true">
                  {mood.emoji}
                </span>
                <span className="text-xs text-muted-foreground">
                  {mood.label}
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={onSkip}
          className="text-muted-foreground"
        >
          Ueberspringen
        </Button>
      </div>
    </div>
  );
}
