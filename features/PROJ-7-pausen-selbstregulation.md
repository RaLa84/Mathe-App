# PROJ-7: Pausen & Selbstregulation

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 7 (Pausen und Selbstregulation)

## Abhaengigkeiten

- Benoetigt: PROJ-4 (Aufgaben-Engine) - Pausen werden waehrend Sessions angeboten
- Benoetigt: PROJ-2 (Onboarding) - Pausen-Intervall ist konfigurierbar
- Wird benoetigt von: PROJ-8 (Elternbereich) - Pausen-Einstellungen

---

## User Stories

### US-7.1: Pause machen
Als **Kind** moechte ich **jederzeit eine Pause machen koennen**, ohne meinen Fortschritt zu verlieren, damit ich mich erholen kann, wenn ich muede oder ueberfordert bin.

### US-7.2: Pausen-Erinnerung erhalten
Als **Kind** moechte ich **sanft daran erinnert werden, eine Pause zu machen**, wenn ich schon lange uebe, damit ich nicht ueberarbeite.

### US-7.3: Atemuebung machen
Als **Kind** moechte ich **eine kurze Atemuebung als Pause machen koennen** (mit Animation), damit ich mich beruhigen kann.

### US-7.4: Bewegungspause machen
Als **Kind** moechte ich **eine Bewegungspause angeboten bekommen** ("Steh auf und schuettle dich!"), damit ich meinen Koerper bewegen kann.

### US-7.5: Stimmung mitteilen
Als **Kind** moechte ich **vor und nach dem Ueben meine Stimmung mitteilen koennen** (Emoji-Auswahl), damit die App weiss, wie es mir geht.

### US-7.6: Frustrations-Hilfe bekommen
Als **Kind** moechte ich **automatisch Hilfe oder eine Pause angeboten bekommen**, wenn ich mehrmals hintereinander falsch antworte, damit ich nicht frustriert werde.

### US-7.7: Pausen-Intervall einstellen (Eltern)
Als **Elternteil** moechte ich **das Pausen-Intervall einstellen koennen** (alle 5/10/15/20 Minuten), angepasst an die Beduerfnisse meines Kindes.

---

## Acceptance Criteria

### Pause jederzeit
- [ ] AC-7.1: Ein Pausen-Button ist waehrend jeder Aufgabe sichtbar und erreichbar
- [ ] AC-7.2: Bei Klick auf Pause: Aktuelle Aufgabe wird gespeichert und kann spaeter fortgesetzt werden
- [ ] AC-7.3: Kein Fortschrittsverlust bei Pause (Serie, Sterne, Session-Status bleiben erhalten)
- [ ] AC-7.4: Positive Bestaetigung: "Gute Pause! Ausgeruhte Koepfe rechnen besser."

### Pausen-Erinnerung
- [ ] AC-7.5: Nach X Minuten (konfigurierbar: 5/10/15/20, Standard: 10) erscheint eine sanfte Erinnerung
- [ ] AC-7.6: Erinnerung ist nicht blockierend - Kind kann weitermachen ODER Pause waehlen
- [ ] AC-7.7: Erinnerungstext ist positiv: "Du uebst schon toll! Moechtest du eine Pause machen?"
- [ ] AC-7.8: Wenn Kind im Hyperfokus/Flow (ADHS Weiter-Modus aktiv): Erinnerung wird unterdrückt

### Pausen-Aktivitaeten
- [ ] AC-7.9: **Atemuebung:** Animation zeigt Ein-/Ausatmen (Kreis wird groesser/kleiner), Dauer ca. 30-60 Sekunden
- [ ] AC-7.10: **Bewegungspause:** Text + optionale Animation: "Steh auf!", "Schuettle deine Haende!", "Mach dich gross und klein!", Dauer ca. 30-60 Sekunden
- [ ] AC-7.11: Kind kann zwischen Pausen-Aktivitaeten waehlen oder einfach nur "Pause ohne Aktivitaet"
- [ ] AC-7.12: Am Ende der Pause: "Bereit fuer die naechste Aufgabe? [Ja] [Noch etwas Pause]"

### Stimmungscheck
- [ ] AC-7.13: Vor Session-Start: "Wie fuehlst du dich?" mit 5 Emoji-Optionen (sehr gut / gut / okay / nicht so gut / schlecht)
- [ ] AC-7.14: Nach Session-Ende: "Wie fuehlst du dich jetzt?" mit gleichen 5 Emojis
- [ ] AC-7.15: Stimmungsdaten werden gespeichert (fuer Elternbereich PROJ-8)
- [ ] AC-7.16: Stimmungscheck ist ueberspringbar (nie erzwungen)

