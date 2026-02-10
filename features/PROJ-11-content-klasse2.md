# PROJ-11: Content - Klasse 2 Module (M2.1-M2.8)

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 3, Klasse 2

## Abhaengigkeiten

- Benoetigt: PROJ-4 (Aufgaben-Engine) - Engine muss Aufgaben darstellen koennen
- Benoetigt: PROJ-5 (Hilfe-System) - Hilfe-Inhalte pro Aufgabentyp
- Benoetigt: PROJ-9 (Lernpfad-Navigation) - Module muessen navigierbar sein
- Benoetigt: PROJ-10 (Content Klasse 1) - Voraussetzungs-Module

---

## User Stories

### US-11.1: Klasse 2 Module bearbeiten
Als **Kind der Klasse 2** moechte ich **Aufgaben zu Addition und Subtraktion im Zahlenraum bis 100 bearbeiten**, die zu meinem Lernstand passen.

### US-11.2: Stellenwerte mit Farben lernen
Als **Kind** moechte ich **Zehner und Einer immer in verschiedenen Farben sehen** (Zehner=rot, Einer=blau), damit ich den Stellenwert besser verstehe.

### US-11.3: Zahlenmauern loesen
Als **Kind** moechte ich **Zahlenmauern und Rechendreiecke loesen**, weil das Spass macht und anders ist als normale Rechenaufgaben.

### US-11.4: Mehrstufige Sachaufgaben loesen
Als **Kind** moechte ich **Sachaufgaben loesen, die aus dem Alltag kommen** (Einkaufen, Bus, Buecher), damit ich verstehe, wofuer ich Rechnen brauche.

---

## Acceptance Criteria

### Content-Umfang pro Modul

Jedes der 8 Module braucht (gleicher Standard wie PROJ-10):
- [ ] AC-11.1: Mindestens **10 Aufgaben pro Schwierigkeitsstufe** (Bronze, Silber, Gold) = min. 30 Aufgaben pro Modul
- [ ] AC-11.2: Mindestens **3 verschiedene Aufgabentypen** pro Modul
- [ ] AC-11.3: Hilfe-Texte (Tipp, Visualisierung, Schritt-fuer-Schritt) pro Aufgabentyp
- [ ] AC-11.4: Feedback-Texte (richtig + falsch, variiert)

### Module M2.1-M2.8 (konkrete Inhalte)

- [ ] AC-11.5: **M2.1 Zehner und Einer:** Buendeln, Stellenwerttafel, Zahl zerlegen, Nachbarzehner, Zahlwoerter, Zahlenstrahl
- [ ] AC-11.6: **M2.2 Addition ohne Zehnuebergang:** Nur Zehner, stellenwertweise, freies Rechnen, drei Summanden
- [ ] AC-11.7: **M2.3 Subtraktion ohne Zehnuebergang:** Nur Zehner, zweistellig, Lueckenaufgaben
- [ ] AC-11.8: **M2.4 Addition mit Zehnuebergang:** Schrittweise/stellenwertweise/ueber den Zehner, drei Varianten als waehlbare Strategie
- [ ] AC-11.9: **M2.5 Subtraktion mit Zehnuebergang:** Schrittweise/ueber den Zehner/Ergaenzen, Kettenaufgaben
- [ ] AC-11.10: **M2.6 Ergaenzen und Vermindern:** Zum Zehner ergaenzen, zu 100 ergaenzen, geschickt rechnen
- [ ] AC-11.11: **M2.7 Rechendreiecke und Zahlenmauern:** Mauer mit 1 Luecke, mehrere Luecken, rueckwaerts rechnen
- [ ] AC-11.12: **M2.8 Sachaufgaben bis 100:** Ein-Schritt + Bild, Ein-Schritt nur Text, Zwei-Schritt

### Klasse-2-spezifische Anforderungen
- [ ] AC-11.13: Stellenwert-Farbcodierung durchgaengig (E=blau, Z=rot)
- [ ] AC-11.14: Zahlwoerter-Aufgaben beruecksichtigen deutsche Besonderheit (siebenundvierzig → Einer vor Zehner gesprochen)
- [ ] AC-11.15: Zahlendreher-Fehlermuster (47 ↔ 74) sind definiert mit passendem Feedback
- [ ] AC-11.16: Zahlenmauern sind als interaktives Aufgabenformat implementiert (nicht nur Text)
- [ ] AC-11.17: Sachaufgaben Klasse 2 bieten ASS-Alternativen (Objekt-Szenarien statt soziale Szenarien)

