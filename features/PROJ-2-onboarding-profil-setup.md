# PROJ-2: Onboarding & Profil-Setup

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitte 4 (Neuroinklusive Anpassungen) und 5 (Sensorik-Profile)

## Abhaengigkeiten

- Keine (Einstiegsfeature - wird als erstes gebraucht)
- Wird benoetigt von: PROJ-3, PROJ-4, PROJ-6, PROJ-7, PROJ-8, PROJ-9

---

## User Stories

### US-2.1: Erstes Setup als Elternteil
Als **Elternteil** moechte ich **beim ersten App-Start ein Profil fuer mein Kind einrichten** (Name, Klassenstufe, Sensorik-Profil), um die App an die Beduerfnisse meines Kindes anzupassen.

### US-2.2: Sensorik-Profil waehlen
Als **Elternteil** moechte ich **zwischen drei Sensorik-Profilen waehlen** (Reizarm, Standard, Reizreich), um die App an die sensorischen Beduerfnisse meines Kindes anzupassen.

### US-2.3: Klassenstufe festlegen
Als **Elternteil** moechte ich **die aktuelle Klassenstufe meines Kindes angeben** (Klasse 1-4), damit die App passende Lernmodule vorschlaegt.

### US-2.4: Neurodivergenz-Anpassungen aktivieren
Als **Elternteil** moechte ich **optionale ND-spezifische Anpassungen aktivieren** (z.B. Bestaetigungsschritt bei ADHS, Vorlesefunktion bei LRS, reizarme Darstellung bei ASS), um die App gezielt fuer mein Kind zu konfigurieren.

### US-2.5: Kindgerechter Willkommensbildschirm
Als **Kind** moechte ich **einen freundlichen Willkommensbildschirm sehen**, der mich begruesst und mir zeigt, was mich erwartet, damit ich mich sicher fuehle.

### US-2.6: Profil spaeter aendern
Als **Elternteil** moechte ich **alle Einstellungen jederzeit aendern koennen** (Klassenstufe, Sensorik, ND-Anpassungen), damit ich das Profil anpassen kann, wenn sich die Beduerfnisse meines Kindes aendern.

---

## Acceptance Criteria

### Profil-Erstellung
- [ ] AC-2.1: Beim ersten App-Start wird automatisch der Onboarding-Flow gestartet
- [ ] AC-2.2: Elternteil kann einen Namen fuer das Kind eingeben (Pflichtfeld, 1-30 Zeichen)
- [ ] AC-2.3: Elternteil kann die Klassenstufe waehlen (1, 2, 3 oder 4)
- [ ] AC-2.4: Elternteil kann ein Sensorik-Profil waehlen (Reizarm, Standard, Reizreich) mit Vorschau
- [ ] AC-2.5: Jedes Sensorik-Profil hat eine kurze Beschreibung und visuelle Vorschau

### ND-Anpassungen
- [ ] AC-2.6: Elternteil kann optionale ND-Anpassungen per Toggle aktivieren/deaktivieren
- [ ] AC-2.7: Verfuegbare Toggles: Bestaetigungsschritt (ADHS), Vorlesefunktion (LRS), Dauerhaft sichtbare Werkzeuge (Dyskalkulie), Reizarme Sachaufgaben ohne soziale Szenarien (ASS)
- [ ] AC-2.8: Mehrere ND-Anpassungen koennen gleichzeitig aktiv sein
- [ ] AC-2.9: ND-Anpassungen sind optional - kein Toggle muss aktiviert werden

### Kindgerechter Einstieg
- [ ] AC-2.10: Nach dem Eltern-Setup sieht das Kind einen Willkommensbildschirm mit seinem Namen
- [ ] AC-2.11: Der Willkommensbildschirm passt sich dem gewaehlten Sensorik-Profil an
- [ ] AC-2.12: Das Kind wird zum Einstufungstest (PROJ-3) oder direkt zum ersten Modul weitergeleitet

### Einstellungen aendern
- [ ] AC-2.13: Alle Profil-Einstellungen koennen im Elternbereich (PROJ-8) geaendert werden
- [ ] AC-2.14: Aenderungen werden sofort wirksam (kein Neustart noetig)
- [ ] AC-2.15: Profildaten werden lokal gespeichert und bleiben nach App-Neustart erhalten

