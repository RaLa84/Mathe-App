"use client";

import { motion } from "framer-motion";
import { Clock, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PauseReminderProps {
  onPause: () => void;
  onDismiss: () => void;
}

export function PauseReminder({ onPause, onDismiss }: PauseReminderProps) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      role="status"
      aria-live="polite"
    >
      <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-blue-900">
              Du uebst schon toll!
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Moechtest du eine Pause machen?
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={onPause}
                className="gap-1"
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
              >
                Weiter ueben
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 shrink-0"
            aria-label="Erinnerung schliessen"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
