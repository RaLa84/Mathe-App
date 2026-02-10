# PROJ-5: Hilfe-System (3 Stufen)

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt "Hilfen und Loesungswege"

## Abhaengigkeiten

- Benoetigt: PROJ-4 (Aufgaben-Engine) - Hilfen werden innerhalb einer Aufgabe angezeigt
- Benoetigt: PROJ-2 (Onboarding) - ND-Anpassungen bestimmen Hilfe-Verfuegbarkeit
- Wird benoetigt von: PROJ-6 (Belohnungssystem) - "Hilfe-Profi" Meilenstein
- Wird benoetigt von: PROJ-7 (Pausen) - Frustrations-Kaskade bietet Hilfe an

---

## User Stories

### US-5.1: Tipp anfordern
Als **Kind** moechte ich **einen Tipp anfordern koennen**, wenn ich nicht weiterkomme, damit ich einen Hinweis bekomme, ohne die Loesung sofort zu sehen.

### US-5.2: Visualisierung sehen
Als **Kind** moechte ich **eine bildliche Erklaerung sehen koennen** (Zahlenstrahl, Plaettchen, Animation), wenn der Tipp nicht reicht, damit ich die Aufgabe besser verstehe.

### US-5.3: Schritt-fuer-Schritt-Loesung
Als **Kind** moechte ich **die Aufgabe Schritt fuer Schritt erklaert bekommen**, wenn ich trotz Tipp und Bild nicht weiterkomme, damit ich den Loesungsweg verstehen kann.

### US-5.4: Hilfe ohne Scham nutzen
Als **Kind** moechte ich **Hilfe nutzen koennen, ohne bestraft oder beschaemt zu werden**, damit ich mich traue, Hilfe zu holen.

### US-5.5: Werkzeuge dauerhaft nutzen (Dyskalkulie)
Als **Kind mit Dyskalkulie** moechte ich **Werkzeuge wie den Zahlenstrahl oder das Zehnerfeld dauerhaft sichtbar haben**, damit ich sie jederzeit nutzen kann, ohne sie als "Hilfe" anfordern zu muessen.

---

## Acceptance Criteria

### Progressive Hilfe-Stufen
- [ ] AC-5.1: Jede Aufgabe hat einen sichtbaren "Hilfe"-Button (Gluehbirne-Icon oder aehnlich)
- [ ] AC-5.2: **Stufe 1 (Tipp):** Kurzer Text-Hinweis zur Strategie (z.B. "Zerlege die 5!")
- [ ] AC-5.3: **Stufe 2 (Visualisierung):** Bild, Animation oder interaktives Element (z.B. Zahlenstrahl mit Spruengen)
- [ ] AC-5.4: **Stufe 3 (Schritt-fuer-Schritt):** Vollstaendiger Loesungsweg in 3-5 Schritten, kindgerecht formuliert
- [ ] AC-5.5: Hilfe-Stufen werden progressiv freigeschaltet: Erst Tipp verfuegbar, nach Nutzung auch Visualisierung, dann Schritt-fuer-Schritt
- [ ] AC-5.6: Alternativ: Alle 3 Stufen sofort verfuegbar (konfigurierbar im Profil)

### Hilfe-Darstellung
- [ ] AC-5.7: Hilfe wird als Overlay/Panel angezeigt, ohne die Aufgabe zu verdecken
- [ ] AC-5.8: Die Aufgabenstellung bleibt sichtbar, waehrend Hilfe angezeigt wird
- [ ] AC-5.9: Hilfe kann geschlossen und erneut geoeffnet werden
- [ ] AC-5.10: Visualisierungen sind interaktiv (z.B. Zahlenstrahl-Animation abspielbar, Plaettchen verschiebbar)

### Dauerhaft verfuegbare Werkzeuge (Dyskalkulie-Modus)
- [ ] AC-5.11: Wenn Dyskalkulie-Anpassung aktiv: Zahlenstrahl ist dauerhaft als einblendbare Toolbar verfuegbar
- [ ] AC-5.12: Wenn Dyskalkulie-Anpassung aktiv: Zehnerfeld/Hundertertafel ist dauerhaft einblendbar
- [ ] AC-5.13: Werkzeuge zaehlen NICHT als "Hilfe genutzt" - sie sind Werkzeuge, keine Hilfe
- [ ] AC-5.14: Werkzeuge sind auch ohne Dyskalkulie-Modus per Toggle im Profil aktivierbar

### Keine Stigmatisierung
- [ ] AC-5.15: Hilfe-Nutzung wird positiv gerahmt: "Gute Idee, den Tipp zu nutzen!"
- [ ] AC-5.16: Hilfe-Nutzung fuehrt zu keinem Punkteabzug
- [ ] AC-5.17: Hilfe-Nutzung wird fuer den "Hilfe-Profi" Meilenstein (PROJ-6) positiv gezaehlt
- [ ] AC-5.18: Hilfe ist auf JEDER Schwierigkeitsstufe verfuegbar (auch Gold)

