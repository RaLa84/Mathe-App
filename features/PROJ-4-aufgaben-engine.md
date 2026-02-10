# PROJ-4: Aufgaben-Engine (Core)

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitte 3 (Lernmodule), 4 (ND-Anpassungen)

## Abhaengigkeiten

- Benoetigt: PROJ-2 (Onboarding) - Profil-Einstellungen (Sensorik, ND-Anpassungen)
- Wird benoetigt von: PROJ-3 (Einstufungstest), PROJ-5 (Hilfe-System), PROJ-6 (Belohnungssystem), PROJ-10/11 (Content)

---

## User Stories

### US-4.1: Aufgabe sehen und loesen
Als **Kind** moechte ich **eine Mathe-Aufgabe auf dem Bildschirm sehen und meine Antwort eingeben**, damit ich ueben kann.

### US-4.2: Verschiedene Eingabearten nutzen
Als **Kind** moechte ich **meine Antwort auf verschiedene Weisen eingeben koennen** (Zahl tippen, Antwort auswaehlen, Elemente ziehen), damit ich die Art waehlen kann, die mir am besten liegt.

### US-4.3: Sofortiges Feedback erhalten
Als **Kind** moechte ich **sofort sehen, ob meine Antwort richtig oder falsch ist**, mit einer ermutigenden Rueckmeldung.

### US-4.4: Aufgabenstellung immer sehen
Als **Kind** moechte ich **die Aufgabenstellung immer sehen koennen** (nicht verschwinden), damit ich nicht vergesse, was ich rechnen soll.

### US-4.5: Zwischen Aufgabentypen wechseln
Als **Kind** moechte ich **innerhalb einer Uebungssession verschiedene Aufgabentypen bearbeiten** (Rechnung, Lueckenaufgabe, Zuordnung, Sachaufgabe), damit es nicht langweilig wird.

### US-4.6: Aufgabe vorlesen lassen
Als **Kind mit LRS** moechte ich **Sachaufgaben per Klick vorlesen lassen**, damit ich die Aufgabe trotz Leseschwierigkeiten verstehen kann.

---

## Acceptance Criteria

### Aufgaben-Darstellung
- [ ] AC-4.1: Aufgaben werden gemaess dem aktuellen Modul und der Schwierigkeitsstufe (Bronze/Silber/Gold) angezeigt
- [ ] AC-4.2: Die Aufgabenstellung bleibt immer sichtbar (verschwindet nicht beim Scrollen oder Eingeben)
- [ ] AC-4.3: Rechenzeichen sind farbcodiert: Plus (+) = gruen, Minus (-) = rot
- [ ] AC-4.4: Zahlen in Stellenwert-Aufgaben sind farbcodiert: Einer=blau, Zehner=rot, Hunderter=gruen
- [ ] AC-4.5: Die Schriftgroesse ist kindgerecht (mind. 18px, einstellbar)

### Eingabetypen
- [ ] AC-4.6: **Zahleneingabe** - Kind tippt Zahl ueber Ziffernblock (0-9) ein
- [ ] AC-4.7: **Multiple Choice** - Kind waehlt aus 3-4 Antwortmoeglichkeiten
- [ ] AC-4.8: **Drag & Drop** - Kind zieht Elemente (Plaettchen, Zahlen) an richtige Position
- [ ] AC-4.9: **Vergleich** - Kind waehlt <, = oder > Zeichen
- [ ] AC-4.10: Der Eingabetyp wird pro Aufgabe vom Content definiert (nicht vom Kind gewaehlt)

### Antwort-Pruefung & Feedback
- [ ] AC-4.11: Antwort wird sofort nach Eingabe geprueft (kein separater "Pruefen"-Button noetig, aber optional per Bestaetigungsschritt fuer ADHS)
- [ ] AC-4.12: Bei richtiger Antwort: Positives Feedback (Text + visuell, je nach Sensorik-Profil)
- [ ] AC-4.13: Bei falscher Antwort: Ermutigendes Feedback (nie "Falsch!", sondern "Fast!" oder "Versuch es nochmal!")
- [ ] AC-4.14: Bei falscher Antwort: Kind kann es erneut versuchen (mindestens 2 Versuche)
- [ ] AC-4.15: Feedback-Texte werden zufaellig variiert (nicht immer derselbe Text)
- [ ] AC-4.16: Feedback passt sich dem Sensorik-Profil an (Reizarm: nur Text+Haken / Reizreich: Animation+Sound)

### ND-Anpassungen in der Engine
- [ ] AC-4.17: **ADHS-Bestaetigungsschritt:** Optionaler "Bist du sicher?"-Dialog vor Abgabe (ein/ausschaltbar)
- [ ] AC-4.18: **LRS-Vorlesefunktion:** Lautsprecher-Icon bei Textaufgaben, spielt Text-to-Speech ab
- [ ] AC-4.19: **Dyskalkulie-Werkzeuge:** Zahlenstrahl und Zehnerfeld als dauerhaft einblendbare Werkzeuge
- [ ] AC-4.20: **ASS-Fortschritt:** "Aufgabe X von Y" immer sichtbar mit exakter Zahl

### Aufgaben-Flow
- [ ] AC-4.21: Nach dem Feedback geht es automatisch (oder per Klick) zur naechsten Aufgabe
- [ ] AC-4.22: Eine Session besteht aus einer konfigurierbaren Anzahl Aufgaben (Standard: 5, einstellbar: 3-10)
- [ ] AC-4.23: Aufgabentypen werden innerhalb einer Session gemischt (wenn fuer das Modul verfuegbar)
- [ ] AC-4.24: Am Ende einer Session: Zusammenfassung ("X von Y richtig! Toll gemacht!")
- [ ] AC-4.25: Ergebnisse werden gespeichert (Aufgabe, Antwort, richtig/falsch, Hilfe genutzt, Zeitstempel)

---

## Edge Cases

