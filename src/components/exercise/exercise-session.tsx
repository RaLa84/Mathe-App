"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "@/stores/profile-store";
import { useSessionStore } from "@/stores/session-store";
import { useProgressStore } from "@/stores/progress-store";
import { useHelpStore } from "@/stores/help-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { loadModule, loadFeedbackTexts } from "@/lib/content-loader";
import {
  selectExercises,
  getRandomFeedback,
  getErrorFeedback,
  getSessionEndFeedback,
} from "@/lib/exercise-engine";
import { ExerciseHeader } from "@/components/exercise/exercise-header";
import { ExerciseDisplay } from "@/components/exercise/exercise-display";
import { FeedbackDisplay } from "@/components/exercise/feedback-display";
import { ConfirmationDialog } from "@/components/exercise/confirmation-dialog";
import { SessionSummary } from "@/components/exercise/session-summary";
import { InputNumberPad } from "@/components/exercise/input-number-pad";
import { InputMultipleChoice } from "@/components/exercise/input-multiple-choice";
import { InputComparison } from "@/components/exercise/input-comparison";
import { InputDragDrop } from "@/components/exercise/input-drag-drop";
import { ToolToolbar } from "@/components/tools/tool-toolbar";
import { HelpButton } from "@/components/help/help-button";
import { HelpPanel } from "@/components/help/help-panel";
import type { Schwierigkeit, FeedbackTexts } from "@/lib/types/exercise";

interface ExerciseSessionProps {
  modul: string;
  schwierigkeit: Schwierigkeit;
  aufgabenAnzahl?: number;
  onExit: () => void;
}

