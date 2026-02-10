export type Schwierigkeit = "Bronze" | "Silber" | "Gold";

export type AufgabenTyp =
  | "Zahleneingabe"
  | "MultipleChoice"
  | "DragDrop"
  | "Vergleich";

export interface Fehlermuster {
  falsch: string;
  feedback: string;
}

export interface Hilfe {
  stufe1: string;
  stufe2: string;
  stufe3: string;
}

export interface Aufgabe {
  id: string;
  modul: string;
  schwierigkeit: Schwierigkeit;
  typ: AufgabenTyp;
  aufgabentext: string;
  korrekt: string[];
  bild?: string;
  hilfe: Hilfe;
  fehlermuster: Fehlermuster[];
  vorlesen: boolean;
  antwortOptionen?: string[];
  dragItems?: string[];
  dropZones?: string[];
  stellenwertFarben?: boolean;
}

export interface AufgabenErgebnis {
  aufgabenId: string;
  antwort: string;
  richtig: boolean;
  versuche: number;
  hilfeGenutzt: boolean;
  zeitstempel: string;
  sessionId: string;
}

export interface Session {
  id: string;
  modul: string;
  modulName: string;
  schwierigkeit: Schwierigkeit;
  aufgabenAnzahl: number;
  aufgaben: Aufgabe[];
  ergebnisse: AufgabenErgebnis[];
  gestartetAm: string;
  beendetAm: string | null;
}

export interface ModulMeta {
  modul: string;
  name: string;
  aufgaben: Aufgabe[];
}

export interface FeedbackTexts {
  richtig: string[];
  falsch: string[];
  sessionEnde: string[];
}

export interface ColorSegment {
  text: string;
  color?: "plus" | "minus" | "equals" | "einer" | "zehner" | "hunderter";
}
