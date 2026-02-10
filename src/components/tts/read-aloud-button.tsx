"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReadAloudButtonProps {
  text: string;
}

export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const handleSpeak = useCallback(() => {
    if (!isSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [text, isSpeaking, isSupported]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSpeak}
      aria-label={isSpeaking ? "Vorlesen stoppen" : "Aufgabe vorlesen"}
      className="min-h-[48px] min-w-[48px]"
    >
      {isSpeaking ? (
        <VolumeX className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
    </Button>
  );
}
