"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";
import { useProgressStore } from "@/stores/progress-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import type { Grade } from "@/stores/profile-store";
import { GradeSelector } from "./grade-selector";
import { ModuleStation } from "./module-station";
import type { ModulDefinition } from "./module-station";
import { PathConnection } from "./path-connection";
import { ModuleDetail } from "./module-detail";
import { ScrollArea } from "@/components/ui/scroll-area";
import moduleData from "@/content/module-definitions.json";

type GradeKey = "klasse1" | "klasse2" | "klasse3" | "klasse4";

function getModulesForGrade(grade: Grade): ModulDefinition[] {
  const key: GradeKey = `klasse${grade}` as GradeKey;
  return (moduleData[key] as ModulDefinition[]) ?? [];
}

function getRecommendedModuleId(
  modules: ModulDefinition[],
  fortschrittMap: Record<string, ReturnType<typeof useProgressStore.getState>["fortschritt"][string]>
): string | null {
  for (const modul of modules) {
    if (!modul.hasContent) continue;
    const progress = fortschrittMap[modul.id];
    if (!progress || progress.status !== "gold") {
      return modul.id;
    }
  }
  return null;
}

export function LearningPathMap() {
  const grade = useProfileStore((s) => s.grade);
  const name = useProfileStore((s) => s.name);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(grade ?? 1);
  const [selectedModul, setSelectedModul] = useState<ModulDefinition | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const fortschritt = useProgressStore((s) => s.fortschritt);
  const getModulFortschritt = useProgressStore((s) => s.getModulFortschritt);
  const { enabled: animEnabled, duration: animDuration, intensity } = useSensoryAnimation();

  useEffect(() => {
    if (useProgressStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    const unsub = useProgressStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    return () => {
      unsub();
    };
  }, []);

  const modules = useMemo(
    () => getModulesForGrade(selectedGrade),
    [selectedGrade]
  );

  const recommendedId = useMemo(
    () => getRecommendedModuleId(modules, fortschritt),
    [modules, fortschritt]
  );

  const allGold = useMemo(() => {
    if (modules.length === 0) return false;
    return modules.every((m) => {
      const f = fortschritt[m.id];
      return f?.status === "gold";
    });
  }, [modules, fortschritt]);

  const lastActiveModulName = useMemo(() => {
    let latest: { name: string; time: string } | null = null;
    for (const m of modules) {
      const f = fortschritt[m.id];
      if (f?.letzteAktivitaet) {
        if (!latest || f.letzteAktivitaet > latest.time) {
          latest = { name: m.name, time: f.letzteAktivitaet };
        }
      }
    }
    return latest?.name ?? null;
  }, [modules, fortschritt]);

  const unlockedGrades: Grade[] = useMemo(() => {
    const grades: Grade[] = [];
    if (grade) {
      for (let g = 1; g <= grade; g++) {
        grades.push(g as Grade);
      }
    } else {
      grades.push(1);
    }
    return grades;
  }, [grade]);

  function handleModuleClick(modul: ModulDefinition) {
    setSelectedModul(modul);
    setDetailOpen(true);
  }

  function getMissingPrereqs(modul: ModulDefinition): ModulDefinition[] {
    if (modul.voraussetzungen.length === 0) return [];

    return modul.voraussetzungen
      .filter((preId) => {
        const f = fortschritt[preId];
        return (
          !f ||
          f.status === "nicht_gestartet" ||
          f.status === "in_bearbeitung"
        );
      })
      .map((preId) => modules.find((m) => m.id === preId))
      .filter(Boolean) as ModulDefinition[];
  }

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">
          Wird geladen...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sensory-bg">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 pt-2">
          <h1 className="text-2xl font-bold">Hallo {name}!</h1>
          <p className="text-sm text-muted-foreground">Dein Lernpfad</p>
        </div>

        {/* Grade Selector */}
        <GradeSelector
          currentGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          unlockedGrades={unlockedGrades}
        />

        {/* Learning Path */}
        {modules.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">Bald verfuegbar!</p>
            <p className="text-sm mt-1">
              Inhalte fuer Klasse {selectedGrade} kommen bald.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-0 pb-8">
              {modules.map((modul, index) => {
                const f = getModulFortschritt(modul.id);
                const prevCompleted =
                  index === 0
                    ? true
                    : (fortschritt[modules[index - 1].id]?.status === "bronze" ||
                       fortschritt[modules[index - 1].id]?.status === "silber" ||
                       fortschritt[modules[index - 1].id]?.status === "gold");

                return (
                  <div key={modul.id}>
                    {index > 0 && (
                      <PathConnection completed={prevCompleted} />
                    )}
                    <ModuleStation
                      modul={modul}
                      status={f.status}
                      bereitsGekonnt={f.bereitsGekonnt}
                      isRecommended={modul.id === recommendedId}
                      onClick={() => handleModuleClick(modul)}
                    />
                  </div>
                );
              })}

              {/* All Gold celebration */}
              {allGold && (
                <div className="text-center py-8 space-y-3">
                  {animEnabled ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: animDuration,
                        type: "spring",
                        stiffness: intensity === "expressive" ? 150 : 200,
                      }}
                      className="flex justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                    </div>
                  )}
                  <p className="text-2xl font-bold">
                    Du hast Klasse {selectedGrade} geschafft!
                  </p>
                  <p className="text-muted-foreground">Unglaublich!</p>
                  {selectedGrade < 4 &&
                    unlockedGrades.includes(
                      (selectedGrade + 1) as Grade
                    ) && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedGrade((selectedGrade + 1) as Grade)
                        }
                        className="text-primary font-medium underline underline-offset-4"
                      >
                        Klasse {selectedGrade + 1} starten
                      </button>
                    )}
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Module Detail Dialog */}
      <ModuleDetail
        modul={selectedModul}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        missingPrereqs={selectedModul ? getMissingPrereqs(selectedModul) : []}
        lastActiveModulName={lastActiveModulName}
      />
    </div>
  );
}
