import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  sessionId: string;
  moodBefore: MoodValue | null;
  moodAfter: MoodValue | null;
  timestamp: string;
}

export interface PauseState {
  // Session timer
  sessionStartTime: number | null;
  elapsedMinutes: number;
  reminderDue: boolean;
  reminderShown: boolean;
  isInputActive: boolean;

  // Pause state
  isPaused: boolean;
  pauseActivity: "menu" | "breathing" | "movement" | "rest" | null;

  // Mood tracking
  currentMoodBefore: MoodValue | null;
  currentMoodAfter: MoodValue | null;
  moodHistory: MoodEntry[];

  // Frustration tracking (per session, extends session-store)
  sessionFailCount: number;

  // Actions - Timer
  startTimer: () => void;
  tickTimer: () => void;
  resetTimer: () => void;
  setReminderShown: () => void;
  dismissReminder: () => void;
  setInputActive: (active: boolean) => void;

  // Actions - Pause
  openPause: () => void;
  closePause: () => void;
  setPauseActivity: (activity: "breathing" | "movement" | "rest" | null) => void;

  // Actions - Mood
  setMoodBefore: (mood: MoodValue) => void;
  setMoodAfter: (mood: MoodValue) => void;
  saveMoodEntry: (sessionId: string) => void;
  resetMood: () => void;

  // Actions - Frustration
  incrementFailCount: () => void;
  resetFailCount: () => void;

  // Reset
  resetSession: () => void;
}

export const usePauseStore = create<PauseState>()(
  persist(
    (set, get) => ({
      sessionStartTime: null,
      elapsedMinutes: 0,
      reminderDue: false,
      reminderShown: false,
      isInputActive: false,

      isPaused: false,
      pauseActivity: null,

      currentMoodBefore: null,
      currentMoodAfter: null,
      moodHistory: [],

      sessionFailCount: 0,

      startTimer: () =>
        set({
          sessionStartTime: Date.now(),
          elapsedMinutes: 0,
          reminderDue: false,
          reminderShown: false,
        }),

      tickTimer: () => {
        const state = get();
        if (!state.sessionStartTime || state.isPaused) return;

        const elapsed = Math.floor(
          (Date.now() - state.sessionStartTime) / 60000
        );
        set({ elapsedMinutes: elapsed });
      },

      resetTimer: () =>
        set({
          sessionStartTime: Date.now(),
          elapsedMinutes: 0,
          reminderDue: false,
          reminderShown: false,
        }),

      setReminderShown: () => set({ reminderShown: true }),

      dismissReminder: () =>
        set({
          reminderDue: false,
          reminderShown: false,
          // Reset timer so next reminder comes after another interval
          sessionStartTime: Date.now(),
          elapsedMinutes: 0,
        }),

      setInputActive: (active) => set({ isInputActive: active }),

      openPause: () =>
        set({
          isPaused: true,
          pauseActivity: "menu",
          reminderDue: false,
          reminderShown: false,
        }),

      closePause: () =>
        set({
          isPaused: false,
          pauseActivity: null,
          // Reset timer after pause
          sessionStartTime: Date.now(),
          elapsedMinutes: 0,
        }),

      setPauseActivity: (activity) => set({ pauseActivity: activity }),

      setMoodBefore: (mood) => set({ currentMoodBefore: mood }),
      setMoodAfter: (mood) => set({ currentMoodAfter: mood }),

      saveMoodEntry: (sessionId) => {
        const state = get();
        const entry: MoodEntry = {
          sessionId,
          moodBefore: state.currentMoodBefore,
          moodAfter: state.currentMoodAfter,
          timestamp: new Date().toISOString(),
        };
        set((s) => ({
          moodHistory: [...s.moodHistory, entry],
        }));
      },

      resetMood: () =>
        set({
          currentMoodBefore: null,
          currentMoodAfter: null,
        }),

      incrementFailCount: () =>
        set((s) => ({ sessionFailCount: s.sessionFailCount + 1 })),

      resetFailCount: () => set({ sessionFailCount: 0 }),

      resetSession: () =>
        set({
          sessionStartTime: null,
          elapsedMinutes: 0,
          reminderDue: false,
          reminderShown: false,
          isInputActive: false,
          isPaused: false,
          pauseActivity: null,
          currentMoodBefore: null,
          currentMoodAfter: null,
          sessionFailCount: 0,
        }),
    }),
    {
      name: "mathe-app-pause",
      version: 1,
      partialize: (state) => ({
        moodHistory: state.moodHistory,
      }),
    }
  )
);
