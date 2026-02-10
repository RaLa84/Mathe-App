"use client";

import { Lightbulb, ArrowDown, Pause, SkipForward } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type FrustrationAction = "tip" | "easier" | "pause" | "skip";

interface FrustrationDialogProps {
  open: boolean;
  isFirstExercise: boolean;
  onAction: (action: FrustrationAction) => void;
}

export function FrustrationDialog({
  open,
  isFirstExercise,
  onAction,
}: FrustrationDialogProps) {
  const title = isFirstExercise
    ? "Diese Aufgabe ist neu fuer dich!"
    : "Das ist eine knifflige Aufgabe!";

  const subtitle = isFirstExercise
    ? "Lass uns mit einer leichteren anfangen!"
    : "Kein Problem - du hast mehrere Moeglichkeiten:";

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <p className="text-center text-muted-foreground mb-4">{subtitle}</p>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onAction("tip")}
            className="w-full justify-start gap-3 text-lg py-5 h-auto"
          >
            <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0" />
            Tipp nutzen
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onAction("easier")}
            className="w-full justify-start gap-3 text-lg py-5 h-auto"
          >
            <ArrowDown className="h-5 w-5 text-blue-500 shrink-0" />
            Leichtere Aufgabe
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onAction("pause")}
            className="w-full justify-start gap-3 text-lg py-5 h-auto"
          >
            <Pause className="h-5 w-5 text-green-500 shrink-0" />
            Pause machen
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onAction("skip")}
            className="w-full justify-start gap-3 text-lg py-5 h-auto"
          >
            <SkipForward className="h-5 w-5 text-gray-500 shrink-0" />
            Ueberspringen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
