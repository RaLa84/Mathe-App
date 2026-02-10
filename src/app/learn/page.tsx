"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { LearningPathMap } from "@/components/learning-path/learning-path-map";

export default function LearnPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useProfileStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    const unsub = useProfileStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    return () => {
      unsub();
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">
          Wird geladen...
        </div>
      </div>
    );
  }

  if (!useProfileStore.getState().onboardingCompleted) {
    router.replace("/");
    return null;
  }

  return <LearningPathMap />;
}
