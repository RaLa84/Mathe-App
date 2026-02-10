"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "@/stores/profile-store";
import { useSessionStore } from "@/stores/session-store";
import { useProgressStore } from "@/stores/progress-store";
import { useHelpStore } from "@/stores/help-store";
import { usePauseStore } from "@/stores/pause-store";
import { useRewardStore } from "@/stores/reward-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { loadModule, loadFeedbackTexts } from "@/lib/content-loader";
import {
  selectExercises,
  getRandomFeedback,
  getErrorFeedback,
  getSessionEndFeedback,
} from "@/lib/exercise-engine";
import {
  handleCorrectAnswer,
  handleWrongAnswer,
  handleHelpThenCorrect,
  handleSessionStart,
  checkSessionEndMilestones,
} from "@/lib/milestone-checker";
import { MilestoneCelebration } from "@/components/rewards/milestone-celebration";
import { InstantFeedback } from "@/components/rewards/instant-feedback";
import { PredictableProgress } from "@/components/rewards/predictable-progress";
import { getRandomRewardText } from "@/lib/milestone-checker";
import type { ErreichterMeilenstein } from "@/stores/reward-store";
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
import { PauseMenu } from "@/components/pause/pause-menu";
import { PauseReminder } from "@/components/pause/pause-reminder";
import {
  FrustrationDialog,
  type FrustrationAction,
} from "@/components/pause/frustration-dialog";
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
  const [showFrustrationDialog, setShowFrustrationDialog] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [instantFeedbackText, setInstantFeedbackText] = useState("");
  const [showInstantFeedback, setShowInstantFeedback] = useState(false);
  const [pendingMilestone, setPendingMilestone] = useState<ErreichterMeilenstein | null>(null);
  const sessionStartHandled = useRef(false);

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

  // Pause store
  const isPaused = usePauseStore((s) => s.isPaused);
  const elapsedMinutes = usePauseStore((s) => s.elapsedMinutes);
  const openPause = usePauseStore((s) => s.openPause);
  const closePause = usePauseStore((s) => s.closePause);
  const startTimer = usePauseStore((s) => s.startTimer);
  const tickTimer = usePauseStore((s) => s.tickTimer);
  const dismissReminder = usePauseStore((s) => s.dismissReminder);
  const sessionFailCount = usePauseStore((s) => s.sessionFailCount);
  const incrementFailCount = usePauseStore((s) => s.incrementFailCount);
  const resetFailCount = usePauseStore((s) => s.resetFailCount);
  const saveMoodEntry = usePauseStore((s) => s.saveMoodEntry);

  const { duration } = useSensoryAnimation();

  // Start session timer
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  // Tick timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 60000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // Check if pause reminder should show (AC-7.5)
  useEffect(() => {
    if (
      elapsedMinutes >= ndSettings.pauseInterval &&
      !ndSettings.hyperfokusMode && // AC-7.8: suppress in hyperfocus mode
      !isPaused &&
      phase !== "active" // AC: Wait until exercise is answered (E-7.5)
    ) {
      setShowReminder(true);
    }
  }, [elapsedMinutes, ndSettings.pauseInterval, ndSettings.hyperfokusMode, isPaused, phase]);

  // Track wrong answers for frustration cascade (AC-7.17-7.19)
  useEffect(() => {
    if (phase === "feedback" && lastAnswerCorrect === false) {
      incrementFailCount();
    }
    // Reset fail count on correct answers
    if (phase === "feedback" && lastAnswerCorrect === true) {
      resetFailCount();
    }
  }, [phase, lastAnswerCorrect, incrementFailCount, resetFailCount]);

  // AC-7.17: After warn threshold, show encouraging feedback + open help proactively
  useEffect(() => {
    if (
      phase === "feedback" &&
      lastAnswerCorrect === false &&
      currentAttempts >= ndSettings.frustrationThresholds.warn &&
      currentAttempts < ndSettings.frustrationThresholds.offer &&
      !frustrationTriggered
    ) {
      setHelpOpen(true);
    }
  }, [phase, lastAnswerCorrect, currentAttempts, ndSettings.frustrationThresholds.warn, ndSettings.frustrationThresholds.offer, frustrationTriggered]);

  // Show frustration dialog based on configurable thresholds (AC-7.18)
  useEffect(() => {
    if (
      phase === "feedback" &&
      lastAnswerCorrect === false &&
      currentAttempts >= ndSettings.frustrationThresholds.offer &&
      !frustrationTriggered
    ) {
      setShowFrustrationDialog(true);
    }
  }, [phase, lastAnswerCorrect, currentAttempts, ndSettings.frustrationThresholds.offer, frustrationTriggered]);

  // AC-7.19: After auto threshold (session-wide consecutive failures), show frustration dialog
  useEffect(() => {
    if (
      phase === "feedback" &&
      lastAnswerCorrect === false &&
      sessionFailCount >= ndSettings.frustrationThresholds.auto
    ) {
      setShowFrustrationDialog(true);
    }
  }, [phase, lastAnswerCorrect, sessionFailCount, ndSettings.frustrationThresholds.auto]);

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

  // PROJ-6: Handle session start milestones (Einstieg, Streak)
  useEffect(() => {
    if (currentSession && !sessionStartHandled.current) {
      sessionStartHandled.current = true;
      handleSessionStart(modul);
    }
  }, [currentSession, modul]);

  // Reset sessionStartHandled when loading changes (re-init)
  useEffect(() => {
    if (loading) {
      sessionStartHandled.current = false;
    }
  }, [loading]);

  // PROJ-6: Handle reward system on answer feedback
  useEffect(() => {
    if (phase === "feedback" && lastAnswerCorrect !== null && currentSession) {
      // Track daily exercise count (AC-6.22)
      useRewardStore.getState().incrementAufgabenHeute();

      if (lastAnswerCorrect) {
        // Correct answer: update series, check milestones (AC-6.2, AC-6.3)
        const milestones = handleCorrectAnswer(currentSession.modul);

        // Check if help was used and then correct (AC-6.7)
        const hilfeGenutzt = useSessionStore.getState().hilfeGenutztCurrent;
        if (hilfeGenutzt) {
          const helpMilestones = handleHelpThenCorrect();
          milestones.push(...helpMilestones);
        }

        // ADHS surprise stars (AC-6.14) - only if enabled in profile
        if (ndSettings.surpriseRewards) {
          const adhdSurprise = useRewardStore.getState().incrementAufgabenSeitBonus();
          if (adhdSurprise) {
            setInstantFeedbackText(getRandomRewardText("fuenferSerie"));
            setShowInstantFeedback(true);
          }
        }

        // Show sensory-adapted instant feedback on correct answer (AC-6.10, US-6.2)
        if (!showInstantFeedback) {
          const feedbackPool = [
            "Super!", "Toll!", "Richtig!", "Klasse!", "Weiter so!", "Genau!",
          ];
          setInstantFeedbackText(feedbackPool[Math.floor(Math.random() * feedbackPool.length)]);
          setShowInstantFeedback(true);
        }

        // Show instant milestone celebration if triggered
        if (milestones.length > 0) {
          const first = useRewardStore.getState().popCelebration();
          if (first) {
            setPendingMilestone(first);
          }
        }
      } else {
        // Wrong answer: reset series (no penalty - AC-6.20)
        handleWrongAnswer();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lastAnswerCorrect]);

  // Auto-hide instant feedback after a short delay (BUG-5 fix)
  useEffect(() => {
    if (!showInstantFeedback) return;
    const timer = setTimeout(() => setShowInstantFeedback(false), 1500);
    return () => clearTimeout(timer);
  }, [showInstantFeedback]);

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

  // Save mood entry when session ends
  useEffect(() => {
    if (phase === "summary" && currentSession) {
      saveMoodEntry(currentSession.id);
    }
  }, [phase, currentSession, saveMoodEntry]);

  const handleSubmit = useCallback(
    (answer: string) => {
      submitAnswer(answer);
    },
    [submitAnswer]
  );

  const handleWeiter = useCallback(() => {
    setShowFrustrationDialog(false);
    nextExercise();
  }, [nextExercise]);

  const handleRetry = useCallback(() => {
    retryExercise();
  }, [retryExercise]);

  const handlePause = useCallback(() => {
    setShowReminder(false);
    openPause();
  }, [openPause]);

  const handlePauseClose = useCallback(() => {
    closePause();
  }, [closePause]);

  const handleReminderDismiss = useCallback(() => {
    setShowReminder(false);
    dismissReminder();
  }, [dismissReminder]);

  const handleFrustrationAction = useCallback(
    (action: FrustrationAction) => {
      setShowFrustrationDialog(false);
      resetFailCount();
      switch (action) {
        case "tip":
          setHelpOpen(true);
          break;
        case "easier":
        case "skip":
          // Move to next exercise
          nextExercise();
          break;
        case "pause":
          openPause();
          break;
      }
    },
    [nextExercise, openPause, resetFailCount]
  );

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

    // PROJ-6: Check session-end milestones (stars, module master, etc.)
    checkSessionEndMilestones(
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

  // Session abort handler (AC-7.21, AC-7.22, AC-7.23)
  const handleSessionAbort = useCallback(() => {
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

  // Summary phase (AC-7.22: positive message on end)
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
        onExit={handleSessionAbort}
        onPause={handlePause}
      />

      <Card className="mt-4">
        <CardContent className="pt-6 space-y-6">
          {/* PROJ-6: ASS-Modus predictable progress (AC-6.13) */}
          <PredictableProgress
            currentCorrect={currentSession.ergebnisse.filter((e) => e.richtig).length}
            totalRequired={currentSession.aufgabenAnzahl}
          />

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
                      : lastAnswerCorrect === false &&
                          currentAttempts >= ndSettings.frustrationThresholds.warn &&
                          currentAttempts < ndSettings.frustrationThresholds.offer
                        ? "Kein Problem! Schau dir den Tipp an - der hilft bestimmt!"
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

          {/* PROJ-6: Sensory-adapted instant feedback (BUG-5 fix, AC-6.10, US-6.2) */}
          <InstantFeedback show={showInstantFeedback} text={instantFeedbackText} />

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

      {/* Pause Menu (AC-7.1 - AC-7.12) */}
      <PauseMenu open={isPaused} onClose={handlePauseClose} />

      {/* Pause Reminder (AC-7.5 - AC-7.8) */}
      <AnimatePresence>
        {showReminder && !isPaused && (
          <PauseReminder
            onPause={handlePause}
            onDismiss={handleReminderDismiss}
          />
        )}
      </AnimatePresence>

      {/* Frustration Dialog (AC-7.17 - AC-7.19) */}
      <FrustrationDialog
        open={showFrustrationDialog}
        isFirstExercise={currentIndex === 0}
        onAction={handleFrustrationAction}
      />

      {/* PROJ-6: Milestone Celebration Overlay (AC-6.10, AC-6.12) */}
      {pendingMilestone && (
        <MilestoneCelebration
          milestone={pendingMilestone}
          onDone={() => setPendingMilestone(null)}
        />
      )}
    </div>
  );
}
