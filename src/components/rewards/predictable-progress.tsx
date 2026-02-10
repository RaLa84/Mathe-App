"use client";

import { Star } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";

interface PredictableProgressProps {
  currentCorrect: number;
  totalRequired: number;
  threshold?: number;
}

/**
 * ASS-Modus: Vorhersehbare Belohnungen (AC-6.13)
 * Shows a clear, predictable rule: "Nach X Aufgaben = 1 Stern"
 * and a countdown: "Noch Y Aufgaben bis zum Stern"
 * Only visible when sensoryProfile is "reizarm" (ASS-friendly).
 */
export function PredictableProgress({
  currentCorrect,
  totalRequired,
  threshold = 0.8,
}: PredictableProgressProps) {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);

  // Only show for reizarm (ASS-friendly) profile
  if (sensoryProfile !== "reizarm") return null;

  const needed = Math.ceil(totalRequired * threshold);
  const remaining = Math.max(0, needed - currentCorrect);
  const earned = currentCorrect >= needed;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
      {earned ? (
        <span className="font-medium text-green-700">
          Stern geschafft! {currentCorrect} von {totalRequired} richtig.
        </span>
      ) : (
        <span>
          Noch {remaining} richtige {remaining === 1 ? "Antwort" : "Antworten"} bis zum Stern
          ({currentCorrect}/{needed})
        </span>
      )}
    </div>
  );
}
