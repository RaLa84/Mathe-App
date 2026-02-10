# PROJ-10: Content - Klasse 1 Module (M1.1-M1.10)

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 3, Klasse 1

## Abhaengigkeiten

- Benoetigt: PROJ-4 (Aufgaben-Engine) - Engine muss Aufgaben darstellen koennen
- Benoetigt: PROJ-5 (Hilfe-System) - Hilfe-Inhalte pro Aufgabentyp
- Benoetigt: PROJ-9 (Lernpfad-Navigation) - Module muessen navigierbar sein
- Wird benoetigt von: PROJ-3 (Einstufungstest) - Testaufgaben aus diesem Content

---

## User Stories

### US-10.1: Modul-Aufgaben bearbeiten
Als **Kind der Klasse 1** moechte ich **Aufgaben zu Zahlen, Addition und Subtraktion im Zahlenraum bis 20 bearbeiten**, die zu meinem Lernstand passen.

### US-10.2: Abwechslungsreiche Aufgaben erleben
Als **Kind** moechte ich **verschiedene Aufgabentypen erleben** (Rechnung, Luecke, Zuordnung, Sachaufgabe, Raetsel), damit es nicht langweilig wird.

### US-10.3: Sachaufgaben mit Bildern verstehen
Als **Kind der Klasse 1** moechte ich **Sachaufgaben mit Bildern sehen**, weil ich noch nicht so viel lesen kann und Bilder mir helfen.

### US-10.4: Passende Hilfen erhalten
Als **Kind** moechte ich **Hilfen bekommen, die genau zu meiner Aufgabe passen** (nicht generische Tipps, sondern z.B. "Zerlege die 5 in 2 und 3").

---

## Acceptance Criteria

### Content-Umfang pro Modul

Jedes der 10 Module braucht:
- [ ] AC-10.1: Mindestens **10 Aufgaben pro Schwierigkeitsstufe** (Bronze, Silber, Gold) = min. 30 Aufgaben pro Modul
- [ ] AC-10.2: Mindestens **3 verschiedene Aufgabentypen** pro Modul (z.B. Direktrechnung + Lueckenaufgabe + Zuordnung)
- [ ] AC-10.3: Mindestens **1 Tipp-Text** pro Aufgabentyp (Hilfe-Stufe 1)
- [ ] AC-10.4: Mindestens **1 Visualisierung** pro Modul (Hilfe-Stufe 2)
- [ ] AC-10.5: Mindestens **1 Schritt-fuer-Schritt-Loesung** als Template pro Aufgabentyp (Hilfe-Stufe 3)
- [ ] AC-10.6: Mindestens **3 Feedback-Texte fuer richtig** und **3 fuer falsch** (variiert)

### Module M1.1-M1.10 (konkrete Inhalte)

- [ ] AC-10.7: **M1.1 Zahlen entdecken (0-10):** Aufgaben zu Zahl erkennen, Menge-Zahl zuordnen, Vorgaenger/Nachfolger, Luecken fuellen
- [ ] AC-10.8: **M1.2 Mengen und Zahlen verbinden:** Mengen zaehlen, Subitizing (strukturierte Mengen), Mengen vergleichen
- [ ] AC-10.9: **M1.3 Addition bis 10:** Direktrechnung mit Mengenbild, Tauschaufgaben, Lueckenaufgaben
- [ ] AC-10.10: **M1.4 Subtraktion bis 10:** Wegnehmen mit Mengenbild, Plus/Minus unterscheiden, Lueckenaufgaben
- [ ] AC-10.11: **M1.5 Umkehraufgaben:** Aufgabenpaare erkennen, Aufgabenfamilie bilden, Pruefen durch Umkehren
- [ ] AC-10.12: **M1.6 Zahlenraum bis 20:** Buendeln (10 Einer = 1 Zehner), Zahl zerlegen, Nachbarzehner
- [ ] AC-10.13: **M1.7 Addition mit Zehnuebergang:** Zerlegung zur 10, mit/ohne vorgegebene Zerlegung, Lueckenaufgaben
- [ ] AC-10.14: **M1.8 Subtraktion mit Zehnuebergang:** Ueber die 10 zurueck, Ergaenzen, Lueckenaufgaben
- [ ] AC-10.15: **M1.9 Verdoppeln und Halbieren:** Verdoppeln mit Bild, Verdoppeln +/- 1, Halbieren
- [ ] AC-10.16: **M1.10 Sachaufgaben bis 20:** Bild+Text Bronze, Nur-Text Silber, Zwei-Schritt Gold

### Didaktische Qualitaet
- [ ] AC-10.17: Alle Aufgaben haben korrekte Loesungen
- [ ] AC-10.18: Sachaufgaben-Texte max. 8-10 Woerter pro Satz (kindgerecht)
- [ ] AC-10.19: Sachaufgaben bieten ASS-Alternativen (ohne soziale Szenarien)
- [ ] AC-10.20: Fehlermuster pro Modul sind definiert (erwartete Fehler + passendes Feedback)
- [ ] AC-10.21: Stellenwert-Farbcodierung ist in allen relevanten Aufgaben konsistent (E=blau, Z=rot)

