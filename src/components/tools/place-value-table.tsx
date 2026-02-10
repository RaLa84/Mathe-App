"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PlaceValueTableProps {
  showHundreds?: boolean;
}

interface PlaceValueEntry {
  hunderter: string;
  zehner: string;
  einer: string;
}

export function PlaceValueTable({ showHundreds = false }: PlaceValueTableProps) {
  const [entries, setEntries] = useState<PlaceValueEntry[]>([
    { hunderter: "", zehner: "", einer: "" },
  ]);

  function handleChange(
    index: number,
    field: keyof PlaceValueEntry,
    value: string
  ) {
    // Only allow single digits
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 1);
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: cleaned } : entry
      )
    );
  }

  function addRow() {
    if (entries.length < 5) {
      setEntries((prev) => [
        ...prev,
        { hunderter: "", zehner: "", einer: "" },
      ]);
    }
  }

  function removeRow(index: number) {
    if (entries.length > 1) {
      setEntries((prev) => prev.filter((_, i) => i !== index));
    }
  }

  const columns = showHundreds
    ? [
        { key: "hunderter" as const, label: "H", color: "text-green-600" },
        { key: "zehner" as const, label: "Z", color: "text-red-500" },
        { key: "einer" as const, label: "E", color: "text-blue-600" },
      ]
    : [
        { key: "zehner" as const, label: "Z", color: "text-red-500" },
        { key: "einer" as const, label: "E", color: "text-blue-600" },
      ];

  return (
    <div aria-label="Stellenwerttafel" className="w-fit mx-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "w-16 h-10 text-center text-lg font-bold border-2 border-input bg-secondary/30",
                  col.color
                )}
              >
                {col.label}
              </th>
            ))}
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.key} className="border-2 border-input p-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={entry[col.key]}
                    onChange={(e) =>
                      handleChange(rowIndex, col.key, e.target.value)
                    }
                    className={cn(
                      "w-16 h-12 text-center text-xl font-bold bg-transparent outline-none focus:bg-primary/10",
                      col.color
                    )}
                    aria-label={`${col.label} Spalte, Zeile ${rowIndex + 1}`}
                  />
                </td>
              ))}
              <td className="pl-1">
                {entries.length > 1 && (
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="text-muted-foreground hover:text-destructive text-sm p-1"
                    aria-label={`Zeile ${rowIndex + 1} entfernen`}
                  >
                    x
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {entries.length < 5 && (
        <button
          onClick={addRow}
          className="mt-2 text-sm text-muted-foreground hover:text-foreground underline"
        >
          + Zeile hinzufuegen
        </button>
      )}
    </div>
  );
}
