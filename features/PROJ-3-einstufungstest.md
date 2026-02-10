# PROJ-3: Einstufungstest

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 10 (Uebergangs-Regel zwischen Klassenstufen)

## Abhaengigkeiten

- Benoetigt: PROJ-2 (Onboarding & Profil-Setup) - Klassenstufe muss bekannt sein
- Benoetigt: PROJ-4 (Aufgaben-Engine) - Aufgaben muessen angezeigt und geprueft werden koennen
- Wird benoetigt von: PROJ-9 (Lernpfad-Navigation) - Startpunkt im Lernpfad bestimmen

---

## User Stories

### US-3.1: Einstufungstest starten
Als **Kind** moechte ich **einen kurzen Test machen, der herausfindet, was ich schon kann**, damit ich nicht mit zu leichten Aufgaben anfangen muss.

### US-3.2: Einstufungstest ueberspringen
Als **Kind** (oder Elternteil) moechte ich **den Einstufungstest ueberspringen koennen**, damit ich einfach beim ersten Modul meiner Klassenstufe starten kann.

### US-3.3: Ergebnis verstehen
Als **Kind** moechte ich **nach dem Test sehen, wo ich starte** ("Du startest bei [Modulname]!"), damit ich weiss, was mich erwartet.

### US-3.4: Ergebnis als Elternteil sehen
Als **Elternteil** moechte ich **das Einstufungsergebnis meines Kindes im Elternbereich sehen**, um den empfohlenen Startpunkt nachzuvollziehen.

### US-3.5: Test wiederholen
Als **Kind** moechte ich **den Einstufungstest spaeter wiederholen koennen**, falls ich mich verbessert habe und Module ueberspringen moechte.

---

## Acceptance Criteria

### Testdurchfuehrung
- [ ] AC-3.1: Nach dem Onboarding (PROJ-2) wird der Einstufungstest angeboten (nicht erzwungen)
- [ ] AC-3.2: Der Test praesentiert maximal 10-15 Aufgaben (kurz und nicht ermuedend)
- [ ] AC-3.3: Aufgaben beginnen auf dem Niveau der gewaehlten Klassenstufe und passen sich an
- [ ] AC-3.4: Bei richtiger Antwort: naechste Aufgabe wird schwerer (naechstes Modul)
- [ ] AC-3.5: Bei falscher Antwort: naechste Aufgabe wird leichter (vorheriges Modul)
- [ ] AC-3.6: Der Test deckt Addition UND Subtraktion ab
- [ ] AC-3.7: Es gibt keinen Zeitdruck waehrend des Tests

### Ergebnis
- [ ] AC-3.8: Nach dem Test wird das empfohlene Startmodul angezeigt (kindgerecht formuliert)
- [ ] AC-3.9: Module unterhalb des Startpunkts werden als "bereits gekonnt" markiert (aber zugaenglich)
- [ ] AC-3.10: Das Kind kann den vorgeschlagenen Startpunkt akzeptieren oder manuell aendern
- [ ] AC-3.11: Das Ergebnis wird im Profil gespeichert

### Sensorik & ND
- [ ] AC-3.12: Der Einstufungstest respektiert das gewaehlte Sensorik-Profil
- [ ] AC-3.13: ND-Anpassungen (Bestaetigungsschritt, Vorlesefunktion etc.) sind auch im Test aktiv
- [ ] AC-3.14: Es gibt kein negatives Feedback bei falschen Antworten im Test ("Danke!" statt "Falsch")

---

## Edge Cases

