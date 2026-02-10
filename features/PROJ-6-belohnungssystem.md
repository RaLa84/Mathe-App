# PROJ-6: Belohnungs- & Meilenstein-System

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 6 (Belohnungssystem & Meilensteine)

## Abhaengigkeiten

- Benoetigt: PROJ-4 (Aufgaben-Engine) - Aufgaben-Ergebnisse als Trigger fuer Meilensteine
- Benoetigt: PROJ-5 (Hilfe-System) - "Hilfe-Profi" Meilenstein
- Benoetigt: PROJ-2 (Onboarding) - Sensorik-Profil bestimmt Belohnungs-Darstellung
- Wird benoetigt von: PROJ-8 (Elternbereich) - Fortschrittsanzeige

---

## User Stories

### US-6.1: Sterne sammeln
Als **Kind** moechte ich **Sterne sammeln** (Bronze, Silber, Gold) wenn ich Aufgaben schaffe, damit ich meinen Fortschritt sehen kann.

### US-6.2: Sofortiges Feedback bei richtiger Antwort
Als **Kind** moechte ich **sofort sehen und fuehlen, dass ich etwas richtig gemacht habe** (Animation, Sound, Text), damit ich motiviert weitermache.

### US-6.3: Meilensteine feiern
Als **Kind** moechte ich **bei besonderen Leistungen eine extra Feier sehen** (z.B. "5 richtige in Folge!"), damit ich stolz auf mich bin.

### US-6.4: Eigenen Fortschritt sehen
Als **Kind** moechte ich **sehen koennen, was ich schon alles geschafft habe** (Sterne-Sammlung, abgeschlossene Module), damit ich motiviert bleibe.

### US-6.5: Anstrengung belohnt bekommen
Als **Kind** moechte ich **auch fuer meine Anstrengung belohnt werden** (nicht nur fuer richtige Antworten), z.B. "Du hast es nochmal versucht!" oder "Du hast 3 Tage hintereinander geuebt!"

---

## Acceptance Criteria

### Meilenstein-Trigger
- [ ] AC-6.1: **Einstieg:** Meilenstein wird ausgeloest wenn ein Kind die erste Aufgabe in einem neuen Modul startet
- [ ] AC-6.2: **Erste Richtige:** Meilenstein bei erster korrekter Antwort in einem Modul
- [ ] AC-6.3: **5er-Serie:** Meilenstein bei 5 richtigen Antworten in Folge (innerhalb einer Session)
- [ ] AC-6.4: **Bronze-Stern:** Meilenstein wenn Bronze-Stufe eines Moduls abgeschlossen
- [ ] AC-6.5: **Silber-Stern:** Meilenstein wenn Silber-Stufe eines Moduls abgeschlossen
- [ ] AC-6.6: **Gold-Stern:** Meilenstein wenn Gold-Stufe eines Moduls abgeschlossen
- [ ] AC-6.7: **Hilfe-Profi:** Meilenstein wenn 5x Hilfe genutzt und danach korrekt geantwortet
- [ ] AC-6.8: **Durchhalte-Held:** Meilenstein bei 3 Tagen in Folge geuebt
- [ ] AC-6.9: **Modul-Meister:** Meilenstein wenn alle 3 Stufen eines Moduls abgeschlossen

### Belohnungs-Darstellung
- [ ] AC-6.10: Belohnungen passen sich dem Sensorik-Profil an:
  - Reizarm: Haken + Text, kein Sound, keine Animation
  - Standard: Stern-Animation + Text + optionaler Sound
  - Reizreich: Konfetti/Feuerwerk + Jubel-Sound + grosser Text
- [ ] AC-6.11: Belohnungs-Texte werden zufaellig aus einem Pool gewaehlt (min. 4 Varianten pro Meilenstein-Typ)
- [ ] AC-6.12: Meilenstein-Feier kann per Klick/Tippen uebersprungen werden (Kind muss nicht warten)
- [ ] AC-6.13: ASS-Profil: Belohnungen sind vorhersehbar und regelbasiert (nach exakt 5 Aufgaben = 1 Stern)
- [ ] AC-6.14: ADHS-Profil: Unvorhersehbare Bonus-Belohnungen ("Ueberraschungs-Stern!") optional aktivierbar

### Fortschritts-Sammlung
- [ ] AC-6.15: Es gibt eine Uebersichtsseite mit allen gesammelten Sternen pro Modul
- [ ] AC-6.16: Bronze/Silber/Gold-Sterne sind visuell unterscheidbar
- [ ] AC-6.17: Noch nicht erreichte Sterne sind als Umriss/Platzhalter sichtbar (Ziel erkennbar)
- [ ] AC-6.18: Durchhalte-Serien (Tage in Folge) werden als Kalender-Streak angezeigt

### Neurodivergenzsensible Regeln
- [ ] AC-6.19: Keine Ranglisten oder Vergleiche mit anderen Kindern
- [ ] AC-6.20: Kein Punkteabzug fuer falsche Antworten oder Hilfe-Nutzung
- [ ] AC-6.21: Pausen fuehren zu keinem Fortschrittsverlust
- [ ] AC-6.22: Eigener Fortschritt wird sichtbar gemacht ("Gestern 3, heute 5 Aufgaben!")
- [ ] AC-6.23: Hilfe-Nutzung wird positiv gezaehlt (nicht negativ)

---

## Edge Cases

