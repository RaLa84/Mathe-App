"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-8 pb-8 flex flex-col items-center gap-6">
        <div className="text-6xl" role="img" aria-label="Winkende Hand">
          👋
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Willkommen bei der Mathe-App!
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Gemeinsam richten wir die App fuer Ihr Kind ein.
          Das dauert nur wenige Minuten.
        </p>
        <Button
          size="lg"
          className="mt-4 text-lg px-8 py-6 h-auto"
          onClick={onNext}
        >
          Weiter
        </Button>
      </CardContent>
    </Card>
  );
}
