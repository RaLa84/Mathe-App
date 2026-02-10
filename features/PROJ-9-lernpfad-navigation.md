# PROJ-9: Lernpfad-Navigation

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 2 (Gesamtueberblick Lernpfad) und Abschnitt 8 (Exekutive Funktionen)

## Abhaengigkeiten

- Benoetigt: PROJ-2 (Onboarding) - Klassenstufe bestimmt sichtbare Module
- Benoetigt: PROJ-3 (Einstufungstest) - Startmodul bestimmen
- Benoetigt: PROJ-6 (Belohnungssystem) - Sterne und Fortschritt anzeigen
- Wird benoetigt von: PROJ-4 (Aufgaben-Engine) - Modul-Auswahl startet Aufgaben-Session

---

## User Stories

### US-9.1: Moduluebersicht sehen
Als **Kind** moechte ich **eine Uebersicht aller verfuegbaren Lernmodule sehen** (als Karte/Pfad), damit ich weiss, wo ich bin und wohin ich gehen kann.

### US-9.2: Modul starten
Als **Kind** moechte ich **ein Modul antippen und eine Uebungssession starten**, damit ich sofort mit dem Ueben anfangen kann.

### US-9.3: Fortschritt auf der Karte sehen
Als **Kind** moechte ich **auf der Lernpfad-Karte sehen, welche Module ich schon geschafft habe** (Sterne) und welches als naechstes empfohlen wird.

### US-9.4: Zwischen Klassenstufen wechseln
Als **Kind** moechte ich **zwischen den Klassenstufen wechseln koennen**, falls ich Module aus einer anderen Stufe bearbeiten moechte.

### US-9.5: Schwierigkeitsstufe waehlen
Als **Kind** moechte ich **innerhalb eines Moduls die Schwierigkeitsstufe waehlen koennen** (Bronze/Silber/Gold), damit ich auf meinem Level ueben kann.

### US-9.6: Zurueckgehen ohne Scham
Als **Kind** moechte ich **jederzeit zu einem leichteren Modul zurueckgehen koennen**, ohne dass es sich negativ anfuehlt, damit ich Grundlagen festigen kann.

---

## Acceptance Criteria

### Lernpfad-Karte
- [ ] AC-9.1: Die Lernpfad-Karte zeigt alle Module der aktuellen Klassenstufe als visuellen Pfad/Karte
- [ ] AC-9.2: Module sind als Stationen auf einem Pfad dargestellt (nicht als langweilige Liste)
- [ ] AC-9.3: Jedes Modul zeigt: Name, Status-Icon (nicht gestartet / in Arbeit / Bronze / Silber / Gold)
- [ ] AC-9.4: Das empfohlene naechste Modul ist visuell hervorgehoben ("Hier geht's weiter!")
- [ ] AC-9.5: Module koennen frei angetippt werden (keine harte Sperre, auch wenn Voraussetzung fehlt)

### Modul-Abhaengigkeiten
- [ ] AC-9.6: Module mit nicht erfuellten Voraussetzungen zeigen einen sanften Hinweis: "Tipp: Probiere erst [Voraussetzungs-Modul]"
- [ ] AC-9.7: Kinder werden NICHT daran gehindert, ein Modul zu starten (kein Hard-Lock)
- [ ] AC-9.8: Empfohlene Reihenfolge ist visuell erkennbar (Pfeile/Linien zwischen Modulen)

### Modul-Detail & Schwierigkeitsstufe
- [ ] AC-9.9: Bei Klick auf ein Modul: Detail-Ansicht mit Modul-Name, Beschreibung, Schwierigkeitsstufen-Auswahl
- [ ] AC-9.10: Bronze/Silber/Gold als waehlbare Stufen mit jeweiligem Status (Stern oder Platzhalter)
- [ ] AC-9.11: Bei Klick auf eine Stufe: Session startet (weiterleitung an Aufgaben-Engine PROJ-4)
- [ ] AC-9.12: Kinder koennen auf jeder Stufe starten (Bronze muss nicht erst abgeschlossen sein)

### Klassenstufen-Wechsel
- [ ] AC-9.13: Tabs oder Auswahl fuer Klasse 1/2/3/4 (abhaengig von freigeschalteten Inhalten)
- [ ] AC-9.14: Wechsel zu niedrigerer Klassenstufe ist immer moeglich (positiv gerahmt)
- [ ] AC-9.15: Wechsel zu hoeherer Klassenstufe moeglich, wenn Einstufungstest (PROJ-3) es erlaubt oder Eltern es freischalten

### Exekutive Funktionen
- [ ] AC-9.16: ASS: "Aufgabe X von Y" Zaehler, Fortschrittsbalken mit exakter Zahl
- [ ] AC-9.17: Vorhersehbarkeit: "Heute: 5 Aufgaben zu [Modulname]" vor Session-Start
- [ ] AC-9.18: Vorwarnung bei Modul-/Themenwechsel: "Gleich kommt ein neues Thema!"

