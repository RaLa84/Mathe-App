"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HundredChartProps {
  highlights?: number[];
  onSelect?: (n: number) => void;
}

export function HundredChart({
  highlights = [],
  onSelect,
}: HundredChartProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(n: number) {
    setSelected(n);
    onSelect?.(n);
  }

  return (
    <ScrollArea className="w-full max-h-[280px]" aria-label="Hundertertafel">
      <div className="grid grid-cols-10 gap-0.5 w-fit mx-auto p-1">
        {Array.from({ length: 100 }, (_, i) => {
          const n = i + 1;
          const isHighlighted = highlights.includes(n);
          const isSelected = selected === n;

          return (
            <button
              key={n}
              onClick={() => handleClick(n)}
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm font-medium rounded",
                "flex items-center justify-center",
                "hover:bg-secondary transition-colors",
                isSelected && "bg-primary text-primary-foreground",
                isHighlighted && !isSelected && "bg-yellow-200 text-yellow-800",
                !isSelected && !isHighlighted && "bg-background border border-input"
              )}
              aria-label={`${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
