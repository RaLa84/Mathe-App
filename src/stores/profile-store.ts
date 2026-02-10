import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SensoryProfile = "reizarm" | "standard" | "reizreich";
export type Grade = 1 | 2 | 3 | 4;
export type FontSize = "normal" | "gross" | "sehr-gross";

export type PauseInterval = 5 | 10 | 15 | 20;

export interface FrustrationThresholds {
  warn: number;
  offer: number;
  auto: number;
}

export interface NdSettings {
  confirmationStep: boolean;
  readAloud: boolean;
  permanentTools: boolean;
  lowStimulusWordProblems: boolean;
  helpAllStagesImmediate: boolean;
  hyperfokusMode: boolean;
  pauseInterval: PauseInterval;
  frustrationThresholds: FrustrationThresholds;
}

export type NdBooleanKey = {
  [K in keyof NdSettings]: NdSettings[K] extends boolean ? K : never;
}[keyof NdSettings];

export interface ProfileState {
  name: string;
  grade: Grade | null;
  sensoryProfile: SensoryProfile;
  fontSize: FontSize;
  preferredSessionLength: number;
  ndSettings: NdSettings;
  onboardingCompleted: boolean;
  createdAt: string | null;

  setName: (name: string) => void;
  setGrade: (grade: Grade) => void;
  setSensoryProfile: (profile: SensoryProfile) => void;
  setFontSize: (size: FontSize) => void;
  setPreferredSessionLength: (length: number) => void;
  setNdSetting: (key: NdBooleanKey, value: boolean) => void;
  setPauseInterval: (interval: PauseInterval) => void;
  setFrustrationThresholds: (thresholds: FrustrationThresholds) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const defaultNdSettings: NdSettings = {
  confirmationStep: false,
  readAloud: false,
  permanentTools: false,
  lowStimulusWordProblems: false,
  helpAllStagesImmediate: false,
  hyperfokusMode: false,
  pauseInterval: 10,
  frustrationThresholds: { warn: 2, offer: 3, auto: 5 },
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: "",
      grade: null,
      sensoryProfile: "standard",
      fontSize: "normal",
      preferredSessionLength: 5,
      ndSettings: { ...defaultNdSettings },
      onboardingCompleted: false,
      createdAt: null,

      setName: (name) => set({ name }),
      setGrade: (grade) => set({ grade }),
      setSensoryProfile: (sensoryProfile) => set({ sensoryProfile }),
      setFontSize: (fontSize) => set({ fontSize }),
      setPreferredSessionLength: (length) =>
        set({ preferredSessionLength: Math.min(10, Math.max(3, length)) }),
      setNdSetting: (key, value) =>
        set((state) => ({
          ndSettings: { ...state.ndSettings, [key]: value },
        })),
      setPauseInterval: (interval) =>
        set((state) => ({
          ndSettings: { ...state.ndSettings, pauseInterval: interval },
        })),
      setFrustrationThresholds: (thresholds) =>
        set((state) => ({
          ndSettings: { ...state.ndSettings, frustrationThresholds: thresholds },
        })),
      completeOnboarding: () =>
        set({
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
        }),
      resetProfile: () =>
        set({
          name: "",
          grade: null,
          sensoryProfile: "standard",
          fontSize: "normal",
          preferredSessionLength: 5,
          ndSettings: { ...defaultNdSettings },
          onboardingCompleted: false,
          createdAt: null,
        }),
    }),
    {
      name: "mathe-app-profile",
      version: 3,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as Record<string, unknown>;
        if (version < 2) {
          const nd = (state.ndSettings ?? {}) as Record<string, unknown>;
          return {
            ...state,
            ndSettings: {
              ...nd,
              helpAllStagesImmediate: nd.helpAllStagesImmediate ?? false,
              hyperfokusMode: false,
              pauseInterval: 10,
              frustrationThresholds: { warn: 2, offer: 3, auto: 5 },
            },
          };
        }
        if (version < 3) {
          const nd = (state.ndSettings ?? {}) as Record<string, unknown>;
          return {
            ...state,
            ndSettings: {
              ...nd,
              hyperfokusMode: nd.hyperfokusMode ?? false,
              pauseInterval: nd.pauseInterval ?? 10,
              frustrationThresholds: nd.frustrationThresholds ?? { warn: 2, offer: 3, auto: 5 },
            },
          };
        }
        return state;
      },
    }
  )
);
