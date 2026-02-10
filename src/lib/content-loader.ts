import { z } from "zod";
import type { ModulMeta, FeedbackTexts } from "@/lib/types/exercise";

const hilfeSchema = z.object({
  stufe1: z.string(),
  stufe2: z.string(),
  stufe3: z.string(),
});

const fehlermusterSchema = z.object({
  falsch: z.string(),
  feedback: z.string(),
});

const aufgabeSchema = z.object({
  id: z.string(),
  modul: z.string(),
  schwierigkeit: z.enum(["Bronze", "Silber", "Gold"]),
  typ: z.enum(["Zahleneingabe", "MultipleChoice", "DragDrop", "Vergleich"]),
  aufgabentext: z.string(),
  korrekt: z.array(z.string()).min(1),
  bild: z.string().optional(),
  hilfe: hilfeSchema,
  fehlermuster: z.array(fehlermusterSchema),
  vorlesen: z.boolean(),
  antwortOptionen: z.array(z.string()).optional(),
  dragItems: z.array(z.string()).optional(),
  dropZones: z.array(z.string()).optional(),
  stellenwertFarben: z.boolean().optional(),
});

const modulMetaSchema = z.object({
  modul: z.string(),
  name: z.string(),
  aufgaben: z.array(aufgabeSchema),
});

const feedbackTextsSchema = z.object({
  richtig: z.array(z.string()),
  falsch: z.array(z.string()),
  sessionEnde: z.array(z.string()),
});

type ModuleLoader = () => Promise<{ default: unknown }>;

const MODULE_MAP: Record<string, ModuleLoader> = {
  "M1.1": () => import("@/content/modules/m1-1.json"),
  "M1.2": () => import("@/content/modules/m1-2.json"),
  "M1.3": () => import("@/content/modules/m1-3.json"),
  "M1.4": () => import("@/content/modules/m1-4.json"),
  "M1.5": () => import("@/content/modules/m1-5.json"),
  "M1.6": () => import("@/content/modules/m1-6.json"),
  "M1.7": () => import("@/content/modules/m1-7.json"),
  "M1.8": () => import("@/content/modules/m1-8.json"),
  "M1.9": () => import("@/content/modules/m1-9.json"),
  "M1.10": () => import("@/content/modules/m1-10.json"),
};

export async function loadModule(
  modulId: string
): Promise<ModulMeta | null> {
  const loader = MODULE_MAP[modulId];
  if (!loader) return null;

  try {
    const raw = await loader();
    return modulMetaSchema.parse(raw.default) as ModulMeta;
  } catch {
    console.error(`Fehler beim Laden von Modul ${modulId}`);
    return null;
  }
}

let cachedFeedbackTexts: FeedbackTexts | null = null;

export async function loadFeedbackTexts(): Promise<FeedbackTexts> {
  if (cachedFeedbackTexts) return cachedFeedbackTexts;

  const raw = await import("@/content/feedback-texts.json");
  cachedFeedbackTexts = feedbackTextsSchema.parse(raw.default) as FeedbackTexts;
  return cachedFeedbackTexts;
}
