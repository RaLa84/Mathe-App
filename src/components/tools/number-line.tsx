"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NumberLineProps {
  min?: number;
  max?: number;
  highlights?: number[];
  interactive?: boolean;
  onSelect?: (n: number) => void;
}

export function NumberLine({
  min = 0,
  max = 10,
  highlights = [],
  interactive = true,
  onSelect,
}: NumberLineProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  function handleClick(n: number) {
    if (!interactive) return;
    setSelected(n);
    onSelect?.(n);
  }

  return (
    <div className="w-full overflow-x-auto py-2" aria-label="Zahlenstrahl">
      <div className="flex items-end gap-0 min-w-fit mx-auto px-2">
        {numbers.map((n) => {
          const isHighlighted = highlights.includes(n);
          const isSelected = selected === n;

          return (
            <button
              key={n}
              onClick={() => handleClick(n)}
              disabled={!interactive}
              className={cn(
                "flex flex-col items-center min-w-[36px]",
                interactive && "cursor-pointer hover:bg-secondary/50 rounded"
              )}
              aria-label={`${n}`}
            >
              <span
                className={cn(
                  "text-sm font-semibold mb-1 w-8 h-8 flex items-center justify-center rounded-full",
                  isSelected && "bg-primary text-primary-foreground",
                  isHighlighted && !isSelected && "bg-yellow-200 text-yellow-800",
                )}
              >
                {n}
              </span>
              <div
                className={cn(
                  "w-0.5 bg-foreground/40",
                  n % 5 === 0 ? "h-4" : "h-2"
                )}
              />
            </button>
          );
        })}
        {/* Base line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/40" />
      </div>
      <div className="h-0.5 bg-foreground/30 -mt-px mx-2" />
    </div>
  );
}
