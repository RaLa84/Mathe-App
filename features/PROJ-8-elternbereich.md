# PROJ-8: Elternbereich

**Status:** 🔵 Planned
**Created:** 2026-02-10
**Last Updated:** 2026-02-10
**Referenz:** [PROJ-1 Didaktisches Konzept](PROJ-1-addition-subtraktion-lernpfad.md) - Abschnitt 9 (Eltern-Transparenz)

## Abhaengigkeiten

- Benoetigt: PROJ-2 (Onboarding) - Profil-Einstellungen verwalten
- Benoetigt: PROJ-6 (Belohnungssystem) - Fortschrittsdaten anzeigen
- Benoetigt: PROJ-7 (Pausen) - Pausen-Einstellungen, Stimmungsdaten
- Benoetigt: PROJ-4 (Aufgaben-Engine) - Aufgaben-Ergebnisse, Fehlermuster

---

## User Stories

### US-8.1: Fortschritt sehen
Als **Elternteil** moechte ich **den Lernfortschritt meines Kindes sehen** (abgeschlossene Module, Sterne, aktuelle Stufe), damit ich weiss, wo mein Kind steht.

### US-8.2: Einstellungen anpassen
Als **Elternteil** moechte ich **alle Profil-Einstellungen aendern koennen** (Sensorik-Profil, ND-Anpassungen, Pausen-Intervall, Session-Laenge), damit ich die App an wechselnde Beduerfnisse meines Kindes anpassen kann.

### US-8.3: Staerken und Schwaechen verstehen
Als **Elternteil** moechte ich **sehen, in welchen Bereichen mein Kind stark ist und wo es Schwierigkeiten hat**, damit ich es gezielt unterstuetzen kann.

### US-8.4: Fehlermuster erklaert bekommen
Als **Elternteil** moechte ich **haeufige Fehlermuster meines Kindes erklaert bekommen** (z.B. "Zehneruebergang wird oft vergessen"), mit Tipps, wie ich helfen kann.

### US-8.5: Lernzeit ueberblicken
Als **Elternteil** moechte ich **sehen, wie oft und wie lange mein Kind geuebt hat**, ohne Druck aufzubauen (positiv gerahmt).

### US-8.6: Elternbereich schuetzen
Als **Elternteil** moechte ich **den Elternbereich vor versehentlichem Zugriff durch mein Kind schuetzen** (einfacher Schutz, kein Passwort-Overkill).

---

## Acceptance Criteria

### Zugang
- [ ] AC-8.1: Elternbereich ist ueber ein separates Menue erreichbar (nicht im Kind-Flow sichtbar)
- [ ] AC-8.2: Einfacher Zugangsschutz: z.B. "Halte 3 Sekunden gedrueckt" oder einfache Mathe-Aufgabe fuer Erwachsene (z.B. "Was ist 7 x 8?")
- [ ] AC-8.3: Kein Passwort noetig (niedrigschwellig, aber Kind-sicher)

### Fortschritts-Uebersicht
- [ ] AC-8.4: Uebersicht aller Module mit Status: Nicht gestartet / In Bearbeitung / Bronze / Silber / Gold
- [ ] AC-8.5: Aktuelle Klassenstufe und aktives Modul sichtbar
- [ ] AC-8.6: Anzahl geloester Aufgaben (gesamt und pro Modul)
- [ ] AC-8.7: Erfolgsquote pro Modul (z.B. "75% richtig in Addition bis 20")
- [ ] AC-8.8: Durchhalte-Streak (Tage in Folge geuebt)

### Staerken & Schwaechen
- [ ] AC-8.9: "Staerken"-Bereich: Module mit hoechster Erfolgsquote hervorheben
- [ ] AC-8.10: "Empfehlungen"-Bereich: Naechstes empfohlenes Modul anzeigen
- [ ] AC-8.11: Fehlermuster-Analyse: Haeufigste Fehlertypen mit kindgerechter Erklaerung fuer Eltern
- [ ] AC-8.12: Tipps fuer Eltern bei haeufigen Fehlermustern (z.B. "Zehneruebergang: Uebt zu Hause mit echten Gegenstaenden das Buendeln")

### Lernzeit
- [ ] AC-8.13: Uebungszeit pro Tag/Woche als einfaches Diagramm
- [ ] AC-8.14: Positiv gerahmt: "3 Tage diese Woche geuebt - toll!" (nicht: "2 Tage verpasst")
- [ ] AC-8.15: Keine Benachrichtigungen/Push-Nachrichten wenn Kind nicht uebt

