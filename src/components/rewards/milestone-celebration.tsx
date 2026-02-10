"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Award, Flame, BookOpen, Trophy, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/stores/profile-store";
import { useRewardStore } from "@/stores/reward-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { getRandomRewardText } from "@/lib/milestone-checker";
import { ConfettiEffect } from "./confetti-effect";
import { useRewardSound } from "@/hooks/use-reward-sound";
import type { MeilensteinTyp, ErreichterMeilenstein } from "@/stores/reward-store";

const iconMap: Record<MeilensteinTyp, React.ElementType> = {
  einstieg: BookOpen,
  ersteRichtige: Star,
  fuenferSerie: Sparkles,
  bronzeStern: Star,
  silberStern: Star,
  goldStern: Star,
  hilfeProfi: BookOpen,
  durchhalteHeld: Flame,
  modulMeister: Trophy,
};

const iconColorMap: Record<MeilensteinTyp, string> = {
  einstieg: "text-blue-500",
  ersteRichtige: "text-green-500",
  fuenferSerie: "text-purple-500",
  bronzeStern: "text-amber-600",
  silberStern: "text-slate-400",
  goldStern: "text-yellow-500",
  hilfeProfi: "text-teal-500",
  durchhalteHeld: "text-orange-500",
  modulMeister: "text-yellow-600",
};

const bgColorMap: Record<MeilensteinTyp, string> = {
  einstieg: "bg-blue-100",
  ersteRichtige: "bg-green-100",
  fuenferSerie: "bg-purple-100",
  bronzeStern: "bg-amber-100",
  silberStern: "bg-slate-100",
  goldStern: "bg-yellow-100",
  hilfeProfi: "bg-teal-100",
  durchhalteHeld: "bg-orange-100",
  modulMeister: "bg-yellow-100",
};

interface MilestoneCelebrationProps {
  /** If provided, show this specific milestone. Otherwise polls from pending queue. */
  milestone?: ErreichterMeilenstein | null;
  onDone?: () => void;
}

export function MilestoneCelebration({ milestone: propMilestone, onDone }: MilestoneCelebrationProps) {
  const [currentMilestone, setCurrentMilestone] = useState<ErreichterMeilenstein | null>(null);
  const [celebrationText, setCelebrationText] = useState("");
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const popCelebration = useRewardStore((s) => s.popCelebration);
  const markCelebrationShown = useRewardStore((s) => s.markCelebrationShown);
  const { duration } = useSensoryAnimation();
  const { playJubel } = useRewardSound();

  // Auto-dismiss timer
  const AUTO_DISMISS_MS = sensoryProfile === "reizarm" ? 3000 : 5000;

  const showNext = useCallback(() => {
    if (propMilestone) {
      setCurrentMilestone(propMilestone);
      setCelebrationText(propMilestone.repeatText ?? getRandomRewardText(propMilestone.typ));
      return;
    }
    const next = popCelebration();
    if (next) {
      setCurrentMilestone(next);
      setCelebrationText(next.repeatText ?? getRandomRewardText(next.typ));
    } else {
      setCurrentMilestone(null);
    }
  }, [propMilestone, popCelebration]);

  useEffect(() => {
    showNext();
  }, [showNext]);

  // Play celebration sound when milestone is shown (AC-6.10: Sound for Standard/Reizreich)
  useEffect(() => {
    if (currentMilestone) {
      playJubel();
    }
  }, [currentMilestone, playJubel]);

  // Auto-dismiss (AC-6.12)
  useEffect(() => {
    if (!currentMilestone) return;
    const timer = setTimeout(() => {
      dismiss();
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMilestone, AUTO_DISMISS_MS]);

  const dismiss = useCallback(() => {
    if (currentMilestone) {
      markCelebrationShown(currentMilestone.typ, currentMilestone.modul);
    }
    setCurrentMilestone(null);
    onDone?.();
    // Check if there are more pending
    setTimeout(() => showNext(), 300);
  }, [currentMilestone, markCelebrationShown, onDone, showNext]);

  if (!currentMilestone) return null;

  const Icon = iconMap[currentMilestone.typ];
  const iconColor = iconColorMap[currentMilestone.typ];
  const bgColor = bgColorMap[currentMilestone.typ];

  // AC-6.10: Reizarm - dezenter Banner oben + Text + Haken
  if (sensoryProfile === "reizarm") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className={`rounded-lg p-4 ${bgColor} border flex items-center gap-3`}>
            <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
            <span className="font-medium text-sm flex-1">{celebrationText}</span>
            <button
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Schliessen"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // AC-6.10: Standard - Stern-Animation mittig + Text + Slide-In
  if (sensoryProfile === "standard") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration, type: "spring", stiffness: 200 }}
            className="bg-background rounded-2xl p-8 shadow-xl max-w-sm mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
              className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center mx-auto mb-4`}
            >
              <Icon className={`h-8 w-8 ${iconColor}`} />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{celebrationText}</h3>
            <Button onClick={dismiss} variant="outline" size="sm" className="mt-4">
              Weiter
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // AC-6.10: Reizreich - Vollbild-Feier: Konfetti + grosser Text
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        onClick={dismiss}
      >
        <ConfettiEffect active={true} />
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="bg-background rounded-3xl p-10 shadow-2xl max-w-md mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`w-24 h-24 rounded-full ${bgColor} flex items-center justify-center mx-auto mb-6`}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.5, duration: 0.4, repeat: 2 }}
            >
              <Icon className={`h-12 w-12 ${iconColor}`} />
            </motion.div>
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">{celebrationText}</h2>
          <Button onClick={dismiss} variant="outline" size="lg" className="mt-6">
            Weiter
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
