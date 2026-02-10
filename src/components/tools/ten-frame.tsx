"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TenFrameProps {
  filled?: number;
  interactive?: boolean;
  onCountChange?: (count: number) => void;
}

export function TenFrame({
  filled = 0,
  interactive = true,
  onCountChange,
}: TenFrameProps) {
  const [count, setCount] = useState(filled);

  function handleToggle(index: number) {
    if (!interactive) return;
    const newCount = index < count ? index : index + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  }

  return (
    <div aria-label={`Zehnerfeld: ${count} von 10 gefuellt`}>
      <div className="grid grid-cols-5 gap-1.5 w-fit mx-auto">
        {Array.from({ length: 10 }, (_, i) => {
          const isFilled = i < count;
          return (
            <button
              key={i}
              onClick={() => handleToggle(i)}
              disabled={!interactive}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-colors",
                isFilled
                  ? "bg-primary border-primary"
                  : "bg-background border-input",
                interactive && "cursor-pointer hover:border-primary/60"
              )}
              aria-label={`Feld ${i + 1}: ${isFilled ? "gefuellt" : "leer"}`}
            />
          );
        })}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        {count} von 10
      </p>
    </div>
  );
}
