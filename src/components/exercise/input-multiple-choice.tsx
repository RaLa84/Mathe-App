"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Aufgabe } from "@/lib/types/exercise";

interface InputMultipleChoiceProps {
  aufgabe: Aufgabe;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export function InputMultipleChoice({
  aufgabe,
  onSubmit,
  disabled = false,
}: InputMultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = aufgabe.antwortOptionen ?? [];

  function handleSelect(option: string) {
    if (disabled) return;
    setSelected(option);
    onSubmit(option);
  }

  return (
    <div
      className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
      role="radiogroup"
      aria-label="Antwortmoeglichkeiten"
    >
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          role="radio"
          aria-checked={selected === option}
          onClick={() => handleSelect(option)}
          disabled={disabled}
          className={cn(
            "text-xl md:text-2xl font-semibold py-6 min-h-[64px] h-auto",
            selected === option &&
              "ring-2 ring-primary border-primary"
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
