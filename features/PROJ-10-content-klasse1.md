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