---

## Edge Cases

- **E-2.1:** Was passiert, wenn der Elternteil das Onboarding abbricht? → Profil wird nicht gespeichert, beim naechsten Start erneut Onboarding
- **E-2.2:** Was passiert, wenn das Kind die Klassenstufe wechselt (z.B. Schuljahreswechsel)? → Elternteil kann Klassenstufe im Profil aendern, Lernfortschritt bleibt erhalten
- **E-2.3:** Was passiert, wenn kein Sensorik-Profil gewaehlt wird? → Standard-Profil als Default
- **E-2.4:** Was passiert bei mehreren Kindern? → MVP: Ein Profil pro App-Installation. Spaeter: Mehrere Profile moeglich
- **E-2.5:** Was passiert, wenn Elternteil ND-Anpassung nachtraeglich deaktiviert? → Aenderung sofort wirksam, kein Fortschrittsverlust

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Querschnitts-Entscheidungen (gelten fuer ALLE Features)

| Entscheidung | Loesung | Begruendung |
|---|---|---|
| **Datenspeicherung** | Zustand + localStorage (MVP) | Komplett offline, DSGVO-konform, keine Server-Kosten. Supabase spaeter fuer Sync |
| **State Management** | Zustand mit persist-Middleware | Leichtgewichtig, automatisches Speichern in localStorage |
| **Sensorik-Profil** | CSS Custom Properties + data-Attribute | Sofortiger Wechsel ohne Seitenneuladen |
| **Content-Format** | JSON-Dateien gebuendelt | Offline-faehig, schnell, keine Server-Abhaengigkeit |
| **Text-to-Speech** | Web Speech API (Browser-integriert) | Kostenlos, kein Package noetig |
| **Animationen** | Framer Motion | Beste React-Integration, respektiert prefers-reduced-motion |
| **Drag & Drop** | @dnd-kit | Barrierefrei (Tastatur!), Touch-Support fuer Tablets |
| **Responsive** | Tablet-First (768px Basis) | Zielgruppe nutzt hauptsaechlich Tablets |

### Component-Struktur

```
App-Layout (Root)
├── data-sensory="reizarm|standard|reizreich" (am HTML-Root)
│
├── Onboarding-Flow (nur beim ersten Start sichtbar)
│   ├── Schritt 1: Willkommen
│   │   └── "Willkommen bei der Mathe-App!" + Weiter-Button
│   │
│   ├── Schritt 2: Kind-Name eingeben
│   │   ├── Eingabefeld (Name, 1-30 Zeichen)
│   │   └── Weiter-Button (erst aktiv wenn Name eingegeben)
│   │
│   ├── Schritt 3: Klassenstufe waehlen
│   │   ├── 4 grosse Buttons: "Klasse 1" / "Klasse 2" / "Klasse 3" / "Klasse 4"
│   │   └── Kurze Beschreibung: "Zahlen bis 20" / "Zahlen bis 100" / etc.
│   │
│   ├── Schritt 4: Sensorik-Profil waehlen
│   │   ├── Profil-Karte "Reizarm" (mit Live-Vorschau)
│   │   ├── Profil-Karte "Standard" (mit Live-Vorschau) [Vorausgewaehlt]
│   │   ├── Profil-Karte "Reizreich" (mit Live-Vorschau)
│   │   └── Bei Auswahl: Hintergrundfarbe/Animationen aendern sich sofort als Vorschau
│   │
│   ├── Schritt 5: ND-Anpassungen (optional)
│   │   ├── Toggle: "Bestaetigungsschritt bei Antworten" (ADHS)
│   │   ├── Toggle: "Aufgaben vorlesen" (LRS)
│   │   ├── Toggle: "Werkzeuge dauerhaft sichtbar" (Dyskalkulie)
│   │   ├── Toggle: "Sachaufgaben ohne soziale Szenarien" (ASS)
│   │   ├── Jeder Toggle hat eine kurze Erklaerung
│   │   └── "Diese Einstellungen koennen jederzeit geaendert werden"
│   │
│   └── Schritt 6: Zusammenfassung + Fertig
│       ├── "Toll! [Name] ist bereit!"
│       ├── Alle gewaehlten Einstellungen als Uebersicht
│       └── Button: "Los geht's!" → weiter zum Einstufungstest (PROJ-3)
│
└── Kindgerechter Willkommensbildschirm (nach Onboarding, bei jedem App-Start)
    ├── "Hallo [Name]!" (grosser, freundlicher Text)
    ├── Angepasst an Sensorik-Profil (Reizarm: schlicht / Reizreich: bunt mit Animation)
    └── Button: "Weiter ueben!" → zur Lernpfad-Navigation (PROJ-9)
```

