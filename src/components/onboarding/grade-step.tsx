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
import type { Grade } from "@/stores/profile-store";
import { cn } from "@/lib/utils";

interface GradeStepProps {
  onNext: () => void;
}

const GRADE_OPTIONS: { grade: Grade; label: string; description: string }[] = [
  { grade: 1, label: "Klasse 1", description: "Zahlen bis 20" },
  { grade: 2, label: "Klasse 2", description: "Zahlen bis 100" },
  { grade: 3, label: "Klasse 3", description: "Zahlen bis 1.000" },
  { grade: 4, label: "Klasse 4", description: "Zahlen bis 1.000.000" },
];

export function GradeStep({ onNext }: GradeStepProps) {
  const storeGrade = useProfileStore((s) => s.grade);
  const setGrade = useProfileStore((s) => s.setGrade);
  const [selected, setSelected] = useState<Grade | null>(storeGrade);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleSelect(grade: Grade) {
    setSelected(grade);
    setGrade(grade);
  }

  function handleNext() {
    if (selected !== null) {
      onNext();
    }
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const total = GRADE_OPTIONS.length;
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
        handleSelect(GRADE_OPTIONS[nextIndex].grade);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const selectedIndex = GRADE_OPTIONS.findIndex(
    (o) => o.grade === selected
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          In welcher Klasse ist Ihr Kind?
        </CardTitle>
        <CardDescription className="text-base">
          Wir passen die Aufgaben an die Klassenstufe an.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="grid grid-cols-2 gap-4 w-full max-w-md"
          role="radiogroup"
          aria-label="Klassenstufe waehlen"
        >
          {GRADE_OPTIONS.map((option, index) => (
            <button
              key={option.grade}
              ref={(el) => { radioRefs.current[index] = el; }}
              type="button"
              role="radio"
              aria-checked={selected === option.grade}
              tabIndex={
                selected === null
                  ? index === 0
                    ? 0
                    : -1
                  : index === selectedIndex
                    ? 0
                    : -1
              }
              onClick={() => handleSelect(option.grade)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2",
                "sensory-animate cursor-pointer",
                "hover:border-primary/50 focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "min-h-[120px]",
                selected === option.grade
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card"
              )}
            >
              <span className="text-2xl md:text-3xl font-bold">
                {option.label}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {option.description}
              </span>
            </button>
          ))}
        </div>
        <Button
          size="lg"
          className="mt-4 text-lg px-8 py-6 h-auto"
          onClick={handleNext}
          disabled={selected === null}
        >
          Weiter
        </Button>
      </CardContent>
    </Card>
  );
}
