"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useProfileStore } from "@/stores/profile-store";
import { WelcomeStep } from "./welcome-step";
import { NameStep } from "./name-step";
import { GradeStep } from "./grade-step";
import { SensoryStep } from "./sensory-step";
import { NdSettingsStep } from "./nd-settings-step";
import { SummaryStep } from "./summary-step";

const TOTAL_STEPS = 6;

interface OnboardingFlowProps {
  onComplete: () => void;
}

function useSensoryDuration(): number {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return 0;
  switch (sensoryProfile) {
    case "reizarm":
      return 0;
    case "standard":
      return 0.3;
    case "reizreich":
      return 0.5;
  }
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const animationDuration = useSensoryDuration();

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const progressValue = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const steps = [
    <WelcomeStep key="welcome" onNext={goNext} />,
    <NameStep key="name" onNext={goNext} />,
    <GradeStep key="grade" onNext={goNext} />,
    <SensoryStep key="sensory" onNext={goNext} />,
    <NdSettingsStep key="nd" onNext={goNext} />,
    <SummaryStep key="summary" onComplete={onComplete} />,
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8 max-w-2xl mx-auto w-full">
        {currentStep > 0 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            aria-label="Zurueck"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}
        <div className="flex-1 flex flex-col gap-1">
          <Progress value={progressValue} className="h-2" />
          <span className="text-xs text-muted-foreground text-center">
            Schritt {currentStep + 1} von {TOTAL_STEPS}
          </span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: animationDuration, ease: "easeOut" }}
            className="w-full"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