### Stimmungscheck-Daten
- [ ] AC-8.16: Stimmungsverlauf als einfache Uebersicht (Emojis ueber Zeit)
- [ ] AC-8.17: Bei anhaltend schlechter Stimmung: Hinweis "Ihr Kind scheint gerade wenig Spass zu haben. Vielleicht hilft eine Pause oder ein Themenwechsel?"

### Einstellungen
- [ ] AC-8.18: Sensorik-Profil aendern (Reizarm/Standard/Reizreich)
- [ ] AC-8.19: ND-Anpassungen einzeln ein/ausschalten
- [ ] AC-8.20: Pausen-Intervall aendern (5/10/15/20 Minuten)
- [ ] AC-8.21: Session-Laenge aendern (3/5/7/10 Aufgaben pro Session)
- [ ] AC-8.22: Frustrations-Schwellenwerte anpassen (nach wie vielen Fehlern Hilfe/Pause)
- [ ] AC-8.23: Bestaetigungsschritt (ADHS) ein/ausschalten
- [ ] AC-8.24: Aenderungen werden sofort gespeichert und wirksam

---

## Edge Cases

- **E-8.1:** Was passiert, wenn noch keine Aufgaben geloest wurden? → Leerzustand: "Noch keine Daten. Sobald [Name] die erste Aufgabe loest, siehst du hier den Fortschritt."
- **E-8.2:** Was passiert, wenn der Zugangsschutz umgangen wird (Kind errät die Aufgabe)? → Akzeptables Risiko fuer MVP. Elternbereich zeigt keine schaedlichen Inhalte
- **E-8.3:** Was passiert, wenn Eltern die Klassenstufe aendern? → Lernfortschritt der alten Stufe bleibt erhalten, neue Module werden freigeschaltet
- **E-8.4:** Was passiert, wenn Fehlermuster-Analyse zu wenig Daten hat (< 10 Aufgaben)? → "Noch zu wenig Daten fuer eine Analyse. Nach ca. 20 Aufgaben zeigen wir Muster."
- **E-8.5:** Ist der Elternbereich DSGVO-konform? → MVP: Alle Daten lokal auf dem Geraet. Keine Uebertragung an Server. Eltern haben volle Kontrolle ueber Loeschung

---

## Tech-Design (Solution Architect)

**Erstellt:** 2026-02-10

### Component-Struktur

