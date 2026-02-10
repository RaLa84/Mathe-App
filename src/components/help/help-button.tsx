"use client";

import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HelpButtonProps {
  onClick: () => void;
  className?: string;
}

export function HelpButton({ onClick, className }: HelpButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 p-0",
        "shadow-lg hover:shadow-xl transition-shadow",
        "bg-yellow-50 border-yellow-300 hover:bg-yellow-100",
        "dark:bg-yellow-950 dark:border-yellow-700 dark:hover:bg-yellow-900",
        className
      )}
      aria-label="Hilfe anzeigen"
    >
      <Lightbulb className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
    </Button>
  );
}