- **E-4.1:** Was passiert, wenn das Kind die App waehrend einer Aufgabe schliesst? → Aufgabe wird als nicht beantwortet gespeichert, beim naechsten Start kann die Session fortgesetzt werden
- **E-4.2:** Was passiert bei einem sehr langen Antwortwert (z.B. Kind tippt 999999)? → Eingabe auf sinnvollen Zahlenbereich begrenzen (je nach Modul/Zahlenraum)
- **E-4.3:** Was passiert, wenn das Kind mehrfach hintereinander die gleiche falsche Antwort gibt? → Nach 3 gleichen Fehlversuchen: Frustrations-Kaskade (PROJ-7) ausloesen
- **E-4.4:** Was passiert, wenn kein Content fuer ein Modul geladen werden kann? → Freundliche Fehlermeldung: "Oh, hier fehlt noch etwas. Probiere ein anderes Thema!"
- **E-4.5:** Was passiert bei Drag & Drop auf kleinen Bildschirmen? → Touch-Ziele mindestens 48x48px, grosse Drop-Zonen, Snap-to-Position

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Aufgaben-Session (Hauptseite waehrend des Uebens)
│
├── Session-Header (oben, immer sichtbar)
│   ├── Fortschritts-Anzeige: "Aufgabe 3 von 5" + Fortschrittsbalken
│   ├── Modul-Name: z.B. "Addition bis 10"
│   ├── Pausen-Button (→ PROJ-7)
│   └── Zurueck-zur-Karte-Button
│
├── Aufgaben-Bereich (Mitte, Hauptbereich)
│   ├── Aufgaben-Anzeige (bleibt IMMER sichtbar)
│   │   ├── Aufgabentext (gross, kindgerecht, farbcodiert)
│   │   │   ├── Plus (+) = gruen
│   │   │   ├── Minus (-) = rot
│   │   │   └── Stellenwerte: E=blau, Z=rot, H=gruen
│   │   ├── Bild/Illustration (wenn vorhanden, z.B. bei Sachaufgaben)
│   │   └── Vorlesefunktion-Button (Lautsprecher-Icon, wenn LRS aktiv)
│   │
│   ├── Eingabe-Bereich (wechselt je nach Aufgabentyp)
│   │   ├── Typ "Zahleneingabe": Grosser Ziffernblock (0-9) + Eingabefeld
│   │   ├── Typ "Multiple Choice": 3-4 grosse Antwort-Buttons
│   │   ├── Typ "Drag & Drop": Verschiebbare Elemente + Zielzonen
│   │   └── Typ "Vergleich": Drei Buttons: < = >
│   │
│   └── Bestaetigungs-Button (optional, wenn ADHS-Modus aktiv)
│       └── "Bist du sicher?" Dialog vor Abgabe
│
├── Feedback-Bereich (erscheint nach Antwort)
│   ├── Richtig: Positives Feedback (angepasst an Sensorik-Profil)
│   │   ├── Reizarm: Gruener Haken + Text
│   │   ├── Standard: Stern-Animation + Text
│   │   └── Reizreich: Konfetti + Jubel-Sound + Text
│   ├── Falsch: Ermutigendes Feedback
│   │   ├── "Fast!" / "Versuch es nochmal!" (variiert)
│   │   └── "Nochmal versuchen" Button (mind. 2 Versuche)
│   └── Weiter-Button → naechste Aufgabe
│
├── Hilfe-Panel (einblendbar, verdeckt Aufgabe NICHT)
│   └── → Wird von PROJ-5 (Hilfe-System) gesteuert
│
├── Werkzeug-Toolbar (wenn Dyskalkulie-Modus aktiv: dauerhaft einblendbar)
│   ├── Zahlenstrahl (interaktiv)
│   ├── Zehnerfeld (2x5 Raster, interaktiv)
│   └── Hundertertafel (ab Klasse 2)
│
└── Session-Ende (nach letzter Aufgabe)
    ├── Zusammenfassung: "4 von 5 richtig! Toll gemacht!"
    ├── Sterne-Vergabe (wenn Stufe abgeschlossen)
    └── Buttons: "Weiter ueben" / "Zurueck zur Karte" / "Pause"
```

### Daten-Model

```
Eine AUFGABE hat:
- Eindeutige ID
- Modul-Zugehoerigkeit (z.B. M1.3 = Addition bis 10)
- Schwierigkeitsstufe (Bronze, Silber oder Gold)
- Aufgabentyp (Zahleneingabe, Multiple Choice, Drag & Drop, Vergleich)
- Aufgabentext (was das Kind sieht)
- Korrekte Antwort(en) (eine oder mehrere richtige Antworten)
- Bild-Referenz (optional, fuer Sachaufgaben/Mengenbilder)
- Hilfe-Inhalte:
  - Tipp-Text (Hilfe-Stufe 1)
  - Visualisierungs-Referenz (Hilfe-Stufe 2)
  - Schritt-fuer-Schritt-Loesung (Hilfe-Stufe 3)
- Fehlermuster:
  - Erwartete falsche Antworten + passendes Feedback
- Vorlesbar? (Ja/Nein - bei Textaufgaben)

Ein AUFGABEN-ERGEBNIS hat:
- Aufgaben-ID
- Gegebene Antwort
- Richtig oder Falsch
- Anzahl Versuche
- Hilfe genutzt? (welche Stufe)
- Zeitstempel
- Session-ID

Eine SESSION hat:
- Eindeutige Session-ID
- Modul + Schwierigkeitsstufe
- Anzahl Aufgaben (Standard: 5)
- Ergebnisse aller Aufgaben
- Gestartet am + Beendet am
- Stimmungscheck vorher/nachher (optional, → PROJ-7)

Gespeichert in: Browser localStorage (via Zustand persist)
Content (Aufgaben-Definitionen): JSON-Dateien im App-Bundle
```

### Aufgaben-Flow (Ablauf einer Session)

```
1. Kind waehlt Modul + Stufe auf der Lernpfad-Karte (PROJ-9)
      ↓
2. Session wird erstellt (5 zufaellige Aufgaben aus dem Pool)
      ↓
3. Stimmungscheck "Wie fuehlst du dich?" (optional, → PROJ-7)
      ↓
4. Aufgabe 1 wird angezeigt
      ↓
5. Kind gibt Antwort ein
      ↓