### Datenformat
- [ ] AC-10.22: Content wird in einem strukturierten Format gespeichert (JSON oder DB-Schema)
- [ ] AC-10.23: Jede Aufgabe hat: Modul-ID, Stufe (Bronze/Silber/Gold), Aufgabentyp, Aufgabentext, korrekte Antwort, Hilfe-Texte, Fehlermuster-Feedback
- [ ] AC-10.24: Content ist erweiterbar (neue Aufgaben koennen hinzugefuegt werden ohne Code-Aenderung)

---

## Edge Cases

- **E-10.1:** Was passiert, wenn alle Aufgaben eines Moduls/einer Stufe bereits bearbeitet wurden? → Aufgaben werden in neuer Reihenfolge wiederholt (kein "Du hast alles geschafft, nichts mehr zu tun")
- **E-10.2:** Was passiert, wenn eine Aufgabe einen Fehler im Content hat (falsche Loesung)? → Content-Validierung bei Import/Build-Zeit sicherstellen
- **E-10.3:** Was passiert, wenn Bilder fuer Sachaufgaben nicht laden? → Fallback: Nur Text anzeigen + Fehlermeldung loggen
- **E-10.4:** Wie werden Aufgaben innerhalb einer Session ausgewaehlt? → Zufaellig aus dem Pool der aktuellen Stufe, keine exakte Wiederholung in einer Session
- **E-10.5:** Kann Content spaeter ergaenzt werden (neue Aufgaben)? → Ja, Datenformat ist erweiterbar. Neue Aufgaben werden automatisch in den Pool aufgenommen

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Content-Datenformat (definiert das Schema fuer ALLE Aufgaben)

Dies ist das **endgueltige Content-Format**, das auch von PROJ-11, PROJ-12, PROJ-13 genutzt wird.

```
AUFGABEN-JSON-DATEI (eine pro Modul, z.B. m1-3.json):

Jede Datei enthaelt:
- Modul-ID (z.B. "m1-3")
- Modul-Name (z.B. "Addition bis 10")
- Klassenstufe (1)
- Aufgaben-Pool, unterteilt in 3 Stufen:
  ├── Bronze (min. 10 Aufgaben)
  ├── Silber (min. 10 Aufgaben)
  └── Gold (min. 10 Aufgaben)

Jede einzelne Aufgabe hat:
- Eindeutige ID (z.B. "m1-3-b-001" = Modul 1.3, Bronze, Nr. 001)
- Aufgabentyp:
  - "number_input" → Kind tippt Zahl ein
  - "multiple_choice" → Kind waehlt aus 3-4 Optionen
  - "drag_drop" → Kind zieht Elemente
  - "comparison" → Kind waehlt <, = oder >
  - "number_wall" → Zahlenmauer (ab Klasse 2)
- Aufgabentext (was das Kind sieht, z.B. "3 + 4 = ?")
- Aufgabentext fuer TTS (Vorlese-Version, z.B. "Drei plus vier gleich Fragezeichen")
- Korrekte Antwort (Zahl oder Liste von Zahlen)
- Antwort-Optionen (nur bei Multiple Choice, z.B. [5, 6, 7, 8])
- Bild-Referenz (optional, z.B. "images/m1-3/aepfel-3-plus-4.svg")
- Farbcodierung:
  - Rechenzeichen-Farbe (plus=gruen, minus=rot)
  - Stellenwert-Farben (wenn relevant)
- Hilfe-Inhalte:
  - Tipp-Text (Hilfe-Stufe 1, z.B. "Nimm die groessere Zahl und zaehle weiter")
  - Visualisierungs-Typ (z.B. "zahlenstrahl_spruenge" oder "mengen_zusammenlegen")
  - Visualisierungs-Daten (z.B. Start=4, Spruenge=3, Ziel=7)
  - Schritt-fuer-Schritt (Liste von Schritten als Text)
- Fehlermuster (optional, Liste):
  - Erwartete falsche Antwort (z.B. 6)
  - Feedback-Text (z.B. "Fast! Zaehle nochmal langsam ab der 4.")
  - Fehler-Ursache (z.B. "verzaehlt")
- Vorlesbar? (Ja/Nein)
- ASS-Alternative vorhanden? (Ja/Nein + alternative Texte)
```

### Content-Organisation