export function ExerciseSession({
  modul,
  schwierigkeit,
  aufgabenAnzahl = 5,
  onExit,
}: ExerciseSessionProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackTexts, setFeedbackTexts] = useState<FeedbackTexts | null>(null);
  const [currentFeedbackText, setCurrentFeedbackText] = useState("");
  const [currentErrorFeedback, setCurrentErrorFeedback] = useState<string | null>(null);
  const [endFeedback, setEndFeedback] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);

  const grade = useProfileStore((s) => s.grade);
  const ndSettings = useProfileStore((s) => s.ndSettings);

  const phase = useSessionStore((s) => s.phase);
  const currentSession = useSessionStore((s) => s.currentSession);
  const currentIndex = useSessionStore((s) => s.currentIndex);
  const currentAttempts = useSessionStore((s) => s.currentAttempts);
  const pendingAnswer = useSessionStore((s) => s.pendingAnswer);
  const lastAnswerCorrect = useSessionStore((s) => s.lastAnswerCorrect);
  const frustrationTriggered = useSessionStore((s) => s.frustrationTriggered);

  const startSession = useSessionStore((s) => s.startSession);
  const submitAnswer = useSessionStore((s) => s.submitAnswer);
  const setPendingAnswer = useSessionStore((s) => s.setPendingAnswer);
  const confirmAnswer = useSessionStore((s) => s.confirmAnswer);
  const retryExercise = useSessionStore((s) => s.retryExercise);
  const nextExercise = useSessionStore((s) => s.nextExercise);
  const endSession = useSessionStore((s) => s.endSession);
  const markHilfeGenutzt = useSessionStore((s) => s.markHilfeGenutzt);
  const markHelpExhausted = useSessionStore((s) => s.markHelpExhausted);
  const finishHelpTracking = useHelpStore((s) => s.finishTracking);

  const { duration } = useSensoryAnimation();

  // Close help panel when moving to next exercise
  useEffect(() => {
    setHelpOpen(false);
  }, [currentIndex]);

  // Initialize session (or resume persisted one)
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Check if there's a persisted session we can resume (BUG-9)
        const persisted = useSessionStore.getState();
        if (
          persisted.currentSession &&
          persisted.currentSession.modul === modul &&
          persisted.currentSession.schwierigkeit === schwierigkeit &&
          persisted.phase !== "idle" &&
          persisted.phase !== "summary"
        ) {
          const fbTexts = await loadFeedbackTexts();
          if (!cancelled) {
            setFeedbackTexts(fbTexts);
            setLoading(false);
          }
          return;
        }

        const [modulData, fbTexts] = await Promise.all([
          loadModule(modul),
          loadFeedbackTexts(),
        ]);

        if (cancelled) return;

        if (!modulData) {
          setError("Oh, hier fehlt noch etwas. Probiere ein anderes Thema!");
          setLoading(false);
          return;
        }

        setFeedbackTexts(fbTexts);

        const exercises = selectExercises(
          modulData.aufgaben,
          schwierigkeit,
          aufgabenAnzahl
        );

        if (exercises.length === 0) {
          setError(
            "Fuer diese Schwierigkeitsstufe gibt es noch keine Aufgaben."
          );
          setLoading(false);
          return;
        }

        startSession(
          modul,
          modulData.name,
          schwierigkeit,
          exercises,
          Math.min(exercises.length, aufgabenAnzahl)
        );
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Etwas ist schiefgelaufen. Versuche es nochmal!");
          setLoading(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modul, schwierigkeit, aufgabenAnzahl]);

  // Finish help tracking when entering feedback phase
  useEffect(() => {
    if (phase === "feedback" && lastAnswerCorrect !== null) {
      finishHelpTracking(lastAnswerCorrect);
    }
  }, [phase, lastAnswerCorrect, finishHelpTracking]);

  // Generate feedback text when entering feedback phase
  useEffect(() => {
    if (phase === "feedback" && feedbackTexts && currentSession) {
      const aufgabe = currentSession.aufgaben[currentIndex];
      const isCorrect = lastAnswerCorrect === true;

      setCurrentFeedbackText(getRandomFeedback(isCorrect, feedbackTexts));

      if (!isCorrect) {
        const lastAnswer =
          currentSession.ergebnisse.length > 0
            ? currentSession.ergebnisse[currentSession.ergebnisse.length - 1]
                ?.antwort
            : null;
        setCurrentErrorFeedback(
          lastAnswer ? getErrorFeedback(aufgabe, lastAnswer) : null
        );
      } else {
        setCurrentErrorFeedback(null);
      }
    }
  }, [phase, feedbackTexts, currentSession, currentIndex, lastAnswerCorrect]);

  // Generate session end feedback
  useEffect(() => {
    if (phase === "summary" && feedbackTexts) {
      setEndFeedback(getSessionEndFeedback(feedbackTexts));
    }
  }, [phase, feedbackTexts]);

  const handleSubmit = useCallback(
    (answer: string) => {
      submitAnswer(answer);
    },
    [submitAnswer]
  );

  const handleWeiter = useCallback(() => {
    nextExercise();
  }, [nextExercise]);

  const handleRetry = useCallback(() => {
    retryExercise();
  }, [retryExercise]);

  const saveProgress = useCallback(() => {
    const session = useSessionStore.getState().currentSession;
    if (!session || session.ergebnisse.length === 0) return;

    const richtige = session.ergebnisse.filter((e) => e.richtig).length;
    useProgressStore
      .getState()
      .updateAfterSession(
        session.modul,
        session.schwierigkeit,
        richtige,
        session.ergebnisse.length
      );
  }, []);

  const handleWeiterUeben = useCallback(() => {
    saveProgress();
    endSession();
    // Re-trigger init by resetting loading state
    setLoading(true);
    setError(null);
  }, [saveProgress, endSession]);

  const handleZurueck = useCallback(() => {
    saveProgress();
    endSession();
    onExit();
  }, [saveProgress, endSession, onExit]);

  // Loading state
  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center space-y-4">
          <p className="text-lg">{error}</p>
          <button
            onClick={onExit}
            className="text-primary underline text-lg"
          >
            Zurueck
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!currentSession) return null;

  const currentAufgabe = currentSession.aufgaben[currentIndex];

  // Summary phase
  if (phase === "summary") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <SessionSummary
          session={currentSession}
          endFeedback={endFeedback}
          onWeiterUeben={handleWeiterUeben}
          onZurueck={handleZurueck}
        />
      </div>
    );
  }

  // Active + Feedback phases
  return (
    <div className="w-full max-w-2xl mx-auto">
      <ExerciseHeader
        modulName={currentSession.modulName}
        currentIndex={currentIndex}
        totalCount={currentSession.aufgabenAnzahl}
        schwierigkeit={schwierigkeit}
        onExit={handleZurueck}
      />

      <Card className="mt-4">
        <CardContent className="pt-6 space-y-6">
          {/* Task display - always visible (AC-4.2) */}
          <ExerciseDisplay aufgabe={currentAufgabe} />

          {/* Input or Feedback */}
          <AnimatePresence mode="wait">
            {phase === "active" && (
              <motion.div
                key={`input-${currentIndex}-${currentAttempts}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: Math.min(duration, 0.2) }}
              >
                {currentAufgabe.typ === "Zahleneingabe" && (
                  <InputNumberPad
                    aufgabe={currentAufgabe}
                    onSubmit={handleSubmit}
                  />
                )}
                {currentAufgabe.typ === "MultipleChoice" && (
                  <InputMultipleChoice
                    aufgabe={currentAufgabe}
                    onSubmit={handleSubmit}
                  />
                )}
                {currentAufgabe.typ === "Vergleich" && (
                  <InputComparison
                    aufgabe={currentAufgabe}
                    onSubmit={handleSubmit}
                  />
                )}
                {currentAufgabe.typ === "DragDrop" && (
                  <InputDragDrop
                    aufgabe={currentAufgabe}
                    onSubmit={handleSubmit}
                  />
                )}
              </motion.div>
            )}

            {phase === "feedback" && (
              <motion.div
                key={`feedback-${currentIndex}-${currentAttempts}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: Math.min(duration, 0.2) }}
              >
                <FeedbackDisplay
                  richtig={lastAnswerCorrect === true}
                  feedbackText={
                    frustrationTriggered
                      ? "Das ist schwierig, oder? Kein Problem - lass uns die naechste Aufgabe versuchen!"
                      : currentFeedbackText
                  }
                  errorFeedback={
                    frustrationTriggered ? null : currentErrorFeedback
                  }
                  onWeiter={handleWeiter}
                  onRetry={handleRetry}
                  canRetry={
                    lastAnswerCorrect === false &&
                    currentAttempts < 3 &&
                    !frustrationTriggered
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ADHD Confirmation Dialog (AC-4.17) */}
          {ndSettings.confirmationStep && pendingAnswer !== null && (
            <ConfirmationDialog
              open={true}
              answer={pendingAnswer}
              onConfirm={confirmAnswer}
              onCancel={() => setPendingAnswer(null)}
            />
          )}
        </CardContent>
      </Card>

      {/* Werkzeuge - tools do NOT count as help (AC-5.13) */}
      {grade && (ndSettings.permanentTools || phase === "active") && (
        <ToolToolbar
          grade={grade}
          permanent={ndSettings.permanentTools}
          modul={modul}
        />
      )}

      {/* Help System (PROJ-5) - AC-5.1: visible help button on every exercise */}
      <HelpButton onClick={() => setHelpOpen(true)} />
      <HelpPanel
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        hilfe={currentAufgabe.hilfe}
        modul={modul}
        onHelpUsed={markHilfeGenutzt}
        onAllStagesUsed={markHelpExhausted}
        exerciseId={currentAufgabe.id}
      />
    </div>
  );
}
