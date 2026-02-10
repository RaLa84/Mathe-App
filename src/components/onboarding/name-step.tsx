"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileStore } from "@/stores/profile-store";

interface NameStepProps {
  onNext: () => void;
}

export function NameStep({ onNext }: NameStepProps) {
  const storeName = useProfileStore((s) => s.name);
  const setName = useProfileStore((s) => s.setName);
  const [localName, setLocalName] = useState(storeName);
  const [error, setError] = useState("");

  const trimmed = localName.trim();
  const isValid = trimmed.length >= 1 && trimmed.length <= 30;

  function handleNext() {
    if (trimmed.length === 0) {
      setError("Bitte geben Sie einen Namen ein.");
      return;
    }
    if (trimmed.length > 30) {
      setError("Der Name darf maximal 30 Zeichen haben.");
      return;
    }
    setName(trimmed);
    onNext();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && isValid) {
      handleNext();
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          Wie heisst Ihr Kind?
        </CardTitle>
        <CardDescription className="text-base">
          Diesen Namen wird Ihr Kind in der App sehen.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full max-w-sm">
          <Label htmlFor="child-name" className="sr-only">
            Name des Kindes
          </Label>
          <Input
            id="child-name"
            type="text"
            placeholder="Name eingeben..."
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            maxLength={30}
            autoFocus
            className="text-lg h-14 text-center"
            aria-describedby={error ? "name-error" : undefined}
            aria-invalid={error ? true : undefined}
          />
          {error && (
            <p
              id="name-error"
              className="text-sm text-destructive mt-2 text-center"
              role="alert"
            >
              {error}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {trimmed.length}/30 Zeichen
          </p>
        </div>
        <Button
          size="lg"
          className="mt-4 text-lg px-8 py-6 h-auto"
          onClick={handleNext}
          disabled={!isValid}
        >
          Weiter
        </Button>
      </CardContent>
    </Card>
  );
}
