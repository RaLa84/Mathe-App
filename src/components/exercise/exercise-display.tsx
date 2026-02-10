"use client";

import { useProfileStore } from "@/stores/profile-store";
import { colorCodeOperators } from "@/lib/exercise-engine";
import { ReadAloudButton } from "@/components/tts/read-aloud-button";
import type { Aufgabe } from "@/lib/types/exercise";
import { cn } from "@/lib/utils";

interface ExerciseDisplayProps {
  aufgabe: Aufgabe;
}

const colorClasses: Record<string, string> = {
  plus: "text-green-600 font-bold",
  minus: "text-red-600 font-bold",
  equals: "text-foreground font-bold",
  einer: "text-blue-600 font-bold",
  zehner: "text-red-500 font-bold",
  hunderter: "text-green-600 font-bold",
};

const fontSizeMap = {
  normal: "clamp(1.5rem, 5vw, 3rem)",
  gross: "clamp(2rem, 6vw, 3.75rem)",
  "sehr-gross": "clamp(2.5rem, 7vw, 4.5rem)",
} as const;

export function ExerciseDisplay({ aufgabe }: ExerciseDisplayProps) {
  const readAloud = useProfileStore((s) => s.ndSettings.readAloud);
  const fontSize = useProfileStore((s) => s.fontSize);
  const segments = colorCodeOperators(
    aufgabe.aufgabentext,
    aufgabe.stellenwertFarben
  );

  return (
    <div className="sticky top-0 z-10 bg-background py-4">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <p
          className={cn(
            "text-center font-bold leading-relaxed",
            "text-3xl sm:text-4xl md:text-5xl"
          )}
          style={{ fontSize: fontSizeMap[fontSize] }}
        >
          {segments.map((segment, i) => (
            <span
              key={i}
              className={segment.color ? colorClasses[segment.color] : undefined}
            >
              {segment.text}
            </span>
          ))}
        </p>

        {readAloud && aufgabe.vorlesen && (
          <ReadAloudButton text={aufgabe.aufgabentext} />
        )}
      </div>
    </div>
  );
}