- **E-3.1:** Was passiert, wenn ein Kind den Test mittendrin abbricht? → Fortschritt speichern, Test beim naechsten Mal fortsetzen oder neu starten (Auswahl)
- **E-3.2:** Was passiert, wenn ein Klasse-1-Kind alle Aufgaben richtig hat? → Maximal bis zum hoechsten Modul der gewaehlten Klassenstufe einstufen (nicht ueberfordern). Eltern-Hinweis: "Ihr Kind zeigt fortgeschrittene Faehigkeiten"
- **E-3.3:** Was passiert, wenn ein Kind alle Aufgaben falsch hat? → Beim allersten Modul der Klassenstufe starten. Ermutigend formulieren: "Toll, dass du mitgemacht hast! Wir starten am Anfang."
- **E-3.4:** Was passiert bei gemischtem Ergebnis (Addition stark, Subtraktion schwach)? → Unterschiedliche Startpunkte fuer Addition und Subtraktion ermoeglichen
- **E-3.5:** Was passiert, wenn der Test wiederholt wird? → Altes Ergebnis wird ueberschrieben, bereits bearbeitete Module behalten ihren Fortschritt

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Einstufungstest (eigene Seite, nach Onboarding)
│
├── Test-Intro (vor dem Test)
│   ├── "Lass uns herausfinden, wo du starten kannst!"
│   ├── Erklaerung: "Mach dir keinen Stress - es gibt kein Richtig oder Falsch!"
│   ├── Button: "Test starten"
│   └── Button: "Ueberspringen - Ich moechte beim Anfang starten"
│
├── Test-Aufgaben (nutzt die Aufgaben-Engine aus PROJ-4)
│   ├── Fortschritts-Anzeige: "Frage 3 von ca. 12" (ungefaehre Angabe)
│   ├── Aufgabe wird angezeigt (gleiche Darstellung wie in PROJ-4)
│   ├── Eingabe (gleiche Eingabetypen wie in PROJ-4)
│   ├── KEIN Feedback bei falsch! Nur: "Danke!" + weiter
│   │   (kein "Falsch!", kein negatives Signal)
│   ├── Bei richtig: Kurzes "Danke!" + weiter (kein grosses Lob)
│   ├── ND-Anpassungen sind aktiv (Vorlesen, Bestaetigungsschritt etc.)
│   └── Kein Zeitdruck, kein Timer sichtbar
│
├── Adaptiver Algorithmus (unsichtbar fuer das Kind)
│   ├── Start: Mittleres Modul der gewaehlten Klassenstufe
│   ├── Richtig → Naechstes Modul (schwieriger)
│   ├── Falsch → Vorheriges Modul (leichter)
│   ├── Addition und Subtraktion werden GETRENNT getestet
│   │   (verschiedene Aufgaben fuer Plus und Minus)
│   ├── Max. 10-15 Aufgaben (dann ist genug Daten)
│   └── Abbruch-Logik: Wenn 2x richtig auf gleichem Level → Level bestaetigt
│
├── Ergebnis-Anzeige (kindgerecht)
│   ├── "Du bist richtig gut! Du startest bei [Modulname]!"
│   ├── Wenn Addition ≠ Subtraktion:
│   │   "Plus-Aufgaben: Du startest bei [Modul A]"
│   │   "Minus-Aufgaben: Du startest bei [Modul B]"
│   ├── Lernpfad-Karte (Mini-Vorschau): Module unterhalb des Startpunkts
│   │   sind als "bereits gekonnt" markiert (leicht ausgegraut, aber zugaenglich)
│   ├── Button: "Das passt!" → Zur Lernpfad-Karte
│   └── Button: "Ich moechte woanders starten" → Manuelle Modul-Auswahl
│
└── Ergebnis fuer Eltern (im Elternbereich PROJ-8 sichtbar)
    ├── "Einstufung am [Datum]"
    ├── Empfohlener Start: Modul X (Addition) + Modul Y (Subtraktion)
    └── Wenn fortgeschritten: "Ihr Kind zeigt fortgeschrittene Faehigkeiten"
```

### Daten-Model

```
EINSTUFUNGS-ERGEBNIS:
- Durchgefuehrt am (Zeitstempel)
- Klassenstufe (zum Zeitpunkt des Tests)
- Empfohlenes Startmodul Addition (z.B. M1.5)
- Empfohlenes Startmodul Subtraktion (z.B. M1.3)
- Alle Testantworten (Aufgabe + Antwort + richtig/falsch)
- Test uebersprungen? (Ja/Nein)
- Manuell angepasst? (Ja/Nein + neues Startmodul)

MODULE-FREISCHALTUNG (abgeleitet aus Einstufung):
- Alle Module unterhalb des Startmoduls → Status "bereits gekonnt"
- Startmodul → Status "empfohlen"
- Module oberhalb → Status "noch nicht freigeschaltet" (aber erreichbar!)

