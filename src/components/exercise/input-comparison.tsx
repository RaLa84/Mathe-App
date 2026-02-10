"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Aufgabe } from "@/lib/types/exercise";

interface InputComparisonProps {
  aufgabe: Aufgabe;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

const COMPARISONS = [
  { symbol: "<", label: "kleiner als" },
  { symbol: "=", label: "gleich" },
  { symbol: ">", label: "groesser als" },
];

export function InputComparison({
  onSubmit,
  disabled = false,
}: InputComparisonProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(symbol: string) {
    if (disabled) return;
    setSelected(symbol);
    onSubmit(symbol);
  }

  return (
    <div
      className="flex justify-center gap-4"
      role="radiogroup"
      aria-label="Vergleichszeichen waehlen"
    >
      {COMPARISONS.map(({ symbol, label }) => (
        <Button
          key={symbol}
          variant="outline"
          role="radio"
          aria-checked={selected === symbol}
          aria-label={label}
          onClick={() => handleSelect(symbol)}
          disabled={disabled}
          className={cn(
            "text-3xl md:text-4xl font-bold min-w-[80px] min-h-[64px] py-4 px-6 h-auto",
            selected === symbol &&
              "ring-2 ring-primary border-primary"
          )}
        >
          {symbol}
        </Button>
      ))}
    </div>
  );
}
