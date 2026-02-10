"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useProfileStore } from "@/stores/profile-store";
import type { NdSettings } from "@/stores/profile-store";

interface NdSettingsStepProps {
  onNext: () => void;
}

const ND_OPTIONS: {
  key: keyof NdSettings;
  label: string;
  tag: string;
  description: string;
}[] = [
  {
    key: "confirmationStep",
    label: "Bestaetigungsschritt bei Antworten",
    tag: "ADHS",
    description:
      "Bevor eine Antwort abgeschickt wird, muss das Kind nochmal bestaetigen. Verhindert impulsive Fehler.",
  },
  {
    key: "readAloud",
    label: "Aufgaben vorlesen",
    tag: "LRS",
    description:
      "Alle Aufgabentexte koennen per Lautsprecher-Symbol vorgelesen werden.",
  },
  {
    key: "permanentTools",
    label: "Werkzeuge dauerhaft sichtbar",
    tag: "Dyskalkulie",
    description:
      "Zahlenstrahl, Zehnerfeld und andere Hilfsmittel sind immer eingeblendet.",
  },
  {
    key: "lowStimulusWordProblems",
    label: "Reizarme Sachaufgaben",
    tag: "ASS",
    description:
      "Sachaufgaben ohne komplexe soziale Szenarien. Klare, direkte Formulierungen.",
  },
];

export function NdSettingsStep({ onNext }: NdSettingsStepProps) {
  const ndSettings = useProfileStore((s) => s.ndSettings);
  const setNdSetting = useProfileStore((s) => s.setNdSetting);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          Braucht Ihr Kind besondere Anpassungen?
        </CardTitle>
        <CardDescription className="text-base">
          Alles optional. Aktivieren Sie nur, was hilfreich ist.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 max-w-md mx-auto">
        {ND_OPTIONS.map((option) => (
          <div
            key={option.key}
            className="flex items-start gap-4 p-4 rounded-lg border bg-card"
          >
            <Switch
              id={`nd-${option.key}`}
              checked={ndSettings[option.key]}
              onCheckedChange={(checked: boolean) =>
                setNdSetting(option.key, checked)
              }
              aria-describedby={`nd-${option.key}-desc`}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label
                htmlFor={`nd-${option.key}`}
                className="text-base font-medium cursor-pointer"
              >
                {option.label}
                <span className="ml-2 text-xs font-normal bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {option.tag}
                </span>
              </Label>
              <p
                id={`nd-${option.key}-desc`}
                className="text-sm text-muted-foreground mt-1"
              >
                {option.description}
              </p>
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground text-center">
          Diese Einstellungen koennen jederzeit im Elternbereich geaendert
          werden.
        </p>
        <Button
          size="lg"
          className="mt-2 text-lg px-8 py-6 h-auto self-center"
          onClick={onNext}
        >
          Weiter
        </Button>
      </CardContent>
    </Card>
  );
}