```
content/
├── modules/
│   ├── klasse-1/
│   │   ├── m1-1-zahlen-entdecken.json        (30+ Aufgaben)
│   │   ├── m1-2-mengen-zahlen.json           (30+ Aufgaben)
│   │   ├── m1-3-addition-bis-10.json         (30+ Aufgaben)
│   │   ├── m1-4-subtraktion-bis-10.json      (30+ Aufgaben)
│   │   ├── m1-5-umkehraufgaben.json          (30+ Aufgaben)
│   │   ├── m1-6-zahlenraum-bis-20.json       (30+ Aufgaben)
│   │   ├── m1-7-addition-zehnuebergang.json  (30+ Aufgaben)
│   │   ├── m1-8-subtraktion-zehnuebergang.json (30+ Aufgaben)
│   │   ├── m1-9-verdoppeln-halbieren.json    (30+ Aufgaben)
│   │   └── m1-10-sachaufgaben-bis-20.json    (30+ Aufgaben)
│   │
│   └── klasse-2/
│       └── ... (gleiche Struktur, siehe PROJ-11)
│
├── feedback/
│   ├── positive-feedback.json   (Pool: "Super!", "Toll!", "Richtig!" etc.)
│   └── encouraging-feedback.json (Pool: "Fast!", "Versuch es nochmal!" etc.)
│
├── images/                      (SVG-Illustrationen fuer Sachaufgaben)
│   ├── m1-1/
│   ├── m1-2/
│   └── ...
│
└── module-definitions.json      (aus PROJ-9: Modul-Metadaten)
```

### Content-Umfang Klasse 1

```
10 Module x 3 Stufen x 10 Aufgaben = 300 Aufgaben minimum

Tatsaechlicher Umfang:
┌──────────┬────────┬────────┬────────┬────────┐
│ Modul    │ Bronze │ Silber │ Gold   │ Gesamt │
├──────────┼────────┼────────┼────────┼────────┤
│ M1.1     │ 12     │ 10     │ 10     │ 32     │
│ M1.2     │ 12     │ 10     │ 10     │ 32     │
│ M1.3     │ 12     │ 12     │ 10     │ 34     │
│ M1.4     │ 12     │ 12     │ 10     │ 34     │
│ M1.5     │ 10     │ 10     │ 10     │ 30     │
│ M1.6     │ 12     │ 10     │ 10     │ 32     │
│ M1.7     │ 12     │ 12     │ 10     │ 34     │
│ M1.8     │ 12     │ 12     │ 10     │ 34     │
│ M1.9     │ 10     │ 10     │ 10     │ 30     │
│ M1.10    │ 12     │ 10     │ 10     │ 32     │
├──────────┼────────┼────────┼────────┼────────┤
│ GESAMT   │ 116    │ 108    │ 100    │ 324    │
└──────────┴────────┴────────┴────────┴────────┘

Pro Modul ausserdem:
- 3-5 Tipp-Texte (Hilfe-Stufe 1)
- 1-2 Visualisierungstypen (Hilfe-Stufe 2)
- 1-2 Schritt-fuer-Schritt-Templates (Hilfe-Stufe 3)
- 3-5 Fehlermuster mit spezifischem Feedback
- 4+ positive Feedback-Texte
- 4+ ermutigende Feedback-Texte
```

### Content-Erstellung

```
Wer erstellt den Content?
→ Elementary Math Teacher Agent + manuelles Review

Wie wird Content erstellt?
1. Pro Modul: JSON-Datei anlegen nach Schema
2. Aufgaben aus PROJ-1 didaktischem Konzept uebernehmen
3. Hilfe-Texte aus PROJ-1 Loesungsstrategien ableiten
4. Fehlermuster aus PROJ-1 Fehlermuster-Tabellen uebernehmen
5. Content-Validierung: Automatischer Check beim Build
   - Korrekte Loesungen pruefen (z.B. 3+4 muss 7 ergeben)
   - Pflichtfelder vorhanden?
   - Min. 10 Aufgaben pro Stufe?
   - Hilfe-Texte vorhanden?
```

### Tech-Entscheidungen

```
Warum JSON-Dateien statt Datenbank fuer Content?
→ Keine Server-Abhaengigkeit (App laeuft offline)
→ Content aendert sich selten (nicht zur Laufzeit)
→ Versionierung ueber Git (Aenderungen nachvollziehbar)
→ Build-Time Validierung moeglich
→ Spaeter auf DB umstellbar ohne Frontend-Aenderung

Warum SVG-Bilder statt PNG?
→ Skalierbar: Sieht auf allen Bildschirmgroessen gut aus
→ Leichtgewichtig: Kleine Dateigroesse
→ Farblich anpassbar: Sensorik-Profil kann Farben beeinflussen
→ Barrierefreier: Elemente beschreibbar fuer Screen Reader

Warum getrennte TTS-Texte statt Aufgabentext vorlesen?
→ "3 + 4 = ?" wird als "drei plus vier gleich Fragezeichen" vorgelesen
→ Mathematische Symbole werden sonst falsch ausgesprochen
→ TTS-Text kann kindgerechter formuliert sein
→ Nicht alle Aufgaben haben Text (z.B. reine Bild-Aufgaben)

Warum Content-Validierung beim Build?
→ Fehler im Content (falsche Loesung) sind fatal fuer Lernerfolg
→ Automatische Pruefung: 3+4 muss tatsaechlich 7 ergeben
→ Pflichtfelder-Check: Keine Aufgabe ohne Hilfe-Texte
→ Verhindert Regressionen wenn neuer Content hinzugefuegt wird
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- JSON-Import (Next.js kann JSON nativ importieren)
- Zod (Schema-Validierung beim Build, bereits im Projekt)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── content/
│   ├── modules/
│   │   └── klasse-1/         ← 10 JSON-Dateien (eine pro Modul)
│   ├── feedback/
│   │   ├── positive-feedback.json
│   │   └── encouraging-feedback.json
│   └── images/               ← SVG-Bilder fuer Sachaufgaben/Mengen
│       └── klasse-1/
│
├── lib/
│   ├── content-loader        ← Aufgaben aus JSON laden
│   ├── content-validator     ← Schema-Validierung (Zod)
│   └── exercise-engine       ← (aus PROJ-4, nutzt Content)
│
└── scripts/
    └── validate-content      ← Build-Script: Alle JSON-Dateien pruefen
```