### Sensorik
- [ ] AC-9.19: Lernpfad-Karte passt sich dem Sensorik-Profil an (Reizarm: einfach / Reizreich: bunt mit Animationen)
- [ ] AC-9.20: Fortschritts-Animationen beim Erreichen eines neuen Moduls (je nach Sensorik-Profil)

---

## Edge Cases

- **E-9.1:** Was passiert, wenn noch kein Content fuer ein Modul existiert? → Modul wird als "Bald verfuegbar" angezeigt (ausgegraut, nicht anklickbar)
- **E-9.2:** Was passiert, wenn ein Kind ein schwieriges Modul ohne Voraussetzung startet? → Sanfter Hinweis, aber kein Block. Wenn viele Fehler: Automatisch leichteres Modul vorschlagen
- **E-9.3:** Was passiert auf sehr kleinen Bildschirmen? → Lernpfad als vertikaler, scrollbarer Pfad (statt breiter Karte)
- **E-9.4:** Was passiert, wenn Eltern die Klassenstufe im Profil aendern? → Lernpfad-Karte wechselt zur neuen Stufe, alter Fortschritt bleibt erhalten
- **E-9.5:** Was passiert, wenn alle Module einer Klassenstufe abgeschlossen sind? → Feier-Animation + "Du hast Klasse X geschafft! Moechtest du Klasse Y starten?"

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Lernpfad-Navigation (Hauptseite der App nach Onboarding)
│
├── Klassenstufen-Auswahl (oben)
│   ├── Tabs oder Buttons: "Klasse 1" / "Klasse 2" / "Klasse 3" / "Klasse 4"
│   ├── Aktuelle Klassenstufe vorausgewaehlt
│   ├── Hoeherer Klasse: Nur wenn per Einstufungstest oder Eltern freigeschaltet
│   └── Niedrigere Klasse: Immer erreichbar (positiv gerahmt)
│
├── Lernpfad-Karte (scrollbar, vertikaler Pfad)
│   ├── Visueller Pfad: Stationen verbunden durch Linien/Pfeile
│   ├── Jede Station = Ein Modul
│   │
│   ├── Modul-Station (pro Modul)
│   │   ├── Modul-Icon (Kreis oder Abzeichen)
│   │   ├── Modul-Name: z.B. "Addition bis 10"
│   │   ├── Status-Anzeige:
│   │   │   ├── Nicht gestartet: Grau/Umriss
│   │   │   ├── In Bearbeitung: Halb-gefuellt, pulsierend
│   │   │   ├── Bronze: Bronze-Stern sichtbar
│   │   │   ├── Silber: Silber-Stern sichtbar
│   │   │   └── Gold: Gold-Stern sichtbar (leuchtend)
│   │   ├── "Bereits gekonnt" (nach Einstufungstest): Dezent markiert
│   │   └── Bei Klick → Modul-Detail-Dialog
│   │
│   ├── Empfohlenes Modul (visuell hervorgehoben)
│   │   ├── Groesser dargestellt oder mit Rahmen/Pfeil
│   │   ├── Text: "Hier geht's weiter!"
│   │   └── Pulsiert sanft (Standard/Reizreich) oder hat Pfeil (Reizarm)
│   │
│   └── Verbindungslinien zwischen Modulen
│       ├── Durchgezogene Linie: Direkter Nachfolger
│       ├── Gestrichelte Linie: Optionale Empfehlung
│       └── Farbig: Abgeschlossen / Grau: Noch offen
│
├── Modul-Detail-Dialog (oeffnet sich bei Modul-Klick)
│   ├── Modul-Name + kurze Beschreibung
│   ├── Schwierigkeitsstufen-Auswahl:
│   │   ├── Bronze-Button (+ Stern oder Platzhalter)
│   │   ├── Silber-Button (+ Stern oder Platzhalter)
│   │   └── Gold-Button (+ Stern oder Platzhalter)
│   ├── Jede Stufe frei waehlbar (kein Lock)
│   ├── Sanfter Hinweis wenn Voraussetzung fehlt:
│   │   "Tipp: Probiere erst [Modul X]"
│   ├── Session-Vorschau: "5 Aufgaben zu Addition bis 10 (Bronze)"
│   └── Button: "Los!" → Startet Session (→ PROJ-4 Aufgaben-Engine)
│
├── Sensorik-Anpassung der Karte
│   ├── Reizarm: Schlichte Farben, keine Animationen, klare Linien
│   ├── Standard: Freundliche Farben, sanfte Uebergaenge
│   └── Reizreich: Bunte Stationen, Partikel beim Scrollen, lebhafte Icons
│
└── Klassenstufe-Abschluss (wenn alle Module Gold)
    ├── Feier-Animation (je nach Sensorik-Profil)
    ├── "Du hast Klasse X geschafft! Unglaublich!"
    └── "Moechtest du Klasse Y starten?" → [Ja] [Spaeter]
