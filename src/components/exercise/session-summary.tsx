"use client";

import { Check, X, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import type { Session } from "@/lib/types/exercise";
import { cn } from "@/lib/utils";

interface SessionSummaryProps {
  session: Session;
  endFeedback: string;
  onWeiterUeben: () => void;
  onZurueck: () => void;
}

export function SessionSummary({
  session,
  endFeedback,
  onWeiterUeben,
  onZurueck,
}: SessionSummaryProps) {
  const { duration, intensity } = useSensoryAnimation();
  const richtigeAnzahl = session.ergebnisse.filter((e) => e.richtig).length;
  const total = session.ergebnisse.length;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Trophy */}
      <motion.div
        initial={intensity !== "none" ? { scale: 0, rotate: -10 } : undefined}
        animate={intensity !== "none" ? { scale: 1, rotate: 0 } : undefined}
        transition={
          intensity !== "none"
            ? { duration, type: "spring", stiffness: 200 }
            : undefined
        }
      >
        <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="h-10 w-10 text-yellow-600" />
        </div>
      </motion.div>

      {/* Score */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          {richtigeAnzahl} von {total} richtig!
        </h2>
        <p className="text-lg text-muted-foreground mt-2">{endFeedback}</p>
      </div>

      {/* Results list */}
      <Card className="w-full max-w-md">
        <CardContent className="pt-4 space-y-2">
          {session.ergebnisse.map((ergebnis, i) => {
            const aufgabe = session.aufgaben.find(
              (a) => a.id === ergebnis.aufgabenId
            );
            return (
              <div
                key={ergebnis.aufgabenId}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm font-medium">
                  {i + 1}. {aufgabe?.aufgabentext ?? "Aufgabe"}
                </span>
                <Badge
                  variant={ergebnis.richtig ? "default" : "secondary"}
                  className={cn(
                    ergebnis.richtig
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  )}
                >
                  {ergebnis.richtig ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <X className="h-3 w-3 mr-1" />
                  )}
                  {ergebnis.richtig ? "Richtig" : `${ergebnis.versuche}x versucht`}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={onZurueck}
          className="text-lg px-6 py-5 h-auto min-h-[48px]"
        >
          Zurueck
        </Button>
        <Button
          size="lg"
          onClick={onWeiterUeben}
          className="text-lg px-6 py-5 h-auto min-h-[48px]"
        >
          Weiter ueben!
        </Button>
      </div>
    </div>
  );
}