- **E-6.1:** Was passiert, wenn ein Kind Meilensteine in einem Modul erneut durchlaeuft? → Sterne bleiben, keine doppelte Vergabe. Aber: "Du hast es nochmal geschafft!" als Text
- **E-6.2:** Was passiert, wenn die App offline ist und Meilensteine nicht gespeichert werden koennen? → Lokal speichern, bei naechster Verbindung synchronisieren (wenn Sync implementiert)
- **E-6.3:** Was passiert, wenn ein Kind per Einstufungstest Module ueberspringt? → Sterne fuer uebersprungene Module nicht automatisch vergeben, aber Module sind als "bereits gekonnt" markiert
- **E-6.4:** Was passiert, wenn die 5er-Serie durch eine Pause unterbrochen wird? → Serie bleibt erhalten (Pause ≠ Fehler)
- **E-6.5:** Was passiert, wenn Durchhalte-Streak durch Krankheit/Urlaub unterbrochen wird? → Streak wird zurueckgesetzt, aber freundlich: "Willkommen zurueck! Lass uns eine neue Serie starten!"

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Belohnungssystem (greift in mehrere Bereiche ein)
│
├── Meilenstein-Feier (Overlay, erscheint automatisch bei Trigger)
│   ├── Angepasst an Sensorik-Profil:
│   │   ├── Reizarm: Dezenter Banner oben + Text + Haken
│   │   ├── Standard: Stern-Animation mittig + Text + Slide-In
│   │   └── Reizreich: Vollbild-Feier: Konfetti + Jubel-Sound + grosser Text
│   ├── Meilenstein-Text (aus Pool, zufaellig variiert)
│   ├── Ueberspringen-Button (Kind muss nicht warten)
│   └── Automatisches Ausblenden nach 3-5 Sekunden
│
├── Sofort-Feedback bei richtiger Antwort (in der Aufgaben-Engine)
│   ├── Reizarm: Gruener Haken + kurzer Text
│   ├── Standard: Kleiner Stern fliegt ein + Text
│   └── Reizreich: Partikel-Effekt + Sound + wechselnder Lob-Text
│
├── Sterne-Sammlung (eigene Seite, ueber Lernpfad-Karte erreichbar)
│   ├── Alle Module als Liste/Raster
│   ├── Pro Modul: 3 Sterne-Platzhalter (Bronze, Silber, Gold)
│   │   ├── Erreichte Sterne: Leuchtend, farbig
│   │   └── Noch nicht erreicht: Grau/Umriss (Ziel sichtbar)
│   ├── Gesamt-Zaehler: "Du hast X Sterne gesammelt!"
│   └── Meilenstein-Galerie: Alle besonderen Meilensteine
│
├── Durchhalte-Streak (auf Willkommensbildschirm / Lernpfad-Karte)
│   ├── Kalender-Streak: Aktive Tage hervorgehoben
│   ├── Zaehler: "3 Tage in Folge!"
│   └── Ermutigend bei Unterbrechung: "Willkommen zurueck!"
│
└── ASS-Modus: Vorhersehbare Belohnungen
    ├── Klare Regel sichtbar: "Nach 5 Aufgaben = 1 Stern"
    ├── Zaehler: "Noch 2 Aufgaben bis zum Stern"
    └── Keine zufaelligen Ueberraschungen

ADHS-Modus: Optionale Bonus-Belohnungen
    ├── Unerwartete "Ueberraschungs-Sterne" (aktivierbar im Profil)
    └── Variable Belohnungsfrequenz (alle 2-3 Aufgaben Mini-Feedback)
```

### Daten-Model

```
MEILENSTEIN-DEFINITION (vordefiniert, aendert sich nicht):
- Meilenstein-Typ (Einstieg, Erste Richtige, 5er-Serie, Bronze, Silber, Gold,
                    Hilfe-Profi, Durchhalte-Held, Modul-Meister)
- Trigger-Bedingung (was muss passieren?)
- Belohnungstexte (Pool von min. 4 Varianten pro Typ)
- Belohnungs-Animation (welcher Effekt?)

ERREICHTE MEILENSTEINE (pro Kind gespeichert):
- Meilenstein-Typ
- Modul (bei dem es erreicht wurde)
- Erreicht am (Zeitstempel)
- Bereits einmal angezeigt? (Ja/Nein → keine doppelte Feier)

STERNE pro Modul:
- Modul-ID
- Bronze erreicht? (Ja/Nein + Zeitstempel)
- Silber erreicht? (Ja/Nein + Zeitstempel)
- Gold erreicht? (Ja/Nein + Zeitstempel)

STREAK-DATEN:
- Letztes aktives Datum
- Aktuelle Streak-Laenge (Tage in Folge)
- Laengste Streak (Rekord)

SERIE-DATEN (innerhalb einer Session):
- Aktuelle richtige in Folge
- Beste Serie (Rekord)

Gespeichert in: Browser localStorage (via Zustand persist)
→ Eigener Store: reward-store
```

### Event-System (wie werden Meilensteine ausgeloest?)

```
Aufgaben-Engine (PROJ-4) sendet Events → Belohnungssystem reagiert:

Session-Start → Check: Erste Aufgabe in neuem Modul? → "Einstieg" Meilenstein
      ↓
Richtige Antwort → Check: Erste Richtige in Modul? → "Erste Richtige" Meilenstein
      ↓
Richtige Antwort → Serie-Zaehler +1 → Bei 5: "5er-Serie" Meilenstein
      ↓
Falsche Antwort → Serie-Zaehler zuruecksetzen (aber kein negativer Effekt!)
      ↓
Session-Ende → Check: Stufe abgeschlossen?
      ├── Bronze fertig → "Bronze-Stern" Meilenstein
      ├── Silber fertig → "Silber-Stern" Meilenstein
      ├── Gold fertig → "Gold-Stern" Meilenstein
      └── Alle 3 Stufen → "Modul-Meister" Meilenstein
      ↓
Hilfe genutzt + danach richtig → Zaehler +1 → Bei 5: "Hilfe-Profi" Meilenstein
      ↓