```

### Daten-Model

```
MODUL-DEFINITION (statisch, aendert sich nicht):
- Modul-ID (z.B. M1.3)
- Klassenstufe (1, 2, 3 oder 4)
- Name ("Addition bis 10")
- Kurze Beschreibung ("Plusaufgaben im Zahlenraum bis 10")
- Voraussetzungs-Module (Liste von Modul-IDs, z.B. [M1.2])
- Position auf dem Pfad (Reihenfolge innerhalb der Klassenstufe)

MODUL-FORTSCHRITT (pro Kind gespeichert):
- Modul-ID
- Status (nicht_gestartet, in_bearbeitung, bronze, silber, gold)
- Bereits gekonnt? (durch Einstufungstest uebersprungen)
- Anzahl geloester Aufgaben pro Stufe
- Letzte Aktivitaet (Zeitstempel)

EMPFOHLENES NAECHSTES MODUL:
- Berechnet aus: Einstufungsergebnis + bisheriger Fortschritt
- Regel: Naechstes Modul in der Reihenfolge, das noch nicht Gold ist
- Bei getrennten Startpunkten (Addition/Subtraktion):
  Beide werden als "empfohlen" markiert

MODUL-ABHAENGIGKEITEN (statisch, aus PROJ-1):
- Graph-Struktur: M1.1 → M1.2 → M1.3 → M1.4 → M1.5
- Soft-Lock: Hinweis wenn Voraussetzung fehlt, aber kein Hard-Lock

Gespeichert in: Browser localStorage (via Zustand persist)
→ Eigener Store: progress-store
→ Modul-Definitionen: Statische JSON-Datei
```

### Tech-Entscheidungen

```
Warum vertikaler Pfad statt horizontale Karte?
→ Auf Tablets: Vertikales Scrollen ist natuerlich
→ Auf Smartphones: Horizontale Karten passen nicht gut
→ Visuell: "Aufstieg" von unten nach oben = Fortschritt
→ Responsive: Funktioniert auf allen Bildschirmgroessen

Warum Soft-Lock statt Hard-Lock fuer Modul-Abhaengigkeiten?
→ Kinder sollen NICHT blockiert werden ("Du darfst hier nicht hin")
→ Stattdessen: Sanfter Hinweis + Freiheit der Wahl
→ Wenn Kind scheitert: Frustrations-Kaskade schlaegt automatisch
  leichteres Modul vor
→ Flexible Reihenfolge ist ein Kernprinzip (siehe PROJ-1)

Warum getrennte Empfehlungen fuer Addition/Subtraktion?
→ Kinder haben oft unterschiedliche Niveaus
→ Auf der Karte: Zwei "Hier geht's weiter!" Markierungen
→ Kind kann frei waehlen welchen Bereich es zuerst ueben moechte
→ Kein Zwang zur linearen Abfolge

Warum Modul-Definitionen als statische JSON-Datei?
→ Module aendern sich nicht zur Laufzeit
→ Schnelles Laden (kein API-Call)
→ Einfach erweiterbar (Klasse 3+4 spaeter)
→ Enthaelt: Name, Beschreibung, Reihenfolge, Abhaengigkeiten
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- framer-motion (Pfad-Animationen, Pulse-Effekt beim empfohlenen Modul)
- zustand (progress-store fuer Modul-Fortschritt)
- shadcn/ui (Tabs fuer Klassenstufen, Dialog fuer Modul-Detail, ScrollArea)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── stores/
│   └── progress-store        ← Zustand: Modul-Fortschritt pro Kind
│
├── components/
│   ├── learning-path/
│   │   ├── learning-path-map ← Haupt-Komponente: Vertikaler Pfad
│   │   ├── module-station    ← Einzelne Modul-Station auf dem Pfad
│   │   ├── module-detail     ← Dialog: Modul-Info + Stufen-Auswahl
│   │   ├── path-connection   ← Verbindungslinien zwischen Modulen
│   │   ├── grade-selector    ← Tabs fuer Klasse 1/2/3/4
│   │   └── recommended-badge ← "Hier geht's weiter!" Markierung
│   │
│   └── rewards/              ← (aus PROJ-6, wiederverwendet)
│       └── star-display      ← Sterne auf den Modul-Stationen
│
├── content/
│   └── module-definitions.json ← Alle Module mit Name, Reihenfolge, Abhaengigkeiten
│
└── app/
    └── learn/
        └── page              ← Route: /learn (Lernpfad-Hauptseite)
```
