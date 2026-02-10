import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MeilensteinTyp =
  | "einstieg"
  | "ersteRichtige"
  | "fuenferSerie"
  | "bronzeStern"
  | "silberStern"
  | "goldStern"
  | "hilfeProfi"
  | "durchhalteHeld"
  | "modulMeister";

export interface ErreichterMeilenstein {
  typ: MeilensteinTyp;
  modul: string;
  erreichtAm: string;
  angezeigt: boolean;
  /** Override text for repeated achievements (E-6.1) */
  repeatText?: string;
}

export interface ModulSterne {
  modulId: string;
  bronze: string | null;
  silber: string | null;
  gold: string | null;
}

export interface RewardState {
  // Achieved milestones
  meilensteine: ErreichterMeilenstein[];

  // Stars per module (mirrors progress-store but reward-specific)
  sterne: Record<string, ModulSterne>;

  // Streak data
  letzteAktivitaet: string | null;
  aktuelleStreakLaenge: number;
  laengsteStreak: number;

  // Session series (consecutive correct answers)
  aktuelleSerieRichtig: number;
  besteSerieRichtig: number;

  // Help-then-correct counter (for Hilfe-Profi milestone)
  hilfeDannRichtigZaehler: number;

  // Pending milestones to show (FIFO queue)
  pendingCelebrations: ErreichterMeilenstein[];

  // ADHS surprise star tracking
  aufgabenSeitLetztemBonus: number;
  naechsterBonusBei: number;

  // Daily exercise counter (AC-6.22)
  aufgabenHeute: number;
  aufgabenGestern: number;
  aufgabenHeuteDatum: string | null;

  // Actions
  addMeilenstein: (typ: MeilensteinTyp, modul: string) => boolean;
  hasMeilenstein: (typ: MeilensteinTyp, modul: string) => boolean;
  updateSterne: (modulId: string, stufe: "bronze" | "silber" | "gold") => void;
  incrementSerie: () => void;
  resetSerie: () => void;
  incrementHilfeDannRichtig: () => void;
  updateStreak: () => void;
  popCelebration: () => ErreichterMeilenstein | null;
  markCelebrationShown: (typ: MeilensteinTyp, modul: string) => void;
  incrementAufgabenSeitBonus: () => boolean;
  incrementAufgabenHeute: () => void;
  getTotalSterne: () => number;
  getModulSterne: (modulId: string) => ModulSterne;
  resetRewards: () => void;
}

function getDateString(date?: Date): string {
  const d = date ?? new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** DST-safe yesterday calculation using setDate instead of ms arithmetic (BUG-8 fix) */
function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getDateString(d);
}

