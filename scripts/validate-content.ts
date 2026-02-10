/**
 * Content Validation Script for Mathe-App
 *
 * Validates all module JSON files against the schema and checks:
 * - Zod schema compliance
 * - Minimum exercise counts per difficulty level
 * - Mathematical correctness for simple arithmetic
 * - Required fields presence
 * - ID format consistency
 * - No duplicate IDs
 *
 * Run: npx tsx scripts/validate-content.ts
 */

import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const hilfeSchema = z.object({
  stufe1: z.string().min(1),
  stufe2: z.string().min(1),
  stufe3: z.string().min(1),
});

const fehlermusterSchema = z.object({
  falsch: z.string(),
  feedback: z.string().min(1),
});

const aufgabeSchema = z.object({
  id: z.string().min(1),
  modul: z.string().min(1),
  schwierigkeit: z.enum(["Bronze", "Silber", "Gold"]),
  typ: z.enum(["Zahleneingabe", "MultipleChoice", "DragDrop", "Vergleich"]),
  aufgabentext: z.string().min(1),
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
  modul: z.string().min(1),
  name: z.string().min(1),
  aufgaben: z.array(aufgabeSchema),
});

type Aufgabe = z.infer<typeof aufgabeSchema>;

const CONTENT_DIR = path.join(__dirname, "..", "src", "content", "modules");

const MIN_EXERCISES_PER_LEVEL = 10;

const EXPECTED_MODULES: Record<string, { name: string; file: string }> = {
  "M1.1": { name: "Zahlen entdecken", file: "m1-1.json" },
  "M1.2": { name: "Mengen und Zaehlen", file: "m1-2.json" },
  "M1.3": { name: "Addition bis 10", file: "m1-3.json" },
  "M1.4": { name: "Subtraktion bis 10", file: "m1-4.json" },
  "M1.5": { name: "Umkehraufgaben", file: "m1-5.json" },
  "M1.6": { name: "Zahlenraum bis 20", file: "m1-6.json" },
  "M1.7": { name: "Addition mit Zehnuebergang", file: "m1-7.json" },
  "M1.8": { name: "Subtraktion mit Zehnuebergang", file: "m1-8.json" },
  "M1.9": { name: "Verdoppeln und Halbieren", file: "m1-9.json" },
  "M1.10": { name: "Sachaufgaben bis 20", file: "m1-10.json" },
};

let totalErrors = 0;
let totalWarnings = 0;

function error(msg: string) {
  console.error(`  ❌ ERROR: ${msg}`);
  totalErrors++;
}

function warn(msg: string) {
  console.warn(`  ⚠️  WARN: ${msg}`);
  totalWarnings++;
}

function ok(msg: string) {
  console.log(`  ✅ ${msg}`);
}

/**
 * Try to evaluate simple arithmetic expressions like "3 + 4" or "8 - 3"
 */
function evaluateSimpleExpression(expr: string): number | null {
  const match = expr.match(/^(\d+)\s*([+\-])\s*(\d+)\s*=\s*\?$/);
  if (!match) return null;
  const [, a, op, b] = match;
  if (op === "+") return parseInt(a) + parseInt(b);
  if (op === "-") return parseInt(a) - parseInt(b);
  return null;
}

/**
 * Validate mathematical correctness for simple "a + b = ?" or "a - b = ?" exercises
 */
function validateMath(aufgabe: Aufgabe): void {
  const expected = evaluateSimpleExpression(aufgabe.aufgabentext);
  if (expected !== null) {
    const correctAnswers = aufgabe.korrekt.map(Number);
    if (!correctAnswers.includes(expected)) {
      error(
        `${aufgabe.id}: Math error! "${aufgabe.aufgabentext}" should be ${expected}, but korrekt is [${aufgabe.korrekt.join(", ")}]`
      );
    }
  }
}

/**
 * Validate ID format: should match pattern like "m1-3-b-001"
 */
