"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileStore } from "@/stores/profile-store";
import { Check, Sparkles } from "lucide-react";

interface SummaryStepProps {
  onComplete: () => void;
}

const SENSORY_LABELS: Record<string, string> = {
  reizarm: "Reizarm",
  standard: "Standard",
  reizreich: "Reizreich",
};

const ND_LABELS: Record<string, string> = {
  confirmationStep: "Bestaetigungsschritt (ADHS)",
  readAloud: "Vorlesefunktion (LRS)",
  permanentTools: "Werkzeuge dauerhaft sichtbar (Dyskalkulie)",
  lowStimulusWordProblems: "Reizarme Sachaufgaben (ASS)",
  helpAllStagesImmediate: "Alle Hilfe-Stufen sofort verfuegbar",
};

export function SummaryStep({ onComplete }: SummaryStepProps) {
  const name = useProfileStore((s) => s.name);
  const grade = useProfileStore((s) => s.grade);
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const ndSettings = useProfileStore((s) => s.ndSettings);
  const completeOnboarding = useProfileStore((s) => s.completeOnboarding);

  const activeNdSettings = Object.entries(ndSettings).filter(
    ([, value]) => value
  );

  function handleComplete() {
    completeOnboarding();
    onComplete();
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          Toll! {name} ist bereit!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 max-w-md mx-auto">
        <SummaryRow label="Name" value={name} />
        <SummaryRow label="Klassenstufe" value={`Klasse ${grade}`} />
        <SummaryRow
          label="Sensorik-Profil"
          value={SENSORY_LABELS[sensoryProfile] ?? sensoryProfile}
        />

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Anpassungen
          </p>
          {activeNdSettings.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Keine besonderen Anpassungen aktiviert.
            </p>
          ) : (
            <ul className="space-y-2">
              {activeNdSettings.map(([key]) => (
                <li key={key} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  {ND_LABELS[key]}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Alle Einstellungen koennen spaeter im Elternbereich geaendert werden.
        </p>

        <Button
          size="lg"
          className="mt-4 text-lg px-8 py-6 h-auto self-center"
          onClick={handleComplete}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Los geht&apos;s!
        </Button>
      </CardContent>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