---

## QA Test Results

**Tested:** 2026-02-10
**Tester:** QA Engineer Agent (Claude Opus 4.6)
**Build:** `npm run build` PASSED
**Validation Script:** `npx tsx scripts/validate-content.ts` PASSED (0 Errors, 0 Warnings)
**Total Exercises:** 326 (across 10 modules)
**Unique IDs:** 326 (no duplicates)

---

### Acceptance Criteria Status

#### AC-10.1: Mind. 10 Aufgaben pro Schwierigkeitsstufe
- [x] M1.1: Bronze=12, Silber=10, Gold=10 (32 total)
- [x] M1.2: Bronze=12, Silber=10, Gold=10 (32 total)
- [x] M1.3: Bronze=12, Silber=12, Gold=10 (34 total)
- [x] M1.4: Bronze=12, Silber=12, Gold=10 (34 total)
- [x] M1.5: Bronze=10, Silber=10, Gold=10 (30 total)
- [x] M1.6: Bronze=12, Silber=10, Gold=10 (32 total)
- [x] M1.7: Bronze=12, Silber=12, Gold=10 (34 total)
- [x] M1.8: Bronze=12, Silber=12, Gold=10 (34 total)
- [x] M1.9: Bronze=10, Silber=10, Gold=10 (30 total)
- [x] M1.10: Bronze=12, Silber=11, Gold=11 (34 total)
- Ergebnis: ALLE Module erfuellen das Minimum von 10 pro Stufe.

#### AC-10.2: Mind. 3 verschiedene Aufgabentypen pro Modul
- [x] M1.1: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.2: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.3: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.4: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.5: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.6: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.7: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.8: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.9: Zahleneingabe, MultipleChoice, DragDrop, Vergleich (4 Typen)
- [x] M1.10: Zahleneingabe, MultipleChoice, Vergleich (3 Typen, kein DragDrop)
- Ergebnis: ALLE Module haben mind. 3 Aufgabentypen.

#### AC-10.3: Mind. 1 Tipp-Text (Hilfe-Stufe 1)
- [x] Jede Aufgabe hat hilfe.stufe1 mit inhaltlichem Text.

#### AC-10.4: Mind. 1 Visualisierung pro Modul (Hilfe-Stufe 2)
- [x] Jede Aufgabe hat hilfe.stufe2 (Werte: "tenframe" oder "numberline").

#### AC-10.5: Mind. 1 Schritt-fuer-Schritt-Loesung (Hilfe-Stufe 3)
- [x] Jede Aufgabe hat hilfe.stufe3 mit ausfuehrlicher Schritt-fuer-Schritt-Erklaerung.

#### AC-10.6: Mind. 3 Feedback-Texte richtig/falsch
- [x] feedback-texts.json: 10 positive ("richtig"), 6 negative ("falsch"), 4 "sessionEnde".

#### AC-10.7-10.16: Modul-spezifische Inhalte
- [x] AC-10.7: M1.1 - Zahlen entdecken (0-10): Zaehlen, Menge-Zahl, Vorgaenger/Nachfolger, Luecken
- [x] AC-10.8: M1.2 - Mengen und Zaehlen: Mengen zaehlen, Subitizing, Vergleiche
- [x] AC-10.9: M1.3 - Addition bis 10: Direktrechnung, Lueckenaufgaben, Vergleiche
- [x] AC-10.10: M1.4 - Subtraktion bis 10: Wegnehmen, Plus/Minus unterscheiden, Luecken
- [x] AC-10.11: M1.5 - Umkehraufgaben: Paare erkennen, Familien bilden, Pruefen
- [x] AC-10.12: M1.6 - Zahlenraum bis 20: Buendeln, Zerlegen, Nachbarzehner
- [x] AC-10.13: M1.7 - Addition Zehnuebergang: Zerlegung zur 10, Luecken
- [x] AC-10.14: M1.8 - Subtraktion Zehnuebergang: Ueber 10 zurueck, Ergaenzen, Luecken
- [x] AC-10.15: M1.9 - Verdoppeln/Halbieren: Verdoppeln mit Bild, +/-1, Halbieren
- [x] AC-10.16: M1.10 - Sachaufgaben: Bronze=Bild+Text, Silber=Text, Gold=Zwei-Schritt