### Daten-Model

```
Jedes Kind-Profil hat:
- Name (Text, 1-30 Zeichen)
- Klassenstufe (1, 2, 3 oder 4)
- Sensorik-Profil (Reizarm, Standard oder Reizreich)
- ND-Anpassungen:
  - Bestaetigungsschritt aktiv? (Ja/Nein, Standard: Nein)
  - Vorlesefunktion aktiv? (Ja/Nein, Standard: Nein)
  - Werkzeuge dauerhaft sichtbar? (Ja/Nein, Standard: Nein)
  - Reizarme Sachaufgaben? (Ja/Nein, Standard: Nein)
- Onboarding abgeschlossen? (Ja/Nein)
- Profil erstellt am (Zeitstempel)

Gespeichert in: Browser localStorage (via Zustand persist)
→ Daten bleiben nach App-Neustart erhalten
→ Kein Server noetig, DSGVO-konform
```

### Sensorik-Profil Architektur

```
So funktioniert der Sensorik-Wechsel:

1. Profil wird im Zustand-Store gespeichert
2. Am <html>-Element wird data-sensory="reizarm|standard|reizreich" gesetzt
3. Tailwind-CSS reagiert auf dieses Attribut:
   - Farben aendern sich (gedaempft vs. normal vs. kraeftig)
   - Animationen werden aktiviert/deaktiviert
   - Feedback-Elemente passen sich an
4. Wechsel passiert SOFORT - kein Neuladen noetig

Drei Profile:
┌─────────────┬─────────────────────────────────────────┐
│ Reizarm     │ Pastell-Farben, keine Animationen,      │
│             │ nur Text+Haken als Feedback              │
├─────────────┼─────────────────────────────────────────┤
│ Standard    │ Klare Farben, sanfte Animationen,        │
│             │ Stern-Animation + Text als Feedback      │
├─────────────┼─────────────────────────────────────────┤
│ Reizreich   │ Kraeftige Farben, Konfetti-Animationen,  │
│             │ Feuerwerk + Sound + Text als Feedback    │
└─────────────┴─────────────────────────────────────────┘
```

### Tech-Entscheidungen

```
Warum Zustand statt React Context fuer das Profil?
→ Zustand hat eingebaute persist-Middleware fuer localStorage
→ Einfacher als Context + useReducer + manuelles Speichern
→ Kein Provider-Wrapping noetig - Store ist global zugreifbar
→ Performance: Nur Komponenten die den Store nutzen re-rendern

Warum localStorage statt Supabase fuer MVP?
→ Komplett offline nutzbar (wichtig fuer Schulen ohne stabiles WLAN)
→ Keine Registrierung/Login noetig (Kinder koennen sofort starten)
→ DSGVO-konform: Keine Daten verlassen das Geraet
→ Spaeter erweiterbar: Supabase-Sync kann nachgeruestet werden

Warum Stepper-Pattern fuer Onboarding?
→ Ein Schritt = Eine Entscheidung (nicht ueberfordern)
→ Fortschrittsbalken zeigt "Schritt 3 von 6" (Vorhersehbarkeit fuer ASS)
→ Zurueck-Navigation moeglich (Fehlerkorrektur)

Warum CSS data-Attribute fuer Sensorik?
→ Sofortiger Wechsel ohne JavaScript-Neuberechnung
→ Alle CSS-Regeln reagieren automatisch
→ Funktioniert auch bei Server-Side-Rendering
```

### Dependencies