### Datenformat (identisch zu PROJ-10)
- [ ] AC-11.18: Content im gleichen strukturierten Format wie PROJ-10
- [ ] AC-11.19: Jede Aufgabe hat: Modul-ID, Stufe, Aufgabentyp, Aufgabentext, korrekte Antwort, Hilfe-Texte, Fehlermuster-Feedback
- [ ] AC-11.20: Content ist erweiterbar

---

## Edge Cases

- **E-11.1:** Was passiert, wenn ein Kind Klasse 2 startet, aber Klasse 1 Grundlagen fehlen? → Einstufungstest (PROJ-3) empfehlen oder sanfter Hinweis: "Moechtest du erst [M1.X] ueben?"
- **E-11.2:** Was passiert bei Zahlenmauer-Aufgaben, wenn mehrere Loesungen moeglich sind? → Nur Zahlenmauern mit eindeutiger Loesung verwenden, oder alle korrekten Loesungen akzeptieren
- **E-11.3:** Was passiert, wenn Stellenwert-Farbcodierung im Reizarm-Profil stoeort? → Farben im Reizarm-Profil dezenter aber weiterhin unterscheidbar (Pastell-Varianten)
- **E-11.4:** Wie werden Sachaufgaben-Bilder fuer Klasse 2 bereitgestellt? → SVG oder optimierte PNGs, altersgerecht, kulturell neutral
- **E-11.5:** Koennen Klasse 3+4 Content-Module spaeter ergaenzt werden? → Ja, als PROJ-12 und PROJ-13 nach gleichem Schema

---

## Hinweis: Klasse 3 und 4 Content

Content fuer Klasse 3 (M3.1-M3.9) und Klasse 4 (M4.1-M4.8) wird in separaten Feature Specs erfasst:
- **PROJ-12:** Content Klasse 3 (spaeter)
- **PROJ-13:** Content Klasse 4 (spaeter)

Die didaktischen Inhalte sind bereits in [PROJ-1](PROJ-1-addition-subtraktion-lernpfad.md) definiert und dienen als Grundlage.

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Content-Format

Klasse 2 nutzt **exakt dasselbe JSON-Schema** wie PROJ-10 (Klasse 1). Keine Aenderungen am Datenformat noetig.

### Content-Organisation

```
content/
└── modules/
    └── klasse-2/
        ├── m2-1-zehner-einer.json             (30+ Aufgaben)
        ├── m2-2-addition-ohne-zehnuebergang.json  (30+ Aufgaben)
        ├── m2-3-subtraktion-ohne-zehnuebergang.json (30+ Aufgaben)
        ├── m2-4-addition-mit-zehnuebergang.json (30+ Aufgaben)
        ├── m2-5-subtraktion-mit-zehnuebergang.json (30+ Aufgaben)
        ├── m2-6-ergaenzen-vermindern.json      (30+ Aufgaben)
        ├── m2-7-rechendreiecke-zahlenmauern.json (30+ Aufgaben)
        └── m2-8-sachaufgaben-bis-100.json      (30+ Aufgaben)
```

### Content-Umfang Klasse 2

```
8 Module x 3 Stufen x 10 Aufgaben = 240 Aufgaben minimum

┌──────────┬────────┬────────┬────────┬────────┐
│ Modul    │ Bronze │ Silber │ Gold   │ Gesamt │
├──────────┼────────┼────────┼────────┼────────┤
│ M2.1     │ 12     │ 12     │ 10     │ 34     │
│ M2.2     │ 12     │ 10     │ 10     │ 32     │
│ M2.3     │ 12     │ 10     │ 10     │ 32     │
│ M2.4     │ 12     │ 12     │ 10     │ 34     │
│ M2.5     │ 12     │ 12     │ 10     │ 34     │
│ M2.6     │ 10     │ 10     │ 10     │ 30     │
│ M2.7     │ 12     │ 12     │ 10     │ 34     │
│ M2.8     │ 12     │ 10     │ 10     │ 32     │
├──────────┼────────┼────────┼────────┼────────┤
│ GESAMT   │ 94     │ 88     │ 80     │ 262    │
└──────────┴────────┴────────┴────────┴────────┘
```

