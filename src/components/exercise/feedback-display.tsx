"use client";

import { useEffect, useRef } from "react";
import { Check, Star, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { cn } from "@/lib/utils";

function playSuccessSound() {
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - happy chord
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + 0.4 + i * 0.1
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + 0.5 + i * 0.1);
    });
  } catch {
    // Audio not available - silently ignore
  }
}

interface FeedbackDisplayProps {
  richtig: boolean;
  feedbackText: string;
  errorFeedback?: string | null;
  onWeiter: () => void;
  onRetry?: () => void;
  canRetry: boolean;
}

function ConfettiDots() {
  const colors = [
    "bg-yellow-400",
    "bg-pink-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-red-400",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className={cn("absolute w-3 h-3 rounded-full", color)}
          initial={{
            x: "50%",
            y: "50%",
            scale: 0,
          }}
          animate={{
            x: `${20 + Math.random() * 60}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 1.2, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            ease: "easeOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

export function FeedbackDisplay({
  richtig,
  feedbackText,
  errorFeedback,
  onWeiter,
  onRetry,
  canRetry,
}: FeedbackDisplayProps) {
  const { duration, intensity } = useSensoryAnimation();
  const soundPlayed = useRef(false);

  useEffect(() => {
    if (richtig && intensity === "expressive" && !soundPlayed.current) {
      soundPlayed.current = true;
      playSuccessSound();
    }
    return () => {
      soundPlayed.current = false;
    };
  }, [richtig, intensity]);

  const displayText = !richtig && errorFeedback ? errorFeedback : feedbackText;

  return (
    <div className="relative py-6" role="alert" aria-live="assertive">
      {richtig && intensity === "expressive" && <ConfettiDots />}

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Icon */}
        {richtig ? (
          <motion.div
            initial={intensity !== "none" ? { scale: 0 } : undefined}
            animate={intensity !== "none" ? { scale: [0, 1.3, 1] } : undefined}
            transition={
              intensity !== "none" ? { duration, ease: "easeOut" } : undefined
            }
            className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100"
          >
            {intensity === "expressive" ? (
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            ) : (
              <Check className="h-8 w-8 text-green-600" />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={intensity !== "none" ? { scale: 0.8 } : undefined}
            animate={intensity !== "none" ? { scale: 1 } : undefined}
            transition={
              intensity !== "none" ? { duration: duration * 0.5 } : undefined
            }
            className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100"
          >
            <X className="h-8 w-8 text-orange-500" />
          </motion.div>
        )}

        {/* Text */}
        <p
          className={cn(
            "text-xl md:text-2xl font-semibold text-center",
            richtig ? "text-green-700" : "text-orange-700"
          )}
        >
          {displayText}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2">
          {!richtig && canRetry && onRetry && (
            <Button
              size="lg"
              variant="outline"
              onClick={onRetry}
              className="text-lg px-6 py-5 h-auto min-h-[48px]"
            >
              Nochmal versuchen
            </Button>
          )}
          <Button
            size="lg"
            onClick={onWeiter}
            className="text-lg px-6 py-5 h-auto min-h-[48px]"
          >
            {richtig || !canRetry ? "Weiter" : "Ueberspringen"}
          </Button>
        </div>
      </div>
    </div>
  );
}