function validateIdFormat(aufgabe: Aufgabe): void {
  const modulLower = aufgabe.modul.replace("M", "m").replace(".", "-");
  const levelCode = aufgabe.schwierigkeit === "Bronze" ? "b" : aufgabe.schwierigkeit === "Silber" ? "s" : "g";
  const expectedPrefix = `${modulLower}-${levelCode}-`;
  if (!aufgabe.id.startsWith(expectedPrefix)) {
    warn(
      `${aufgabe.id}: ID should start with "${expectedPrefix}" for modul ${aufgabe.modul} / ${aufgabe.schwierigkeit}`
    );
  }
}

/**
 * Validate type-specific fields
 */
function validateTypeFields(aufgabe: Aufgabe): void {
  if (aufgabe.typ === "MultipleChoice" && !aufgabe.antwortOptionen) {
    error(`${aufgabe.id}: MultipleChoice exercise missing antwortOptionen`);
  }
  if (aufgabe.typ === "MultipleChoice" && aufgabe.antwortOptionen) {
    const hasCorrect = aufgabe.korrekt.some((k) =>
      aufgabe.antwortOptionen!.includes(k)
    );
    if (!hasCorrect) {
      error(
        `${aufgabe.id}: Correct answer [${aufgabe.korrekt.join(", ")}] not found in antwortOptionen [${aufgabe.antwortOptionen.join(", ")}]`
      );
    }
  }
  if (aufgabe.typ === "DragDrop") {
    if (!aufgabe.dragItems) {
      error(`${aufgabe.id}: DragDrop exercise missing dragItems`);
    }
    if (!aufgabe.dropZones) {
      error(`${aufgabe.id}: DragDrop exercise missing dropZones`);
    }
  }
  if (aufgabe.typ === "Vergleich") {
    const validComparisons = ["<", ">", "="];
    const hasValidAnswer = aufgabe.korrekt.some((k) =>
      validComparisons.includes(k)
    );
    if (!hasValidAnswer) {
      error(
        `${aufgabe.id}: Vergleich exercise answer [${aufgabe.korrekt.join(", ")}] must be <, > or =`
      );
    }
  }
}

/**
 * Check for umlaut violations (should use ae, oe, ue, ss instead)
 */
function validateNoUmlauts(aufgabe: Aufgabe): void {
  const umlautRegex = /[äöüÄÖÜß]/;
  const fieldsToCheck = [
    aufgabe.aufgabentext,
    ...aufgabe.korrekt,
    aufgabe.hilfe.stufe1,
    aufgabe.hilfe.stufe2,
    aufgabe.hilfe.stufe3,
    ...aufgabe.fehlermuster.map((f) => f.feedback),
    ...aufgabe.fehlermuster.map((f) => f.falsch),
    ...(aufgabe.antwortOptionen || []),
    ...(aufgabe.dragItems || []),
    ...(aufgabe.dropZones || []),
  ];
  for (const text of fieldsToCheck) {
    if (umlautRegex.test(text)) {
      error(`${aufgabe.id}: Contains umlaut in "${text.substring(0, 50)}..." - use ae/oe/ue/ss instead`);
    }
  }
}