### Klasse-2-spezifische Besonderheiten

```
1. ZAHLENMAUERN als interaktives Format (M2.7):
   - Neuer Aufgabentyp: "number_wall"
   - Aufgabe zeigt ein Mauer-Raster (3 Zeilen: 3-2-1 Steine)
   - Kind fuellt leere Steine aus (Zahleneingabe pro Stein)
   - Regel: Jeder Stein = Summe der zwei darunter
   - Validierung: Alle Steine muessen korrekt sein
   - Visuell: Mauer-Darstellung mit Steinen als Eingabefelder

   Component-Struktur:
   ┌─────────────────────┐
   │     Zahlenmauer      │
   │                      │
   │        [?]           │  ← Oberster Stein (berechnet)
   │      [?] [?]         │  ← Mittlere Reihe
   │    [3] [5] [7]       │  ← Unterste Reihe (gegeben)
   │                      │
   │  Regel: □ = □ + □    │  ← Erklaerung
   └─────────────────────┘

2. ZAHLWOERTER-AUFGABEN (M2.1):
   - Deutsche Besonderheit: "siebenundvierzig" → 47
   - Kinder verwechseln oft 47 und 74 (Zahlendreher)
   - Aufgabentyp: "number_input" mit spezieller Anzeige
   - Fehlermuster: 47↔74 mit spezifischem Feedback:
     "Im Deutschen sagen wir sieben-und-VIERZIG.
      Die 4 steht bei den Zehnern = 40!"
   - Farbcodierung verstaerkt: Zehner=rot, Einer=blau

3. STELLENWERT-FARBCODIERUNG durchgaengig:
   - Einer = blau (in ALLEN Aufgaben)
   - Zehner = rot (in ALLEN Aufgaben)
   - Wird bereits in Klasse 1 (M1.6) eingefuehrt
   - In Klasse 2 durchgehend angewandt

4. ASS-ALTERNATIVE SACHAUFGABEN (M2.8):
   - Jede Sachaufgabe hat eine Alternative ohne soziale Szenarien
   - Statt: "Lisa und Tom teilen..." → "In einer Kiste sind 48 Bauteile..."
   - Im JSON: Feld "ass_alternative_text" und "ass_alternative_tts"
   - Wird automatisch angezeigt wenn ASS-Anpassung im Profil aktiv
```

### Tech-Entscheidungen

```
Warum keine neue Engine-Komponente fuer Zahlenmauern?
→ Zahlenmauern sind ein neuer Aufgabentyp innerhalb der bestehenden Engine
→ Die Aufgaben-Engine (PROJ-4) unterstuetzt schon verschiedene Eingabetypen
→ "number_wall" wird als neuer Eingabetyp hinzugefuegt
→ Rendering: Eigene Komponente (NumberWall), aber integriert in den Eingabe-Bereich

Warum Klasse-2-Content im gleichen Schema wie Klasse 1?
→ Konsistenz: Eine Engine, ein Format, viele Module
→ Erweiterbarkeit: Klasse 3+4 folgen dem gleichen Schema
→ Einfachheit: Content-Ersteller lernen EIN Format
→ Validierung: Gleiche Validierungsregeln fuer alle Klassen
```

### Dependencies

```
Keine neuen Packages noetig!

Einzige neue Komponente:
- NumberWall (Zahlenmauer-Eingabe) → Erweiterung der Aufgaben-Engine
```

### Ordner-Struktur (neue Dateien)

```
src/
├── content/
│   └── modules/
│       └── klasse-2/         ← 8 JSON-Dateien (eine pro Modul)
│
├── components/
│   └── exercise/
│       └── input-number-wall ← Zahlenmauer-Eingabe-Komponente (neu)
│
└── content/
    └── images/
        └── klasse-2/        ← SVG-Bilder fuer Sachaufgaben Klasse 2
```