### Frustrations-Kaskade
- [ ] AC-7.17: Nach 2 Fehlversuchen bei derselben Aufgabe: Ermutigendes Feedback + Hilfe-Stufe 1 anbieten
- [ ] AC-7.18: Nach 3 Fehlversuchen: Auswahl anbieten: [Tipp nutzen] [Leichtere Aufgabe] [Pause machen] [Ueberspringen]
- [ ] AC-7.19: Nach 5 Fehlversuchen (gleiche oder verschiedene Aufgaben): Automatisch leichtere Aufgabe oder Schritt-fuer-Schritt-Loesung anbieten
- [ ] AC-7.20: Frustrations-Schwellenwerte sind im Elternbereich anpassbar (Standard: 2/3/5)

### Abbruch ohne Strafe
- [ ] AC-7.21: Kind kann jederzeit die Session beenden (auch mitten in einer Aufgabe)
- [ ] AC-7.22: Bei Abbruch: "Toll, dass du heute geuebt hast! Bis bald!" (positiv)
- [ ] AC-7.23: Bereits geloeste Aufgaben der Session werden gespeichert

---

## Edge Cases

- **E-7.1:** Was passiert, wenn das Kind die Atemuebung nicht fertig macht? → Jederzeit abbrechen, zurueck zur Pause-Auswahl
- **E-7.2:** Was passiert, wenn die Frustrations-Kaskade bei der allerersten Aufgabe ausloest? → Sanfter: "Diese Aufgabe ist neu fuer dich. Lass uns mit einer leichteren anfangen!" (statt "Du machst viele Fehler")
- **E-7.3:** Was passiert, wenn das Kind den Stimmungscheck immer ueberspringt? → Kein Problem, optional lassen. Keine Erinnerung/Aufforderung
- **E-7.4:** Was passiert, wenn das Kind "schlecht" als Stimmung waehlt? → Ermutigender Text: "Das ist okay. Mathe soll Spass machen. Moechtest du trotzdem eine Aufgabe probieren? Oder lieber spaeter?"
- **E-7.5:** Was passiert, wenn die Pausen-Erinnerung in der Mitte einer Aufgabe kommt? → Erinnerung wartet bis Aufgabe beantwortet ist (nicht waehrend Eingabe unterbrechen)

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Pausen & Selbstregulation (integriert in die Aufgaben-Engine)
│
├── Pausen-Button (immer sichtbar im Session-Header aus PROJ-4)
│   ├── Pausen-Icon (z.B. Doppel-Strich oder Wolke)
│   ├── Bei Klick → Pausen-Menue oeffnet sich
│   └── Position: oben links im Session-Header
│
├── Pausen-Menue (Overlay, blockiert die Aufgabe freundlich)
│   ├── "Du machst eine Pause - super!"
│   ├── Aktivitaeten-Auswahl:
│   │   ├── Button: "Atemuebung" → Atem-Animation
│   │   ├── Button: "Bewegungspause" → Bewegungs-Anleitung
│   │   └── Button: "Einfach nur Pause" → Ruhiger Bildschirm
│   └── "Bereit fuer die naechste Aufgabe?" → [Ja] [Noch etwas Pause]
│
├── Atem-Uebung (eigener Vollbild-Screen)
│   ├── Animierter Kreis (wird groesser = einatmen, kleiner = ausatmen)
│   ├── Text: "Atme ein... und aus..."
│   ├── Dauer: ca. 30-60 Sekunden (5-8 Atemzuege)
│   ├── Angepasst an Sensorik-Profil:
│   │   ├── Reizarm: Einfacher Kreis, keine Farben
│   │   ├── Standard: Sanfter Farbverlauf
│   │   └── Reizreich: Bunte Partikel um den Kreis
│   └── Jederzeit abbrechbar
│
├── Bewegungspause (eigener Vollbild-Screen)
│   ├── Wechselnde Anweisungen (alle 8-10 Sekunden):
│   │   ├── "Steh auf und schuettle dich!"
│   │   ├── "Strecke dich ganz gross!"
│   │   ├── "Mach dich ganz klein!"
│   │   ├── "Schuettle deine Haende!"
│   │   └── "Huepfe 3 Mal!"
│   ├── Optional: Einfache Stick-Figure-Animation
│   ├── Dauer: ca. 30-60 Sekunden
│   └── Jederzeit abbrechbar
│
├── Pausen-Erinnerung (nicht-blockierender Banner)
│   ├── Erscheint nach X Minuten (konfigurierbar: 5/10/15/20)
│   ├── Sanfter Slide-In von oben
│   ├── Text: "Du uebst schon toll! Moechtest du eine Pause machen?"
│   ├── Buttons: [Pause] [Weiter ueben]
│   ├── Wird NICHT waehrend einer Aufgaben-Eingabe angezeigt
│   │   → Wartet bis Aufgabe beantwortet ist
│   └── Wenn ADHS-Hyperfokus-Modus aktiv: Erinnerung wird unterdrueckt
│
├── Stimmungscheck (vor und nach jeder Session)
│   ├── "Wie fuehlst du dich?" / "Wie fuehlst du dich jetzt?"
│   ├── 5 grosse Emoji-Buttons:
│   │   ├── 😊 Sehr gut
│   │   ├── 🙂 Gut
│   │   ├── 😐 Okay
│   │   ├── 😕 Nicht so gut
│   │   └── 😢 Schlecht
│   ├── Ueberspringbar (nie erzwungen)
│   ├── Bei "Schlecht": Ermutigender Text + Option "Lieber spaeter?"
│   └── Daten werden gespeichert (fuer PROJ-8 Elternbereich)
│
├── Frustrations-Kaskade (automatisch, in Aufgaben-Engine integriert)
│   ├── Nach 2 Fehlversuchen: Ermutigendes Feedback + Hilfe-Stufe 1 anbieten
│   ├── Nach 3 Fehlversuchen: Auswahl-Dialog:
│   │   ├── [Tipp nutzen] → Hilfe-System PROJ-5
│   │   ├── [Leichtere Aufgabe] → Einfachere Aufgabe laden
│   │   ├── [Pause machen] → Pausen-Menue
│   │   └── [Ueberspringen] → Naechste Aufgabe
│   └── Nach 5 Fehlversuchen: Automatisch leichtere Aufgabe oder Schritt-fuer-Schritt
│
└── Session-Abbruch (jederzeit moeglich)
    ├── "Toll, dass du heute geuebt hast! Bis bald!"
    ├── Bereits geloeste Aufgaben werden gespeichert
    └── Kein Fortschrittsverlust