function randomBonusInterval(): number {
  // Variable reward: every 2-3 exercises
  return Math.floor(Math.random() * 2) + 2;
}

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      meilensteine: [],
      sterne: {},
      letzteAktivitaet: null,
      aktuelleStreakLaenge: 0,
      laengsteStreak: 0,
      aktuelleSerieRichtig: 0,
      besteSerieRichtig: 0,
      hilfeDannRichtigZaehler: 0,
      pendingCelebrations: [],
      aufgabenSeitLetztemBonus: 0,
      naechsterBonusBei: randomBonusInterval(),
      aufgabenHeute: 0,
      aufgabenGestern: 0,
      aufgabenHeuteDatum: null,

      addMeilenstein: (typ, modul) => {
        const state = get();
        // Check if already achieved (no double awards) - AC-6.20: no penalty
        const exists = state.meilensteine.some(
          (m) => m.typ === typ && m.modul === modul
        );
        if (exists) return false;

        const meilenstein: ErreichterMeilenstein = {
          typ,
          modul,
          erreichtAm: new Date().toISOString(),
          angezeigt: false,
        };

        set({
          meilensteine: [...state.meilensteine, meilenstein],
          pendingCelebrations: [...state.pendingCelebrations, meilenstein],
        });
        return true;
      },

      hasMeilenstein: (typ, modul) => {
        return get().meilensteine.some(
          (m) => m.typ === typ && m.modul === modul
        );
      },

      updateSterne: (modulId, stufe) => {
        const state = get();
        const existing = state.sterne[modulId] ?? {
          modulId,
          bronze: null,
          silber: null,
          gold: null,
        };
        if (existing[stufe]) return; // Already achieved

        const now = new Date().toISOString();
        set({
          sterne: {
            ...state.sterne,
            [modulId]: { ...existing, [stufe]: now },
          },
        });
      },

      incrementSerie: () => {
        const state = get();
        const neueSerie = state.aktuelleSerieRichtig + 1;
        set({
          aktuelleSerieRichtig: neueSerie,
          besteSerieRichtig: Math.max(neueSerie, state.besteSerieRichtig),
        });
      },

      resetSerie: () => {
        set({ aktuelleSerieRichtig: 0 });
      },

      incrementHilfeDannRichtig: () => {
        set((s) => ({
          hilfeDannRichtigZaehler: s.hilfeDannRichtigZaehler + 1,
        }));
      },

      updateStreak: () => {
        const state = get();
        const heute = getDateString();
        const gestern = getYesterdayString();

        if (state.letzteAktivitaet === heute) {
          // Already tracked today
          return;
        }

        if (state.letzteAktivitaet === gestern) {
          // Consecutive day
          const neueStreak = state.aktuelleStreakLaenge + 1;
          set({
            letzteAktivitaet: heute,
            aktuelleStreakLaenge: neueStreak,
            laengsteStreak: Math.max(neueStreak, state.laengsteStreak),
          });
        } else {
          // Streak broken or first day
          set({
            letzteAktivitaet: heute,
            aktuelleStreakLaenge: 1,
          });
        }
      },

      popCelebration: () => {
        const state = get();
        if (state.pendingCelebrations.length === 0) return null;

        const [next, ...rest] = state.pendingCelebrations;
        set({ pendingCelebrations: rest });
        return next;
      },

      markCelebrationShown: (typ, modul) => {
        set((s) => ({
          meilensteine: s.meilensteine.map((m) =>
            m.typ === typ && m.modul === modul
              ? { ...m, angezeigt: true }
              : m
          ),
        }));
      },

      incrementAufgabenSeitBonus: () => {
        const state = get();
        const neuerZaehler = state.aufgabenSeitLetztemBonus + 1;
        if (neuerZaehler >= state.naechsterBonusBei) {
          set({
            aufgabenSeitLetztemBonus: 0,
            naechsterBonusBei: randomBonusInterval(),
          });
          return true; // Trigger surprise star
        }
        set({ aufgabenSeitLetztemBonus: neuerZaehler });
        return false;
      },

      incrementAufgabenHeute: () => {
        const state = get();
        const heute = getDateString();
        if (state.aufgabenHeuteDatum === heute) {
          set({ aufgabenHeute: state.aufgabenHeute + 1 });
        } else {
          // New day: move today's count to yesterday
          set({
            aufgabenGestern: state.aufgabenHeuteDatum === getYesterdayString() ? state.aufgabenHeute : 0,
            aufgabenHeute: 1,
            aufgabenHeuteDatum: heute,
          });
        }
      },

      getTotalSterne: () => {
        const state = get();
        let total = 0;
        for (const s of Object.values(state.sterne)) {
          if (s.bronze) total++;
          if (s.silber) total++;
          if (s.gold) total++;
        }
        return total;
      },

      getModulSterne: (modulId) => {
        return (
          get().sterne[modulId] ?? {
            modulId,
            bronze: null,
            silber: null,
            gold: null,
          }
        );
      },

      resetRewards: () =>
        set({
          meilensteine: [],
          sterne: {},
          letzteAktivitaet: null,
          aktuelleStreakLaenge: 0,
          laengsteStreak: 0,
          aktuelleSerieRichtig: 0,
          besteSerieRichtig: 0,
          hilfeDannRichtigZaehler: 0,
          pendingCelebrations: [],
          aufgabenSeitLetztemBonus: 0,
          naechsterBonusBei: randomBonusInterval(),
          aufgabenHeute: 0,
          aufgabenGestern: 0,
          aufgabenHeuteDatum: null,
        }),
    }),
    {
      name: "mathe-app-rewards",
      version: 1,
      partialize: (state) => ({
        meilensteine: state.meilensteine,
        sterne: state.sterne,
        letzteAktivitaet: state.letzteAktivitaet,
        aktuelleStreakLaenge: state.aktuelleStreakLaenge,
        laengsteStreak: state.laengsteStreak,
        aktuelleSerieRichtig: state.aktuelleSerieRichtig,
        besteSerieRichtig: state.besteSerieRichtig,
        hilfeDannRichtigZaehler: state.hilfeDannRichtigZaehler,
        aufgabenSeitLetztemBonus: state.aufgabenSeitLetztemBonus,
        naechsterBonusBei: state.naechsterBonusBei,
        pendingCelebrations: state.pendingCelebrations,
        aufgabenHeute: state.aufgabenHeute,
        aufgabenGestern: state.aufgabenGestern,
        aufgabenHeuteDatum: state.aufgabenHeuteDatum,
      }),
    }
  )
);
