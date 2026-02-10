"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Schwierigkeit } from "@/lib/types/exercise";

interface ExerciseHeaderProps {
  modulName: string;
  currentIndex: number;
  totalCount: number;
  schwierigkeit: Schwierigkeit;
  onExit: () => void;
}

const schwierigkeitColors: Record<Schwierigkeit, string> = {
  Bronze: "bg-amber-700 text-white hover:bg-amber-700",
  Silber: "bg-gray-400 text-white hover:bg-gray-400",
  Gold: "bg-yellow-500 text-white hover:bg-yellow-500",
};

export function ExerciseHeader({
  modulName,
  currentIndex,
  totalCount,
  schwierigkeit,
  onExit,
}: ExerciseHeaderProps) {
  const progress = ((currentIndex + 1) / totalCount) * 100;

  return (
    <header className="flex flex-col gap-3 pb-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          aria-label="Zurueck zur Uebersicht"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="hidden sm:inline">Zurueck</span>
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {modulName}
          </Badge>
          <Badge className={schwierigkeitColors[schwierigkeit]}>
            {schwierigkeit}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1 h-3" />
        <span
          className="text-sm font-medium whitespace-nowrap min-w-[100px] text-right"
          role="status"
          aria-live="polite"
        >
          Aufgabe {currentIndex + 1} von {totalCount}
        </span>
      </div>
    </header>
  );
}
