"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListOrdered, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/stores/profile-store";
import { ReadAloudButton } from "@/components/tts/read-aloud-button";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";

interface HelpStepByStepProps {
  text: string;
}

function parseSteps(text: string): string[] {
  // Try to split by numbered patterns like "1." or "Schritt 1:"
  const numberedSplit = text.split(/(?:\d+[.)]\s*|Schritt\s+\d+:\s*)/i).filter(Boolean);
  if (numberedSplit.length >= 2) return numberedSplit.map((s) => s.trim());

  // Try to split by sentence-ending punctuation
  const sentences = text.split(/(?<=[.!])\s+/).filter(Boolean);
  if (sentences.length >= 2) return sentences.map((s) => s.trim());

  // Fallback: show as single step
  return [text.trim()];
}

const FALLBACK_STEPS = "Lies die Aufgabe nochmal. Ueberlege, was gefragt ist. Probiere es aus.";

export function HelpStepByStep({ text }: HelpStepByStepProps) {
  if (!text) {
    console.warn("[HelpStepByStep] Leerer Schritt-Text, verwende Fallback.");
  }
  const steps = parseSteps(text || FALLBACK_STEPS);
  const [visibleCount, setVisibleCount] = useState(1);
  const readAloud = useProfileStore((s) => s.ndSettings.readAloud);
  const { duration, intensity } = useSensoryAnimation();

  const allVisible = visibleCount >= steps.length;

  function showNextStep() {
    if (!allVisible) {
      setVisibleCount((prev) => prev + 1);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <ListOrdered className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Schritt fuer Schritt
          </h4>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {steps.slice(0, visibleCount).map((step, i) => (
            <motion.div
              key={i}
              initial={
                intensity !== "none" ? { opacity: 0, x: -10 } : undefined
              }
              animate={
                intensity !== "none" ? { opacity: 1, x: 0 } : undefined
              }
              transition={
                intensity !== "none" ? { duration } : undefined
              }
              className="flex items-start gap-3 bg-secondary/30 rounded-lg p-3"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed flex-1 pt-0.5">{step}</p>
              {readAloud && (
                <ReadAloudButton text={step} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {!allVisible && (
          <Button
            variant="outline"
            size="lg"
            onClick={showNextStep}
            className="w-full min-h-[48px] text-base"
          >
            <ChevronRight className="h-5 w-5 mr-2" />
            Naechster Schritt ({visibleCount}/{steps.length})
          </Button>
        )}

        {allVisible && (
          <div className="text-center py-2">
            <p className="text-base font-medium text-green-700 dark:text-green-400">
              Jetzt probiere es selbst! Die Aufgabe wartet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
