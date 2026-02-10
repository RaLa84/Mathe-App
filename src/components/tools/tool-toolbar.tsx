"use client";

import { useState } from "react";
import { Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberLine } from "@/components/tools/number-line";
import { TenFrame } from "@/components/tools/ten-frame";
import { HundredChart } from "@/components/tools/hundred-chart";
import type { Grade } from "@/stores/profile-store";
import { cn } from "@/lib/utils";

interface ToolToolbarProps {
  grade: Grade;
  permanent: boolean;
  modul?: string;
  onToolUsed?: () => void;
}

function getNumberLineRange(modul?: string): { min: number; max: number } {
  if (!modul) return { min: 0, max: 10 };
  const prefix = modul.split(".")[0];
  switch (prefix) {
    case "M1":
      return { min: 0, max: 10 };
    case "M2":
      return { min: 0, max: 20 };
    case "M3":
      return { min: 0, max: 100 };
    case "M4":
      return { min: 0, max: 100 };
    default:
      return { min: 0, max: 10 };
  }
}

export function ToolToolbar({ grade, permanent, modul, onToolUsed }: ToolToolbarProps) {
  const [isOpen, setIsOpen] = useState(permanent);
  const [activeTool, setActiveTool] = useState<
    "numberline" | "tenframe" | "hundredchart" | null
  >(null);

  const tools = [
    { id: "numberline" as const, label: "Zahlenstrahl", minGrade: 1 },
    { id: "tenframe" as const, label: "Zehnerfeld", minGrade: 1 },
    { id: "hundredchart" as const, label: "Hundertertafel", minGrade: 2 },
  ];

  const availableTools = tools.filter((t) => grade >= t.minGrade);
  const range = getNumberLineRange(modul);

  function handleToolSelect(toolId: typeof activeTool) {
    const newTool = activeTool === toolId ? null : toolId;
    setActiveTool(newTool);
    if (newTool !== null) {
      onToolUsed?.();
    }
  }

  return (
    <div className="border-t border-border mt-4 pt-3">
      {/* Toggle button (not shown when permanent) */}
      {!permanent && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full justify-between text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Werkzeuge
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      )}

      {isOpen && (
        <div className="mt-2 space-y-3">
          {/* Tool selection tabs */}
          <div className="flex gap-2 flex-wrap">
            {availableTools.map((tool) => (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleToolSelect(tool.id)}
                className={cn(
                  "text-sm",
                  activeTool === tool.id && "shadow-sm"
                )}
              >
                {tool.label}
              </Button>
            ))}
          </div>

          {/* Active tool */}
          <div className="bg-secondary/30 rounded-lg p-3">
            {activeTool === "numberline" && (
              <NumberLine min={range.min} max={range.max} />
            )}
            {activeTool === "tenframe" && <TenFrame />}
            {activeTool === "hundredchart" && <HundredChart />}
            {activeTool === null && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Waehle ein Werkzeug aus
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
