"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useProfileStore } from "@/stores/profile-store";
import type { SensoryProfile } from "@/stores/profile-store";
import { cn } from "@/lib/utils";
import { Eye, Sparkles, Leaf } from "lucide-react";

interface SensoryStepProps {
  onNext: () => void;
}

const SENSORY_OPTIONS: {
  profile: SensoryProfile;
  label: string;
  description: string;
  detail: string;
  icon: React.ElementType;
}[] = [
  {
    profile: "reizarm",
    label: "Reizarm",
    description: "Ruhig und klar",
    detail: "Sanfte Farben, keine Animationen, schlichte Rueckmeldungen",
    icon: Leaf,
  },
  {
    profile: "standard",
    label: "Standard",
    description: "Ausgewogen",
    detail: "Klare Farben, sanfte Animationen, Stern-Feedback",
    icon: Eye,
  },
  {
    profile: "reizreich",
    label: "Reizreich",
    description: "Bunt und lebendig",
    detail: "Kraeftige Farben, Konfetti-Animationen, Sound-Feedback",
    icon: Sparkles,
  },
];

export function SensoryStep({ onNext }: SensoryStepProps) {
  const storeSensory = useProfileStore((s) => s.sensoryProfile);
  const setSensoryProfile = useProfileStore((s) => s.setSensoryProfile);
  const [selected, setSelected] = useState<SensoryProfile>(storeSensory);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleSelect(profile: SensoryProfile) {
    setSelected(profile);
    setSensoryProfile(profile);
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const total = SENSORY_OPTIONS.length;
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (index + 1) % total;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (index - 1 + total) % total;
          break;
      }

      if (nextIndex !== null) {
        radioRefs.current[nextIndex]?.focus();
        handleSelect(SENSORY_OPTIONS[nextIndex].profile);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const selectedIndex = SENSORY_OPTIONS.findIndex(
    (o) => o.profile === selected
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          Wie soll die App aussehen?
        </CardTitle>
        <CardDescription className="text-base">
          Waehlen Sie ein Sensorik-Profil. Die Vorschau aendert sich sofort.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="flex flex-col gap-4 w-full max-w-md"
          role="radiogroup"
          aria-label="Sensorik-Profil waehlen"
        >
          {SENSORY_OPTIONS.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.profile}
                ref={(el) => { radioRefs.current[index] = el; }}
                type="button"
                role="radio"
                aria-checked={selected === option.profile}
                tabIndex={index === selectedIndex ? 0 : -1}
                onClick={() => handleSelect(option.profile)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl border-2 text-left",
                  "sensory-animate cursor-pointer",
                  "hover:border-primary/50 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selected === option.profile
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card"
                )}
              >
                <div className="mt-0.5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-lg font-semibold block">
                    {option.label}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground block">
                    {option.description}
                  </span>
                  <span className="text-xs text-muted-foreground block mt-1">
                    {option.detail}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Diese Einstellung kann jederzeit geaendert werden.
        </p>
        <Button
          size="lg"
          className="mt-2 text-lg px-8 py-6 h-auto"
          onClick={onNext}
        >
          Weiter
        </Button>
      </CardContent>
    </Card>
  );
}
