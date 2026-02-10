"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";
import { useProgressStore } from "@/stores/progress-store";
import type { ModulDefinition } from "./module-station";
import type { Schwierigkeit } from "@/lib/types/exercise";

interface ModuleDetailProps {
  modul: ModulDefinition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missingPrereqs: ModulDefinition[];
  lastActiveModulName: string | null;
}

const STUFEN: { key: Schwierigkeit; label: string; iconClass: string }[] = [
  { key: "Bronze", label: "Bronze", iconClass: "text-amber-600 fill-amber-600" },
  { key: "Silber", label: "Silber", iconClass: "text-slate-400 fill-slate-400" },
  { key: "Gold", label: "Gold", iconClass: "text-yellow-400 fill-yellow-400" },
];

export function ModuleDetail({
  modul,
  open,
  onOpenChange,
  missingPrereqs,
  lastActiveModulName,
}: ModuleDetailProps) {
  const router = useRouter();
  const preferredSessionLength = useProfileStore(
    (s) => s.preferredSessionLength
  );
  const getModulFortschritt = useProgressStore((s) => s.getModulFortschritt);

  if (!modul) return null;

  const fortschritt = getModulFortschritt(modul.id);

  function handleStart(stufe: Schwierigkeit) {
    router.push(`/ueben?modul=${modul!.id}&stufe=${stufe}`);
  }

  function isStufeErreicht(stufe: Schwierigkeit): boolean {
    switch (stufe) {
      case "Bronze":
        return !!fortschritt.bronzeErreicht;
      case "Silber":
        return !!fortschritt.silberErreicht;
      case "Gold":
        return !!fortschritt.goldErreicht;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{modul.name}</DialogTitle>
          <DialogDescription>{modul.beschreibung}</DialogDescription>
        </DialogHeader>

        {missingPrereqs.length > 0 && (
          <div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
            <p className="text-muted-foreground">
              Tipp: Probiere erst{" "}
              {missingPrereqs.map((p, i) => (
                <span key={p.id}>
                  <strong>{p.name}</strong>
                  {i < missingPrereqs.length - 1 ? " und " : ""}
                </span>
              ))}
            </p>
          </div>
        )}

        {lastActiveModulName && lastActiveModulName !== modul.name && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <p className="text-blue-700">
              Gleich kommt ein neues Thema! Vorher war es: <strong>{lastActiveModulName}</strong>
            </p>
          </div>
        )}

        <div className="space-y-3 mt-2">
          <p className="text-sm text-muted-foreground">
            Waehle eine Schwierigkeitsstufe:
          </p>

          {STUFEN.map(({ key, label, iconClass }) => {
            const erreicht = isStufeErreicht(key);

            return (
              <button
                type="button"
                key={key}
                onClick={() => handleStart(key)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 sensory-animate cursor-pointer text-left"
              >
                <Star
                  className={`w-5 h-5 ${erreicht ? iconClass : "text-muted-foreground/30"}`}
                />
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{label}</span>
                    {erreicht && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        Geschafft!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {preferredSessionLength} Aufgaben
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-2 text-xs text-muted-foreground text-center">
          Waehle eine Stufe und starte mit {preferredSessionLength} Aufgaben!
        </div>

        <div className="flex justify-end mt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Zurueck
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