#### AC-10.17: Alle Aufgaben haben korrekte Loesungen
- [ ] BUG-1 (siehe unten): Einige "Vergleich"-Aufgaben haben Antworten die nicht <, >, = sind
- [x] Alle arithmetischen Aufgaben (a+b=?, a-b=?) sind mathematisch korrekt
- [x] Alle MultipleChoice-Aufgaben enthalten korrekte Antwort in antwortOptionen
- [x] Vergleichszeichen bei Standard-Vergleichen stimmen (<, >, =)

#### AC-10.18: Sachaufgaben max. 8-10 Woerter pro Satz
- [x] Bronze-Sachaufgaben: kurze Saetze, kindgerecht
- [ ] BUG-5 (siehe unten): Einige Gold-Sachaufgaben ueberschreiten die Wortgrenze leicht (bis 15-18 Woerter pro Satz) - fuer Gold-Stufe aber vertretbar

#### AC-10.19: ASS-Alternativen (keine sozialen Szenarien)
- [x] Bronze-Sachaufgaben nutzen ueberwiegend Objekte (Schmetterlinge, Aepfel, Kekse, Baelle, Sterne)
- [ ] BUG-6 (siehe unten): M1.2 s-002 verwendet soziale Personennamen "Lisa" und "Tom" als Vergleich
- [ ] BUG-6b: M1.2 s-008 verwendet "Tim" und "Lisa" sozial vergleichend
- [x] M1.10 Bronze-Sachaufgaben sind objektbasiert und ASS-freundlich
- [ ] BUG-6c: M1.10 s-005 nutzt ein soziales Szenario (Eichhoernchen) - grenzwertig ok, da Tier

#### AC-10.20: Fehlermuster definiert
- [x] Jede Aufgabe hat mindestens 1 Fehlermuster (Ausnahme: einige DragDrop/MC mit leerem Array)
- [x] Fehlermuster decken typische Fehler ab (Plus statt Minus, Verzaehlen, Stellenwert-Verwechslung)

#### AC-10.21: Stellenwert-Farbcodierung
- [x] M1.6 hat stellenwertFarben=true bei allen relevanten Stellenwert-Aufgaben
- [x] Andere Module nutzen stellenwertFarben nicht (korrekt, da nicht relevant)

#### AC-10.22: Strukturiertes JSON-Format
- [x] 10 JSON-Dateien, eine pro Modul
- [x] Zod-Schema-Validierung in content-loader.ts und validate-content.ts

#### AC-10.23: Pflichtfelder vorhanden
- [x] Jede Aufgabe hat: ID, Modul, Schwierigkeit, Typ, Aufgabentext, korrekt, Hilfe, Fehlermuster, Vorlesen

#### AC-10.24: Content erweiterbar
- [x] JSON-Dateien koennen ohne Code-Aenderung erweitert werden
- [x] Content-Loader mappt alle 10 Module korrekt

---

### Edge Cases Status

#### E-10.1: Alle Aufgaben bearbeitet
- [x] exercise-engine.ts selectExercises() waehlt zufaellig aus Pool
- Nicht direkt testbar ohne UI (Content-Scope)

#### E-10.2: Fehler im Content
- [x] validate-content.ts prueft Schema, Math, IDs, Pflichtfelder
- [ ] BUG-3 (siehe unten): Validation Script prueft NICHT auf Typ-Konsistenz (Vergleich mit Nicht-Zeichen-Antworten)

#### E-10.3: Bilder laden nicht
- [x] Kein Modul referenziert Bilder die nicht existieren (bild-Feld ist optional und wird nicht genutzt)

#### E-10.4: Aufgaben-Auswahl pro Session
- [x] selectExercises() in exercise-engine.ts waehlt zufaellig

#### E-10.5: Content spaeter ergaenzen
- [x] JSON-Format ist erweiterbar. Neue Aufgaben werden automatisch aufgenommen.

---

### Bugs Found

#### BUG-1: Vergleich-Aufgaben mit inkompatiblen Antwortformaten (CRITICAL)

- **Severity:** Critical
- **Betroffene Aufgaben:**
  - m1-1-s-001 (M1.1): "Welche Zahl ist groesser: 7 oder 4?" - korrekt=["7"]
  - m1-2-s-001 (M1.2): "Wo sind mehr Sterne?" - korrekt=["links"]
  - m1-2-s-004 (M1.2): "Vergleiche die Mengen" - korrekt=["gleich viel"]
  - m1-2-s-005 (M1.2): "Wo sind weniger Punkte?" - korrekt=["rechts"]
- **Steps to Reproduce:**
  1. Starte Session mit M1.1 Silber oder M1.2 Silber
  2. Warte auf eine der betroffenen Aufgaben
  3. Die InputComparison-Komponente zeigt NUR <, =, > als Buttons
  4. Die korrekte Antwort ("7", "links", "rechts", "gleich viel") ist nicht auswaehlbar
