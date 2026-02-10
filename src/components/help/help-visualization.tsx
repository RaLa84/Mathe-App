"use client";

import { Eye } from "lucide-react";
import { NumberLine } from "@/components/tools/number-line";
import { TenFrame } from "@/components/tools/ten-frame";
import { useProfileStore } from "@/stores/profile-store";
import { ReadAloudButton } from "@/components/tts/read-aloud-button";

interface HelpVisualizationProps {
  type: string;
  modul?: string;
}

function getNumberLineRange(modul?: string): { min: number; max: number } {
  if (!modul) return { min: 0, max: 10 };
  const prefix = modul.split(".")[0];
  switch (prefix) {
    case "M1":
      return { min: 0, max: 10 };
    case "M2":
      return { min: 0, max: 20 };
    case "M3":
    case "M4":
      return { min: 0, max: 100 };
    default:
      return { min: 0, max: 10 };
  }
}

const FALLBACK_TYPE = "tenframe";

export function HelpVisualization({ type, modul }: HelpVisualizationProps) {
  const readAloud = useProfileStore((s) => s.ndSettings.readAloud);
  const range = getNumberLineRange(modul);
  const displayType = type || FALLBACK_TYPE;
  const isKnownTool = displayType === "numberline" || displayType === "tenframe";

  if (!type) {
    console.warn("[HelpVisualization] Leerer Visualisierungs-Typ, verwende Fallback.");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Schau mal
          </h4>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-lg p-4">
        {displayType === "numberline" && (
          <NumberLine min={range.min} max={range.max} interactive />
        )}
        {displayType === "tenframe" && <TenFrame interactive />}
        {!isKnownTool && (
          <div className="space-y-2">
            <p className="text-lg leading-relaxed text-center">{displayType}</p>
            {readAloud && <ReadAloudButton text={displayType} />}
          </div>
        )}
      </div>

      {isKnownTool && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground text-center">
            {displayType === "numberline"
              ? "Tippe auf die Zahlen, um sie zu markieren."
              : "Tippe auf die Kreise, um Plaettchen zu legen."}
          </p>
          {readAloud && (
            <ReadAloudButton
              text={
                displayType === "numberline"
                  ? "Tippe auf die Zahlen, um sie zu markieren."
                  : "Tippe auf die Kreise, um Plaettchen zu legen."
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
