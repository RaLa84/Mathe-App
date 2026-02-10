"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { useRewardSound } from "@/hooks/use-reward-sound";
import { useProfileStore } from "@/stores/profile-store";

interface InstantFeedbackProps {
  show: boolean;
  text: string;
}

export function InstantFeedback({ show, text }: InstantFeedbackProps) {
  const { intensity, duration } = useSensoryAnimation();
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const { playDing } = useRewardSound();

  // Play ding sound on show (AC-6.10)
  useEffect(() => {
    if (show) playDing();
  }, [show, playDing]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {sensoryProfile === "reizarm" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 text-green-700 font-medium"
            >
              <Check className="h-5 w-5" />
              <span>{text}</span>
            </motion.div>
          )}

          {sensoryProfile === "standard" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration, type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 text-green-700 font-semibold"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
              >
                <Star className="h-6 w-6 text-yellow-500" fill="currentColor" />
              </motion.div>
              <span>{text}</span>
            </motion.div>
          )}

          {sensoryProfile === "reizreich" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3 text-green-700 font-bold text-lg"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.6, repeat: 1 }}
              >
                <Sparkles className="h-7 w-7 text-yellow-500" />
              </motion.div>
              <span>{text}</span>
              <motion.div
                animate={{
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.6, delay: 0.1, repeat: 1 }}
              >
                <Sparkles className="h-7 w-7 text-yellow-500" />
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