```
Elternbereich (eigene Seite, geschuetzter Zugang)
│
├── Zugangsschutz
│   ├── "3 Sekunden gedrueckt halten" Geste ODER
│   ├── Einfache Rechenaufgabe: "Was ist 7 x 8?" (Erwachsenen-Aufgabe)
│   └── Kein Passwort noetig (niedrigschwellig)
│
├── Eltern-Dashboard (Uebersichtsseite)
│   ├── Begruessung: "Elternbereich fuer [Kind-Name]"
│   │
│   ├── Fortschritts-Karte (oben)
│   │   ├── Aktuelle Klassenstufe + aktives Modul
│   │   ├── Gesamte Sterne: "12 von 30 Sternen gesammelt"
│   │   ├── Durchhalte-Streak: "3 Tage in Folge" (positiv gerahmt)
│   │   └── Letzte Aktivitaet: "Gestern, 15 Minuten"
│   │
│   ├── Staerken-Bereich
│   │   ├── "Besonders stark in:" + Top-3-Module (hoechste Erfolgsquote)
│   │   └── Sterne-Anzeige pro Modul
│   │
│   ├── Empfehlungen-Bereich
│   │   ├── "Naechstes empfohlenes Modul:" + Modul-Name
│   │   └── "Tipp:" + Paedagogischer Hinweis fuer Eltern
│   │
│   └── Schnellzugriff-Buttons
│       ├── "Detaillierter Fortschritt"
│       ├── "Fehlermuster"
│       ├── "Stimmungsverlauf"
│       └── "Einstellungen"
│
├── Detaillierter Fortschritt (Unterseite)
│   ├── Modul-Liste mit Status (Tabelle oder Liste)
│   │   ├── Pro Modul: Name | Status | Sterne | Aufgaben geloest | Erfolgsquote
│   │   ├── Filter: Alle / Nur aktive / Nur abgeschlossene
│   │   └── Sortierbar nach Name oder Fortschritt
│   ├── Lernzeit-Diagramm
│   │   ├── Balkendiagramm: Minuten pro Tag (letzte 7 Tage)
│   │   ├── Positiv gerahmt: "3 Tage diese Woche geuebt - toll!"
│   │   └── Keine Mahnungen bei fehlenden Tagen
│   └── Aufgaben-Statistik
│       ├── Gesamt geloest: 156 Aufgaben
│       ├── Erfolgsquote gesamt: 72%
│       └── Durchschnittliche Session-Laenge: 8 Minuten
│
├── Fehlermuster-Analyse (Unterseite)
│   ├── Haeufigste Fehlertypen (sortiert nach Haeufigkeit)
│   │   ├── Fehler-Beschreibung fuer Eltern (z.B. "Zehneruebergang wird oft vergessen")
│   │   ├── Erklaerung: Warum passiert das? (kindgerecht fuer Eltern)
│   │   ├── Tipp fuer Eltern: "Uebt zu Hause mit echten Gegenstaenden das Buendeln"
│   │   └── Wie oft aufgetreten (z.B. "12 Mal in den letzten 7 Tagen")
│   ├── Mindest-Datenmenge: "Nach ca. 20 Aufgaben zeigen wir Muster"
│   └── Hilfe-Nutzung (positiv gerahmt)
│       ├── "Ihr Kind nutzt Hilfe - das ist schlau!"
│       └── Welche Hilfe-Stufen am meisten genutzt
│
├── Stimmungsverlauf (Unterseite)
│   ├── Emoji-Timeline: Stimmung ueber die letzten Sessions
│   │   ├── Vor Session: Emoji | Nach Session: Emoji | Datum
│   │   └── Einfache Tabelle oder visuelle Timeline
│   ├── Trend-Anzeige: "Die Stimmung ist meist gut/gleich/sinkend"
│   └── Bei anhaltend schlechter Stimmung:
│       "Ihr Kind scheint gerade wenig Spass zu haben.
│        Vielleicht hilft eine Pause oder ein Themenwechsel?"
│
├── Einstellungen (Unterseite)
│   ├── Profil
│   │   ├── Kind-Name aendern
│   │   ├── Klassenstufe aendern (mit Hinweis: "Fortschritt bleibt erhalten")
│   │   └── Sensorik-Profil aendern (Reizarm/Standard/Reizreich)
│   ├── ND-Anpassungen (Toggles, wie im Onboarding)
│   │   ├── Bestaetigungsschritt (ADHS)
│   │   ├── Vorlesefunktion (LRS)
│   │   ├── Werkzeuge dauerhaft sichtbar (Dyskalkulie)
│   │   └── Reizarme Sachaufgaben (ASS)
│   ├── Session-Einstellungen
│   │   ├── Session-Laenge: Schieberegler 3-10 Aufgaben (Standard: 5)
│   │   ├── Pausen-Intervall: Auswahl 5/10/15/20 Minuten (Standard: 10)
│   │   └── Hyperfokus-Modus: Toggle (Pausen-Erinnerung unterdruecken)
│   ├── Frustrations-Einstellungen
│   │   ├── Schwellenwerte anpassbar: 2/3/5 (Standard)
│   │   └── Erklaerung: "Nach wie vielen Fehlversuchen soll Hilfe angeboten werden?"
│   └── Daten
│       ├── "Alle Daten loeschen" Button (mit Bestaetigung)
│       └── Hinweis: "Alle Daten sind nur auf diesem Geraet gespeichert"
│
└── Zurueck zum Kind-Modus
    └── Button: "Zurueck zum Ueben" → Kind-Willkommensbildschirm
```

### Daten-Model

```
Der Elternbereich LIEST Daten aus anderen Stores (erstellt keine eigenen):

Von profile-store (PROJ-2):
- Kind-Name, Klassenstufe, Sensorik-Profil, ND-Anpassungen

Von session-store (PROJ-4):
- Alle Session-Ergebnisse (Aufgaben, Antworten, richtig/falsch)
- Session-Dauer, Zeitstempel

Von reward-store (PROJ-6):
- Sterne pro Modul (Bronze/Silber/Gold)
- Meilensteine
- Durchhalte-Streak

Von help-store (PROJ-5):
- Hilfe-Nutzung pro Aufgabe

Stimmungsdaten (PROJ-7):
- Stimmungscheck vor/nach jeder Session

BERECHNETE DATEN (nicht gespeichert, live berechnet):
- Erfolgsquote pro Modul = richtige / gesamte Aufgaben
- Haeufigste Fehlermuster = Gruppierung falscher Antworten nach Fehlertyp
- Lernzeit pro Tag = Summe aller Session-Dauern am Tag
- Staerken = Top-3-Module nach Erfolgsquote
- Empfohlenes naechstes Modul = aus progress-store (PROJ-9)
```

