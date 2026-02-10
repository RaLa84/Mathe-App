"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { ExerciseSession } from "@/components/exercise/exercise-session";
import { Button } from "@/components/ui/button";
import type { Schwierigkeit } from "@/lib/types/exercise";

const SESSION_LENGTHS = [3, 5, 7, 10] as const;

function UebenContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const onboardingCompleted = useProfileStore((s) => s.onboardingCompleted);
  const preferredSessionLength = useProfileStore(
    (s) => s.preferredSessionLength
  );
  const setPreferredSessionLength = useProfileStore(
    (s) => s.setPreferredSessionLength
  );
  const [hydrated, setHydrated] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedLength, setSelectedLength] = useState<number>(5);

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

  useEffect(() => {
    if (hydrated) {
      setSelectedLength(preferredSessionLength);
    }
  }, [hydrated, preferredSessionLength]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">
          Wird geladen...
        </div>
      </div>
    );
  }

  if (!onboardingCompleted) {
    router.replace("/");
    return null;
  }

  const modul = searchParams.get("modul") || "M1.3";
  const schwierigkeit =
    (searchParams.get("stufe") as Schwierigkeit) || "Bronze";
  const urlAnzahl = searchParams.get("anzahl");

  // If URL has explicit anzahl or session already started, show session directly
  if (sessionStarted || urlAnzahl) {
    const anzahl = urlAnzahl
      ? Math.min(10, Math.max(3, parseInt(urlAnzahl, 10)))
      : selectedLength;

    return (
      <div className="min-h-screen sensory-bg p-4">
        <ExerciseSession
          modul={modul}
          schwierigkeit={schwierigkeit}
          aufgabenAnzahl={anzahl}
          onExit={() => router.push("/learn")}
        />
      </div>
    );
  }

  // Pre-session: let user choose session length
  return (
    <div className="min-h-screen sensory-bg p-4 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h2 className="text-2xl font-bold">Wie viele Aufgaben?</h2>
        <div className="flex gap-2 justify-center">
          {SESSION_LENGTHS.map((len) => (
            <Button
              key={len}
              variant={selectedLength === len ? "default" : "outline"}
              size="lg"
              onClick={() => {
                setSelectedLength(len);
                setPreferredSessionLength(len);
              }}
              className="text-xl min-w-[56px] min-h-[56px]"
            >
              {len}
            </Button>
          ))}
        </div>
        <Button
          size="lg"
          onClick={() => setSessionStarted(true)}
          className="w-full text-lg py-6 h-auto"
        >
          Los geht&apos;s!
        </Button>
      </div>
    </div>
  );
}

export default function UebenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-muted-foreground">
            Wird geladen...
          </div>
        </div>
      }
    >
      <UebenContent />
    </Suspense>
  );
}
