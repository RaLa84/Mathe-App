"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Eye, ListOrdered, Lock } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";
import { useHelpStore } from "@/stores/help-store";
import { HelpTip } from "@/components/help/help-tip";
import { HelpVisualization } from "@/components/help/help-visualization";
import { HelpStepByStep } from "@/components/help/help-step-by-step";
import { HelpPositiveFeedback } from "@/components/help/help-positive-feedback";
import type { Hilfe } from "@/lib/types/exercise";
import { cn } from "@/lib/utils";

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
  hilfe: Hilfe;
  modul?: string;
  onHelpUsed: () => void;
  onAllStagesUsed?: () => void;
  exerciseId: string;
}

export function HelpPanel({
  open,
  onClose,
  hilfe,
  modul,
  onHelpUsed,
  onAllStagesUsed,
  exerciseId,
}: HelpPanelProps) {
  const allStagesImmediate = useProfileStore(
    (s) => s.ndSettings.helpAllStagesImmediate
  );
  const startTracking = useHelpStore((s) => s.startTracking);
  const trackStage = useHelpStore((s) => s.trackStage);

  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [highestUsedStage, setHighestUsedStage] = useState(0);

  // Reset state when exercise changes
  useEffect(() => {
    setActiveStage(1);
    setHighestUsedStage(0);
    startTracking(exerciseId, modul ?? "");
  }, [exerciseId, modul, startTracking]);

  const unlockedStage = allStagesImmediate
    ? 3
    : Math.min(3, Math.max(1, highestUsedStage + 1)) as 1 | 2 | 3;

  const handleStageSelect = useCallback(
    (stage: 1 | 2 | 3) => {
      if (stage > unlockedStage) return;
      setActiveStage(stage);
      trackStage(stage);
      if (stage > highestUsedStage) {
        setHighestUsedStage(stage);
        onHelpUsed();
        if (stage === 3) {
          onAllStagesUsed?.();
        }
      }
    },
    [unlockedStage, highestUsedStage, onHelpUsed, onAllStagesUsed, trackStage]
  );

  // Mark stage 1 as used when panel opens for the first time per exercise
  useEffect(() => {
    if (open && highestUsedStage === 0) {
      setHighestUsedStage(1);
      trackStage(1);
      onHelpUsed();
    }
  }, [open, highestUsedStage, onHelpUsed, trackStage]);

  const stages = [
    {
      id: 1 as const,
      label: "Tipp",
      icon: Lightbulb,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: 2 as const,
      label: "Bild",
      icon: Eye,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 3 as const,
      label: "Schritte",
      icon: ListOrdered,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        side="bottom"
        className="max-h-[70vh] overflow-y-auto rounded-t-2xl"
        overlayClassName="bg-black/30"
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="text-xl">Hilfe</SheetTitle>
          <SheetDescription className="sr-only">
            Hilfe fuer die aktuelle Aufgabe
          </SheetDescription>
        </SheetHeader>

        {/* Stage tabs */}
        <div className="flex gap-2 mb-4">
          {stages.map((stage) => {
            const isLocked = stage.id > unlockedStage;
            const isActive = activeStage === stage.id;
            const Icon = stage.icon;

            return (
              <Button
                key={stage.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                disabled={isLocked}
                onClick={() => handleStageSelect(stage.id)}
                className={cn(
                  "flex-1 min-h-[44px] text-sm gap-2",
                  isActive && "shadow-sm",
                  isLocked && "opacity-50"
                )}
                aria-label={
                  isLocked
                    ? `${stage.label} - noch gesperrt`
                    : `Stufe ${stage.id}: ${stage.label}`
                }
              >
                {isLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                {stage.label}
              </Button>
            );
          })}
        </div>

        <Separator className="mb-4" />

        {/* Positive feedback */}
        {highestUsedStage >= activeStage && (
          <div className="mb-4">
            <HelpPositiveFeedback stage={activeStage} />
          </div>
        )}

        {/* Stage content */}
        <div className="pb-4">
          {activeStage === 1 && <HelpTip text={hilfe.stufe1} />}
          {activeStage === 2 && (
            <HelpVisualization type={hilfe.stufe2} modul={modul} />
          )}
          {activeStage === 3 && <HelpStepByStep text={hilfe.stufe3} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
