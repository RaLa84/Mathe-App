import { useProfileStore } from "@/stores/profile-store";
import { useReducedMotion } from "framer-motion";

interface SensoryAnimationConfig {
  duration: number;
  enabled: boolean;
  intensity: "none" | "gentle" | "expressive";
}

export function useSensoryAnimation(): SensoryAnimationConfig {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return { duration: 0, enabled: false, intensity: "none" };
  }

  switch (sensoryProfile) {
    case "reizarm":
      return { duration: 0, enabled: false, intensity: "none" };
    case "standard":
      return { duration: 0.3, enabled: true, intensity: "gentle" };
    case "reizreich":
      return { duration: 0.5, enabled: true, intensity: "expressive" };
  }
}
