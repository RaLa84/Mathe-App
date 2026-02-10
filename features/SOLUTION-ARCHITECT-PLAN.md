# Solution Architect - Arbeitsplan

**Erstellt:** 2026-02-10
**Zweck:** Reihenfolge und Vorgehensweise fuer den Solution Architect beim Design aller Features

---

## Uebersicht: Abhaengigkeitsgraph

```
PROJ-2 (Onboarding)          ← Startpunkt, keine Abhaengigkeiten
  |
  ├──→ PROJ-4 (Aufgaben-Engine)    ← Kernkomponente
  |      |
  |      ├──→ PROJ-5 (Hilfe-System)
  |      |      |
  |      |      ├──→ PROJ-6 (Belohnungssystem)
  |      |      |      |
  |      |      |      ├──→ PROJ-8 (Elternbereich)
  |      |      |      └──→ PROJ-9 (Lernpfad-Navigation)
  |      |      |
  |      |      ├──→ PROJ-10 (Content Klasse 1)
  |      |      └──→ PROJ-11 (Content Klasse 2)
  |      |
  |      ├──→ PROJ-3 (Einstufungstest)
  |      |      └──→ PROJ-9 (Lernpfad-Navigation)
  |      |
  |      └──→ PROJ-7 (Pausen & Selbstregulation)
  |             └──→ PROJ-8 (Elternbereich)
  |
  └──→ PROJ-8 (Elternbereich)
```

---

## Arbeitsreihenfolge: 5 Phasen

### Phase 1: Fundament (Daten-Model + Kern-Architektur)

**Ziel:** Die zentrale Datenstruktur festlegen, auf der ALLES aufbaut.

#### Schritt 1.1: PROJ-2 (Onboarding & Profil-Setup)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-2-onboarding-profil-setup.md
```

**Warum zuerst?** Das Profil-Datenmodell (Kind-Name, Klassenstufe, Sensorik-Profil, ND-Anpassungen) wird von fast JEDEM anderen Feature gelesen. Es ist das Fundament.

**SA muss klaeren:**
- Wo werden Profildaten gespeichert? (localStorage vs. Supabase)
- Welche Daten hat ein Profil?
- Wie greift die App auf Profil-Einstellungen zu? (Context API?)
- Wie sieht der Onboarding-Flow als Component-Tree aus?

#### Schritt 1.2: PROJ-4 (Aufgaben-Engine)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-4-aufgaben-engine.md
```

**Warum als zweites?** Die Aufgaben-Engine ist das **Herzstueck** der App. Jede Aufgabe, jede Eingabe, jedes Feedback laeuft durch diese Engine. Das Daten-Model fuer Aufgaben wird von PROJ-5, PROJ-6, PROJ-10, PROJ-11 genutzt.

**SA muss klaeren:**
- Wie sieht eine "Aufgabe" als Daten-Model aus? (Aufgabentyp, Text, Loesung, Hilfen, Feedback...)
- Welche UI-Komponenten braucht die Engine? (Aufgaben-Anzeige, Eingabefeld, Feedback-Anzeige)
- Wie werden verschiedene Eingabetypen (Tippen, Drag&Drop, Multiple Choice) abstrahiert?
- Wie kommuniziert die Engine mit dem Profil (ND-Anpassungen)?
- Wo werden Aufgaben-Ergebnisse gespeichert?

**Wichtig:** Das Aufgaben-Datenformat entscheidet, wie der gesamte Content (PROJ-10/11) strukturiert wird!

---

### Phase 2: Aufgaben-Erweiterungen (Hilfe + Belohnung + Pausen)

**Ziel:** Die drei Systeme designen, die die Aufgaben-Engine erweitern.