App-Start → Check: Gestern auch geuebt?
      ├── Ja → Streak +1 → Bei 3: "Durchhalte-Held" Meilenstein
      └── Nein → Streak zurueck auf 1

Das Event-System nutzt Zustand-Store-Subscriptions:
→ Session-Store aendert sich → Reward-Store reagiert
→ Kein separater Event-Bus noetig
```

### Tech-Entscheidungen

```
Warum Zustand-Subscriptions statt eines Event-Bus?
→ Einfacher: Store-Aenderungen loesen automatisch Checks aus
→ Kein zusaetzliches Package noetig
→ Debugbar: Alle Meilenstein-Daten im Store sichtbar
→ Zuverlässig: Kein "verlorenes Event" moeglich

Warum Meilenstein-Texte als Pool mit Zufallsauswahl?
→ Abwechslung: "Super!" wird nicht langweilig wenn Kind es 50x sieht
→ Min. 4 Varianten pro Meilenstein-Typ
→ Einfach erweiterbar: Neue Texte zum Pool hinzufuegen

Warum Konfetti/Animationen nur im Reizreich-Profil?
→ ASS-Kinder koennen durch Ueberraschungs-Animationen ueberreizt werden
→ ADHS-Kinder koennen abgelenkt werden (aber: optionale Bonus-Belohnungen)
→ Standard-Profil: Dezente Animation (gut fuer die meisten Kinder)
→ Reizreich: Volle Feier fuer Kinder die das brauchen/moegen

Warum Sterne als Belohnungssystem?
→ Universell verstaendlich (auch fuer Klasse 1 ohne Lesen)
→ 3 Stufen (Bronze/Silber/Gold) sind klar hierarchisch
→ Visuell unterscheidbar (Farbe + Form)
→ Sammelbar und sichtbar auf der Lernpfad-Karte
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- framer-motion (Stern-Animationen, Konfetti-Effekt, Slide-In)
- zustand (Reward-Store)
- shadcn/ui (Dialog fuer Meilenstein-Overlay, Progress fuer Streaks)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── stores/
│   └── reward-store          ← Zustand: Sterne, Meilensteine, Streaks
│
├── components/
│   ├── rewards/
│   │   ├── milestone-celebration ← Vollbild/Banner Meilenstein-Feier
│   │   ├── star-collection    ← Uebersichtsseite aller Sterne
│   │   ├── star-display       ← Einzelner Stern (Bronze/Silber/Gold)
│   │   ├── streak-display     ← Kalender-Streak-Anzeige
│   │   ├── instant-feedback   ← Sofort-Feedback bei richtiger Antwort
│   │   └── confetti-effect    ← Konfetti-Animation (Reizreich-Profil)
│   │
│   └── exercise/             ← (aus PROJ-4, erweitert)
│       └── feedback-display  ← Integriert jetzt Belohnungs-Feedback
│
├── content/
│   └── reward-texts.json     ← Pool von Belohnungstexten pro Meilenstein-Typ
│
└── lib/
    └── milestone-checker     ← Logik: Pruefen ob Meilenstein erreicht
