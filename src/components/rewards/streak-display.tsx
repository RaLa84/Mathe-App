"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useRewardStore } from "@/stores/reward-store";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { getRandomText } from "@/lib/milestone-checker";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  compact?: boolean;
}

export function StreakDisplay({ compact = false }: StreakDisplayProps) {
  const aktuelleStreakLaenge = useRewardStore((s) => s.aktuelleStreakLaenge);
  const laengsteStreak = useRewardStore((s) => s.laengsteStreak);
  const letzteAktivitaet = useRewardStore((s) => s.letzteAktivitaet);
  const { enabled, duration } = useSensoryAnimation();

  // Check if streak is active today
  const isActiveToday = useMemo(() => {
    if (!letzteAktivitaet) return false;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return letzteAktivitaet === todayStr;
  }, [letzteAktivitaet]);

  // Generate last 7 days for calendar view
  const weekDays = useMemo(() => {
    const days: { label: string; active: boolean }[] = [];
    const today = new Date();
    const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      // A day is active if it's within the streak range ending at letzteAktivitaet
      let active = false;
      if (letzteAktivitaet && aktuelleStreakLaenge > 0) {
        const lastDate = new Date(letzteAktivitaet);
        const streakStart = new Date(lastDate);
        streakStart.setDate(streakStart.getDate() - (aktuelleStreakLaenge - 1));
        const streakStartStr = `${streakStart.getFullYear()}-${String(streakStart.getMonth() + 1).padStart(2, "0")}-${String(streakStart.getDate()).padStart(2, "0")}`;
        active = dateStr >= streakStartStr && dateStr <= letzteAktivitaet;
      }

      days.push({
        label: dayNames[date.getDay()],
        active,
      });
    }

    return days;
  }, [letzteAktivitaet, aktuelleStreakLaenge]);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <Flame
          className={cn(
            "h-4 w-4",
            aktuelleStreakLaenge > 0 ? "text-orange-500" : "text-muted-foreground/40"
          )}
          fill={aktuelleStreakLaenge > 0 ? "currentColor" : "none"}
        />
        <span className="text-sm font-medium">
          {aktuelleStreakLaenge > 0
            ? `${aktuelleStreakLaenge} ${aktuelleStreakLaenge === 1 ? "Tag" : "Tage"}`
            : "Starte eine Serie!"}
        </span>
      </div>
    );
  }

  const welcomeBack =
    !isActiveToday && aktuelleStreakLaenge === 0 && letzteAktivitaet;

  return (
    <div className="space-y-3">
      {/* Streak counter */}
      <div className="flex items-center gap-3">
        {enabled ? (
          <motion.div
            animate={
              aktuelleStreakLaenge >= 3
                ? { scale: [1, 1.1, 1] }
                : undefined
            }
            transition={{ duration: 0.5, repeat: aktuelleStreakLaenge >= 3 ? Infinity : 0, repeatDelay: 2 }}
          >
            <Flame
              className={cn(
                "h-8 w-8",
                aktuelleStreakLaenge > 0
                  ? "text-orange-500"
                  : "text-muted-foreground/40"
              )}
              fill={aktuelleStreakLaenge > 0 ? "currentColor" : "none"}
            />
          </motion.div>
        ) : (
          <Flame
            className={cn(
              "h-8 w-8",
              aktuelleStreakLaenge > 0
                ? "text-orange-500"
                : "text-muted-foreground/40"
            )}
            fill={aktuelleStreakLaenge > 0 ? "currentColor" : "none"}
          />
        )}

        <div>
          <p className="text-lg font-bold">
            {aktuelleStreakLaenge > 0
              ? `${aktuelleStreakLaenge} ${aktuelleStreakLaenge === 1 ? "Tag" : "Tage"} in Folge!`
              : "Starte eine Serie!"}
          </p>
          {laengsteStreak > aktuelleStreakLaenge && (
            <p className="text-xs text-muted-foreground">
              Rekord: {laengsteStreak} Tage
            </p>
          )}
        </div>
      </div>

      {/* Welcome back message (E-6.5) */}
      {welcomeBack && (
        <p className="text-sm text-muted-foreground italic">
          {getRandomText("willkommenZurueck")}
        </p>
      )}

      {/* Week calendar (AC-6.18) */}
      <div className="flex gap-1.5 justify-center">
        {weekDays.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground">
              {day.label}
            </span>
            {enabled && day.active ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, duration }}
                className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center"
              >
                <Flame className="h-3 w-3 text-white" fill="currentColor" />
              </motion.div>
            ) : (
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  day.active
                    ? "bg-orange-500"
                    : "bg-muted"
                )}
              >
                {day.active && (
                  <Flame className="h-3 w-3 text-white" fill="currentColor" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
