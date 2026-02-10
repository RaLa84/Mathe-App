"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/stores/profile-store";

interface BreathingExerciseProps {
  onClose: () => void;
  onCancel?: () => void;
}

const BREATH_CYCLE_MS = 8000; // 4s in, 4s out
const TOTAL_CYCLES = 6;

export function BreathingExercise({ onClose, onCancel }: BreathingExerciseProps) {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const halfCycle = BREATH_CYCLE_MS / 2;
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === "out") {
          setCycle((c) => {
            if (c + 1 >= TOTAL_CYCLES) {
              setDone(true);
              return c;
            }
            return c + 1;
          });
          return "in";
        }
        return "out";
      });
    }, halfCycle);

    return () => clearInterval(interval);
  }, [done]);

  const handleCancel = useCallback(() => {
    (onCancel ?? onClose)();
  }, [onCancel, onClose]);

  const circleColor =
    sensoryProfile === "reizarm"
      ? "border-gray-300 bg-gray-50"
      : sensoryProfile === "reizreich"
        ? "border-purple-400 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"
        : "border-blue-300 bg-blue-50";

  return (
    <div className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCancel}
        className="absolute top-4 right-4"
        aria-label="Atemuebung beenden"
      >
        <X className="h-5 w-5" />
      </Button>

      <h2 className="text-2xl font-bold mb-8">Atemuebung</h2>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Breathing circle */}
        <motion.div
          className={`rounded-full border-4 ${circleColor}`}
          animate={{
            width: phase === "in" ? 200 : 80,
            height: phase === "in" ? 200 : 80,
          }}
          transition={{
            duration: BREATH_CYCLE_MS / 2000,
            ease: "easeInOut",
          }}
        />

        {/* Particles for reizreich */}
        {sensoryProfile === "reizreich" &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-300"
              animate={{
                x: phase === "in"
                  ? Math.cos((i * Math.PI) / 4) * 120
                  : Math.cos((i * Math.PI) / 4) * 50,
                y: phase === "in"
                  ? Math.sin((i * Math.PI) / 4) * 120
                  : Math.sin((i * Math.PI) / 4) * 50,
                opacity: phase === "in" ? 0.8 : 0.2,
              }}
              transition={{
                duration: BREATH_CYCLE_MS / 2000,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <motion.p
        key={phase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl mt-8 font-medium text-muted-foreground"
      >
        {done
          ? "Super gemacht!"
          : phase === "in"
            ? "Atme ein..."
            : "Atme aus..."}
      </motion.p>

      <p className="text-sm text-muted-foreground mt-2">
        {done
          ? "Du bist bereit!"
          : `Atemzug ${cycle + 1} von ${TOTAL_CYCLES}`}
      </p>

      {done && (
        <Button size="lg" onClick={onClose} className="mt-6 text-lg px-8 py-5 h-auto">
          Weiter
        </Button>
      )}
    </div>
  );
}