```
Neue Packages fuer PROJ-2:
- zustand (State Management + localStorage-Persistenz)
- framer-motion (Animationen, wird von vielen Features genutzt)

Bereits vorhanden:
- shadcn/ui Komponenten (Button, Card, Input, Switch, Progress)
- Tailwind CSS (Styling)
- Radix UI (Basis fuer shadcn/ui)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── stores/
│   └── profile-store          ← Zustand Store fuer Kind-Profil
│
├── components/
│   ├── onboarding/
│   │   ├── onboarding-flow    ← Stepper mit allen 6 Schritten
│   │   ├── welcome-step       ← Schritt 1: Willkommen
│   │   ├── name-step          ← Schritt 2: Name eingeben
│   │   ├── grade-step         ← Schritt 3: Klassenstufe waehlen
│   │   ├── sensory-step       ← Schritt 4: Sensorik-Profil
│   │   ├── nd-settings-step   ← Schritt 5: ND-Anpassungen
│   │   ├── summary-step       ← Schritt 6: Zusammenfassung
│   │   └── index              ← Barrel-Exports
│   │
│   └── welcome-screen         ← Willkommensbildschirm nach Onboarding
│
├── hooks/
│   └── use-sensory-animation  ← Wiederverwendbarer Animation Hook
│
├── providers/
│   └── sensory-provider       ← Setzt data-sensory am Root-Element
│
└── app/
    ├── globals.css             ← Sensorik CSS Custom Properties
    ├── page                   ← Einstiegsseite: Onboarding oder Welcome
    └── layout                 ← Layout mit SensoryProvider
```

---

## QA Test Results

**Tested:** 2026-02-10
**Tester:** QA Engineer Agent (Code-Review + Runtime-Test)
**App URL:** http://localhost:3001
**Build Status:** Erfolgreich (0 TypeScript Errors)
**Dev Server:** Kompiliert und rendert korrekt (200 OK)

---

### Acceptance Criteria Status

#### Profil-Erstellung

- [x] **AC-2.1:** Beim ersten App-Start wird automatisch der Onboarding-Flow gestartet
  - `page.tsx` prueft `onboardingCompleted` via Zustand Hydration. Default = `false` → zeigt OnboardingFlow
- [x] **AC-2.2:** Elternteil kann einen Namen fuer das Kind eingeben (Pflichtfeld, 1-30 Zeichen)
  - `name-step.tsx`: Input mit `maxLength={30}`, Validierung `trim().length >= 1 && <= 30`, Button disabled wenn ungueltig, Fehlermeldungen vorhanden
- [x] **AC-2.3:** Elternteil kann die Klassenstufe waehlen (1, 2, 3 oder 4)
  - `grade-step.tsx`: 4 grosse Buttons im 2x2 Grid, mit Beschreibungen ("Zahlen bis 20" etc.)
- [x] **AC-2.4:** Elternteil kann ein Sensorik-Profil waehlen (Reizarm, Standard, Reizreich) mit Vorschau
  - `sensory-step.tsx`: 3 Profil-Karten, Auswahl schreibt sofort in Store → SensoryProvider aktualisiert `data-sensory` auf `<html>` → CSS-Variablen aendern sich sofort als Live-Vorschau
- [x] **AC-2.5:** Jedes Sensorik-Profil hat eine kurze Beschreibung und visuelle Vorschau
  - Jede Karte: Label + Kurzbeschreibung + Detail-Text + Icon. Live-Vorschau durch CSS-Farbwechsel

#### ND-Anpassungen

- [x] **AC-2.6:** Elternteil kann optionale ND-Anpassungen per Toggle aktivieren/deaktivieren
  - `nd-settings-step.tsx`: 4 shadcn/ui Switch-Components mit direktem Store-Write
- [x] **AC-2.7:** Verfuegbare Toggles: Bestaetigungsschritt (ADHS), Vorlesefunktion (LRS), Dauerhaft sichtbare Werkzeuge (Dyskalkulie), Reizarme Sachaufgaben ohne soziale Szenarien (ASS)
  - Alle 4 Toggles vorhanden mit korrekten Labels, Tags und Beschreibungen
- [x] **AC-2.8:** Mehrere ND-Anpassungen koennen gleichzeitig aktiv sein
  - Jeder Toggle schreibt unabhaengig in `ndSettings[key]` - kein Mutex
- [x] **AC-2.9:** ND-Anpassungen sind optional - kein Toggle muss aktiviert werden
  - "Weiter"-Button immer aktiv, keine Validierung erforderlich