### Hilfe-Content
- [ ] AC-5.19: Jedes Modul hat pro Aufgabentyp mindestens 1 Tipp-Text
- [ ] AC-5.20: Jedes Modul hat mindestens 1 Visualisierung (Bild oder Animation)
- [ ] AC-5.21: Jedes Modul hat mindestens 1 Schritt-fuer-Schritt-Loesung als Template
- [ ] AC-5.22: Hilfe-Texte sind in kindgerechter Sprache (max. 8-10 Woerter pro Satz)

---

## Edge Cases

- **E-5.1:** Was passiert, wenn fuer eine Aufgabe keine Hilfe-Inhalte definiert sind? → Generischer Tipp anzeigen ("Lies die Aufgabe nochmal langsam") + Fehler loggen
- **E-5.2:** Was passiert, wenn Kind alle 3 Hilfe-Stufen nutzt und immer noch nicht weiterkommt? → Frustrations-Kaskade (PROJ-7) ausloesen: Leichtere Aufgabe oder Pause anbieten
- **E-5.3:** Was passiert, wenn Hilfe-Visualisierung auf kleinem Bildschirm nicht passt? → Responsive Design: Visualisierung skaliert oder wird scrollbar
- **E-5.4:** Was passiert, wenn Vorlesefunktion (LRS) und Hilfe-Text gleichzeitig aktiv? → Hilfe-Text wird ebenfalls vorgelesen (Lautsprecher-Icon auch im Hilfe-Panel)
- **E-5.5:** Kann ein Kind Hilfe mehrfach fuer dieselbe Aufgabe nutzen? → Ja, unbegrenzt. Hilfe bleibt offen/zuklappbar

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Hilfe-System (integriert in die Aufgaben-Engine aus PROJ-4)
│
├── Hilfe-Button (immer sichtbar waehrend einer Aufgabe)
│   ├── Gluehbirne-Icon (gross, kindgerecht)
│   ├── Position: fest unten rechts (nicht im Weg)
│   └── Bei Klick → Hilfe-Panel oeffnet sich
│
├── Hilfe-Panel (Seitenleiste oder Bottom-Sheet, verdeckt Aufgabe NICHT)
│   ├── Stufe 1: Tipp (sofort verfuegbar)
│   │   ├── Text-Hinweis (kurz, max. 1-2 Saetze)
│   │   ├── Beispiel: "Nimm die groessere Zahl und zaehle weiter."
│   │   └── Vorlesefunktion (wenn LRS aktiv)
│   │
│   ├── Stufe 2: Visualisierung (nach Nutzung von Stufe 1, oder sofort wenn konfiguriert)
│   │   ├── Interaktive Animation (z.B. Frosch springt auf Zahlenstrahl)
│   │   ├── Oder: Mengen-Darstellung (Plaettchen, Wuerfelbilder)
│   │   ├── Abspielbar, pausierbar, wiederholbar
│   │   └── Responsive: skaliert auf kleinen Bildschirmen
│   │
│   └── Stufe 3: Schritt-fuer-Schritt-Loesung (nach Nutzung von Stufe 2)
│       ├── Loesung in 3-5 Schritten aufgebaut
│       ├── Jeder Schritt wird einzeln angezeigt (nicht alles auf einmal)
│       ├── "Naechster Schritt" Button
│       └── Am Ende: "Jetzt probiere es selbst! Die Aufgabe wartet."
│
├── Werkzeug-Toolbar (SEPARAT vom Hilfe-Panel, dauerhaft einblendbar)
│   ├── Zahlenstrahl (interaktiv, zum Antippen/Markieren)
│   │   ├── Anpassbar: Bis 10 / Bis 20 / Bis 100 (je nach Modul)
│   │   └── Markierungen und Sprung-Anzeige moeglich
│   │
│   ├── Zehnerfeld (2x5 Raster)
│   │   ├── Plaettchen koennen per Tap hinzugefuegt/entfernt werden
│   │   └── Farbcodierung: gefuellt = vorhanden, leer = fehlt
│   │
│   ├── Hundertertafel (ab Klasse 2)
│   │   └── Zahlen von 1-100 im Raster, Zeilen hervorhebbar
│   │
│   └── Stellenwerttafel (ab Klasse 2)
│       ├── Spalten: H | Z | E
│       └── Zahlen farbcodiert einordnen
│
└── Hilfe-Positiv-Feedback
    ├── "Gute Idee, den Tipp zu nutzen!" (nach Stufe 1)
    ├── "Schlau! Das Bild hilft!" (nach Stufe 2)
    └── "Super, dass du dir die Schritte anschaust!" (nach Stufe 3)
```

### Daten-Model

```
HILFE-INHALTE pro Aufgabe (Teil des Aufgaben-Datenmodells aus PROJ-4):
- Tipp-Text (1-2 Saetze, kindgerecht)
- Visualisierungs-Typ (Zahlenstrahl-Animation, Mengen-Darstellung, Zerlegungs-Bild)
- Visualisierungs-Daten (welche Zahlen, welche Schritte, welche Positionen)
- Schritt-fuer-Schritt-Loesung (Liste von 3-5 Schritten als Text)