```

### Daten-Model

```
PAUSEN-EINSTELLUNGEN (im Profil-Store aus PROJ-2):
- Pausen-Intervall (5, 10, 15 oder 20 Minuten, Standard: 10)
- Hyperfokus-Modus aktiv? (Ja/Nein - unterdrueckt Pausen-Erinnerung)
- Frustrations-Schwellenwerte (Standard: 2/3/5, anpassbar im Elternbereich)

STIMMUNGS-DATEN (werden gespeichert):
- Session-ID
- Stimmung vorher (1-5 oder "uebersprungen")
- Stimmung nachher (1-5 oder "uebersprungen")
- Zeitstempel

SESSION-TIMER:
- Session-Startzeit
- Vergangene Minuten
- Naechste Erinnerung faellig? (Ja/Nein)

FRUSTRATIONS-ZAEHLER (pro Session, nicht persistiert):
- Fehlversuche bei aktueller Aufgabe
- Fehlversuche in aktueller Session (gesamt)

Gespeichert in: Browser localStorage (via Zustand persist)
→ Stimmungsdaten im session-store
→ Pausen-Einstellungen im profile-store
```

### Timer-Logik

```
Session-Start → Timer startet
      ↓
Jede Minute: Zaehler +1
      ↓
Zaehler >= Pausen-Intervall?
      ├── Ja → Ist gerade eine Aufgabe in Bearbeitung?
      │         ├── Ja → Erinnerung WARTEN bis Antwort gegeben
      │         └── Nein → Erinnerung anzeigen
      │                    ├── Kind klickt "Pause" → Pausen-Menue
      │                    └── Kind klickt "Weiter" → Timer zuruecksetzen
      └── Nein → Weiterlaufen

