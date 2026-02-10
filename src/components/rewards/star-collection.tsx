"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Award, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProfileStore } from "@/stores/profile-store";
import { useRewardStore } from "@/stores/reward-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { StarDisplay } from "./star-display";
import { StreakDisplay } from "./streak-display";
import type { Grade } from "@/stores/profile-store";
import moduleData from "@/content/module-definitions.json";

type GradeKey = "klasse1" | "klasse2" | "klasse3" | "klasse4";

interface ModulDef {
  id: string;
  name: string;
  klassenstufe: number;
}

function getModulesForGrade(grade: Grade): ModulDef[] {
  const key: GradeKey = `klasse${grade}` as GradeKey;
  return (moduleData[key] as ModulDef[]) ?? [];
}

interface StarCollectionProps {
  onBack: () => void;
}

export function StarCollection({ onBack }: StarCollectionProps) {
  const grade = useProfileStore((s) => s.grade) ?? 1;
  const name = useProfileStore((s) => s.name);
  const getModulSterne = useRewardStore((s) => s.getModulSterne);
  const getTotalSterne = useRewardStore((s) => s.getTotalSterne);
  const meilensteine = useRewardStore((s) => s.meilensteine);
  const { enabled, duration } = useSensoryAnimation();

  const modules = useMemo(() => getModulesForGrade(grade), [grade]);
  const totalSterne = getTotalSterne();

  // Special milestones (non-star ones)
  const specialMilestones = useMemo(
    () =>
      meilensteine.filter(
        (m) =>
          m.typ === "fuenferSerie" ||
          m.typ === "hilfeProfi" ||
          m.typ === "durchhalteHeld" ||
          m.typ === "modulMeister"
      ),
    [meilensteine]
  );

  return (
    <div className="min-h-screen sensory-bg">
      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{name}s Sterne</h1>
            <p className="text-sm text-muted-foreground">
              {totalSterne} {totalSterne === 1 ? "Stern" : "Sterne"} gesammelt!
            </p>
          </div>
        </div>

        {/* Streak section (AC-6.18) */}
        <Card>
          <CardContent className="pt-4">
            <StreakDisplay />
          </CardContent>
        </Card>

        {/* Stars per module (AC-6.15, AC-6.16, AC-6.17) */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Sterne pro Modul</h2>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-2">
              {modules.map((modul, index) => {
                const sterne = getModulSterne(modul.id);
                const starCount = [sterne.bronze, sterne.silber, sterne.gold].filter(Boolean).length;

                return enabled ? (
                  <motion.div
                    key={modul.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration }}
                  >
                    <Card>
                      <CardContent className="py-3 px-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {modul.name}
                            </p>
                            {starCount > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {starCount}/3 Sterne
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1.5">
                            <StarDisplay
                              stufe="bronze"
                              erreicht={!!sterne.bronze}
                              size="sm"
                              animate={false}
                            />
                            <StarDisplay
                              stufe="silber"
                              erreicht={!!sterne.silber}
                              size="sm"
                              animate={false}
                            />
                            <StarDisplay
                              stufe="gold"
                              erreicht={!!sterne.gold}
                              size="sm"
                              animate={false}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <Card key={modul.id}>
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {modul.name}
                          </p>
                          {starCount > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {starCount}/3 Sterne
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1.5">
                          <StarDisplay
                            stufe="bronze"
                            erreicht={!!sterne.bronze}
                            size="sm"
                            animate={false}
                          />
                          <StarDisplay
                            stufe="silber"
                            erreicht={!!sterne.silber}
                            size="sm"
                            animate={false}
                          />
                          <StarDisplay
                            stufe="gold"
                            erreicht={!!sterne.gold}
                            size="sm"
                            animate={false}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Special milestones gallery */}
        {specialMilestones.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Meilensteine</h2>
            <div className="grid grid-cols-2 gap-2">
              {specialMilestones.map((m, i) => (
                <Card key={`${m.typ}-${m.modul}-${i}`}>
                  <CardContent className="py-3 px-4 text-center">
                    <Award className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
                    <p className="text-xs font-medium">
                      {m.typ === "fuenferSerie" && "5er-Serie"}
                      {m.typ === "hilfeProfi" && "Hilfe-Profi"}
                      {m.typ === "durchhalteHeld" && "Durchhalte-Held"}
                      {m.typ === "modulMeister" && "Modul-Meister"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