#### Schritt 2.1: PROJ-5 (Hilfe-System)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-5-hilfe-system.md
```

**Warum jetzt?** Hilfe-Inhalte muessen ins Aufgaben-Datenmodell (aus Phase 1) integriert werden. Der SA muss klaeren, ob Hilfen Teil des Aufgaben-Objekts sind oder separat gespeichert werden.

**SA muss klaeren:**
- Sind Hilfe-Texte Teil des Aufgaben-Datenmodells oder ein eigenes Model?
- Wie werden die 3 Hilfe-Stufen (Tipp/Visualisierung/Schritt-fuer-Schritt) dargestellt?
- Wie interagiert das Hilfe-Panel mit der Aufgaben-Engine (Overlay? Sidebar?)
- Wie werden Dyskalkulie-Werkzeuge (Zahlenstrahl, Zehnerfeld) als dauerhafte UI-Elemente implementiert?

#### Schritt 2.2: PROJ-6 (Belohnungssystem)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-6-belohnungssystem.md
```

**Warum nach PROJ-5?** Das Belohnungssystem hat den "Hilfe-Profi" Meilenstein, der auf PROJ-5 aufbaut. Ausserdem braucht es die Aufgaben-Ergebnisse aus PROJ-4.

**SA muss klaeren:**
- Wie werden Meilensteine gespeichert? (Welche erreicht, wann, Typ)
- Wie triggered die Aufgaben-Engine Meilenstein-Events?
- Wie werden Sterne pro Modul gespeichert und angezeigt?
- Wie passt sich die Belohnungs-Darstellung an Sensorik-Profile an?

#### Schritt 2.3: PROJ-7 (Pausen & Selbstregulation)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-7-pausen-selbstregulation.md
```

**Kann parallel zu PROJ-6 geplant werden** - keine Abhaengigkeit zwischen PROJ-6 und PROJ-7.

**SA muss klaeren:**
- Wie wird der Pausen-Timer implementiert? (Session-Timer, Aufgaben-Zaehler)
- Wo werden Stimmungsdaten gespeichert?
- Wie greift die Frustrations-Kaskade in die Aufgaben-Engine ein?
- Welche Pausen-Aktivitaeten (Atem-Animation, Bewegung) brauchen eigene Komponenten?

---

### Phase 3: Navigation & Einstufung

**Ziel:** Den Lernpfad und die Einstufungslogik designen.

#### Schritt 3.1: PROJ-3 (Einstufungstest)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-3-einstufungstest.md
```

**Warum erst jetzt?** Der Einstufungstest nutzt die Aufgaben-Engine (PROJ-4) und muss wissen, wie Module und Stufen strukturiert sind.

**SA muss klaeren:**
- Wie waehlt der Test adaptiv Aufgaben aus? (Algorithmus-Logik)
- Wie wird das Einstufungsergebnis gespeichert? (Startmodul pro Bereich)
- Wie kommuniziert das Ergebnis mit dem Lernpfad?

#### Schritt 3.2: PROJ-9 (Lernpfad-Navigation)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-9-lernpfad-navigation.md
```

**Warum nach PROJ-3 und PROJ-6?** Die Navigation braucht:
- Einstufungsergebnis (PROJ-3) → wo startet das Kind
- Sterne/Fortschritt (PROJ-6) → was wird auf der Karte angezeigt
- Profil (PROJ-2) → welche Klassenstufe

**SA muss klaeren:**
- Wie sieht die Lernpfad-Karte als Component-Tree aus?
- Wie werden Modul-Abhaengigkeiten modelliert? (Graph-Struktur)
- Wie navigiert das Kind von der Karte zu einer Aufgaben-Session?
- Wie wird der "empfohlene naechste Schritt" berechnet?

---

### Phase 4: Content-Struktur

**Ziel:** Das Content-Format finalisieren und die Datenstruktur fuer Klasse 1+2 festlegen.

#### Schritt 4.1: PROJ-10 (Content Klasse 1)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-10-content-klasse1.md
```

**Warum als eigener Schritt?** Der SA muss das endgueltige Content-Datenformat definieren, das alle 35 Module (und spaeter Klasse 3+4) nutzen werden. Das Format muss zu dem passen, was die Aufgaben-Engine (PROJ-4) erwartet.

**SA muss klaeren:**
- Endgueltiges JSON/DB-Schema fuer Aufgaben-Content
- Wie werden Aufgaben pro Modul/Stufe organisiert?
- Wie werden Hilfe-Texte, Fehlermuster und Feedback im Content referenziert?
- Wie wird Content geladen? (Statisch gebundelt vs. API vs. JSON-Dateien)
- Wie wird Content validiert? (Korrekte Loesungen, vollstaendige Felder)

