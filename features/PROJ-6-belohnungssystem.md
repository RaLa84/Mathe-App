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
