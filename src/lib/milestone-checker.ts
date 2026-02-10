import { useRewardStore } from "@/stores/reward-store";
import { useProgressStore } from "@/stores/progress-store";
import { useHelpStore } from "@/stores/help-store";
import type { MeilensteinTyp, ErreichterMeilenstein } from "@/stores/reward-store";
import type { Schwierigkeit } from "@/lib/types/exercise";
import rewardTexts from "@/content/reward-texts.json";

type RewardTextKey = keyof typeof rewardTexts;

export function getRandomRewardText(typ: MeilensteinTyp): string {
  const keyMap: Record<MeilensteinTyp, RewardTextKey> = {
    einstieg: "einstieg",
    ersteRichtige: "ersteRichtige",
    fuenferSerie: "fuenferSerie",
    bronzeStern: "bronzeStern",
    silberStern: "silberStern",
    goldStern: "goldStern",
    hilfeProfi: "hilfeProfi",
    durchhalteHeld: "durchhalteHeld",
    modulMeister: "modulMeister",
  };

  const pool = rewardTexts[keyMap[typ]];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomText(key: RewardTextKey): string {
  const pool = rewardTexts[key];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Check if "Einstieg" milestone should trigger (AC-6.1):
 * First exercise in a new module
 */
export function checkEinstieg(modul: string): boolean {
  const rewardStore = useRewardStore.getState();
  return rewardStore.addMeilenstein("einstieg", modul);
}

/**
 * Check if "Erste Richtige" milestone should trigger (AC-6.2):
 * First correct answer in a module
 */
export function checkErsteRichtige(modul: string): boolean {
  const rewardStore = useRewardStore.getState();
  return rewardStore.addMeilenstein("ersteRichtige", modul);
}

/**
 * Check if "5er-Serie" milestone should trigger (AC-6.3):
 * 5 correct answers in a row within a session
 */
export function checkFuenferSerie(modul: string): boolean {
  const rewardStore = useRewardStore.getState();
  if (rewardStore.aktuelleSerieRichtig >= 5) {
    return rewardStore.addMeilenstein("fuenferSerie", modul);
  }
  return false;
}

/**
 * Check if star milestones should trigger (AC-6.4, AC-6.5, AC-6.6):
 * When a difficulty level is completed with >= 80%
 */
export function checkSternMeilenstein(
  modul: string,
  schwierigkeit: Schwierigkeit,
  richtige: number,
  gesamt: number
): MeilensteinTyp | null {
  if (gesamt === 0 || richtige / gesamt < 0.8) return null;

  const rewardStore = useRewardStore.getState();
  const stufe = schwierigkeit.toLowerCase() as "bronze" | "silber" | "gold";

  // Update star in reward store
  rewardStore.updateSterne(modul, stufe);

  const typMap: Record<string, MeilensteinTyp> = {
    bronze: "bronzeStern",
    silber: "silberStern",
    gold: "goldStern",
  };

  const typ = typMap[stufe];
  const added = rewardStore.addMeilenstein(typ, modul);
  if (!added && rewardStore.hasMeilenstein(typ, modul)) {
    // E-6.1: Repeated achievement - show "wiederholtGeschafft" celebration
    const text = getRandomText("wiederholtGeschafft");
    useRewardStore.setState((s) => ({
      pendingCelebrations: [...s.pendingCelebrations, {
        typ,
        modul,
        erreichtAm: new Date().toISOString(),
        angezeigt: false,
        repeatText: text,
      }],
    }));
  }
  return added ? typ : null;
}

/**
 * Check if "Modul-Meister" milestone should trigger (AC-6.9):
 * All 3 levels of a module completed
 */
export function checkModulMeister(modul: string): boolean {
  const rewardStore = useRewardStore.getState();
  const sterne = rewardStore.getModulSterne(modul);

  if (sterne.bronze && sterne.silber && sterne.gold) {
    return rewardStore.addMeilenstein("modulMeister", modul);
  }
  return false;
}

/**
 * Check if "Hilfe-Profi" milestone should trigger (AC-6.7):
 * 5x help used and then answered correctly
 */
export function checkHilfeProfi(): boolean {
  const rewardStore = useRewardStore.getState();
  const helpStore = useHelpStore.getState();

  const helpThenCorrect = helpStore.getHelpThenCorrectCount();
  if (helpThenCorrect >= 5 && !rewardStore.hasMeilenstein("hilfeProfi", "global")) {
    return rewardStore.addMeilenstein("hilfeProfi", "global");
  }
  return false;
}

/**
 * Check if "Durchhalte-Held" milestone should trigger (AC-6.8):
 * 3 days in a row practiced
 */
export function checkDurchhalteHeld(): boolean {
  const rewardStore = useRewardStore.getState();

  if (
    rewardStore.aktuelleStreakLaenge >= 3 &&
    !rewardStore.hasMeilenstein("durchhalteHeld", "global")
  ) {
    return rewardStore.addMeilenstein("durchhalteHeld", "global");
  }
  return false;
}

/**
 * Run all session-end milestone checks.
 * Called when a session ends (summary phase).
 * Returns array of triggered milestone types.
 */
export function checkSessionEndMilestones(
  modul: string,
  schwierigkeit: Schwierigkeit,
  richtige: number,
  gesamt: number
): MeilensteinTyp[] {
  const triggered: MeilensteinTyp[] = [];

  // Check star milestone (AC-6.4, AC-6.5, AC-6.6)
  const sternTyp = checkSternMeilenstein(modul, schwierigkeit, richtige, gesamt);
  if (sternTyp) triggered.push(sternTyp);

  // Check Modul-Meister (AC-6.9) - after star update
  if (checkModulMeister(modul)) triggered.push("modulMeister");

  // Check Hilfe-Profi (AC-6.7)
  if (checkHilfeProfi()) triggered.push("hilfeProfi");

  // 5er-Serie is already checked inline in handleCorrectAnswer() (BUG-1 fix)

  // Check Durchhalte-Held (AC-6.8)
  if (checkDurchhalteHeld()) triggered.push("durchhalteHeld");

  return triggered;
}

/**
 * Handle a correct answer event during a session.
 * Updates series counter and checks inline milestones.
 * Returns triggered milestones for immediate celebration.
 */
export function handleCorrectAnswer(modul: string): MeilensteinTyp[] {
  const rewardStore = useRewardStore.getState();
  const triggered: MeilensteinTyp[] = [];

  // Increment series
  rewardStore.incrementSerie();

  // Check Erste Richtige (AC-6.2)
  if (checkErsteRichtige(modul)) triggered.push("ersteRichtige");

  // Check 5er-Serie (AC-6.3) - immediate check after increment
  const state = useRewardStore.getState();
  if (state.aktuelleSerieRichtig === 5) {
    if (rewardStore.addMeilenstein("fuenferSerie", modul)) {
      triggered.push("fuenferSerie");
    }
  }

  return triggered;
}

/**
 * Handle a wrong answer event during a session.
 * Resets series counter. No negative effects (AC-6.20).
 */
export function handleWrongAnswer(): void {
  useRewardStore.getState().resetSerie();
}

/**
 * Handle help usage followed by correct answer.
 * Increments counter and checks Hilfe-Profi milestone (AC-6.7).
 */
export function handleHelpThenCorrect(): MeilensteinTyp[] {
  const rewardStore = useRewardStore.getState();
  rewardStore.incrementHilfeDannRichtig();

  const triggered: MeilensteinTyp[] = [];
  if (checkHilfeProfi()) triggered.push("hilfeProfi");
  return triggered;
}

/**
 * Check and update streak on app/session start (AC-6.8).
 * Returns streak info and any triggered milestones.
 */
export function handleSessionStart(
  modul: string
): { streakLength: number; isNewDay: boolean; milestones: MeilensteinTyp[] } {
  const rewardStore = useRewardStore.getState();
  const prevStreak = rewardStore.aktuelleStreakLaenge;

  rewardStore.updateStreak();

  const state = useRewardStore.getState();
  const isNewDay = state.aktuelleStreakLaenge !== prevStreak;

  // Reset series for new session
  rewardStore.resetSerie();

  const milestones: MeilensteinTyp[] = [];

  // Check Einstieg (AC-6.1)
  if (checkEinstieg(modul)) milestones.push("einstieg");

  // Check Durchhalte-Held (AC-6.8)
  if (checkDurchhalteHeld()) milestones.push("durchhalteHeld");

  return {
    streakLength: state.aktuelleStreakLaenge,
    isNewDay,
    milestones,
  };
}
