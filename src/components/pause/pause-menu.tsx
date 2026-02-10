"use client";

import { useState } from "react";
import { Wind, Activity, Coffee, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BreathingExercise } from "@/components/pause/breathing-exercise";
import { MovementBreak } from "@/components/pause/movement-break";

interface PauseMenuProps {
  open: boolean;
  onClose: () => void;
}

export function PauseMenu({ open, onClose }: PauseMenuProps) {
  const [activity, setActivity] = useState<
    "menu" | "breathing" | "movement" | "rest"
  >("menu");

  const handleClose = () => {
    setActivity("menu");
    onClose();
  };

  const handleActivityDone = () => {
    setActivity("rest");
  };

  const handleActivityCancel = () => {
    setActivity("menu");
  };

  // Fullscreen activities
  if (activity === "breathing") {
    return <BreathingExercise onClose={handleActivityDone} onCancel={handleActivityCancel} />;
  }

  if (activity === "movement") {
    return <MovementBreak onClose={handleActivityDone} onCancel={handleActivityCancel} />;
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {activity === "rest"
              ? "Gute Pause!"
              : "Du machst eine Pause - super!"}
          </DialogTitle>
        </DialogHeader>

        {activity === "menu" && (
          <div className="space-y-3 py-4">
            <p className="text-center text-muted-foreground mb-4">
              Was moechtest du machen?
            </p>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setActivity("breathing")}
              className="w-full justify-start gap-3 text-lg py-6 h-auto"
            >
              <Wind className="h-6 w-6 text-blue-500 shrink-0" />
              Atemuebung
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setActivity("movement")}
              className="w-full justify-start gap-3 text-lg py-6 h-auto"
            >
              <Activity className="h-6 w-6 text-green-500 shrink-0" />
              Bewegungspause
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setActivity("rest")}
              className="w-full justify-start gap-3 text-lg py-6 h-auto"
            >
              <Coffee className="h-6 w-6 text-amber-500 shrink-0" />
              Einfach nur Pause
            </Button>
          </div>
        )}

        {activity === "rest" && (
          <div className="space-y-4 py-4 text-center">
            <p className="text-lg text-muted-foreground">
              Ausgeruhte Koepfe rechnen besser!
            </p>
            <p className="text-muted-foreground">
              Bereit fuer die naechste Aufgabe?
            </p>

            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActivity("menu")}
                className="text-lg py-5 h-auto"
              >
                Noch etwas Pause
              </Button>
              <Button
                size="lg"
                onClick={handleClose}
                className="text-lg py-5 h-auto gap-2"
              >
                Ja, weiter! <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