```

---

## QA Test Results

**Tested:** 2026-02-10
**Tester:** QA Engineer Agent (Code Review / Static Analysis)
**App URL:** http://localhost:3000
**Build Status:** TypeScript compiles without errors (`tsc --noEmit` passes)

### Analysierte Dateien

- `src/stores/reward-store.ts` (279 Zeilen)
- `src/lib/milestone-checker.ts` (247 Zeilen)
- `src/content/reward-texts.json` (74 Zeilen)
- `src/components/rewards/milestone-celebration.tsx` (215 Zeilen)
- `src/components/rewards/star-collection.tsx` (201 Zeilen)
- `src/components/rewards/star-display.tsx` (82 Zeilen)
- `src/components/rewards/streak-display.tsx` (172 Zeilen)
- `src/components/rewards/instant-feedback.tsx` (86 Zeilen)
- `src/components/rewards/confetti-effect.tsx` (89 Zeilen)
- `src/components/exercise/exercise-session.tsx` (655 Zeilen, Integration)
- `src/components/exercise/session-summary.tsx` (168 Zeilen, Integration)
- `src/components/learning-path/learning-path-map.tsx` (276 Zeilen, Integration)
- `src/app/learn/page.tsx` (46 Zeilen, Integration)

---

## Acceptance Criteria Status

### Meilenstein-Trigger

### AC-6.1: Einstieg-Meilenstein
- [x] `checkEinstieg(modul)` wird in `handleSessionStart()` aufgerufen
- [x] `handleSessionStart()` wird in `exercise-session.tsx` via useEffect bei `currentSession` Aenderung getriggert
- [x] `addMeilenstein("einstieg", modul)` prueft Duplikate korrekt (keine doppelte Vergabe)
- [x] Ref-Guard (`sessionStartHandled`) verhindert mehrfachen Aufruf

### AC-6.2: Erste Richtige
- [x] `checkErsteRichtige(modul)` wird in `handleCorrectAnswer()` aufgerufen
- [x] `handleCorrectAnswer()` wird in exercise-session.tsx bei `phase === "feedback" && lastAnswerCorrect === true` getriggert
- [x] Prueft korrekt via `addMeilenstein("ersteRichtige", modul)` ob bereits vorhanden
- [x] Wird pro Modul getrackt (nicht global)

### AC-6.3: 5er-Serie
- [x] `incrementSerie()` wird bei jeder korrekten Antwort aufgerufen
- [x] In `handleCorrectAnswer()` wird nach Increment geprueft ob `aktuelleSerieRichtig === 5`
- [x] `resetSerie()` wird bei falscher Antwort aufgerufen (kein negativer Effekt, nur Reset)
- [ ] BUG-1: Doppelte Pruefung der 5er-Serie (siehe Bugs unten)

### AC-6.4: Bronze-Stern
- [x] `checkSternMeilenstein()` wird in `checkSessionEndMilestones()` aufgerufen
- [x] Prueft `richtige / gesamt >= 0.8` (80% Schwelle) korrekt
- [x] `updateSterne(modul, "bronze")` aktualisiert den Reward-Store
- [x] Integration in `exercise-session.tsx` via `saveProgress()` -> `checkSessionEndMilestones()`

### AC-6.5: Silber-Stern
- [x] Gleiche Logik wie Bronze mit `schwierigkeit === "Silber"` -> `stufe = "silber"`
- [x] `.toLowerCase()` Konvertierung korrekt fuer den Typ "Silber" -> "silber"

### AC-6.6: Gold-Stern
- [x] Gleiche Logik wie Bronze mit `schwierigkeit === "Gold"` -> `stufe = "gold"`
- [x] `.toLowerCase()` Konvertierung korrekt

### AC-6.7: Hilfe-Profi
- [x] `checkHilfeProfi()` prueft `helpStore.getHelpThenCorrectCount() >= 5`
- [x] Wird als globaler Meilenstein (`modul: "global"`) gespeichert
- [x] `handleHelpThenCorrect()` wird in exercise-session.tsx bei `hilfeGenutzt && lastAnswerCorrect` aufgerufen
- [x] Help-Store trackt `danachRichtig` korrekt ueber `finishTracking(richtig)`

### AC-6.8: Durchhalte-Held
- [x] `checkDurchhalteHeld()` prueft `aktuelleStreakLaenge >= 3`
- [x] `updateStreak()` wird bei Session-Start aufgerufen
- [x] Streak-Logik: Vergleicht mit "gestern" via `Date.now() - 86400000`
- [x] Wird als globaler Meilenstein gespeichert

### AC-6.9: Modul-Meister
- [x] `checkModulMeister()` prueft `sterne.bronze && sterne.silber && sterne.gold`
- [x] Wird nach Star-Update in `checkSessionEndMilestones()` aufgerufen (korrekte Reihenfolge)

### Belohnungs-Darstellung

### AC-6.10: Sensorik-Profil-Anpassung
- [x] Reizarm: Banner oben + Text + X-Button (Schliessen), keine Animation (`useSensoryAnimation` liefert `enabled: false`)
- [x] Standard: Zentrierter Dialog mit Stern-Animation + Slide-In + "Weiter" Button
- [x] Reizreich: Vollbild-Overlay mit Konfetti-Effekt + grosser Text + "Weiter" Button
- [ ] BUG-2: Kein Sound implementiert (AC-6.10 fordert "optionaler Sound" fuer Standard und "Jubel-Sound" fuer Reizreich)
- [x] Reizarm: Keine Animation dank `useSensoryAnimation()` Hook mit `duration: 0, enabled: false`

### AC-6.11: Zufaellige Belohnungstexte (min. 4 Varianten)
- [x] `reward-texts.json` enthaelt 9 Meilenstein-Typen + 3 Extra-Kategorien
- [x] Jede Kategorie hat exakt 4 Varianten (Minimum erfuellt)
- [x] `getRandomRewardText()` waehlt per `Math.random()` zufaellig
- [x] Alle 9 Meilenstein-Typen abgedeckt: einstieg, ersteRichtige, fuenferSerie, bronzeStern, silberStern, goldStern, hilfeProfi, durchhalteHeld, modulMeister
- [x] Extra-Texte: ueberraschungsStern (4), wiederholtGeschafft (4), willkommenZurueck (4)

### AC-6.12: Meilenstein-Feier ueberspringbar
- [x] Reizarm: X-Button zum Schliessen vorhanden
- [x] Standard: "Weiter" Button + Klick auf Overlay-Hintergrund schliesst
- [x] Reizreich: "Weiter" Button + Klick auf Overlay-Hintergrund schliesst
- [x] Auto-Dismiss nach 3 Sekunden (Reizarm) bzw. 5 Sekunden (Standard/Reizreich)
- [x] Kind muss nicht warten, kann sofort weiterklicken

### AC-6.13: ASS-Profil vorhersehbare Belohnungen
- [ ] BUG-3: NICHT IMPLEMENTIERT - Es gibt keinen ASS-Modus mit vorhersehbaren Belohnungen
- Erwartet: Klare Regel sichtbar "Nach 5 Aufgaben = 1 Stern", Zaehler "Noch 2 Aufgaben bis zum Stern"
- Tatsaechlich: Kein ASS-spezifischer Modus, keine vorhersehbare Regel sichtbar, kein Countdown-Zaehler

### AC-6.14: ADHS-Profil optionale Bonus-Belohnungen
- [x] `incrementAufgabenSeitBonus()` implementiert variable Belohnungsfrequenz (alle 2-3 Aufgaben)
- [x] Logik im Reward-Store korrekt: Zaehler + randomBonusInterval(2-3)
- [ ] BUG-4: Ueberraschungs-Stern nicht im Profil aktivierbar/deaktivierbar
- [ ] BUG-5: InstantFeedback-Komponente wird nie gerendert (siehe BUG-5 Details)

### Fortschritts-Sammlung

### AC-6.15: Uebersichtsseite mit allen Sternen
- [x] `StarCollection` Komponente existiert und ist via Learn-Page erreichbar
- [x] Zeigt alle Module der aktuellen Klassenstufe
- [x] Gesamt-Zaehler: "X Sterne gesammelt!" vorhanden
- [x] Meilenstein-Galerie fuer spezielle Meilensteine (fuenferSerie, hilfeProfi, durchhalteHeld, modulMeister)
- [x] Zugang ueber Stern-Counter Link auf der Lernpfad-Karte

### AC-6.16: Bronze/Silber/Gold visuell unterscheidbar
- [x] `StarDisplay` verwendet unterschiedliche Farbschemata:
  - Bronze: `text-amber-600` / `bg-amber-100` / `shadow-amber-200`
  - Silber: `text-slate-400` / `bg-slate-100` / `shadow-slate-200`
  - Gold: `text-yellow-500` / `bg-yellow-100` / `shadow-yellow-200`
- [x] Erreichte Sterne: Farbig mit `fill="currentColor"` und Shadow
- [x] Drei Groessen verfuegbar: sm, md, lg

### AC-6.17: Nicht erreichte Sterne als Platzhalter
- [x] Nicht erreichte Sterne: `bg-muted` Hintergrund + `text-muted-foreground/30` Farbe
- [x] `fill="none"` fuer nicht erreichte Sterne (nur Umriss)
- [x] Ziel erkennbar durch sichtbare Platzhalter fuer alle 3 Stufen pro Modul

### AC-6.18: Kalender-Streak-Anzeige
- [x] `StreakDisplay` Komponente mit 7-Tage-Kalender implementiert
- [x] Aktive Tage: Orange Kreis mit Flammen-Icon
- [x] Inactive Tage: Grauer Kreis ohne Icon
- [x] Streak-Zaehler: "X Tage in Folge!"
- [x] Laengster Streak als Rekord angezeigt
- [x] Compact-Modus fuer Lernpfad-Karte
- [x] Voller Modus fuer Star-Collection

### Neurodivergenzsensible Regeln

### AC-6.19: Keine Ranglisten/Vergleiche
- [x] Keine Ranglisten-Komponente oder -Logik vorhanden
- [x] Kein Vergleich mit anderen Kindern in der gesamten App
- [x] Nur eigene Sterne und Meilensteine sichtbar

### AC-6.20: Kein Punkteabzug
- [x] `handleWrongAnswer()` ruft nur `resetSerie()` auf (Serie-Reset, kein Abzug)
- [x] Keine negative Logik in reward-store.ts (kein Decrement auf Sterne/Meilensteine)
- [x] Kommentar im Code: "no penalty - AC-6.20"
- [x] Hilfe-Nutzung hat keinen negativen Effekt auf Belohnungen

### AC-6.21: Pausen ohne Fortschrittsverlust
- [x] Pause-System (PROJ-7) aendert keine Reward-Store Daten
- [x] Serie (`aktuelleSerieRichtig`) wird durch Pause nicht zurueckgesetzt
- [x] Streak wird nur durch fehlende Tagesaktivitaet zurueckgesetzt, nicht durch Pausen

### AC-6.22: Eigener Fortschritt sichtbar
- [x] Star-Collection zeigt alle gesammelten Sterne pro Modul
- [x] Gesamt-Zaehler auf Lernpfad-Karte sichtbar
- [x] Streak-Display auf Lernpfad-Karte sichtbar
- [ ] BUG-6: Kein Tagesvergleich implementiert ("Gestern 3, heute 5 Aufgaben!")

### AC-6.23: Hilfe-Nutzung positiv gezaehlt
- [x] "Hilfe-Profi" Meilenstein belohnt Hilfe-Nutzung positiv
- [x] `hilfeDannRichtigZaehler` zaehlt nur nach oben
- [x] Kein negativer Effekt von Hilfe-Nutzung auf andere Belohnungen
- [x] Hilfe-Profi Text: "Hilfe holen ist schlau - du bist ein Profi!"

---

## Edge Cases Status

### E-6.1: Meilensteine bei erneutem Durchlauf
- [x] `addMeilenstein()` prueft `exists = meilensteine.some(m => m.typ === typ && m.modul === modul)` und gibt `false` zurueck bei Duplikat
- [x] `updateSterne()` prueft `if (existing[stufe]) return;` - keine doppelte Sternvergabe
- [ ] BUG-7: "Du hast es nochmal geschafft!" Text wird nicht angezeigt (reward-texts.json hat "wiederholtGeschafft" Pool, aber dieser wird nirgends verwendet)

### E-6.2: Offline-Verhalten (localStorage)
- [x] Alle Stores verwenden `zustand/middleware/persist` mit localStorage
- [x] `reward-store` persistiert unter Key `mathe-app-rewards` mit Version 1
- [x] `partialize` korrekt konfiguriert - alle relevanten Daten werden gespeichert
- [x] Keine Server-Synchronisierung implementiert (korrekterweise, da kein Backend vorhanden)

### E-6.3: Module ueberspringen per Einstufungstest
- [x] Progress-Store hat `markBereitsGekonnt(modulId)` Funktion
- [x] Uebersprungene Module erhalten keine automatischen Sterne (korrekt)
- [x] Module werden als "bereits gekonnt" markiert (korrekt)

### E-6.4: 5er-Serie durch Pause unterbrochen
- [x] Pause-Store (`usePauseStore`) aendert `aktuelleSerieRichtig` im Reward-Store nicht
- [x] Serie bleibt nach Pause erhalten
- [x] Nur `handleWrongAnswer()` ruft `resetSerie()` auf

### E-6.5: Streak-Unterbrechung durch Krankheit
- [x] `updateStreak()` setzt Streak auf 1 zurueck wenn `letzteAktivitaet` nicht "gestern" ist
- [x] `StreakDisplay` zeigt "Willkommen zurueck!" Text bei Streak-Reset (`welcomeBack` Logik auf Zeile 78-79)
- [x] `willkommenZurueck` Texte vorhanden in reward-texts.json (4 Varianten)

---

## Bugs Found

### BUG-1: Doppelte 5er-Serie Pruefung kann zu Race Condition fuehren
- **Severity:** Low
- **Datei:** `src/lib/milestone-checker.ts`
- **Beschreibung:** Die 5er-Serie wird an zwei Stellen geprueft: In `handleCorrectAnswer()` (Zeile 185: `aktuelleSerieRichtig === 5`) und in `checkSessionEndMilestones()` (Zeile 159: `checkFuenferSerie(modul)` das `>= 5` prueft). Da `addMeilenstein()` Duplikate verhindert, fuehrt dies nicht zu doppelten Meilensteinen, aber es ist unnoetige doppelte Logik. Die Inline-Pruefung in `handleCorrectAnswer()` verwendet `=== 5` waehrend `checkFuenferSerie()` `>= 5` verwendet - inkonsistent.
- **Steps to Reproduce:**
  1. Beantworte 5 Aufgaben in Folge korrekt
  2. `handleCorrectAnswer()` triggered den 5er-Serie Meilenstein (korrekt)
  3. Bei Session-Ende ruft `checkSessionEndMilestones()` nochmal `checkFuenferSerie()` auf
  4. `addMeilenstein()` gibt `false` zurueck da bereits vorhanden (kein Doppel-Bug)
- **Impact:** Kein funktionaler Bug, aber unnoetige Logik-Duplikation
- **Priority:** Low (Code Quality)

### BUG-2: Sound fehlt komplett
- **Severity:** Medium
- **Datei:** Alle Reward-Komponenten
- **Beschreibung:** AC-6.10 fordert "optionaler Sound" fuer Standard-Profil und "Jubel-Sound" fuer Reizreich-Profil. Es gibt keine Sound-Implementation in der gesamten App. Kein Audio-Element, keine Web Audio API Nutzung, keine Sound-Dateien.
- **Steps to Reproduce:**
  1. Setze Sensorik-Profil auf "reizreich"
  2. Loesche einen Meilenstein aus (z.B. erste richtige Antwort)
  3. Meilenstein-Feier erscheint mit Konfetti-Animation
  4. Erwartet: Jubel-Sound
  5. Tatsaechlich: Kein Sound
- **Priority:** Medium (UX Issue, Teil der Spec)

### BUG-3: ASS-Modus mit vorhersehbaren Belohnungen fehlt komplett (CRITICAL)
- **Severity:** High
- **Datei:** Fehlt - keine Implementation vorhanden
- **Beschreibung:** AC-6.13 fordert einen ASS-Profil-Modus mit:
  - Klare Regel sichtbar: "Nach 5 Aufgaben = 1 Stern"
  - Zaehler: "Noch 2 Aufgaben bis zum Stern"
  - Keine zufaelligen Ueberraschungen
  Die gesamte Spec-Sektion "ASS-Modus: Vorhersehbare Belohnungen" aus dem Tech-Design ist nicht umgesetzt. Es gibt weder eine ASS-spezifische UI, noch einen Countdown-Zaehler, noch eine Option im Profil um den ASS-Modus zu aktivieren.
- **Steps to Reproduce:**
  1. Durchsuche den gesamten Code nach ASS-Modus Logik
  2. Kein ASS-spezifischer Belohnungsmodus vorhanden
  3. Kein Countdown "Noch X Aufgaben bis zum Stern" vorhanden
  4. Keine Option im Onboarding/Profil um vorhersehbare Belohnungen zu waehlen
- **Priority:** High (Kernfunktion fuer neurodivergente Zielgruppe fehlt)

### BUG-4: ADHS Ueberraschungs-Sterne nicht optional aktivierbar
- **Severity:** High
- **Datei:** `src/components/exercise/exercise-session.tsx` (Zeile 297-300), `src/stores/reward-store.ts`
- **Beschreibung:** AC-6.14 fordert "optional aktivierbar" fuer ADHS Bonus-Belohnungen. Die `incrementAufgabenSeitBonus()` Funktion wird jedoch IMMER bei korrekter Antwort aufgerufen (Zeile 298), ohne zu pruefen ob das Kind ein ADHS-Profil hat oder ob diese Funktion im Profil aktiviert ist. Es gibt keine Profil-Einstellung fuer "Ueberraschungs-Sterne aktivieren".
- **Steps to Reproduce:**
  1. Erstelle ein Profil OHNE ADHS-Einstellungen
  2. Beantworte 2-3 Aufgaben korrekt
  3. ADHS Surprise-Star Logik wird trotzdem getriggert
  4. Erwartet: Nur wenn im Profil aktiviert
  5. Tatsaechlich: Immer aktiv fuer alle Profile
- **Priority:** High (Neurodivergenz-Sensibilitaet: ASS-Kinder koennen durch unerwartete Belohnungen ueberreizt werden)

### BUG-5: InstantFeedback-Komponente wird nie gerendert (CRITICAL)
- **Severity:** Critical
- **Datei:** `src/components/exercise/exercise-session.tsx`
- **Beschreibung:** Die `InstantFeedback` Komponente ist importiert (Zeile 29) und es gibt State-Variablen `instantFeedbackText` und `showInstantFeedback` (Zeilen 74-75), aber:
  1. `<InstantFeedback>` wird nirgends im JSX gerendert
  2. `showInstantFeedback` wird nie auf `true` gesetzt
  3. `setInstantFeedbackText("Ueberraschungs-Stern!")` wird aufgerufen (Zeile 300), aber der Text wird nie angezeigt
  Das bedeutet: US-6.2 (Sofortiges Feedback bei richtiger Antwort) ist als eigenstaendige Belohnungs-Komponente nicht funktional. Die bestehende `FeedbackDisplay` aus PROJ-4 zeigt zwar Feedback, aber das sensorik-angepasste Sofort-Feedback aus dem Belohnungssystem fehlt.
- **Steps to Reproduce:**
  1. Beantworte eine Aufgabe korrekt
  2. FeedbackDisplay aus PROJ-4 zeigt normales Feedback
  3. Erwartet: Zusaetzliches sensorik-angepasstes Sofort-Feedback (Reizarm: Haken+Text, Standard: Stern fliegt ein, Reizreich: Partikel+Sound)
  4. Tatsaechlich: Nur normales PROJ-4 Feedback, InstantFeedback Komponente ist Dead Code
- **Priority:** Critical (Kernfunktion des Belohnungssystems nicht sichtbar)

### BUG-6: Tagesvergleich "Gestern X, heute Y Aufgaben!" fehlt
- **Severity:** Medium
- **Datei:** Fehlt - keine Implementation vorhanden
- **Beschreibung:** AC-6.22 fordert dass der eigene Fortschritt sichtbar gemacht wird mit einem Beispiel wie "Gestern 3, heute 5 Aufgaben!". Waehrend der Gesamt-Fortschritt (Sterne, Streak) sichtbar ist, gibt es keinen Tagesvergleich der geloesten Aufgaben. Es gibt keine Logik die Aufgaben pro Tag zaehlt und vergleicht.
- **Steps to Reproduce:**
  1. Loese am Tag 1 drei Aufgaben
  2. Loese am Tag 2 fuenf Aufgaben
  3. Erwartet: Anzeige "Gestern 3, heute 5 Aufgaben!" auf Lernpfad oder Willkommenscreen
  4. Tatsaechlich: Nur Streak-Zaehler und Stern-Zaehler sichtbar
- **Priority:** Medium (UX Feature fehlt, Grundfortschritt ist aber sichtbar)

### BUG-7: "Wiederholung geschafft!" Text nie verwendet
- **Severity:** Low
- **Datei:** `src/content/reward-texts.json` (Zeile 62-67), `src/lib/milestone-checker.ts`
- **Beschreibung:** E-6.1 fordert dass bei erneutem Durchlauf "Du hast es nochmal geschafft!" angezeigt wird. Die Texte existieren in `reward-texts.json` unter dem Key "wiederholtGeschafft" (4 Varianten), aber es gibt keine Logik die diese Texte jemals auswaehlt oder anzeigt. Wenn `addMeilenstein()` `false` zurueckgibt (Duplikat), passiert einfach nichts.
- **Steps to Reproduce:**
  1. Erreiche den Bronze-Stern in einem Modul
  2. Spiele das gleiche Modul nochmal auf Bronze-Stufe und erreiche >= 80%
  3. Erwartet: "Du hast es nochmal geschafft!" oder aehnlicher Text
  4. Tatsaechlich: Kein Text, keine Feier, nichts passiert
- **Priority:** Low (Edge Case UX)

### BUG-8: Streak-Berechnung ueber Zeitzonen-Grenze fragil
- **Severity:** Low
- **Datei:** `src/stores/reward-store.ts` (Zeile 71-74, 162-189)
- **Beschreibung:** Die `getDateString()` Funktion verwendet `new Date()` ohne Zeitzone, und der Vergleich "gestern" wird via `Date.now() - 86400000` berechnet. Bei Sommer-/Winterzeit-Umstellung (DST) kann dies zu Fehlern fuehren: Ein Tag hat dann 23 oder 25 Stunden, nicht 24. Zudem haengt die Streak-Logik von der lokalen Uhrzeit des Browsers ab, was bei Reisen ueber Zeitzonen zu unerwartetem Verhalten fuehren kann.
- **Steps to Reproduce:**
  1. Uebe am Tag vor Zeitumstellung um 23:30 Uhr
  2. Am naechsten Tag (nach Zeitumstellung) um 00:30 Uhr nochmal
  3. Die 86400000ms Berechnung koennte falsch "gestern" berechnen
- **Priority:** Low (Edge Case, selten in der Praxis fuer Grundschulkinder)

### BUG-9: pendingCelebrations werden beim Persist nicht geladen
- **Severity:** Medium
- **Datei:** `src/stores/reward-store.ts` (Zeile 264-275)
- **Beschreibung:** Die `partialize` Konfiguration des Reward-Stores schliesst `pendingCelebrations` NICHT ein (Zeile 264-275). Das bedeutet: Wenn ein Meilenstein erreicht wird und das Kind die App schliesst bevor die Feier angezeigt wurde, geht die Feier verloren. Der Meilenstein ist in `meilensteine` gespeichert (korrekt), aber die Celebration wird nie nachgeholt.
- **Steps to Reproduce:**
  1. Erreiche einen Meilenstein (z.B. 5er-Serie)
  2. `pendingCelebrations` hat einen Eintrag
  3. Schliesse die App / lade die Seite neu
  4. `pendingCelebrations` ist leer (nicht persistiert)
  5. Die Meilenstein-Feier wird nie angezeigt
- **Priority:** Medium (Meilenstein-Feier geht verloren bei Page Reload)

---

## Security & Performance Check

### Security

- **localStorage Manipulation:** Alle Reward-Daten sind in `localStorage` unter `mathe-app-rewards` gespeichert. Ein technisch versiertes Kind oder Elternteil koennte die Daten manipulieren (z.B. alle Sterne setzen). Da dies eine Client-only Lern-App ist und kein kompetitiver Kontext besteht (AC-6.19: keine Ranglisten), ist dies ein akzeptables Risiko. Es gibt kein Backend das betrogen werden koennte.
- **Keine XSS-Risiken:** Belohnungstexte kommen aus statischem JSON, nicht aus User-Input. Kein `dangerouslySetInnerHTML` verwendet.
- **Keine sensiblen Daten:** Kein Name wird extern gesendet, alles bleibt lokal.
- **Store-Zugriff:** `getState()` Aufrufe in milestone-checker.ts sind synchron und haben keine Race-Conditions da React State Updates gequeued werden.

### Performance

- **Konfetti-Animation:** 30 Partikel mit framer-motion. Fuer Low-End-Geraete akzeptabel, da:
  - Nur im Reizreich-Profil aktiv
  - Auto-Timeout nach 2.5 Sekunden
  - `pointer-events: none` auf Container (keine Event-Handler Overhead)
- **Store-Subscriptions:** Korrekt per Zustand Selektoren optimiert (keine unnoetige Rerenders)
- **ScrollArea in StarCollection:** Virtualisierung ueber `ScrollArea` Komponente, 10 Module fuer Klasse 1 sind performant
- **Keine Memory Leaks:** useEffect Cleanups vorhanden fuer Timer in MilestoneCelebration

---

## Regression Test

### PROJ-4 (Aufgaben-Engine)
- [x] `exercise-session.tsx` importiert und nutzt Reward-System Funktionen korrekt
- [x] Bestehende Feedback-Logik (`FeedbackDisplay`, `getRandomFeedback`) unberuehrt
- [x] Submit/Retry/Next-Logik unveraendert
- [x] Session-Store Interaktion unveraendert

### PROJ-5 (Hilfe-System)
- [x] Help-Store wird von milestone-checker.ts gelesen (nicht geschrieben)
- [x] `finishTracking(richtig)` wird weiterhin korrekt aufgerufen
- [x] HelpPanel Integration unveraendert

### PROJ-7 (Pausen & Selbstregulation)
- [x] Pause-Store wird nicht vom Reward-System beeinflusst
- [x] PauseMenu/PauseReminder/FrustrationDialog weiterhin funktional
- [x] Keine Konflikte zwischen Pause-Timer und Reward-Timer

### PROJ-9 (Lernpfad-Navigation)
- [x] `LearningPathMap` erweitert um StreakDisplay (compact) und Stern-Counter
- [x] Bestehende Module-Navigation unveraendert
- [x] `ModuleDetail`, `ModuleStation`, `GradeSelector` nicht modifiziert
- [x] `onShowRewards` Prop sauber integriert

### PROJ-10 (Content Klasse 1)
- [x] Module-Definitionen unveraendert
- [x] Content-Loader unveraendert
- [x] Aufgaben-Daten nicht modifiziert

---

## Summary

- 17 von 23 Acceptance Criteria bestanden
- 6 Acceptance Criteria haben Bugs (1 Critical, 2 High, 2 Medium, 1 Low)
- 4 von 5 Edge Cases bestanden
- 1 Edge Case hat Bug (Low)
- 9 Bugs gefunden insgesamt (1 Critical, 2 High, 3 Medium, 3 Low)
- TypeScript kompiliert ohne Fehler
- Keine Regression in bestehenden Features gefunden
- Keine Security-Probleme fuer den Anwendungskontext

### Bug-Uebersicht nach Prioritaet

| Bug | Severity | Priority | Beschreibung |
|-----|----------|----------|-------------|
| BUG-5 | Critical | Critical | InstantFeedback Komponente wird nie gerendert (Dead Code) |
| BUG-3 | High | High | ASS-Modus mit vorhersehbaren Belohnungen fehlt komplett |
| BUG-4 | High | High | ADHS Ueberraschungs-Sterne nicht optional aktivierbar (immer aktiv) |
| BUG-2 | Medium | Medium | Sound fehlt komplett (Standard + Reizreich) |
| BUG-6 | Medium | Medium | Tagesvergleich "Gestern X, heute Y" fehlt |
| BUG-9 | Medium | Medium | pendingCelebrations gehen bei Page Reload verloren |
| BUG-1 | Low | Low | Doppelte 5er-Serie Pruefung (funktional korrekt, Code Quality) |
| BUG-7 | Low | Low | "Wiederholung geschafft!" Texte nie verwendet |
| BUG-8 | Low | Low | Streak-Berechnung bei DST-Umstellung fragil |

---

## Recommendation

### Vor Deployment fixen (Critical/High):

1. **BUG-5 (Critical):** `<InstantFeedback>` muss im JSX von exercise-session.tsx gerendert werden und `showInstantFeedback` muss bei korrekter Antwort auf `true` gesetzt werden. Dies ist eine Kernfunktion des Belohnungssystems.

2. **BUG-3 (High):** ASS-Modus implementieren mit vorhersehbarem Zaehler und Profil-Einstellung. Dies ist ein neurodivergenz-sensibler Kernaspekt der App.

3. **BUG-4 (High):** ADHS Bonus-Belohnungen muessen durch eine Profil-Einstellung steuerbar sein (z.B. `ndSettings.surpriseRewards: boolean`). Derzeit werden alle Kinder mit variablen Bonus-Sternen konfrontiert, was fuer ASS-Profile problematisch sein kann.

### Nach Deployment fixen koennen (Medium/Low):

4. **BUG-9 (Medium):** `pendingCelebrations` in die `partialize` Konfiguration aufnehmen.
5. **BUG-2 (Medium):** Sound-System implementieren (Web Audio API oder Audio-Elemente).
6. **BUG-6 (Medium):** Tages-Aufgaben-Zaehler und Vergleich implementieren.
7. **BUG-1, BUG-7, BUG-8 (Low):** Code-Quality Verbesserungen.

---

## Production-Ready Decision

**NICHT READY** - Das Feature hat 1 Critical Bug und 2 High Bugs die vor Deployment gefixt werden muessen. Insbesondere BUG-5 (InstantFeedback nie angezeigt) und BUG-3/BUG-4 (fehlende Neurodivergenz-Modi) sind fuer die Zielgruppe der App essentiell.