#### Kindgerechter Einstieg

- [x] **AC-2.10:** Nach dem Eltern-Setup sieht das Kind einen Willkommensbildschirm mit seinem Namen
  - `welcome-screen.tsx`: Zeigt "Hallo {name}!" nach Onboarding-Abschluss
- [x] **AC-2.11:** Der Willkommensbildschirm passt sich dem gewaehlten Sensorik-Profil an
  - Animationen sensorik-abhaengig (reizarm: keine, standard: Fade-In, reizreich: Bounce-Scale)
  - Farben passen sich automatisch ueber CSS-Variablen an
- [ ] **AC-2.12:** Das Kind wird zum Einstufungstest (PROJ-3) oder direkt zum ersten Modul weitergeleitet
  - BUG-1: "Weiter ueben!"-Button hat keinen onClick-Handler (siehe Bugs)

#### Einstellungen aendern

- [ ] **AC-2.13:** Alle Profil-Einstellungen koennen im Elternbereich (PROJ-8) geaendert werden
  - DEFERRED: PROJ-8 (Elternbereich) noch nicht implementiert. Store-Actions sind vorbereitet (setName, setGrade, setSensoryProfile, setNdSetting)
- [x] **AC-2.14:** Aenderungen werden sofort wirksam (kein Neustart noetig)
  - Zustand `set()` triggert sofortiges Re-Render. SensoryProvider aktualisiert CSS-Attribute per useEffect
- [x] **AC-2.15:** Profildaten werden lokal gespeichert und bleiben nach App-Neustart erhalten
  - Zustand persist-Middleware mit key `"mathe-app-profile"` schreibt in localStorage. Hydration-Check in `page.tsx` liest gespeicherten State

---

### Edge Cases Status

- [x] **E-2.1:** Onboarding abgebrochen → Profil wird nicht gespeichert, beim naechsten Start erneut Onboarding
  - `completeOnboarding()` wird NUR im summary-step aufgerufen. `onboardingCompleted` bleibt `false` bei Abbruch → Onboarding startet erneut
  - Hinweis: Teilweise eingegebene Daten (Name, Klasse) werden im Store gespeichert und beim Neustart vorausgefuellt (bessere UX)
- [x] **E-2.3:** Kein Sensorik-Profil gewaehlt → Standard-Profil als Default
  - Store-Default: `sensoryProfile: "standard"`. Sensory-Step hat Standard vorausgewaehlt
- [x] **E-2.4:** Mehrere Kinder → MVP: Ein Profil pro App-Installation
  - Einzelner Store, kein Multi-Profil-Support. `resetProfile()` existiert fuer spaetere Erweiterung
- [ ] **E-2.2:** Klassenstufe wechselt → DEFERRED (abhaengig von PROJ-8)
- [ ] **E-2.5:** ND-Anpassung nachtraeglich deaktiviert → DEFERRED (abhaengig von PROJ-8)

---

### Accessibility Check

- [x] Semantisches HTML: `role="radiogroup"` + `role="radio"` + `aria-checked` fuer Klassen- und Sensorik-Auswahl
- [x] `aria-describedby` verbindet Switches mit Beschreibungs-Texten
- [x] `aria-invalid` + `aria-describedby` + `role="alert"` fuer Name-Validierungsfehler
- [x] `aria-label="Zurueck"` auf Back-Button
- [x] Screen-reader-only Label fuer Name-Input (`sr-only`)
- [x] `focus-visible:ring-2` auf allen interaktiven Elementen
- [x] `prefers-reduced-motion: reduce` deaktiviert alle CSS-Animationen
- [x] Reizarm-Profil deaktiviert Framer-Motion-Animationen (`useSensoryDuration()` gibt 0 zurueck)
- [x] Framer-Motion `useReducedMotion()` wird geprueft
- [x] Grosse Touch-Targets: Buttons `py-6 px-8 h-auto` (weit ueber 48px), Grade-Buttons `min-h-[120px]`
- [ ] BUG-2: Arrow-Key Navigation fehlt in Radio-Groups (siehe Bugs)

### Responsive Check

