"use client";

import { Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PauseButtonProps {
  onClick: () => void;
}

export function PauseButton({ onClick }: PauseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      aria-label="Pause machen"
      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    >
      <Pause className="h-5 w-5 mr-1" />
      <span className="hidden sm:inline">Pause</span>
    </Button>
  );
}