- **Expected:** Aufgabe ist loesbar
- **Actual:** Aufgabe ist NICHT loesbar, da die UI nur <, =, > anbietet
- **Root Cause:** Diese Aufgaben nutzen "Vergleich" als Typ, aber die Antworten sind keine Vergleichszeichen. Die InputComparison-Komponente (src/components/exercise/input-comparison.tsx Zeile 14-18) ist hartcodiert auf "<", "=", ">".
- **Fix-Vorschlag:** Diese Aufgaben sollten entweder als "MultipleChoice" typisiert werden (mit antwortOptionen), oder die InputComparison-Komponente muss erweitert werden um auch custom antwortOptionen anzuzeigen.
- **Priority:** Critical (Aufgaben sind nicht spielbar)

#### BUG-2: M1.5 s-006 - MultipleChoice akzeptiert nur eine von zwei korrekten Antworten (Medium)

- **Severity:** Medium
- **Betroffene Aufgabe:** m1-5-s-006
- **Steps to Reproduce:**
  1. Aufgabentext: "7 - 3 = 4. Welche Plusaufgabe passt?"
  2. korrekt = ["4 + 3 = 7"]
  3. antwortOptionen enthaelt auch "3 + 4 = 7"
  4. hilfe.stufe3 sagt: "Umkehrung: 4 + 3 = 7 (oder 3 + 4 = 7)"
  5. Kind waehlt "3 + 4 = 7" und bekommt "Falsch"
- **Expected:** Beide Antworten ("4 + 3 = 7" und "3 + 4 = 7") sollten als korrekt gelten
- **Actual:** Nur "4 + 3 = 7" wird als korrekt gewertet
- **Fix-Vorschlag:** korrekt-Array um "3 + 4 = 7" erweitern: korrekt: ["4 + 3 = 7", "3 + 4 = 7"]
- **Priority:** Medium (frustrierend fuer Kind, mathematisch unfair)

#### BUG-3: Validation Script erkennt Typ-Inkompatibilitaet nicht (Medium)

- **Severity:** Medium
- **File:** scripts/validate-content.ts
- **Steps to Reproduce:**
  1. Fuehre `npx tsx scripts/validate-content.ts` aus
  2. Script meldet 0 Errors, 0 Warnings
  3. Aber BUG-1 (Vergleich mit Nicht-Zeichen-Antworten) wird NICHT erkannt
- **Expected:** Script warnt wenn eine Vergleich-Aufgabe keine Antwort aus [<, >, =] hat
- **Actual:** Keine Warnung
- **Root Cause:** validateTypeFields() prueft bei Vergleich-Typ nicht ob korrekt-Werte valide Vergleichszeichen sind
- **Fix-Vorschlag:** In validateTypeFields() hinzufuegen:
  ```
  if (aufgabe.typ === "Vergleich") {
    const validComparisons = ["<", ">", "="];
    const hasValidAnswer = aufgabe.korrekt.some(k => validComparisons.includes(k));
    if (!hasValidAnswer) {
      error(`${aufgabe.id}: Vergleich exercise answer must be <, > or =`);
    }
  }
  ```
- **Priority:** Medium (Tooling-Bug, verhindert fruehe Fehlererkennung)

#### BUG-4: DragDrop-Aufgaben mit nicht-deterministischer Sortierung (Low)

- **Severity:** Low
- **Betroffene Aufgaben:**
  - m1-4-s-011: "Ordne: 9-2, 8-6, 10-3" - korrekt=["8-6", "9-2", "10-3"] aber 9-2=7 und 10-3=7 (gleich!)
  - m1-8-s-012: "Ordne: 14-6, 12-5, 16-8" - korrekt=["12-5", "14-6", "16-8"] aber 14-6=8 und 16-8=8 (gleich!)
  - m1-8-g-009: "Ordne: 16-9, 13-4, 15-8" - korrekt=["13-4", "16-9", "15-8"] aber 16-9=7 und 15-8=7 (gleich!)
- **Problem:** Die korrekte Reihenfolge ist nicht eindeutig wenn zwei Aufgaben das gleiche Ergebnis haben. Kind koennte die "Gleichwertigen" anders sortieren und bekommt "Falsch".
- **Fix-Vorschlag:** Aufgaben so anpassen, dass alle Ergebnisse unterschiedlich sind, oder die Engine tolerant gegen gleichwertige Permutationen machen.
- **Priority:** Low (selten, aber potenziell frustrierend)

#### BUG-5: Gold-Sachaufgaben ueberschreiten Wortgrenze (Low)

- **Severity:** Low
- **Betroffene Aufgaben (Beispiele):**
  - m1-10-g-001: "Im Regal stehen 12 Buecher. 5 werden weggenommen und 3 neue dazugestellt. Wie viele stehen jetzt im Regal?" (18 Woerter)
  - m1-10-g-005: "Auf dem Parkplatz stehen 8 Autos. 4 fahren weg und 7 neue kommen. Wie viele stehen jetzt da?" (16 Woerter)
  - m1-10-g-009: "In der Tasche waren Murmeln. 6 wurden rausgenommen. Jetzt sind noch 8 drin. Wie viele waren vorher in der Tasche?" (16 Woerter)