### Fehlermuster-Analyse Logik

```
Wie werden Fehlermuster erkannt?

1. Aufgaben-Ergebnisse gruppieren nach Modul
2. Falsche Antworten pruefen gegen definierte Fehlermuster:
   - Content-JSON hat pro Aufgabe "error_patterns" mit erwarteten falschen Antworten
   - Wenn Kind Antwort X gibt und X in error_patterns → Fehlertyp erkannt
3. Fehlertypen zaehlen: "Zehneruebergang vergessen" → 12 Mal
4. Top-3 Fehlertypen anzeigen mit:
   - Name des Fehlers (PM-freundlich)
   - Erklaerung (warum passiert das)
   - Eltern-Tipp (was kann man zu Hause tun)
5. Mindest-Datenmenge: Erst ab 20 geloesten Aufgaben

Fehlermuster-Texte fuer Eltern kommen aus einer separaten JSON-Datei:
- error-patterns-info.json
- Pro Fehlertyp: Eltern-Erklaerung + Tipp
```

### Tech-Entscheidungen

```
Warum "3 Sekunden druecken" als Zugangsschutz?
→ Einfach fuer Eltern (kein Passwort merken)
→ Fuer kleine Kinder schwer zufaellig auszuloesen
→ Alternative: Einfache Mathe-Aufgabe (7x8=56)
→ MVP: Bewusst niedrigschwellig, kein Sicherheits-Overkill
→ Elternbereich zeigt keine schaedlichen Inhalte

Warum berechnete Daten statt gespeicherte Statistiken?
→ Einfacher: Keine Duplikation von Daten
→ Immer aktuell: Wird bei jedem Oeffnen neu berechnet
→ Kein Sync-Problem: Eine Quelle der Wahrheit (die Stores)
→ Performance: Bei lokalen Daten ist die Berechnung schnell genug

Warum kein Push/Benachrichtigungen?
→ Kein Druck auf Kinder: "Du hast 2 Tage nicht geuebt!" ist schaedlich
→ Eltern sollen intrinsisch motiviert schauen, nicht durch Benachrichtigungen
→ App-Philosophie: Positiv und druckfrei
→ Technisch einfacher (kein Service Worker / Push-Registrierung)

Warum Balkendiagramm fuer Lernzeit?
→ Einfach lesbar (auch fuer nicht-technikaffine Eltern)
→ 7 Balken = letzte Woche → uebersichtlich
→ Positiv gerahmt: "3 von 7 Tagen" statt "4 Tage verpasst"
→ CSS-only moeglich (kein Chart-Library noetig fuer MVP)
```

### Dependencies

```
Keine neuen Packages noetig!

Genutzt wird:
- zustand (Lesen aus allen bestehenden Stores)
- shadcn/ui (Tabs, Card, Table, Progress, Switch, Slider, Dialog)
- Tailwind CSS (einfache Balkendiagramme via CSS)

Optional spaeter:
- recharts (wenn komplexere Diagramme gewuenscht)
```

### Ordner-Struktur (neue Dateien)

```
src/
├── components/
│   ├── parent/
│   │   ├── parent-gate        ← Zugangsschutz (3s druecken / Mathe-Aufgabe)
│   │   ├── parent-dashboard   ← Uebersichtsseite
│   │   ├── progress-overview  ← Detaillierter Fortschritt + Modul-Tabelle
│   │   ├── learning-time-chart ← Lernzeit-Balkendiagramm (CSS-basiert)
│   │   ├── error-pattern-view ← Fehlermuster-Analyse + Eltern-Tipps
│   │   ├── mood-timeline      ← Stimmungsverlauf (Emoji-Timeline)
│   │   ├── parent-settings    ← Alle Einstellungen (Profil + ND + Session)
│   │   └── data-management    ← "Alle Daten loeschen" mit Bestaetigung
│   │
│   └── exercise/             ← (wiederverwendet fuer Statistiken)
│
├── content/
│   └── error-patterns-info.json ← Fehlermuster-Erklaerungen fuer Eltern
│
├── lib/
│   ├── stats-calculator      ← Erfolgsquote, Lernzeit, Staerken berechnen
│   └── error-pattern-analyzer ← Fehlermuster aus Session-Daten erkennen
│
└── app/
    └── parent/
        └── page              ← Route: /parent (Elternbereich)
```
