import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SensoryProfile = "reizarm" | "standard" | "reizreich";
export type Grade = 1 | 2 | 3 | 4;

export interface NdSettings {
  confirmationStep: boolean;
  readAloud: boolean;
  permanentTools: boolean;
  lowStimulusWordProblems: boolean;
}

export interface ProfileState {
  name: string;
  grade: Grade | null;
  sensoryProfile: SensoryProfile;
  ndSettings: NdSettings;
  onboardingCompleted: boolean;
  createdAt: string | null;

  setName: (name: string) => void;
  setGrade: (grade: Grade) => void;
  setSensoryProfile: (profile: SensoryProfile) => void;
  setNdSetting: (key: keyof NdSettings, value: boolean) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
}

const defaultNdSettings: NdSettings = {
  confirmationStep: false,
  readAloud: false,
  permanentTools: false,
  lowStimulusWordProblems: false,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: "",
      grade: null,
      sensoryProfile: "standard",
      ndSettings: { ...defaultNdSettings },
      onboardingCompleted: false,
      createdAt: null,

      setName: (name) => set({ name }),
      setGrade: (grade) => set({ grade }),
      setSensoryProfile: (sensoryProfile) => set({ sensoryProfile }),
      setNdSetting: (key, value) =>
        set((state) => ({
          ndSettings: { ...state.ndSettings, [key]: value },
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
          ndSettings: { ...defaultNdSettings },
          onboardingCompleted: false,
          createdAt: null,
        }),
    }),
    {
      name: "mathe-app-profile",
      version: 1,
    }
  )
);