- **Expected:** Max. 8-10 Woerter pro Satz (AC-10.18)
- **Actual:** Gold-Aufgaben haben bis zu 18 Woerter pro Satz
- **Bemerkung:** Fuer Gold-Stufe (fortgeschrittene Kinder) ist dies vertretbar, da Zwei-Schritt-Aufgaben inherent laenger sind. Aber formal ueberschritten.
- **Priority:** Low (didaktisch vertretbar fuer Gold)

#### BUG-6: Fehlende ASS-Alternativen bei sozialen Szenarien (Low)

- **Severity:** Low
- **Betroffene Aufgaben:**
  - m1-2-s-002: "Lisa hat 7 Aepfel. Tom hat 4 Aepfel. Wer hat mehr?" - Sozialer Vergleich
  - m1-2-s-008: "Tim hat 5 Murmeln. Lisa hat 8 Murmeln." - Sozialer Vergleich
- **Expected:** ASS-Alternativen ohne soziale Szenarien (AC-10.19)
- **Actual:** Kein ASS-Alternativfeld vorhanden. Aufgabe nutzt Personen-Vergleich.
- **Bemerkung:** Die meisten Aufgaben sind bereits objektbasiert. Nur diese 2 nutzen soziale Vergleiche.
- **Fix-Vorschlag:** Alternative Aufgabentexte ohne Personennamen: z.B. "Im linken Korb liegen 7 Aepfel. Im rechten Korb 4. Welcher Korb hat mehr?"
- **Priority:** Low (nur 2 Aufgaben betroffen)

#### BUG-7: Dateistruktur weicht von Spec ab (Low)

- **Severity:** Low
- **Expected (laut Spec):** `src/content/modules/klasse-1/m1-1-zahlen-entdecken.json`
- **Actual:** `src/content/modules/m1-1.json`
- **Impact:** Kein funktionaler Fehler. Der Content-Loader referenziert die korrekten Pfade. Aber die Struktur weicht von der dokumentierten Spec ab.
- **Bemerkung:** Die flache Struktur ist fuer Klasse 1 akzeptabel. Wenn Klasse 2-4 hinzukommen (PROJ-11 bis PROJ-13), braucht es Unterordner oder wird unuebersichtlich.
- **Priority:** Low (Doku vs. Implementierung divergiert)

#### BUG-8: M1.10 b-010 - Grammatikfehler "Bausteinen" (Low)

- **Severity:** Low
- **File:** src/content/modules/m1-10.json, Aufgabe m1-10-b-010
- **Aufgabentext:** "3 Bausteinen und 6 Bausteine. Wie viele zusammen?"
- **Expected:** "3 Bausteine und 6 Bausteine."
- **Actual:** "3 Bausteinen" (Dativ statt Nominativ)
- **Priority:** Low (Grammatikfehler, verwirrt Kinder beim Lesen)

#### BUG-9: M1.3 ID-Reihenfolge inkonsistent (Info)

- **Severity:** Info (kein funktionaler Fehler)
- **File:** src/content/modules/m1-3.json
- **Detail:** m1-3-g-006 (Zeile 287) erscheint VOR m1-3-g-005 (Zeile 304) in der Datei
- **Impact:** Kein funktionaler Fehler, IDs sind eindeutig. Aber verwirrend bei manueller Pruefung.
- **Priority:** Info

#### BUG-10: Validation Script prueft keine Umlaut-Verletzungen (Low)

- **Severity:** Low
- **File:** scripts/validate-content.ts
- **Detail:** Das Script prueft nicht ob Umlaute (ae, oe, ue, ss) korrekt ersetzt wurden. Aktuell sind KEINE Umlaute vorhanden (geprueft via grep), aber das Script wuerde sie auch nicht finden.
- **Fix-Vorschlag:** Regex-Check auf /[aeoeueAeOeUess]/ in allen String-Feldern hinzufuegen.
- **Priority:** Low (aktuell kein Problem, aber Praevention fuer zukuenftige Content-Aenderungen)

#### BUG-11: Kein content-validator.ts Modul (Info)

- **Severity:** Info
- **Detail:** Die Spec nennt `src/lib/content-validator` als separate Datei. Es gibt nur die Zod-Schemas in content-loader.ts und das separate validate-content.ts Script. Kein dediziertes content-validator Modul.
- **Impact:** Kein funktionaler Fehler. Die Validierung ist verteilt auf zwei Files statt einem dedizierten.
- **Priority:** Info (Architektur-Divergenz von Spec)

---

### Didaktische Qualitaet