- [x] `max-w-2xl mx-auto` zentriert Content auf grossen Screens
- [x] `p-4 md:p-8` passt Padding fuer Mobile vs. Desktop an
- [x] Text-Groessen responsive: `text-2xl md:text-3xl`, `text-3xl md:text-4xl`
- [x] Grade-Grid: `grid-cols-2` passt auf alle Bildschirmgroessen
- [x] Cards: `max-w-md` und `max-w-sm` begrenzen Breite sinnvoll

### Security Check

- [x] Keine Server-Kommunikation (rein client-side localStorage) → kein XSS-Vektor via Server
- [x] Name-Input: `maxLength={30}` + `trim()` verhindert ueberlange Eingaben
- [x] Keine SQL-Injection moeglich (keine Datenbank)
- [x] Keine CSRF moeglich (kein Server)
- [x] localStorage-Daten nur vom selben Origin zugreifbar
- [x] Keine sensiblen Daten gespeichert (nur Vorname + Lernpraeferenzen)
- [x] DSGVO-konform: Keine Daten verlassen das Geraet

### Performance Check

- [x] Selektive Zustand-Subscriptions (nur betroffene Components re-rendern)
- [x] Name-Input: Lokaler State-Buffer, Store-Write nur bei "Weiter"
- [x] Build erfolgreich, keine Warnings
- [x] Dev-Server: Seite kompiliert und rendert in < 7s (inkl. Cold-Start)

---

### Bugs Found

#### BUG-1: "Weiter ueben!"-Button ohne Funktion
- **Severity:** Medium
- **Location:** `src/components/welcome-screen.tsx:52-56`
- **Steps to Reproduce:**
  1. Onboarding komplett durchlaufen
  2. Willkommensbildschirm erscheint
  3. "Weiter ueben!"-Button klicken
  4. Expected: Navigation zu Lernpfad oder Platzhalter-Feedback
  5. Actual: Nichts passiert
- **Ursache:** Button hat keinen `onClick`-Handler
- **Priority:** Medium (UX Issue - Sackgasse nach Onboarding)
- **Hinweis:** Abhaengig von PROJ-9 (Lernpfad-Navigation). Sollte mindestens einen Platzhalter-Text anzeigen

#### BUG-2: Arrow-Key Navigation fehlt in Radio-Groups
- **Severity:** Medium
- **Location:** `src/components/onboarding/grade-step.tsx:54-84`, `src/components/onboarding/sensory-step.tsx:72-112`
- **Steps to Reproduce:**
  1. Klassenstufe-Schritt oeffnen
  2. Tab zu erstem Radio-Button
  3. Pfeiltaste druecken (Hoch/Runter/Links/Rechts)
  4. Expected: Fokus wechselt zum naechsten Radio-Button (WAI-ARIA Radio Group Pattern)
  5. Actual: Keine Reaktion auf Pfeiltasten
- **Ursache:** Custom `<button>` Elemente mit `role="radio"` implementieren nicht das vollstaendige WAI-ARIA Radio-Group Keyboard-Pattern
- **Priority:** Medium (Accessibility - Keyboard-User betroffen)

---

### Summary

- **12 von 15** Acceptance Criteria getestet und bestanden
- **2 DEFERRED** (AC-2.12 teilweise, AC-2.13 komplett - abhaengig von PROJ-3/PROJ-8/PROJ-9)
- **1 BUG** bei AC-2.12 (Button ohne Funktion)
- **3 von 5** Edge Cases bestanden
- **2 DEFERRED** (E-2.2, E-2.5 - abhaengig von PROJ-8)
- **2 Bugs gefunden** (0 Critical, 0 High, 2 Medium)
- **Security:** Keine Issues gefunden
- **Performance:** Gut

### Recommendation

**Feature ist BEDINGT production-ready.**

- Keine Critical oder High Bugs
- 2 Medium Bugs sollten vor naechstem Feature gefixt werden:
  - BUG-1: Platzhalter-Text fuer "Weiter ueben!" Button (Quick Fix)
  - BUG-2: Arrow-Key Navigation in Radio-Groups (Accessibility-Verbesserung)
- AC-2.13 (Elternbereich) und AC-2.12 (Weiterleitung) werden mit PROJ-8 bzw. PROJ-3/PROJ-9 abgedeckt
