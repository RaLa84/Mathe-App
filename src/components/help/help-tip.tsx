"use client";

import { Lightbulb } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";
import { ReadAloudButton } from "@/components/tts/read-aloud-button";

interface HelpTipProps {
  text: string;
}

const FALLBACK_TIP = "Lies die Aufgabe nochmal langsam.";

export function HelpTip({ text }: HelpTipProps) {
  const readAloud = useProfileStore((s) => s.ndSettings.readAloud);
  const displayText = text || FALLBACK_TIP;

  if (!text) {
    console.warn("[HelpTip] Leerer Tipp-Text, verwende Fallback.");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
            Tipp
          </h4>
          <p className="text-lg leading-relaxed">{displayText}</p>
        </div>
        {readAloud && <ReadAloudButton text={displayText} />}
      </div>
    </div>
  );
}