#### Schwierigkeitsstufung
- [x] Bronze: Einfache, direkte Aufgaben (Zaehlen, einfache +/-, Zuordnung)
- [x] Silber: Komplexere Aufgaben (groessere Zahlen, Vergleiche, Muster)
- [x] Gold: Anspruchsvolle Aufgaben (Lueckenaufgaben, Umkehr-Pruefung, Zwei-Schritt)
- [x] Progression ist konsistent ueber alle Module

#### Hilfe-Texte
- [x] stufe1: Kurze, kindgerechte Tipps (1 Satz)
- [x] stufe2: Verweis auf Werkzeug (tenframe/numberline)
- [x] stufe3: Vollstaendige Schritt-fuer-Schritt-Loesung
- [x] Hilfe-Texte sind inhaltlich korrekt und passend

#### Fehlermuster
- [x] Decken typische Fehler ab: Plus/Minus verwechselt, Verzaehlen, Stellenwert
- [x] Feedback ist ermutigend und nicht wertend
- [x] Feedback gibt konkreten Hinweis zur Korrektur

---

### Mathematische Korrektheit (Detail-Pruefung)

Alle 326 Aufgaben wurden einzeln auf mathematische Korrektheit geprueft:

- [x] M1.1: 32 Aufgaben - Alle korrekt (Zahlen, Reihenfolge, Vorgaenger/Nachfolger)
- [x] M1.2: 32 Aufgaben - Alle korrekt (Mengen, Vergleiche, Zuordnungen)
- [x] M1.3: 34 Aufgaben - Alle Additionen korrekt (3+4=7, 5+5=10, etc.)
- [x] M1.4: 34 Aufgaben - Alle Subtraktionen korrekt (8-3=5, 10-7=3, etc.)
- [x] M1.5: 30 Aufgaben - Umkehraufgaben logisch korrekt
- [x] M1.6: 32 Aufgaben - Stellenwerte korrekt (1Z+3E=13, etc.)
- [x] M1.7: 34 Aufgaben - Zehnuebergang-Additionen korrekt (9+2=11, 8+7=15, etc.)
- [x] M1.8: 34 Aufgaben - Zehnuebergang-Subtraktionen korrekt (11-2=9, 15-8=7, etc.)
- [x] M1.9: 30 Aufgaben - Verdoppeln/Halbieren korrekt (Doppel 7=14, Haelfte 16=8, etc.)
- [x] M1.10: 34 Aufgaben - Sachaufgaben mathematisch korrekt

---

### Umlaut-Pruefung
- [x] Keine Umlaute (ae, oe, ue, ss) in ALLEN 10 Modul-Dateien gefunden
- [x] Keine Umlaute in feedback-texts.json

---

### Schema & Struktur
- [x] Alle Pflichtfelder vorhanden in jeder Aufgabe
- [x] Zod-Schema-Validierung bestanden
- [x] ID-Format korrekt: m{X}-{Y}-{b|s|g}-{NNN}
- [x] Keine doppelten IDs (326 unique von 326 total)
- [x] Content-Loader mappt alle 10 Module (M1.1-M1.10)
- [x] TypeScript Build ohne Fehler

---

### Regression Test
- [x] PROJ-2 (Onboarding): Keine Aenderungen an Onboarding-Code
- [x] PROJ-4 (Aufgaben-Engine): exercise-session.tsx, exercise-engine.ts unveraendert
- [x] Build kompiliert erfolgreich
- [x] Bestehende Routen (/, /ueben) weiterhin vorhanden

---

### Summary

- **Total Aufgaben:** 326 (Spec erwartet 324 - leicht uebertroffen)
- Passed Acceptance Criteria: 22 von 24
- Failed Acceptance Criteria: 2 (AC-10.17 teilweise, AC-10.19 teilweise)
- **Bugs gefunden: 11**
  - Critical: 1 (BUG-1: Vergleich-Aufgaben nicht spielbar)
  - Medium: 2 (BUG-2: MC-Akzeptanz, BUG-3: Validation Script)
  - Low: 5 (BUG-4 bis BUG-8, BUG-10)
  - Info: 2 (BUG-9, BUG-11)

---

### Recommendation

**Status: NOT PRODUCTION-READY**

Vor Deployment MUSS BUG-1 gefixt werden:
- 4 Aufgaben (m1-1-s-001, m1-2-s-001, m1-2-s-004, m1-2-s-005) sind mit dem aktuellen InputComparison-UI nicht spielbar.
- Entweder die Aufgaben auf "MultipleChoice" umtypisieren oder die InputComparison-Komponente erweitern.

Empfohlene Fix-Reihenfolge:
1. **BUG-1** (Critical) - Vergleich-Aufgaben mit inkompatiblen Antworten
2. **BUG-2** (Medium) - M1.5 s-006 zweite korrekte Antwort
3. **BUG-3** (Medium) - Validation Script erweitern
4. **BUG-4** (Low) - DragDrop mit gleichen Ergebnissen
5. **BUG-8** (Low) - Grammatikfehler "Bausteinen"
6. **BUG-6** (Low) - ASS-Alternativen fuer 2 Aufgaben
7. Rest nach Prioritaet