Gespeichert in: Browser localStorage (via Zustand persist)
→ Im profile-store (Teil des Profils)
```

### Adaptiver Algorithmus

```
SCHRITT 1: Startpunkt bestimmen
  Klasse 1 → Starte bei M1.5 (Mitte der Klasse-1-Module)
  Klasse 2 → Starte bei M2.4 (Mitte der Klasse-2-Module)
  Klasse 3 → Starte bei M3.4
  Klasse 4 → Starte bei M4.4

SCHRITT 2: Aufgabe stellen (1 Aufgabe pro Modul-Test)
  → Aufgabe aus dem Bronze-Level des aktuellen Moduls
  → Wenn Bronze richtig: 1 Aufgabe aus Silber
  → Wenn Silber richtig: Modul als "gekonnt" markieren

SCHRITT 3: Navigation
  ├── Richtig (Bronze+Silber) → Gehe zum naechsten Modul (schwieriger)
  ├── Richtig (nur Bronze) → Dieses Modul als Startpunkt merken
  └── Falsch (Bronze) → Gehe zum vorherigen Modul (leichter)

SCHRITT 4: Abbruch-Bedingungen
  ├── 2x hintereinander richtig auf gleichem Level → Startpunkt gefunden
  ├── Max. 15 Aufgaben erreicht → Bestes bestaendiges Level = Start
  ├── Kind bricht ab → Letztes bestaendig richtiges Level = Start
  └── Alles falsch → Allererstes Modul der Klassenstufe

SCHRITT 5: Getrennte Auswertung
  → Addition-Module und Subtraktion-Module werden separat ausgewertet
  → Kind kann z.B. bei M1.7 (Addition mit Zehnuebergang) starten
     aber bei M1.4 (Subtraktion bis 10) → unterschiedliche Startpunkte
```

### Tech-Entscheidungen

```
Warum "Danke!" statt "Richtig/Falsch" im Test?
→ Kein Leistungsdruck: Test soll Ist-Stand ermitteln, nicht bewerten
→ Kinder sollen sich trauen, Aufgaben zu probieren
→ Falsche Antworten sind genauso wertvoll (zeigen das aktuelle Niveau)
→ Neutrales Feedback verhindert Frustration bei vielen falschen Antworten

Warum getrennte Startpunkte fuer Addition und Subtraktion?
→ Kinder sind oft in einem Bereich staerker als im anderen
→ Beispiel: Addition bis 20 sicher, Subtraktion bis 10 noch unsicher
→ Getrennte Startpunkte verhindern Unter- UND Ueberforderung
→ Auf der Lernpfad-Karte sieht das Kind beide Startpunkte

Warum max. 15 Aufgaben?
→ Laenger = ermuedend (besonders fuer ADHS-Kinder)
→ 15 Aufgaben reichen fuer zuverlaessige Einstufung
→ Algorithmisch: Nach 8-10 Aufgaben ist der Startpunkt meist klar
→ Kuerzer: Test kann auch nach 8 Aufgaben enden wenn Ergebnis eindeutig

Warum die Aufgaben-Engine (PROJ-4) fuer den Test wiederverwenden?
→ Gleiche Darstellung = keine Verwirrung fuer das Kind
→ ND-Anpassungen funktionieren automatisch
→ Kein separater Code fuer Aufgaben-Darstellung noetig
→ Nur das Feedback und die Navigation sind anders (kein "Richtig/Falsch")
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- Aufgaben-Engine Komponenten (aus PROJ-4)
- zustand (Einstufungsergebnis im profile-store)
- Content-Aufgaben (aus PROJ-10/11 JSON-Dateien)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── components/
│   ├── placement/
│   │   ├── placement-intro    ← Intro-Bildschirm vor dem Test
│   │   ├── placement-test     ← Test-Flow (nutzt exercise-display aus PROJ-4)
│   │   ├── placement-result   ← Ergebnis-Anzeige (kindgerecht)
│   │   └── placement-feedback ← Neutrales "Danke!" (statt richtig/falsch)
│   │
│   └── exercise/             ← (aus PROJ-4, wiederverwendet)
│
├── lib/
│   └── placement-algorithm   ← Adaptiver Algorithmus (welche Aufgabe als naechstes)
│
└── app/
    └── placement/
        └── page              ← Route: /placement
```
