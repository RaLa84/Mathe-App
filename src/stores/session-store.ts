import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useProfileStore } from "@/stores/profile-store";
import { checkAnswer } from "@/lib/exercise-engine";
import type {
  Aufgabe,
  AufgabenErgebnis,
  Schwierigkeit,
  Session,
} from "@/lib/types/exercise";

export type SessionPhase = "idle" | "active" | "feedback" | "summary";

export interface SessionState {
  currentSession: Session | null;
  currentIndex: number;
  phase: SessionPhase;
  currentAttempts: number;
  pendingAnswer: string | null;
  lastAnswerCorrect: boolean | null;
  hilfeGenutztCurrent: boolean;
  previousAnswers: string[];
  frustrationTriggered: boolean;

  completedSessions: Session[];

  startSession: (
    modul: string,
    modulName: string,
    schwierigkeit: Schwierigkeit,
    aufgaben: Aufgabe[],
    anzahl?: number
  ) => void;
  submitAnswer: (answer: string) => void;
  setPendingAnswer: (answer: string | null) => void;
  confirmAnswer: () => void;
  retryExercise: () => void;
  nextExercise: () => void;
  endSession: () => void;
  resetCurrentSession: () => void;
  markHilfeGenutzt: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      currentIndex: 0,
      phase: "idle" as SessionPhase,
      currentAttempts: 0,
      pendingAnswer: null,
      lastAnswerCorrect: null,
      hilfeGenutztCurrent: false,
      previousAnswers: [],
      frustrationTriggered: false,

      completedSessions: [],

      startSession: (modul, modulName, schwierigkeit, aufgaben, anzahl = 5) =>
        set({
          currentSession: {
            id: crypto.randomUUID(),
            modul,
            modulName,
            schwierigkeit,
            aufgabenAnzahl: anzahl,
            aufgaben,
            ergebnisse: [],
            gestartetAm: new Date().toISOString(),
            beendetAm: null,
          },
          currentIndex: 0,
          phase: "active",
          currentAttempts: 0,
          pendingAnswer: null,
          lastAnswerCorrect: null,
          hilfeGenutztCurrent: false,
          previousAnswers: [],
          frustrationTriggered: false,
        }),

      submitAnswer: (answer: string) => {
        set({ pendingAnswer: answer });
        const needsConfirmation =
          useProfileStore.getState().ndSettings.confirmationStep;
        if (!needsConfirmation) {
          get().confirmAnswer();
        }
      },

      setPendingAnswer: (answer: string | null) => set({ pendingAnswer: answer }),

      markHilfeGenutzt: () => set({ hilfeGenutztCurrent: true }),

      confirmAnswer: () => {
        const state = get();
        if (!state.currentSession || state.pendingAnswer === null) return;

        const aufgabe =
          state.currentSession.aufgaben[state.currentIndex];
        const richtig = checkAnswer(aufgabe, state.pendingAnswer);
        const newAttempts = state.currentAttempts + 1;
        const newPreviousAnswers = [...state.previousAnswers, state.pendingAnswer];

        // BUG-10: Detect repeated identical wrong answers (frustration)
        const sameWrongCount = !richtig
          ? newPreviousAnswers.filter((a) => a === state.pendingAnswer).length
          : 0;
        const isFrustrated = sameWrongCount >= 3;

        const ergebnis: AufgabenErgebnis = {
          aufgabenId: aufgabe.id,
          antwort: state.pendingAnswer,
          richtig,
          versuche: newAttempts,
          hilfeGenutzt: state.hilfeGenutztCurrent,
          zeitstempel: new Date().toISOString(),
          sessionId: state.currentSession.id,
        };

        // Record result if correct or max attempts reached
        if (richtig || newAttempts >= 3) {
          set((s) => ({
            phase: "feedback",
            currentAttempts: newAttempts,
            pendingAnswer: null,
            lastAnswerCorrect: richtig,
            previousAnswers: newPreviousAnswers,
            frustrationTriggered: isFrustrated,
            currentSession: s.currentSession
              ? {
                  ...s.currentSession,
                  ergebnisse: [...s.currentSession.ergebnisse, ergebnis],
                }
              : null,
          }));
        } else {
          set({
            phase: "feedback",
            currentAttempts: newAttempts,
            pendingAnswer: null,
            lastAnswerCorrect: false,
            previousAnswers: newPreviousAnswers,
            frustrationTriggered: isFrustrated,
          });
        }
      },

      retryExercise: () => {
        set({
          phase: "active",
          pendingAnswer: null,
          lastAnswerCorrect: null,
        });
      },

      nextExercise: () => {
        const state = get();
        if (!state.currentSession) return;

        const nextIndex = state.currentIndex + 1;
        if (nextIndex >= state.currentSession.aufgabenAnzahl) {
          set({
            phase: "summary",
            currentSession: {
              ...state.currentSession,
              beendetAm: new Date().toISOString(),
            },
          });
        } else {
          set({
            currentIndex: nextIndex,
            phase: "active",
            currentAttempts: 0,
            pendingAnswer: null,
            lastAnswerCorrect: null,
            hilfeGenutztCurrent: false,
            previousAnswers: [],
            frustrationTriggered: false,
          });
        }
      },

      endSession: () => {
        const state = get();
        if (!state.currentSession) return;

        const finishedSession: Session = {
          ...state.currentSession,
          beendetAm:
            state.currentSession.beendetAm ?? new Date().toISOString(),
        };

        set({
          completedSessions: [...state.completedSessions, finishedSession],
          currentSession: null,
          phase: "idle",
          currentIndex: 0,
          currentAttempts: 0,
          pendingAnswer: null,
          lastAnswerCorrect: null,
          hilfeGenutztCurrent: false,
          previousAnswers: [],
          frustrationTriggered: false,
        });
      },

      resetCurrentSession: () =>
        set({
          currentSession: null,
          phase: "idle",
          currentIndex: 0,
          currentAttempts: 0,
          pendingAnswer: null,
          lastAnswerCorrect: null,
          hilfeGenutztCurrent: false,
          previousAnswers: [],
          frustrationTriggered: false,
        }),
    }),
    {
      name: "mathe-app-session",
      version: 2,
      partialize: (state) => ({
        completedSessions: state.completedSessions,
        currentSession: state.currentSession,
        currentIndex: state.currentIndex,
        phase: state.phase,
        currentAttempts: state.currentAttempts,
      }),
    }
  )
);
