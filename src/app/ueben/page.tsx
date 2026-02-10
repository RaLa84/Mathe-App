"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/profile-store";
import { useSessionStore } from "@/stores/session-store";
import { usePauseStore } from "@/stores/pause-store";
import { ExerciseSession } from "@/components/exercise/exercise-session";
import { MoodCheck } from "@/components/mood/mood-check";
import { Button } from "@/components/ui/button";
import type { Schwierigkeit } from "@/lib/types/exercise";
import type { MoodValue } from "@/stores/pause-store";

const SESSION_LENGTHS = [3, 5, 7, 10] as const;

type UebenPhase = "length-select" | "mood-before" | "mood-encourage" | "session" | "mood-after" | "goodbye";

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
  const [uebenPhase, setUebenPhase] = useState<UebenPhase>("length-select");
  const [selectedLength, setSelectedLength] = useState<number>(5);

  const setMoodBefore = usePauseStore((s) => s.setMoodBefore);
  const setMoodAfter = usePauseStore((s) => s.setMoodAfter);
  const resetMood = usePauseStore((s) => s.resetMood);
  const resetSession = usePauseStore((s) => s.resetSession);

  const sessionPhase = useSessionStore((s) => s.phase);

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

  // Detect when session ends (summary phase) -> show mood-after check
  useEffect(() => {
    if (sessionPhase === "summary" && uebenPhase === "session") {
      setUebenPhase("mood-after");
    }
  }, [sessionPhase, uebenPhase]);

  const handleMoodBeforeSelect = useCallback(
    (mood: MoodValue) => {
      setMoodBefore(mood);
      // Edge case E-7.4: Bad mood gets encouraging screen
      if (mood <= 2) {
        setUebenPhase("mood-encourage");
      } else {
        setUebenPhase("session");
      }
    },
    [setMoodBefore]
  );

  const handleMoodBeforeSkip = useCallback(() => {
    setUebenPhase("session");
  }, []);

  const handleMoodAfterSelect = useCallback(
    (mood: MoodValue) => {
      setMoodAfter(mood);
      setUebenPhase("goodbye");
    },
    [setMoodAfter]
  );

  const handleMoodAfterSkip = useCallback(() => {
    setUebenPhase("goodbye");
  }, []);

  const handleExit = useCallback(() => {
    resetMood();
    resetSession();
    router.push("/learn");
  }, [resetMood, resetSession, router]);

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

  // If URL has explicit anzahl, skip length selection and mood-before
  if (urlAnzahl && uebenPhase === "length-select") {
    const anzahl = Math.min(10, Math.max(3, parseInt(urlAnzahl, 10)));

    return (
      <div className="min-h-screen sensory-bg p-4">
        <ExerciseSession
          modul={modul}
          schwierigkeit={schwierigkeit}
          aufgabenAnzahl={anzahl}
          onExit={() => {
            resetMood();
            resetSession();
            router.push("/learn");
          }}
        />
      </div>
    );
  }

  // Mood check before session (AC-7.13)
  if (uebenPhase === "mood-before") {
    return (
      <MoodCheck
        type="before"
        onSelect={handleMoodBeforeSelect}
        onSkip={handleMoodBeforeSkip}
      />
    );
  }

  // Encouraging screen for bad mood (E-7.4)
  if (uebenPhase === "mood-encourage") {
    return (
      <div className="min-h-screen sensory-bg p-4 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 text-center">
          <span className="text-6xl block" role="img" aria-hidden="true">
            💛
          </span>
          <h2 className="text-2xl font-bold">Das ist okay.</h2>
          <p className="text-lg text-muted-foreground">
            Mathe soll Spass machen. Moechtest du trotzdem eine Aufgabe
            probieren?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              onClick={() => setUebenPhase("session")}
              className="w-full text-lg py-6 h-auto"
            >
              Ja, ich probiere!
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleExit}
              className="w-full text-lg py-6 h-auto"
            >
              Lieber spaeter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active session
  if (uebenPhase === "session" || uebenPhase === "mood-after") {
    // Show mood-after as overlay when session is in summary
    if (uebenPhase === "mood-after") {
      return (
        <MoodCheck
          type="after"
          onSelect={handleMoodAfterSelect}
          onSkip={handleMoodAfterSkip}
        />
      );
    }

    return (
      <div className="min-h-screen sensory-bg p-4">
        <ExerciseSession
          modul={modul}
          schwierigkeit={schwierigkeit}
          aufgabenAnzahl={selectedLength}
          onExit={() => setUebenPhase("goodbye")}
        />
      </div>
    );
  }

  // Goodbye screen (AC-7.22)
  if (uebenPhase === "goodbye") {
    return (
      <div className="min-h-screen sensory-bg p-4 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 text-center">
          <span className="text-6xl block" role="img" aria-hidden="true">
            👋
          </span>
          <h2 className="text-2xl font-bold">
            Toll, dass du heute geuebt hast!
          </h2>
          <p className="text-lg text-muted-foreground">Bis bald!</p>
          <Button
            size="lg"
            onClick={handleExit}
            className="w-full text-lg py-6 h-auto"
          >
            Zurueck
          </Button>
        </div>
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
          onClick={() => setUebenPhase("mood-before")}
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
