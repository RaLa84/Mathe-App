import type {
  Aufgabe,
  ColorSegment,
  FeedbackTexts,
  Schwierigkeit,
} from "@/lib/types/exercise";

export function checkAnswer(aufgabe: Aufgabe, answer: string): boolean {
  const normalized = answer.trim().toLowerCase();
  return aufgabe.korrekt.some(
    (correct) => correct.trim().toLowerCase() === normalized
  );
}

export function getErrorFeedback(
  aufgabe: Aufgabe,
  answer: string
): string | null {
  const normalized = answer.trim().toLowerCase();
  const match = aufgabe.fehlermuster.find(
    (fm) => fm.falsch.trim().toLowerCase() === normalized
  );
  return match?.feedback ?? null;
}

export function getRandomFeedback(
  richtig: boolean,
  feedbackTexts: FeedbackTexts
): string {
  const pool = richtig ? feedbackTexts.richtig : feedbackTexts.falsch;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getSessionEndFeedback(feedbackTexts: FeedbackTexts): string {
  const pool = feedbackTexts.sessionEnde;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function selectExercises(
  pool: Aufgabe[],
  schwierigkeit: Schwierigkeit,
  anzahl: number
): Aufgabe[] {
  const filtered = pool.filter((a) => a.schwierigkeit === schwierigkeit);
  if (filtered.length === 0) return [];

  const shuffled = shuffleArray([...filtered]);

  // Round-robin across types for variety (AC-4.23)
  const byType = new Map<string, Aufgabe[]>();
  for (const a of shuffled) {
    const existing = byType.get(a.typ) ?? [];
    existing.push(a);
    byType.set(a.typ, existing);
  }

  const selected: Aufgabe[] = [];
  const typeQueues = [...byType.values()];
  let typeIndex = 0;

  while (selected.length < anzahl && typeQueues.some((q) => q.length > 0)) {
    const queue = typeQueues[typeIndex % typeQueues.length];
    if (queue.length > 0) {
      selected.push(queue.shift()!);
    }
    typeIndex++;
  }

  return shuffleArray(selected);
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function colorCodeOperators(
  text: string,
  stellenwert?: boolean
): ColorSegment[] {
  const segments: ColorSegment[] = [];
  let current = "";

  for (const char of text) {
    if (char === "+") {
      if (current)
        segments.push(...processTextSegment(current, stellenwert));
      segments.push({ text: "+", color: "plus" });
      current = "";
    } else if (char === "-") {
      if (current)
        segments.push(...processTextSegment(current, stellenwert));
      segments.push({ text: "-", color: "minus" });
      current = "";
    } else if (char === "=") {
      if (current)
        segments.push(...processTextSegment(current, stellenwert));
      segments.push({ text: "=", color: "equals" });
      current = "";
    } else {
      current += char;
    }
  }
  if (current) segments.push(...processTextSegment(current, stellenwert));

  return segments;
}

function processTextSegment(
  text: string,
  stellenwert?: boolean
): ColorSegment[] {
  if (!stellenwert) return [{ text }];

  const result: ColorSegment[] = [];
  let buffer = "";
  let inNumber = false;

  for (const char of text) {
    if (/\d/.test(char)) {
      if (!inNumber && buffer) {
        result.push({ text: buffer });
        buffer = "";
      }
      inNumber = true;
      buffer += char;
    } else {
      if (inNumber && buffer) {
        result.push(...colorDigitsByPlaceValue(buffer));
        buffer = "";
      }
      inNumber = false;
      buffer += char;
    }
  }

  if (buffer) {
    if (inNumber) {
      result.push(...colorDigitsByPlaceValue(buffer));
    } else {
      result.push({ text: buffer });
    }
  }

  return result;
}

function colorDigitsByPlaceValue(numberStr: string): ColorSegment[] {
  if (numberStr.length <= 1) return [{ text: numberStr }];

  const placeColors: Array<ColorSegment["color"]> = [
    "einer",
    "zehner",
    "hunderter",
  ];
  const segments: ColorSegment[] = [];

  for (let i = 0; i < numberStr.length; i++) {
    const placeIndex = numberStr.length - 1 - i;
    const color =
      placeIndex < placeColors.length ? placeColors[placeIndex] : undefined;
    segments.push({ text: numberStr[i], color });
  }

  return segments;
}

export function getMaxDigits(modul: string): number {
  const prefix = modul.split(".")[0];
  switch (prefix) {
    case "M1":
      return 2;
    case "M2":
      return 3;
    case "M3":
      return 4;
    case "M4":
      return 7;
    default:
      return 3;
  }
}
