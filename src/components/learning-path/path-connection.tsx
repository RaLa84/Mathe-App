"use client";

import { useProfileStore } from "@/stores/profile-store";

interface PathConnectionProps {
  completed: boolean;
}

export function PathConnection({ completed }: PathConnectionProps) {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);

  const lineColor = completed
    ? "border-primary"
    : "border-muted-foreground/30";

  const lineStyle = completed ? "border-solid" : "border-dashed";

  const height = sensoryProfile === "reizarm" ? "h-8" : "h-10";

  return (
    <div className="flex justify-center">
      <div
        className={`${height} border-l-2 ${lineStyle} ${lineColor} sensory-animate`}
      />
    </div>
  );
}
