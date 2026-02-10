"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovementBreakProps {
  onClose: () => void;
  onCancel?: () => void;
}

const MOVEMENTS = [
  { text: "Steh auf und schuettle dich!", emoji: "🙆" },
  { text: "Strecke dich ganz gross!", emoji: "🙋" },
  { text: "Mach dich ganz klein!", emoji: "🧒" },
  { text: "Schuettle deine Haende!", emoji: "👐" },
  { text: "Huepfe 3 Mal!", emoji: "🦘" },
  { text: "Dreh dich einmal im Kreis!", emoji: "🔄" },
];

const STEP_DURATION_MS = 8000;

export function MovementBreak({ onClose, onCancel }: MovementBreakProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev + 1 >= MOVEMENTS.length) {
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_DURATION_MS);

    return () => clearInterval(timer);
  }, [done]);

  const handleCancel = useCallback(() => {
    (onCancel ?? onClose)();
  }, [onCancel, onClose]);

  const movement = MOVEMENTS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCancel}
        className="absolute top-4 right-4"
        aria-label="Bewegungspause beenden"
      >
        <X className="h-5 w-5" />
      </Button>

      <h2 className="text-2xl font-bold mb-8">Bewegungspause</h2>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-7xl" role="img" aria-hidden="true">
              {movement.emoji}
            </span>
            <p className="text-2xl font-semibold text-center">
              {movement.text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-7xl" role="img" aria-hidden="true">
              💪
            </span>
            <p className="text-2xl font-semibold">Super gemacht!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-muted-foreground mt-6">
        {done
          ? "Du bist bereit!"
          : `Uebung ${currentStep + 1} von ${MOVEMENTS.length}`}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4" aria-hidden="true">
        {MOVEMENTS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i <= currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {done && (
        <Button size="lg" onClick={onClose} className="mt-6 text-lg px-8 py-5 h-auto">
          Weiter
        </Button>
      )}
    </div>
  );
}
