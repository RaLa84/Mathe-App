"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfileStore } from "@/stores/profile-store";
import { motion, useReducedMotion } from "framer-motion";

export function WelcomeScreen() {
  const name = useProfileStore((s) => s.name);
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const shouldReduceMotion = useReducedMotion();
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  function getAnimationProps() {
    if (shouldReduceMotion || sensoryProfile === "reizarm") {
      return { initial: {}, animate: {}, transition: {} };
    }
    if (sensoryProfile === "reizreich") {
      return {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1] as const,
        },
      };
    }
    return {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.4, ease: "easeOut" as const },
    };
  }

  const animProps = getAnimationProps();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={animProps.initial}
        animate={animProps.animate}
        transition={animProps.transition}
        className="w-full max-w-lg"
      >
        <Card className="text-center">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Hallo {name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Schoen, dass du da bist!
            </p>
            <Button
              size="lg"
              className="mt-4 text-xl px-10 py-7 h-auto"
              onClick={() => setShowPlaceholder(true)}
            >
              Weiter ueben!
            </Button>
            {showPlaceholder && (
              <p className="text-sm text-muted-foreground" role="status">
                Die Lernmodule werden bald freigeschaltet!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
