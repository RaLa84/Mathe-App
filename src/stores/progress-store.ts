import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Schwierigkeit } from "@/lib/types/exercise";

export type ModulStatus =
  | "nicht_gestartet"
  | "in_bearbeitung"
  | "bronze"
  | "silber"
  | "gold";

export interface ModulFortschritt {
  modulId: string;
  status: ModulStatus;
  bereitsGekonnt: boolean;
  bronzeErreicht: string | null;
  silberErreicht: string | null;
  goldErreicht: string | null;
  aufgabenGeloest: { bronze: number; silber: number; gold: number };
  letzteAktivitaet: string | null;
}

export interface ProgressState {
  fortschritt: Record<string, ModulFortschritt>;

  getModulFortschritt: (modulId: string) => ModulFortschritt;
  updateAfterSession: (
    modulId: string,
    schwierigkeit: Schwierigkeit,
    richtigeAntworten: number,
    gesamtAufgaben: number
  ) => void;
  markBereitsGekonnt: (modulId: string) => void;
  resetProgress: () => void;
}

function createDefaultFortschritt(modulId: string): ModulFortschritt {
  return {
    modulId,
    status: "nicht_gestartet",
    bereitsGekonnt: false,
    bronzeErreicht: null,
    silberErreicht: null,
    goldErreicht: null,
    aufgabenGeloest: { bronze: 0, silber: 0, gold: 0 },
    letzteAktivitaet: null,
  };
}

function berechneStatus(fortschritt: ModulFortschritt): ModulStatus {
  if (fortschritt.goldErreicht) return "gold";
  if (fortschritt.silberErreicht) return "silber";
  if (fortschritt.bronzeErreicht) return "bronze";
  if (fortschritt.letzteAktivitaet) return "in_bearbeitung";
  return "nicht_gestartet";
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      fortschritt: {},

      getModulFortschritt: (modulId: string) => {
        return (
          get().fortschritt[modulId] ?? createDefaultFortschritt(modulId)
        );
      },

      updateAfterSession: (
        modulId: string,
        schwierigkeit: Schwierigkeit,
        richtigeAntworten: number,
        gesamtAufgaben: number
      ) => {
        const state = get();
        const existing =
          state.fortschritt[modulId] ?? createDefaultFortschritt(modulId);
        const now = new Date().toISOString();

        const stufeKey = schwierigkeit.toLowerCase() as "bronze" | "silber" | "gold";
        const neueGeloest = {
          ...existing.aufgabenGeloest,
          [stufeKey]: existing.aufgabenGeloest[stufeKey] + richtigeAntworten,
        };

        // Stern erreicht wenn >= 80% richtig in einer Session
        const sternErreicht = richtigeAntworten / gesamtAufgaben >= 0.8;
        const zeitstempelKey = `${stufeKey}Erreicht` as
          | "bronzeErreicht"
          | "silberErreicht"
          | "goldErreicht";

        const updated: ModulFortschritt = {
          ...existing,
          aufgabenGeloest: neueGeloest,
          letzteAktivitaet: now,
          [zeitstempelKey]:
            sternErreicht && !existing[zeitstempelKey]
              ? now
              : existing[zeitstempelKey],
        };
        updated.status = berechneStatus(updated);

        set({
          fortschritt: {
            ...state.fortschritt,
            [modulId]: updated,
          },
        });
      },

      markBereitsGekonnt: (modulId: string) => {
        const state = get();
        const existing =
          state.fortschritt[modulId] ?? createDefaultFortschritt(modulId);

        set({
          fortschritt: {
            ...state.fortschritt,
            [modulId]: {
              ...existing,
              bereitsGekonnt: true,
            },
          },
        });
      },

      resetProgress: () => set({ fortschritt: {} }),
    }),
    {
      name: "mathe-app-progress",
      version: 1,
    }
  )
);
