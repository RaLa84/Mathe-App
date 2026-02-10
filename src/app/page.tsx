"use client";

import { useState, useEffect } from "react";
import { useProfileStore } from "@/stores/profile-store";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { WelcomeScreen } from "@/components/welcome-screen";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHydration = () => {
      setShowOnboarding(!useProfileStore.getState().onboardingCompleted);
    };

    if (useProfileStore.persist.hasHydrated()) {
      checkHydration();
    }

    const unsub = useProfileStore.persist.onFinishHydration(checkHydration);
    return () => {
      unsub();
    };
  }, []);

  if (showOnboarding === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">
          Wird geladen...
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return <WelcomeScreen />;
}