6. [Wenn ADHS-Modus: "Bist du sicher?" Dialog]
      ↓
7. Antwort wird geprueft
      ├── Richtig → Positives Feedback → Weiter zu naechster Aufgabe
      └── Falsch → Ermutigendes Feedback → Erneut versuchen (max. 3x)
               └── Nach 3x falsch → Frustrations-Kaskade (PROJ-7)
      ↓
8. Nach letzter Aufgabe → Session-Zusammenfassung
      ↓
9. Meilenstein-Check (→ PROJ-6): Bronze/Silber/Gold erreicht?
      ↓
10. Stimmungscheck "Wie fuehlst du dich jetzt?" (optional)
      ↓
11. Zurueck zur Lernpfad-Karte
```

### Tech-Entscheidungen

```
Warum @dnd-kit fuer Drag & Drop?
→ Barrierefrei: Tastatur-Navigation fuer Kinder die keine Maus/Touch nutzen
→ Touch-Support: Funktioniert auf Tablets (Hauptgeraet der Zielgruppe)
→ Snap-to-Position: Elemente rasten ein (weniger Frustration)
→ Performant: Kein Ruckeln bei vielen Elementen

Warum JSON-Dateien fuer Aufgaben-Content?
→ Aufgaben aendern sich nicht zur Laufzeit
→ Kein Server-Request noetig (schnell, offline)
→ Einfach erweiterbar: Neue JSON-Datei = neue Aufgaben
→ Validierung beim Build (falsche Loesungen fallen auf)

Warum Ziffernblock statt normaler Tastatur?
→ Kindgerecht: Grosse Tasten, nur relevante Ziffern (0-9)
→ Kein versehentliches Tippen von Buchstaben
→ Einfach auf Touch-Geraeten zu bedienen
→ Loeschen-Taste + Eingabe-Taste klar sichtbar

Warum Web Speech API fuer Vorlesen?
→ Kostenlos, in allen modernen Browsern verfuegbar
→ Deutsche Stimme vorhanden
→ Kein externes Package noetig
→ Einfach: speechSynthesis.speak(text)

Warum variable Session-Laenge (3-10 Aufgaben)?
→ ADHS: Kuerzere Sessions (3-5) halten Aufmerksamkeit
→ Hyperfokus: Laengere Sessions (7-10) wenn Kind im Flow ist
→ Eltern koennen im Profil einstellen
→ Standard: 5 (guter Kompromiss)
```

### Dependencies

```
Neue Packages fuer PROJ-4:
- @dnd-kit/core (Drag & Drop Basis)
- @dnd-kit/sortable (Sortier-Aufgaben)
- @dnd-kit/utilities (Hilfsfunktionen)

Bereits vorhanden / von PROJ-2:
- zustand (State Management)
- framer-motion (Feedback-Animationen)
- shadcn/ui (Button, Card, Dialog, Progress)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── stores/
│   ├── profile-store         ← (aus PROJ-2)
│   └── session-store         ← Zustand Store fuer aktuelle Aufgaben-Session
│
├── components/
│   ├── exercise/
│   │   ├── exercise-session  ← Haupt-Container fuer eine Uebungssession
│   │   ├── exercise-header   ← Fortschritt + Modul-Name + Pausen-Button
│   │   ├── exercise-display  ← Aufgabentext + Bild + Farbcodierung
│   │   ├── input-number-pad  ← Ziffernblock-Eingabe (0-9)
│   │   ├── input-multiple-choice ← Multiple-Choice-Buttons
│   │   ├── input-drag-drop   ← Drag & Drop Eingabe
│   │   ├── input-comparison  ← Vergleich (<, =, >) Buttons
│   │   ├── feedback-display  ← Feedback nach Antwort (richtig/falsch)
│   │   ├── session-summary   ← Zusammenfassung am Session-Ende
│   │   └── confirmation-dialog ← "Bist du sicher?" (ADHS-Modus)
│   │
│   ├── tools/
│   │   ├── number-line       ← Interaktiver Zahlenstrahl
│   │   ├── ten-frame         ← Zehnerfeld (2x5)
│   │   ├── hundred-chart     ← Hundertertafel
│   │   └── tool-toolbar      ← Toolbar fuer dauerhaft sichtbare Werkzeuge
│   │
│   └── tts/
│       └── read-aloud-button ← Lautsprecher-Icon, spielt Text-to-Speech ab
│
├── content/
│   ├── modules/
│   │   ├── m1-1.json         ← Aufgaben fuer Modul M1.1
│   │   ├── m1-2.json         ← Aufgaben fuer Modul M1.2
│   │   └── ...               ← Eine JSON-Datei pro Modul
│   └── feedback-texts.json   ← Pool von Feedback-Texten (richtig/falsch)
│
└── lib/
    ├── exercise-engine       ← Kernlogik: Aufgabe pruefen, naechste waehlen
    └── content-loader        ← Aufgaben aus JSON laden + validieren
