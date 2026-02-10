"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Grade } from "@/stores/profile-store";

interface GradeSelectorProps {
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  unlockedGrades: Grade[];
}

export function GradeSelector({
  currentGrade,
  onGradeChange,
  unlockedGrades,
}: GradeSelectorProps) {
  const grades: Grade[] = [1, 2, 3, 4];

  return (
    <Tabs
      value={String(currentGrade)}
      onValueChange={(v) => onGradeChange(Number(v) as Grade)}
    >
      <TabsList className="grid grid-cols-4 w-full max-w-sm mx-auto">
        {grades.map((grade) => {
          const isUnlocked = unlockedGrades.includes(grade);
          const isLower = grade < currentGrade;

          return (
            <TabsTrigger
              key={grade}
              value={String(grade)}
              disabled={!isUnlocked && !isLower}
              className="text-base"
            >
              Klasse {grade}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