HILFE-NUTZUNG (wird gespeichert):
- Aufgaben-ID
- Welche Stufe genutzt (1, 2 und/oder 3)
- Zeitstempel
- Danach richtig geantwortet? (Ja/Nein → fuer "Hilfe-Profi" Meilenstein in PROJ-6)

WERKZEUG-NUTZUNG:
- Zaehlt NICHT als "Hilfe genutzt"
- Wird separat geloggt (fuer Elternbereich: "Nutzt oft den Zahlenstrahl")

Wichtig: Hilfe-Inhalte sind TEIL des Aufgaben-JSON (nicht separat gespeichert)
→ Jede Aufgabe bringt ihre eigenen Hilfe-Texte mit
→ Kein zusaetzliches Laden noetig
```

### Beziehung Hilfe vs. Werkzeuge

```
┌─────────────────────────────────────────────────┐
│               HILFE-SYSTEM                       │
│  (aufgabenspezifisch, wird als "Hilfe" gezaehlt) │
│                                                   │
│  Stufe 1: Tipp → passend zur aktuellen Aufgabe   │
│  Stufe 2: Visualisierung → Animation fuer diese  │
│           Aufgabe                                 │
│  Stufe 3: Schritt-fuer-Schritt → Loesung fuer    │
│           diese Aufgabe                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               WERKZEUGE                          │
│  (allgemein, zaehlt NICHT als Hilfe)             │
│                                                   │
│  Zahlenstrahl: Immer verfuegbar, zum Nachgucken  │
│  Zehnerfeld: Immer verfuegbar, zum Legen         │
│  Hundertertafel: Ab Klasse 2, zum Nachschauen    │
│  Stellenwerttafel: Ab Klasse 2, zum Einordnen    │
│                                                   │
│  → Dauerhaft sichtbar wenn Dyskalkulie-Modus     │
│  → Toggle im Profil auch ohne Dyskalkulie-Modus  │
└─────────────────────────────────────────────────┘
```

### Tech-Entscheidungen

```
Warum Hilfe-Inhalte im Aufgaben-JSON und nicht separat?
→ Einfacher: Alles fuer eine Aufgabe an einem Ort
→ Keine zusaetzlichen Ladezeiten
→ Content-Ersteller sehen Aufgabe + Hilfe zusammen (Konsistenz)
→ Kein Mapping zwischen Aufgaben-IDs und Hilfe-IDs noetig

Warum Bottom-Sheet statt Sidebar fuer das Hilfe-Panel?
→ Auf Tablets (Hauptgeraet): Bottom-Sheet nutzt den Platz besser
→ Aufgabe bleibt oben sichtbar, Hilfe kommt von unten
→ Auf Desktop: Panel wird zur Sidebar (responsive)
→ Kind kann Hilfe mit Wisch-Geste schliessen (intuitiv)

Warum progressive Freischaltung der Hilfe-Stufen?
→ Kinder sollen erst selbst nachdenken (Stufe 1 = kleiner Hinweis)
→ Nicht sofort die komplette Loesung zeigen
→ Aber: Konfigurierbar! Eltern koennen "alle Stufen sofort" einstellen

Warum Werkzeuge separat vom Hilfe-System?
→ Werkzeuge sind wie Lineal oder Taschenrechner: Arbeitsmaterial
→ Hilfe nutzen = aktiv um Unterstuetzung bitten
→ Dyskalkulie-Kinder brauchen Werkzeuge IMMER, nicht nur bei Problemen
→ Werkzeuge duerfen nicht stigmatisiert werden (kein "Hilfe genutzt" Zaehler)
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- framer-motion (Animationen fuer Visualisierungen, aus PROJ-2)
- shadcn/ui Sheet/Drawer (Bottom-Sheet fuer Hilfe-Panel)
- Bestehende Werkzeug-Komponenten (aus PROJ-4: Zahlenstrahl, Zehnerfeld)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── components/
│   ├── help/
│   │   ├── help-button       ← Gluehbirne-Button (immer sichtbar)
│   │   ├── help-panel        ← Bottom-Sheet/Sidebar mit 3 Stufen
│   │   ├── help-tip          ← Stufe 1: Text-Tipp
│   │   ├── help-visualization ← Stufe 2: Animation/Bild
│   │   ├── help-step-by-step ← Stufe 3: Schrittweise Loesung
│   │   └── help-positive-feedback ← "Gute Idee, Hilfe zu nutzen!"
│   │
│   └── tools/                ← (aus PROJ-4, hier erweitert)
│       ├── number-line       ← Zahlenstrahl (erweitert: Markierungen)
│       ├── ten-frame         ← Zehnerfeld (erweitert: interaktiver)
│       ├── hundred-chart     ← Hundertertafel
│       ├── place-value-table ← Stellenwerttafel (neu)
│       └── tool-toolbar      ← Toggle-Leiste fuer alle Werkzeuge
│
└── stores/
    └── help-store            ← Zustand: welche Hilfe wurde genutzt
```