```

---

## QA Test Results

**Tested:** 2026-02-10
**Tester:** QA Engineer Agent (Code Review + Build Verification)
**Build Status:** Erfolgreich (Next.js 16.1.6, TypeScript 0 Errors)
**App URL:** http://localhost:3000/ueben?modul=M1.3&stufe=Bronze&anzahl=5

### Test-Methode
Gruendliche Code-Review aller 20+ Source-Dateien gegen Feature-Spec, TypeScript Type-Check (0 Errors), Next.js Production Build (erfolgreich). Manuelles Browser-Testing war aufgrund von IPv6-Binding-Problemen des Dev-Servers eingeschraenkt - Ergebnisse basieren primaer auf statischer Code-Analyse.

---

## Acceptance Criteria Status

### Aufgaben-Darstellung

#### AC-4.1: Aufgaben gemaess Modul + Schwierigkeitsstufe (Bronze/Silber/Gold)
- [x] `selectExercises()` in `exercise-engine.ts` filtert nach `schwierigkeit`
- [x] `ExerciseSession` uebergibt `schwierigkeit` korrekt
- [x] Content in `m1-3.json` enthaelt alle drei Stufen (Bronze: 5, Silber: 5, Gold: 5)
- [x] Route `/ueben?modul=M1.3&stufe=Bronze` wird korrekt geparst in `page.tsx`
- **Status: BESTANDEN**

#### AC-4.2: Aufgabenstellung bleibt immer sichtbar
- [x] `ExerciseDisplay` hat `className="sticky top-0 z-10 bg-background"`
- [x] Aufgabentext wird AUSSERHALB von `AnimatePresence` gerendert (Zeile 255 in `exercise-session.tsx`)
- [x] Aufgabe bleibt sichtbar waehrend Input-Phase UND Feedback-Phase
- **Status: BESTANDEN**

#### AC-4.3: Rechenzeichen farbcodiert: Plus = gruen, Minus = rot
- [x] `colorCodeOperators()` in `exercise-engine.ts` erkennt `+`, `-`, `=`
- [x] CSS-Klassen in `exercise-display.tsx`: `plus: "text-green-600"`, `minus: "text-red-600"`
- [ ] BUG-1: Gleichheitszeichen (`=`) hat Farbe `"text-foreground"` - laut Spec keine spezielle Farbcodierung noetig, aber `ColorSegment` definiert `color: "equals"` was unnoetig verwirrend sein kann
- **Status: BESTANDEN** (Kernfunktion korrekt)

#### AC-4.4: Stellenwert-Zahlen farbcodiert: Einer=blau, Zehner=rot, Hunderter=gruen
- [ ] BUG-2: Stellenwert-Farbcodierung ist NICHT implementiert
- `colorCodeOperators()` behandelt nur Rechenzeichen (+, -, =), NICHT Stellenwerte
- `ColorSegment` Typ hat nur `"plus" | "minus" | "equals"`, keine Stellenwert-Farben
- Keine Funktion oder Logik vorhanden, die Einer/Zehner/Hunderter erkennt und farbig markiert
- **Status: NICHT BESTANDEN**

#### AC-4.5: Schriftgroesse kindgerecht (mind. 18px, einstellbar)
- [x] `ExerciseDisplay` nutzt `style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}` (1.5rem = 24px bei Standard)
- [x] Buttons im NumberPad: `text-2xl` (24px), Feedback: `text-xl md:text-2xl`
- [ ] BUG-3: Schriftgroesse ist NICHT einstellbar durch den User - es gibt keinen Font-Size-Setting im Profil oder in der Session
- **Status: TEILWEISE BESTANDEN** (Mindestgroesse OK, Einstellbarkeit fehlt)

### Eingabetypen

#### AC-4.6: Zahleneingabe ueber Ziffernblock (0-9)
- [x] `InputNumberPad` rendert Ziffern 1-9 + 0 in einem Grid
- [x] Loeschen-Button und Abschicken-Button vorhanden
- [x] Physische Tastatur-Unterstuetzung via `keydown` Event-Listener
- [x] Max-Digits-Begrenzung via `getMaxDigits()` (M1=2, M2=3, M3=4, M4=7)
- [x] Wert wird bei Aufgabenwechsel zurueckgesetzt (`useEffect` mit `aufgabe.id`)
- **Status: BESTANDEN**

#### AC-4.7: Multiple Choice (3-4 Antwortmoeglichkeiten)
- [x] `InputMultipleChoice` rendert Optionen aus `aufgabe.antwortOptionen`
- [x] Content `m1-3.json` hat 4 Optionen pro MC-Aufgabe
- [x] ARIA: `role="radiogroup"` und `role="radio"` korrekt
- [x] Sofortiges Submit bei Klick (kein separater Button noetig)
- **Status: BESTANDEN**

#### AC-4.8: Drag & Drop
- [ ] BUG-4: Echtes Drag & Drop ist NICHT implementiert
- Implementierung nutzt Click-to-Select Pattern (kein `@dnd-kit`)
- Package `@dnd-kit` ist NICHT in `package.json` installiert
- Kommentar im Code bestaetigt: "Simplified drag-and-drop using click-to-select pattern"
- Der Ansatz ist funktional aequivalent, aber die Spec verlangt explizit "Kind zieht Elemente"
- [ ] BUG-5: Es gibt KEINE DragDrop-Aufgaben im Content (`m1-3.json` hat keine Aufgabe mit `typ: "DragDrop"`)
- Felder `dragItems` und `dropZones` sind in keiner Aufgabe befuellt
- Der DragDrop-Input kann nicht getestet werden, da kein Content existiert
- **Status: NICHT BESTANDEN** (Kein echter D&D, kein Content)

#### AC-4.9: Vergleich (<, =, >)
- [x] `InputComparison` rendert drei Buttons: `<`, `=`, `>`
- [x] ARIA-Labels: `kleiner als`, `gleich`, `groesser als`
- [x] Content hat Vergleichs-Aufgaben (m1-3-s-002, m1-3-s-005, m1-3-g-004)
- [x] Sofortiges Submit bei Klick
- **Status: BESTANDEN**

#### AC-4.10: Eingabetyp wird pro Aufgabe vom Content definiert
- [x] Jede Aufgabe in JSON hat `typ` Feld
- [x] `exercise-session.tsx` switch-t ueber `currentAufgabe.typ`
- [x] Kind kann den Eingabetyp nicht selbst waehlen
- **Status: BESTANDEN**

### Antwort-Pruefung & Feedback

#### AC-4.11: Sofortige Pruefung (optional mit Bestaetigungsschritt fuer ADHS)
- [x] `submitAnswer()` prueft `ndSettings.confirmationStep`
- [x] Ohne ADHS-Modus: Sofortige Pruefung via `confirmAnswer()`
- [x] Mit ADHS-Modus: `ConfirmationDialog` erscheint ("Bist du sicher?")
- **Status: BESTANDEN**

#### AC-4.12: Richtige Antwort: Positives Feedback
- [x] `FeedbackDisplay` zeigt gruenes Icon + positiven Text
- [x] Reizarm: Gruener Haken (`Check` Icon)
- [x] Standard: Gruener Haken mit Scale-Animation
- [x] Reizreich: Stern-Icon + `ConfettiDots` Animation
- **Status: BESTANDEN**

#### AC-4.13: Falsche Antwort: Ermutigendes Feedback (nie "Falsch!")
- [x] Feedback-Texte in `feedback-texts.json`: "Fast!", "Knapp daneben!", etc.
- [x] Kein Text enthaelt das Wort "Falsch"
- [x] Orange-Farbe statt Rot fuer Fehl-Feedback (weniger negativ)
- [x] Fehlermuster-spezifisches Feedback wird bevorzugt (`getErrorFeedback()`)
- **Status: BESTANDEN**

#### AC-4.14: Bei falscher Antwort: Mind. 2 Versuche
- [x] `currentAttempts < 3` Logik in `confirmAnswer()` (Zeile 103)
- [x] Erst nach 3 Fehlversuchen wird Ergebnis als falsch gespeichert
- [x] `canRetry` in FeedbackDisplay: `lastAnswerCorrect === false && currentAttempts < 3`
- [x] "Nochmal versuchen" Button wird angezeigt wenn `canRetry === true`
- **Status: BESTANDEN** (3 Versuche, mehr als die geforderten 2)

#### AC-4.15: Feedback-Texte zufaellig variiert
- [x] `getRandomFeedback()` waehlt zufaellig aus Pool
- [x] 10 positive Texte, 6 negative Texte im Pool
- [x] Feedback wird bei jedem Phasenwechsel zu "feedback" neu generiert
- **Status: BESTANDEN**

#### AC-4.16: Feedback passt sich Sensorik-Profil an
- [x] `useSensoryAnimation()` liefert `intensity`: "none" | "gentle" | "expressive"
- [x] Reizarm (`intensity === "none"`): Keine Animation, nur Haken + Text
- [x] Standard (`intensity === "gentle"`): Scale-Animation + Haken + Text
- [x] Reizreich (`intensity === "expressive"`): Stern + Konfetti-Dots + Text
- [ ] BUG-6: Kein Sound-Feedback bei "reizreich" - Spec verlangt "Jubel-Sound", aber kein Audio implementiert
- **Status: TEILWEISE BESTANDEN** (Visuell korrekt, Audio fehlt)

### ND-Anpassungen in der Engine

#### AC-4.17: ADHS-Bestaetigungsschritt
- [x] `ndSettings.confirmationStep` steuert ob Dialog erscheint
- [x] `ConfirmationDialog` zeigt Antwort und fragt "Bist du sicher?"
- [x] Buttons: "Nochmal schauen" (Cancel) / "Ja, abschicken!" (Confirm)
- [x] Einstellbar ueber Profil (`setNdSetting`)
- **Status: BESTANDEN**

#### AC-4.18: LRS-Vorlesefunktion
- [x] `ReadAloudButton` nutzt Web Speech API (`SpeechSynthesisUtterance`)
- [x] Deutsche Sprache konfiguriert (`lang: "de-DE"`, `rate: 0.9`)
- [x] Button nur sichtbar wenn `readAloud === true` UND `aufgabe.vorlesen === true`
- [x] Cleanup bei Unmount (`speechSynthesis.cancel()`)
- [ ] BUG-7: ALLE Aufgaben in m1-3.json haben `vorlesen: false` - der Vorlese-Button wird nie angezeigt
- Die Funktion ist implementiert, aber kein Content nutzt sie
- **Status: TEILWEISE BESTANDEN** (Code korrekt, Content fehlt)

#### AC-4.19: Dyskalkulie-Werkzeuge (Zahlenstrahl, Zehnerfeld)
- [x] `ToolToolbar` mit drei Werkzeugen: Zahlenstrahl, Zehnerfeld, Hundertertafel
- [x] Hundertertafel nur ab Klasse 2 verfuegbar (`minGrade: 2`)
- [x] Wenn `ndSettings.permanentTools === true`: Toolbar immer sichtbar und offen
- [x] Wenn `permanentTools === false`: Toggle-Button zum Ein-/Ausblenden
- [x] `NumberLine`: Interaktiv, min/max konfigurierbar (Standard 0-10)
- [x] `TenFrame`: 2x5 Raster mit Toggle-Funktion
- [x] `HundredChart`: 10x10 Raster mit ScrollArea
- [ ] BUG-8: Werkzeuge sind nicht mit der aktuellen Aufgabe verbunden - Zahlenstrahl zeigt immer 0-10, unabhaengig vom Zahlenraum der Aufgabe
- **Status: TEILWEISE BESTANDEN** (Werkzeuge existieren, aber nicht kontextsensitiv)

#### AC-4.20: ASS-Fortschritt ("Aufgabe X von Y")
- [x] `ExerciseHeader` zeigt "Aufgabe {currentIndex + 1} von {totalCount}"
- [x] `Progress` Bar mit prozentualem Fortschritt
- [x] `role="status"` und `aria-live="polite"` fuer Screenreader
- [ ] BUG-9: Fortschrittsanzeige ist IMMER sichtbar, nicht nur im ASS-Modus
- Die Spec sagt: "ASS-Fortschritt" - das impliziert, es sollte eine ND-Einstellung sein
- Allerdings: Fortschritt immer zu zeigen schadet nicht und ist sogar besser fuer UX
- **Status: BESTANDEN** (Implementierung ist sogar besser als gefordert)

### Aufgaben-Flow

#### AC-4.21: Nach Feedback zur naechsten Aufgabe
- [x] "Weiter" Button in `FeedbackDisplay`
- [x] `nextExercise()` erhoht `currentIndex`
- [x] AnimatePresence sorgt fuer sanfte Transition
- **Status: BESTANDEN**

#### AC-4.22: Session = konfigurierbare Anzahl Aufgaben (Standard: 5, 3-10)
- [x] `aufgabenAnzahl` Parameter mit Default 5
- [x] Route `/ueben?anzahl=X` wird geparst
- [x] Begrenzung auf 3-10: `Math.min(10, Math.max(3, anzahl))` in `page.tsx`
- [ ] BUG-10: Kein UI zum Einstellen der Session-Laenge - nur per URL-Parameter moeglich
- **Status: TEILWEISE BESTANDEN** (Logik korrekt, UI fehlt)

#### AC-4.23: Aufgabentypen gemischt in Session
- [x] `selectExercises()` implementiert Round-Robin ueber Aufgabentypen
- [x] Shuffle nach Round-Robin-Selektion fuer Zufaelligkeit
- [x] Content `m1-3.json` hat verschiedene Typen pro Schwierigkeit (Zahleneingabe, MC, Vergleich)
- **Status: BESTANDEN**

#### AC-4.24: Session-Ende: Zusammenfassung
- [x] `SessionSummary` zeigt "X von Y richtig!"
- [x] Trophy-Icon mit Animation (sensorik-abhaengig)
- [x] Detaillierte Ergebnisliste pro Aufgabe
- [x] Zufaelliger Feedback-Text vom `sessionEnde` Pool
- [x] Buttons: "Zurueck" und "Weiter ueben!"
- **Status: BESTANDEN**

#### AC-4.25: Ergebnisse werden gespeichert
- [x] `AufgabenErgebnis` speichert: aufgabenId, antwort, richtig, versuche, hilfeGenutzt, zeitstempel, sessionId
- [x] `completedSessions` Array im Store
- [x] Zustand `persist` middleware speichert in localStorage (Key: "mathe-app-session")
- [x] Partialize: Nur `completedSessions` werden persistiert (nicht der aktive Session-State)
- [ ] BUG-11: `hilfeGenutzt` wird immer als `false` gespeichert (Zeile 97 in `session-store.ts`) - es gibt keine Logik die erkennt, ob Hilfe tatsaechlich genutzt wurde
- **Status: TEILWEISE BESTANDEN** (Speicherung funktioniert, hilfeGenutzt-Flag defekt)

---

## Edge Cases Status

### E-4.1: App schliessen waehrend Aufgabe
- [ ] BUG-12: Aktive Session wird NICHT persistiert
- `partialize` in `session-store.ts` speichert nur `completedSessions`
- `currentSession`, `currentIndex`, `phase` etc. gehen beim Schliessen verloren
- Session kann NICHT fortgesetzt werden
- Spec verlangt: "beim naechsten Start kann die Session fortgesetzt werden"
- **Status: NICHT BESTANDEN**

### E-4.2: Sehr langer Antwortwert
- [x] `InputNumberPad`: Begrenzt durch `getMaxDigits()` (M1: max 2 Ziffern, M2: 3, M3: 4, M4: 7)
- [x] `InputMultipleChoice`: Feste Optionen, keine freie Eingabe
- [x] `InputComparison`: Nur <, =, > moeglich
- [x] `InputDragDrop`: Begrenzt durch verfuegbare Items
- **Status: BESTANDEN**

### E-4.3: Gleiche falsche Antwort mehrfach
- [ ] BUG-13: Keine Frustrations-Kaskade implementiert
- Nach 3 Fehlversuchen wird einfach das Ergebnis gespeichert und "Weiter" angeboten
- Spec verlangt: "Nach 3 gleichen Fehlversuchen: Frustrations-Kaskade (PROJ-7)"
- Es wird auch nicht erkannt, ob die gleiche falsche Antwort mehrfach gegeben wird
- **Status: NICHT BESTANDEN**

### E-4.4: Kein Content fuer Modul
- [x] `loadModule()` gibt `null` zurueck wenn Modul nicht in `MODULE_MAP`
- [x] Fehlermeldung: "Oh, hier fehlt noch etwas. Probiere ein anderes Thema!"
- [x] Zurueck-Link vorhanden
- [x] Auch abgefangen wenn Schwierigkeit keine Aufgaben hat: "Fuer diese Schwierigkeitsstufe gibt es noch keine Aufgaben."
- **Status: BESTANDEN**

### E-4.5: Drag & Drop auf kleinen Bildschirmen
- [x] Touch-Ziele: `min-h-[48px] min-w-[48px]` (48x48px, entspricht Google Material Design Guidelines)
- [x] Click-to-Select Pattern statt echtem D&D - besser auf Mobile
- [ ] BUG-14: Da kein echtes Drag & Drop implementiert ist, kann dieser Edge Case nicht voll getestet werden
- **Status: TEILWEISE BESTANDEN** (Touch-Targets OK, aber kein echter D&D-Test moeglich)

---

## Bugs Found

### BUG-1: Stellenwert-Farbcodierung fehlt komplett
- **Severity:** High
- **AC:** AC-4.4
- **Steps to Reproduce:**
  1. Oeffne eine Stellenwert-Aufgabe (aktuell keine im Content, aber Spec fordert es)
  2. Expected: Einer=blau, Zehner=rot, Hunderter=gruen
  3. Actual: Keine Stellenwert-Erkennung in `colorCodeOperators()`. `ColorSegment` Typ hat keine Stellenwert-Farben. Keine Funktion vorhanden die Stellenwerte identifiziert und farblich markiert.
- **Betroffene Dateien:**
  - `src/lib/exercise-engine.ts` - `colorCodeOperators()` fehlt Stellenwert-Logik
  - `src/lib/types/exercise.ts` - `ColorSegment.color` fehlt Stellenwert-Typen
  - `src/components/exercise/exercise-display.tsx` - fehlt Stellenwert-CSS-Klassen
- **Priority:** High (Didaktisches Kernfeature)

### BUG-2: Schriftgroesse nicht einstellbar
- **Severity:** Medium
- **AC:** AC-4.5
- **Steps to Reproduce:**
  1. Suche nach einem Font-Size-Setting im Profil
  2. Expected: Eltern/Kind koennen Schriftgroesse anpassen
  3. Actual: Schriftgroesse ist fix via CSS (`clamp(1.5rem, 5vw, 3rem)`)
- **Betroffene Dateien:**
  - `src/stores/profile-store.ts` - kein fontSize-Setting
  - `src/components/exercise/exercise-display.tsx` - hardcoded font-size
- **Priority:** Medium (Barrierefreiheit)

### BUG-3: Kein echtes Drag & Drop implementiert
- **Severity:** High
- **AC:** AC-4.8
- **Steps to Reproduce:**
  1. Suche nach @dnd-kit in package.json
  2. Expected: @dnd-kit installiert, echte Drag-Interaktion
  3. Actual: Click-to-Select Pattern, kein @dnd-kit installiert
  4. Kommentar im Code bestaetigt den bewussten Workaround
- **Betroffene Dateien:**
  - `package.json` - @dnd-kit fehlt
  - `src/components/exercise/input-drag-drop.tsx` - Click-to-Select statt Drag
- **Priority:** High (Spec-Abweichung)

### BUG-4: Kein DragDrop-Content vorhanden
- **Severity:** High
- **AC:** AC-4.8
- **Steps to Reproduce:**
  1. Suche nach `"typ": "DragDrop"` in `m1-3.json`
  2. Expected: Mindestens eine DragDrop-Aufgabe
  3. Actual: 0 DragDrop-Aufgaben. Felder `dragItems` und `dropZones` sind in keiner Aufgabe befuellt.
- **Betroffene Dateien:**
  - `src/content/modules/m1-3.json` - kein DragDrop-Content
- **Priority:** High (Feature nicht testbar)

### BUG-5: Kein Sound-Feedback bei "reizreich"
- **Severity:** Medium
- **AC:** AC-4.16
- **Steps to Reproduce:**
  1. Setze Sensorik-Profil auf "reizreich"
  2. Beantworte eine Aufgabe richtig
  3. Expected: Konfetti + Jubel-Sound + Text (laut Spec und Tech-Design)
  4. Actual: Konfetti + Text, KEIN Sound
- **Betroffene Dateien:**
  - `src/components/exercise/feedback-display.tsx` - kein Audio-Element/API-Aufruf
- **Priority:** Medium (UX-Feature)

### BUG-6: Vorlese-Content fehlt
- **Severity:** Medium
- **AC:** AC-4.18
- **Steps to Reproduce:**
  1. Aktiviere LRS-Vorlesefunktion im Profil
  2. Starte eine Session mit M1.3
  3. Expected: Lautsprecher-Icon bei Textaufgaben
  4. Actual: Kein Icon, weil alle Aufgaben `vorlesen: false` haben
  5. ReadAloudButton-Code ist korrekt implementiert, nur Content nutzt ihn nicht
- **Betroffene Dateien:**
  - `src/content/modules/m1-3.json` - alle Aufgaben haben `vorlesen: false`
- **Priority:** Medium (LRS-Kinder koennen Feature nicht nutzen)

### BUG-7: Werkzeuge nicht kontextsensitiv
- **Severity:** Low
- **AC:** AC-4.19
- **Steps to Reproduce:**
  1. Oeffne eine Aufgabe "4 + 5 = ?"
  2. Oeffne den Zahlenstrahl
  3. Expected: Zahlenstrahl zeigt relevanten Zahlenraum (z.B. 0-10 fuer Addition bis 10)
  4. Actual: Zahlenstrahl zeigt immer 0-10 (Default), unabhaengig von Aufgabe
- **Betroffene Dateien:**
  - `src/components/exercise/exercise-session.tsx` - ToolToolbar bekommt keine Aufgaben-Infos
  - `src/components/tools/tool-toolbar.tsx` - keine Aufgaben-Props
- **Priority:** Low (Werkzeuge funktionieren, sind aber nicht optimal)

### BUG-8: hilfeGenutzt-Flag immer false
- **Severity:** Medium
- **AC:** AC-4.25
- **Steps to Reproduce:**
  1. Oeffne Werkzeuge waehrend einer Aufgabe
  2. Beantworte die Aufgabe
  3. Schaue in localStorage (mathe-app-session)
  4. Expected: `hilfeGenutzt: true` wenn Werkzeuge genutzt
  5. Actual: `hilfeGenutzt: false` immer (Zeile 97 in session-store.ts: `hilfeGenutzt: false`)
- **Betroffene Dateien:**
  - `src/stores/session-store.ts` - Zeile 97 hardcoded `false`
- **Priority:** Medium (Analytik/Tracking fehlerhaft)

### BUG-9: Aktive Session nicht persistiert (E-4.1)
- **Severity:** High
- **AC:** E-4.1
- **Steps to Reproduce:**
  1. Starte eine Session
  2. Beantworte 2 von 5 Aufgaben
  3. Schliesse den Browser-Tab
  4. Oeffne die App erneut
  5. Expected: Session kann fortgesetzt werden bei Aufgabe 3
  6. Actual: Session ist verloren, da `partialize` nur `completedSessions` speichert
- **Betroffene Dateien:**
  - `src/stores/session-store.ts` - `partialize` Zeile 192-194 schliesst aktive Session aus
- **Priority:** High (Datenverlust)

### BUG-10: Frustrations-Kaskade nicht implementiert (E-4.3)
- **Severity:** Medium
- **AC:** E-4.3
- **Steps to Reproduce:**
  1. Gib 3x die gleiche falsche Antwort
  2. Expected: Frustrations-Kaskade (PROJ-7) wird ausgeloest
  3. Actual: Aufgabe wird als falsch gewertet, weiter zur naechsten
  4. Keine Erkennung ob die gleiche Antwort wiederholt wurde
- **Betroffene Dateien:**
  - `src/stores/session-store.ts` - keine Logik fuer wiederholte gleiche Antworten
- **Priority:** Medium (Abhaengigkeit von PROJ-7, kann spaeter kommen)

### BUG-11: Kein UI fuer Session-Laenge
- **Severity:** Low
- **AC:** AC-4.22
- **Steps to Reproduce:**
  1. Navigiere zur Ueben-Seite
  2. Expected: Moeglichkeit die Anzahl Aufgaben zu waehlen (3-10)
  3. Actual: Nur ueber URL-Parameter `?anzahl=X` moeglich
- **Betroffene Dateien:**
  - `src/app/ueben/page.tsx` - nur URL-Param, kein UI
- **Priority:** Low (Logik funktioniert, UI fehlt - wird vermutlich ueber PROJ-9 Lernpfad geloest)

### BUG-12: Nur ein Content-Modul vorhanden
- **Severity:** Medium
- **AC:** AC-4.1
- **Steps to Reproduce:**
  1. `MODULE_MAP` in `content-loader.ts` hat nur Eintrag: `"M1.3"`
  2. Expected: Mindestens Grundmodule M1.1, M1.2, M1.3 verfuegbar
  3. Actual: Nur M1.3 (Addition bis 10)
  4. Spec-Ordnerstruktur zeigt m1-1.json, m1-2.json, etc.
- **Betroffene Dateien:**
  - `src/content/modules/` - nur m1-3.json
  - `src/lib/content-loader.ts` - MODULE_MAP hat nur M1.3
- **Priority:** Medium (Content-Erweiterung fuer PROJ-10/11 eingeplant)

---

## Security Check

### SEC-1: XSS-Risiko bei Feedback-Texten
- [x] KEIN Risiko: Feedback-Texte werden via React JSX gerendert (automatic escaping)
- [x] Kein `dangerouslySetInnerHTML` verwendet
- [x] Aufgabentext wird sicher via `{segment.text}` gerendert
- **Status: KEIN PROBLEM**

### SEC-2: localStorage-Nutzung
- [x] Zustand persist nutzt localStorage (Keys: `mathe-app-profile`, `mathe-app-session`)
- [x] Keine sensitiven Daten gespeichert (nur Name, Klasse, Sensorik-Profil, Ergebnisse)
- [ ] HINWEIS: Keine Integritaetspruefung der gespeicherten Daten - manipulierte Ergebnisse moeglich
- **Status: AKZEPTABEL** (fuer eine Kinder-Lern-App ohne Backend angemessen)

### SEC-3: URL-Parameter-Injection
- [x] `searchParams.get("modul")` wird gegen `MODULE_MAP` validiert (unbekanntes Modul -> null -> Fehlermeldung)
- [x] `searchParams.get("stufe")` wird als `Schwierigkeit` Type-Cast - ungueltige Werte fuehren zu leerer Aufgabenliste -> Fehlermeldung
- [x] `parseInt("anzahl")` mit Clamping (3-10)
- **Status: KEIN PROBLEM**

### SEC-4: Web Speech API Missbrauch
- [x] `ReadAloudButton` spricht nur den Aufgabentext vor
- [x] Text kommt aus statischem JSON, nicht aus User-Input
- **Status: KEIN PROBLEM**

---

## Performance Check

- [x] Lazy Loading: Module werden via `import()` dynamisch geladen
- [x] Feedback-Texte werden gecached (`cachedFeedbackTexts`)
- [x] Zod-Validierung bei Content-Load (schuetzt vor korrupten Daten)
- [x] AnimatePresence mit `mode="wait"` verhindert gleichzeitige Animationen
- [x] Build-Groesse: Statische Seiten, kein SSR noetig
- [ ] HINWEIS: `NumberLine` mit grossem Range (z.B. 0-100) koennte viele DOM-Elemente erzeugen - aktuell Default 0-10, OK
- **Status: AKZEPTABEL**

---

## Regression Check

### PROJ-2 (Onboarding & Profil-Setup)
- [x] `useProfileStore` wird korrekt importiert und genutzt
- [x] `ndSettings` Interface stimmt mit PROJ-2 ueberein
- [x] `onboardingCompleted` Check in `/ueben` Route vorhanden (Redirect zu `/` wenn nicht abgeschlossen)
- [x] Build erfolgreich - keine Breaking Changes
- **Status: KEINE REGRESSION**

---

## Summary

- **BESTANDEN:** 15 von 25 Acceptance Criteria
- **TEILWEISE BESTANDEN:** 6 von 25 (AC-4.5, AC-4.16, AC-4.18, AC-4.19, AC-4.22, AC-4.25)
- **NICHT BESTANDEN:** 4 von 25 (AC-4.4, AC-4.8 [2x Bug], E-4.1, E-4.3)
- **Bugs gefunden:** 12 (3 High, 5 Medium, 2 Low, 2 Hinweise)
- **Security Issues:** 0 (1 Hinweis)
- **Regression:** Keine

---

## Production-Ready Entscheidung

**NICHT PRODUCTION-READY**

### Muss vor Deployment gefixt werden (High Priority):
1. **BUG-1:** Stellenwert-Farbcodierung fehlt (AC-4.4) - Didaktisches Kernfeature
2. **BUG-3:** Kein echtes Drag & Drop (AC-4.8) - Spec-Abweichung, @dnd-kit muss installiert werden
3. **BUG-4:** Kein DragDrop-Content (AC-4.8) - Feature nicht testbar ohne Content
4. **BUG-9:** Aktive Session nicht persistiert (E-4.1) - Datenverlust bei App-Schliessung

### Sollte vor Deployment gefixt werden (Medium Priority):
5. **BUG-5:** Sound-Feedback fehlt bei "reizreich" (AC-4.16)
6. **BUG-6:** Vorlese-Content fehlt (AC-4.18) - LRS-Feature nicht nutzbar
7. **BUG-8:** hilfeGenutzt immer false (AC-4.25) - Tracking defekt
8. **BUG-10:** Frustrations-Kaskade fehlt (E-4.3) - Abhaengig von PROJ-7
9. **BUG-12:** Nur ein Content-Modul vorhanden - Abhaengig von PROJ-10/11

### Kann spaeter gefixt werden (Low Priority):
10. **BUG-2:** Schriftgroesse nicht einstellbar (AC-4.5)
11. **BUG-7:** Werkzeuge nicht kontextsensitiv (AC-4.19)
12. **BUG-11:** Kein UI fuer Session-Laenge (AC-4.22)

### Positive Aspekte:
- Solide Architektur mit klarer Trennung (Store, Engine, Components, Content)
- Zod-Validierung schuetzt vor fehlerhaftem Content
- Gute Accessibility (ARIA-Labels, role attributes, aria-live)
- Sensorik-Profil durchgaengig beruecksichtigt
- Feedback-System gut umgesetzt (ermutigend, variabel, sensorik-angepasst)
- TypeScript streng getypt (0 Fehler)
- Build erfolgreich und performant