function validateModule(filePath: string): void {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Validating ${fileName}...`);

  let rawContent: string;
  try {
    rawContent = fs.readFileSync(filePath, "utf-8");
  } catch {
    error(`Could not read file: ${filePath}`);
    return;
  }

  let jsonData: unknown;
  try {
    jsonData = JSON.parse(rawContent);
  } catch {
    error(`Invalid JSON in ${fileName}`);
    return;
  }

  // Schema validation
  const result = modulMetaSchema.safeParse(jsonData);
  if (!result.success) {
    error(`Schema validation failed for ${fileName}:`);
    for (const issue of result.error.issues) {
      error(`  Path: ${issue.path.join(".")} - ${issue.message}`);
    }
    return;
  }

  const modul = result.data;
  ok(`Schema valid (${modul.aufgaben.length} exercises)`);

  // Count per difficulty
  const counts = { Bronze: 0, Silber: 0, Gold: 0 };
  for (const a of modul.aufgaben) {
    counts[a.schwierigkeit]++;
  }

  console.log(
    `  📊 Bronze: ${counts.Bronze}, Silber: ${counts.Silber}, Gold: ${counts.Gold}, Total: ${modul.aufgaben.length}`
  );

  for (const level of ["Bronze", "Silber", "Gold"] as const) {
    if (counts[level] < MIN_EXERCISES_PER_LEVEL) {
      error(
        `${modul.modul}: Only ${counts[level]} ${level} exercises (minimum: ${MIN_EXERCISES_PER_LEVEL})`
      );
    }
  }

  // Check for duplicate IDs
  const ids = new Set<string>();
  for (const a of modul.aufgaben) {
    if (ids.has(a.id)) {
      error(`Duplicate ID: ${a.id}`);
    }
    ids.add(a.id);
  }

  // Check type count variety
  const types = new Set(modul.aufgaben.map((a) => a.typ));
  if (types.size < 3) {
    warn(
      `${modul.modul}: Only ${types.size} different exercise types used (recommended: 3+)`
    );
  }

  // Validate each exercise
  for (const aufgabe of modul.aufgaben) {
    // Modul field matches
    if (aufgabe.modul !== modul.modul) {
      error(
        `${aufgabe.id}: Exercise modul "${aufgabe.modul}" doesn't match file modul "${modul.modul}"`
      );
    }

    validateIdFormat(aufgabe);
    validateTypeFields(aufgabe);
    validateMath(aufgabe);
    validateNoUmlauts(aufgabe);
  }

  ok(`All individual exercise checks passed for ${modul.modul}`);
}

function main() {
  console.log("🔍 Mathe-App Content Validation");
  console.log("================================\n");

  // Check all expected modules exist
  for (const [modulId, info] of Object.entries(EXPECTED_MODULES)) {
    const filePath = path.join(CONTENT_DIR, info.file);
    if (!fs.existsSync(filePath)) {
      error(`Missing module file: ${info.file} (${modulId}: ${info.name})`);
    }
  }

  // Validate all JSON files in content dir
  const allIds = new Set<string>();
  let totalExercises = 0;

  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs
      .readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith(".json"))
      .sort();

    for (const file of files) {
      const filePath = path.join(CONTENT_DIR, file);
      validateModule(filePath);

      // Collect all IDs for global uniqueness check
      try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (data.aufgaben) {
          for (const a of data.aufgaben) {
            if (allIds.has(a.id)) {
              error(`Global duplicate ID across modules: ${a.id}`);
            }
            allIds.add(a.id);
            totalExercises++;
          }
        }
      } catch {
        // Already reported above
      }
    }
  }

  // Validate feedback texts
  const feedbackPath = path.join(
    __dirname,
    "..",
    "src",
    "content",
    "feedback-texts.json"
  );
  if (fs.existsSync(feedbackPath)) {
    console.log("\n📄 Validating feedback-texts.json...");
    try {
      const feedbackData = JSON.parse(
        fs.readFileSync(feedbackPath, "utf-8")
      );
      const feedbackSchema = z.object({
        richtig: z.array(z.string()).min(3),
        falsch: z.array(z.string()).min(3),
        sessionEnde: z.array(z.string()).min(1),
      });
      feedbackSchema.parse(feedbackData);
      ok(
        `Feedback texts valid (${feedbackData.richtig.length} positive, ${feedbackData.falsch.length} negative, ${feedbackData.sessionEnde.length} session end)`
      );
    } catch {
      error("Feedback texts validation failed");
    }
  } else {
    error("Missing feedback-texts.json");
  }

  // Summary
  console.log("\n================================");
  console.log(`📊 Total exercises: ${totalExercises}`);
  console.log(`📊 Total unique IDs: ${allIds.size}`);
  console.log(
    `\n${totalErrors === 0 ? "✅" : "❌"} Errors: ${totalErrors}`
  );
  console.log(
    `${totalWarnings === 0 ? "✅" : "⚠️"} Warnings: ${totalWarnings}`
  );

  if (totalErrors > 0) {
    console.log("\n❌ Validation FAILED!");
    process.exit(1);
  } else {
    console.log("\n✅ Validation PASSED!");
    process.exit(0);
  }
}

main();
