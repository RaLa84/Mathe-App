import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HelpUsageEntry {
  aufgabenId: string;
  modul: string;
  stufen: (1 | 2 | 3)[];
  zeitstempel: string;
  danachRichtig: boolean | null;
}

export interface HelpStoreState {
  usageLog: HelpUsageEntry[];
  currentEntry: {
    aufgabenId: string;
    modul: string;
    stufen: (1 | 2 | 3)[];
  } | null;

  startTracking: (aufgabenId: string, modul: string) => void;
  trackStage: (stage: 1 | 2 | 3) => void;
  finishTracking: (richtig: boolean) => void;
  resetCurrent: () => void;
  getHelpCount: () => number;
  getHelpThenCorrectCount: () => number;
}

export const useHelpStore = create<HelpStoreState>()(
  persist(
    (set, get) => ({
      usageLog: [],
      currentEntry: null,

      startTracking: (aufgabenId, modul) =>
        set({
          currentEntry: { aufgabenId, modul, stufen: [] },
        }),

      trackStage: (stage) =>
        set((s) => {
          if (!s.currentEntry) return s;
          if (s.currentEntry.stufen.includes(stage)) return s;
          return {
            currentEntry: {
              ...s.currentEntry,
              stufen: [...s.currentEntry.stufen, stage],
            },
          };
        }),

      finishTracking: (richtig) =>
        set((s) => {
          if (!s.currentEntry || s.currentEntry.stufen.length === 0) {
            return { currentEntry: null };
          }
          const entry: HelpUsageEntry = {
            aufgabenId: s.currentEntry.aufgabenId,
            modul: s.currentEntry.modul,
            stufen: s.currentEntry.stufen,
            zeitstempel: new Date().toISOString(),
            danachRichtig: richtig,
          };
          return {
            usageLog: [...s.usageLog, entry],
            currentEntry: null,
          };
        }),

      resetCurrent: () => set({ currentEntry: null }),

      getHelpCount: () => get().usageLog.length,

      getHelpThenCorrectCount: () =>
        get().usageLog.filter((e) => e.danachRichtig === true).length,
    }),
    {
      name: "mathe-app-help",
      partialize: (state) => ({
        usageLog: state.usageLog,
      }),
    }
  )
);