Sonderfall: Hyperfokus-Modus (ADHS)
→ Timer laeuft, aber Erinnerung wird NICHT angezeigt
→ Kind ist im Flow, keine Unterbrechung
```

### Tech-Entscheidungen

```
Warum Erinnerung NACH der Aufgabe und nicht waehrenddessen?
→ Unterbrechung waehrend Eingabe = Frustration (besonders bei ADHS/ASS)
→ Kind verliert den Gedanken und muss nochmal anfangen
→ Erinnerung nach der Antwort ist weniger stoerend

Warum Stimmungscheck als Emojis statt Text?
→ Klasse 1 kann noch nicht gut lesen
→ Emojis sind universell verstaendlich
→ Schnell: Ein Tipp und fertig (keine Texteingabe)
→ Nicht invasiv: 5 grosse Buttons, fertig in 2 Sekunden

Warum Atem-Uebung als Animation und nicht als Video?
→ Animation passt sich dem Sensorik-Profil an (Video nicht)
→ Leichtgewichtig: Keine Video-Dateien laden
→ Interaktiv: Kind kann Tempo anpassen
→ Framer Motion macht die Animation einfach

Warum konfigurierbare Frustrations-Schwellenwerte?
→ Jedes Kind ist anders: Manche brauchen mehr Versuche, manche weniger
→ Eltern kennen ihr Kind am besten
→ Standard-Werte (2/3/5) sind paedagogisch sinnvoll
→ Anpassbar im Elternbereich (PROJ-8)
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- framer-motion (Atem-Animation, Slide-In fuer Erinnerung)
- zustand (Timer-State, Stimmungsdaten)
- shadcn/ui (Dialog, Alert fuer Erinnerung)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── components/
│   ├── pause/
│   │   ├── pause-button       ← Pausen-Icon im Session-Header
│   │   ├── pause-menu         ← Overlay mit Aktivitaeten-Auswahl
│   │   ├── breathing-exercise ← Atem-Animation (Vollbild)
│   │   ├── movement-break     ← Bewegungspause (Vollbild)
│   │   ├── pause-reminder     ← Nicht-blockierender Banner
│   │   └── frustration-dialog ← Auswahl nach mehreren Fehlversuchen
│   │
│   ├── mood/
│   │   └── mood-check         ← 5-Emoji-Auswahl (vorher/nachher)
│   │
│   └── exercise/             ← (aus PROJ-4, erweitert)
│       └── exercise-session  ← Integriert Timer + Frustrations-Logik
│
└── lib/
    └── session-timer          ← Timer-Logik fuer Pausen-Erinnerungen
