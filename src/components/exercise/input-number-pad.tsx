"use client";

import { useState, useCallback, useEffect } from "react";
import { Delete, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMaxDigits } from "@/lib/exercise-engine";
import type { Aufgabe } from "@/lib/types/exercise";

interface InputNumberPadProps {
  aufgabe: Aufgabe;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export function InputNumberPad({
  aufgabe,
  onSubmit,
  disabled = false,
}: InputNumberPadProps) {
  const [value, setValue] = useState("");
  const maxDigits = getMaxDigits(aufgabe.modul);

  const handleDigit = useCallback(
    (digit: string) => {
      if (disabled) return;
      setValue((prev) => {
        if (prev.length >= maxDigits) return prev;
        return prev + digit;
      });
    },
    [disabled, maxDigits]
  );

  const handleDelete = useCallback(() => {
    if (disabled) return;
    setValue((prev) => prev.slice(0, -1));
  }, [disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled || value === "") return;
    onSubmit(value);
    setValue("");
  }, [disabled, value, onSubmit]);

  // Physical keyboard support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (disabled) return;
      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, handleDigit, handleDelete, handleSubmit]);

  // Reset value when exercise changes
  useEffect(() => {
    setValue("");
  }, [aufgabe.id]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      {/* Display field */}
      <div
        className="w-full text-center text-4xl font-bold py-4 px-6 border-2 border-input rounded-lg bg-background min-h-[64px] flex items-center justify-center"
        aria-label={`Eingabe: ${value || "leer"}`}
        aria-live="polite"
      >
        {value || <span className="text-muted-foreground text-2xl">?</span>}
      </div>

      {/* Number grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <Button
            key={digit}
            variant="outline"
            onClick={() => handleDigit(String(digit))}
            disabled={disabled}
            aria-label={String(digit)}
            className="text-2xl font-bold min-h-[56px] min-w-[56px]"
          >
            {digit}
          </Button>
        ))}

        {/* Bottom row: Delete, 0, Enter */}
        <Button
          variant="outline"
          onClick={handleDelete}
          disabled={disabled || value === ""}
          aria-label="Loeschen"
          className="text-2xl min-h-[56px]"
        >
          <Delete className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          onClick={() => handleDigit("0")}
          disabled={disabled}
          aria-label="0"
          className="text-2xl font-bold min-h-[56px]"
        >
          0
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={disabled || value === ""}
          aria-label="Antwort abschicken"
          className="text-2xl min-h-[56px] bg-primary text-primary-foreground"
        >
          <CornerDownLeft className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