#### Schritt 4.2: PROJ-11 (Content Klasse 2)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-11-content-klasse2.md
```

**Schnell:** Nutzt dasselbe Schema wie PROJ-10. SA muss nur Klasse-2-spezifische Besonderheiten pruefen (Zahlenmauern als interaktives Format, Zahlwoerter-Aufgabentyp).

---

### Phase 5: Elternbereich (Abschluss)

#### Schritt 5.1: PROJ-8 (Elternbereich)
```
Lies .claude/agents/solution-architect.md und plane features/PROJ-8-elternbereich.md
```

**Warum zuletzt?** Der Elternbereich LIEST Daten aus fast allen anderen Features (Fortschritt aus PROJ-6, Stimmung aus PROJ-7, Fehlermuster aus PROJ-4, Einstellungen aus PROJ-2). Er muss wissen, welche Datenmodelle existieren.

**SA muss klaeren:**
- Welche Daten werden aus anderen Features aggregiert?
- Wie sieht der Component-Tree fuer den Elternbereich aus?
- Wie wird der Zugangsschutz implementiert? (Einfach, aber kindersicher)
- Welche Diagramme/Visualisierungen braucht der Elternbereich?

---

## Zusammenfassung: SA-Aufrufe in Reihenfolge

```bash
# Phase 1: Fundament
Lies .claude/agents/solution-architect.md und plane features/PROJ-2-onboarding-profil-setup.md
Lies .claude/agents/solution-architect.md und plane features/PROJ-4-aufgaben-engine.md

# Phase 2: Erweiterungen (PROJ-6 und PROJ-7 koennen parallel geplant werden)
Lies .claude/agents/solution-architect.md und plane features/PROJ-5-hilfe-system.md
Lies .claude/agents/solution-architect.md und plane features/PROJ-6-belohnungssystem.md
Lies .claude/agents/solution-architect.md und plane features/PROJ-7-pausen-selbstregulation.md

# Phase 3: Navigation
Lies .claude/agents/solution-architect.md und plane features/PROJ-3-einstufungstest.md
Lies .claude/agents/solution-architect.md und plane features/PROJ-9-lernpfad-navigation.md

# Phase 4: Content
Lies .claude/agents/solution-architect.md und plane features/PROJ-10-content-klasse1.md
Lies .claude/agents/solution-architect.md und plane features/PROJ-11-content-klasse2.md

# Phase 5: Abschluss
Lies .claude/agents/solution-architect.md und plane features/PROJ-8-elternbereich.md
```

---

## Querschnitts-Entscheidungen (SA muss FRUEH klaeren)

Diese Entscheidungen betreffen ALLE Features und sollten in Phase 1 getroffen werden:

| Entscheidung | Optionen | Betrifft |
|-------------|---------|---------|
| **Datenspeicherung** | localStorage vs. Supabase vs. IndexedDB | Alle Features |
| **State Management** | React Context vs. Zustand vs. Redux | Alle Features |
| **Sensorik-Profil Architektur** | CSS Variables / Theme Provider / Tailwind Variants | PROJ-2, 4, 5, 6, 7, 9 |
| **Content-Format** | JSON-Dateien vs. DB-Tabellen vs. CMS | PROJ-10, 11, 4, 5 |
| **Text-to-Speech** | Web Speech API vs. externe Library | PROJ-4, 5 |
| **Animationen** | Framer Motion vs. CSS Animations vs. Lottie | PROJ-6, 7, 9 |
| **Drag & Drop** | @dnd-kit vs. react-beautiful-dnd vs. native | PROJ-4 |
| **Responsive Strategie** | Mobile-First vs. Tablet-First (Zielgeraet?) | Alle Features |

---

## Hinweis fuer den SA

- **PROJ-1** ist das didaktische Referenzdokument - bei fachlichen Fragen immer dort nachschlagen
- **Keine Code-Details** - nur WAS gebaut wird, nicht WIE im Code
- **PM-freundlich** - Component Trees und Daten-Modelle in einfacher Sprache
- Nach jedem Feature-Design: **User Review** vor dem naechsten Schritt