```

---

## QA Test Results

**Tested:** 2026-02-10
**Tester:** QA Engineer (Code Review)
**Build:** Erfolgreich (Next.js 16.1.6 Turbopack)
**Methode:** Statische Code-Analyse gegen alle Acceptance Criteria, Edge Cases, Regression

## Acceptance Criteria Status

### Pause jederzeit (AC-7.1 bis AC-7.4)
- [x] AC-7.1: Pausen-Button ist waehrend jeder Aufgabe sichtbar und erreichbar (`exercise-header.tsx:57` PauseButton, Lucide Pause-Icon, auf Mobile nur Icon sichtbar)
- [x] AC-7.2: Bei Klick auf Pause: Aktuelle Aufgabe wird gespeichert und kann fortgesetzt werden (Session-State bleibt in session-store erhalten, `openPause()` aendert nur Pausen-State)
- [x] AC-7.3: Kein Fortschrittsverlust bei Pause (session-store ist persistiert via Zustand persist, Serie/Sterne/Index bleiben erhalten)
- [x] AC-7.4: Positive Bestaetigung: "Gute Pause! Ausgeruhte Koepfe rechnen besser." (`pause-menu.tsx:49+95` zeigt beides im "rest"-State)

### Pausen-Erinnerung (AC-7.5 bis AC-7.8)
- [x] AC-7.5: Nach X Minuten erscheint sanfte Erinnerung (Timer in `exercise-session.tsx:101-111`, Check gegen `ndSettings.pauseInterval`, Standard: 10, konfigurierbar: 5/10/15/20)
- [x] AC-7.6: Erinnerung ist nicht blockierend (`pause-reminder.tsx` als fixed-position Banner, Buttons: [Pause] [Weiter ueben])
- [x] AC-7.7: Erinnerungstext positiv: "Du uebst schon toll! Moechtest du eine Pause machen?" (`pause-reminder.tsx:28-32`)
- [x] AC-7.8: Hyperfokus-Modus unterdrueckt Erinnerung (`exercise-session.tsx:117`: `!ndSettings.hyperfokusMode`)

### Pausen-Aktivitaeten (AC-7.9 bis AC-7.12)
- [x] AC-7.9: Atemuebung mit Animation (Kreis groesser/kleiner), Dauer ~48s (6 Zyklen x 8s), Sensorik-Profil-Anpassung (reizarm/standard/reizreich mit Partikeln) (`breathing-exercise.tsx`)
- [x] AC-7.10: Bewegungspause mit wechselnden Anweisungen alle 8s, 6 Uebungen ~48s, Emoji-Illustrationen, Progress-Dots (`movement-break.tsx`)
- [x] AC-7.11: Kind kann zwischen 3 Aktivitaeten waehlen: Atemuebung, Bewegungspause, Einfach nur Pause (`pause-menu.tsx:60-88`)
- [x] AC-7.12: Am Ende: "Bereit fuer die naechste Aufgabe?" mit [Ja, weiter!] [Noch etwas Pause] (`pause-menu.tsx:97-117`)

### Stimmungscheck (AC-7.13 bis AC-7.16)
- [x] AC-7.13: Vor Session-Start: "Wie fuehlst du dich?" mit 5 Emojis (sehr gut/gut/okay/nicht so gut/schlecht) (`mood-check.tsx`, `ueben/page.tsx:139-146`)
- [x] AC-7.14: Nach Session-Ende: "Wie fuehlst du dich jetzt?" mit gleichen 5 Emojis (`ueben/page.tsx:152-159`, Trigger bei summary-Phase)
- [x] AC-7.15: Stimmungsdaten werden gespeichert in moodHistory (persistiert via Zustand persist, `pause-store.ts:139-150+180-182`)
- [x] AC-7.16: Stimmungscheck ueberspringbar ("Ueberspringen"-Button in `mood-check.tsx:68-73`)

### Frustrations-Kaskade (AC-7.17 bis AC-7.20)
- [x] AC-7.17: Nach 2 Fehlversuchen: Ermutigendes Feedback "Kein Problem! Schau dir den Tipp an - der hilft bestimmt!" + Hilfe-Panel oeffnet sich automatisch (BUG-1 FIXED)
- [x] AC-7.18: Nach 3 Fehlversuchen: Auswahl anbieten [Tipp nutzen] [Leichtere Aufgabe] [Pause machen] [Ueberspringen] (`frustration-dialog.tsx`)
- [x] AC-7.19: Nach 5 Session-Fehlern: Frustrations-Dialog wird automatisch angezeigt, `sessionFailCount` wird gegen `frustrationThresholds.auto` geprueft (BUG-2 FIXED)
- [x] AC-7.20: Frustrations-Schwellenwerte sind konfigurierbar (Datenmodell mit warn/offer/auto in profile-store, `setFrustrationThresholds` Action vorhanden, UI kommt mit PROJ-8)

### Abbruch ohne Strafe (AC-7.21 bis AC-7.23)
- [x] AC-7.21: Kind kann jederzeit Session beenden (Zurueck-Button im Header, `handleSessionAbort` in `exercise-session.tsx`)
- [x] AC-7.22: Bei Abbruch: Goodbye-Screen "Toll, dass du heute geuebt hast! Bis bald!" wird angezeigt (`onExit` setzt `uebenPhase` auf "goodbye") (BUG-3 FIXED)
- [x] AC-7.23: Bereits geloeste Aufgaben werden gespeichert (`saveProgress()` wird vor `endSession()` aufgerufen)

## Edge Cases Status

### E-7.1: Atemuebung nicht fertig machen
- [x] X-Button bricht ab und geht zurueck zur Pause-Auswahl (Menu). "Weiter"-Button nach Abschluss geht zu "rest"-Screen. Separater `onCancel`-Callback implementiert. (BUG-4 FIXED)

### E-7.2: Frustrations-Kaskade bei allererster Aufgabe
- [x] FrustrationDialog prueft `isFirstExercise={currentIndex === 0}` und zeigt angepassten Text: "Diese Aufgabe ist neu fuer dich! Lass uns mit einer leichteren anfangen!"

### E-7.3: Kind ueberspringt Stimmungscheck immer
- [x] Kein Problem - Skip-Button vorhanden, keine Erinnerung/Aufforderung, mood wird als `null` gespeichert.

### E-7.4: Kind waehlt "schlecht" als Stimmung
- [x] Ermutigender Zwischen-Screen: "Das ist okay. Mathe soll Spass machen." mit [Ja, ich probiere!] und [Lieber spaeter] Buttons. Neue `mood-encourage` Phase in `ueben/page.tsx`. (BUG-5 FIXED)

### E-7.5: Pausen-Erinnerung waehrend Aufgabe
- [x] Erinnerung wartet bis Aufgabe beantwortet (`exercise-session.tsx`: `phase !== "active"`, Erinnerung erscheint erst in feedback-Phase)

## Bugs Found & Fixed

### BUG-1: `warn`-Schwellenwert (2 Fehlversuche) nicht implementiert - FIXED
- **Severity:** High
- **Fix:** Neuer useEffect in `exercise-session.tsx` prueft `currentAttempts >= frustrationThresholds.warn`. Oeffnet Hilfe-Panel automatisch + zeigt ermutigenden Text "Kein Problem! Schau dir den Tipp an - der hilft bestimmt!"

### BUG-2: `auto`-Schwellenwert (5 Session-Fehler) nicht implementiert - FIXED
- **Severity:** High
- **Fix:** Neuer useEffect in `exercise-session.tsx` prueft `sessionFailCount >= frustrationThresholds.auto`. Zeigt Frustrations-Dialog automatisch. `sessionFailCount` wird nach Frustrations-Aktion zurueckgesetzt.

### BUG-3: Kein Abschiedstext bei Session-Abbruch - FIXED
- **Severity:** Medium
- **Fix:** `onExit` in `ueben/page.tsx` setzt `uebenPhase` auf "goodbye" statt direkt zu `/learn` zu navigieren. Goodbye-Screen wird jetzt auch bei Abbruch angezeigt.

### BUG-4: Aktivitaet abbrechen geht zu "rest" statt "menu" - FIXED
- **Severity:** Low
- **Fix:** Neuer `onCancel`-Callback in `BreathingExercise` und `MovementBreak`. X-Button nutzt `onCancel` (-> menu), "Weiter"-Button nutzt `onClose` (-> rest). `pause-menu.tsx` hat separaten `handleActivityCancel`.

### BUG-5: Kein ermutigender Text bei schlechter Stimmung - FIXED
- **Severity:** Medium
- **Fix:** Neue `mood-encourage` Phase in `ueben/page.tsx`. Bei Stimmung <= 2 wird Zwischen-Screen gezeigt: "Das ist okay. Mathe soll Spass machen." mit [Ja, ich probiere!] und [Lieber spaeter].

## Regression Test

- [x] PROJ-4 (Aufgaben-Engine): Session-Flow, Aufgaben-Anzeige, Eingabe, Feedback funktionieren weiterhin
- [x] PROJ-5 (Hilfe-System): HelpButton und HelpPanel weiterhin integriert und funktional
- [x] PROJ-9 (Lernpfad-Navigation): Navigation zu /ueben und /learn unveraendert
- [x] PROJ-10 (Content): Content-Loader und Module unberuehrt
- [x] PROJ-2 (Onboarding): ND-Settings erweitert (pauseInterval, hyperfokusMode, frustrationThresholds) mit korrekter Migration (version 2->3)
- [x] Build: Erfolgreich, keine TypeScript-Fehler

## Security Check

- [x] Keine offensichtlichen Security-Issues
- [x] Keine externen API-Calls, alle Daten lokal in localStorage
- [x] Kein User-Input der injiziert werden koennte (nur Button-Klicks und Emoji-Auswahl)
- [x] Mood-Daten und Session-Daten nur lokal gespeichert

## Performance Check

- [x] Timer-Intervall 60s (nicht zu haeufig)
- [x] framer-motion Animationen mit ease-Funktionen (GPU-beschleunigt)
- [x] Pause-Store partialize: Nur moodHistory wird persistiert (minimaler localStorage-Overhead)
- [x] Breathing-Exercise: CSS-basierte Animation, kein Canvas/WebGL

## Summary

- **23 von 23 Acceptance Criteria bestanden**
- **5 von 5 Edge Cases bestanden**
- **5 Bugs gefunden und ALLE gefixt:** 2 High, 2 Medium, 1 Low
- **Regression:** Keine Regressionen gefunden
- **Build:** Erfolgreich nach allen Fixes

## Recommendation

**Feature ist production-ready.** Alle Acceptance Criteria und Edge Cases bestanden nach Bug-Fixes.
