"use client";

import { useEffect } from "react";
import { useProfileStore } from "@/stores/profile-store";

export function SensoryProvider({ children }: { children: React.ReactNode }) {
  const sensoryProfile = useProfileStore((state) => state.sensoryProfile);

  useEffect(() => {
    document.documentElement.setAttribute("data-sensory", sensoryProfile);
  }, [sensoryProfile]);

  return <>{children}</>;
}
