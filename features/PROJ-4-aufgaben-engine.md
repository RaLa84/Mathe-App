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
