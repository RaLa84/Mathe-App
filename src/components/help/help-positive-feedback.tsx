"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";

interface HelpPositiveFeedbackProps {
  stage: 1 | 2 | 3;
}

const feedbackMessages: Record<1 | 2 | 3, string[]> = {
  1: [
    "Gute Idee, den Tipp zu nutzen!",
    "Schlau, sich einen Hinweis zu holen!",
    "Tipps nutzen ist clever!",
  ],
  2: [
    "Schlau! Das Bild hilft!",
    "Gut, dass du dir das anschaust!",
    "Bilder helfen beim Verstehen!",
  ],
  3: [
    "Super, dass du dir die Schritte anschaust!",
    "Schritt fuer Schritt - so geht das!",
    "Toll, dass du es genau wissen willst!",
  ],
};

function getRandomMessage(stage: 1 | 2 | 3): string {
  const messages = feedbackMessages[stage];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function HelpPositiveFeedback({ stage }: HelpPositiveFeedbackProps) {
  const { duration, intensity } = useSensoryAnimation();
  const [message] = useState(() => getRandomMessage(stage));

  return (
    <motion.div
      initial={intensity !== "none" ? { opacity: 0, scale: 0.9 } : undefined}
      animate={intensity !== "none" ? { opacity: 1, scale: 1 } : undefined}
      transition={intensity !== "none" ? { duration } : undefined}
      className="flex items-center gap-2 text-sm font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 rounded-lg px-3 py-2"
    >
      <Sparkles className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
}
