"use client";

import { motion } from "framer-motion";
import { Star, CircleDashed, Loader2, CheckCircle2, CircleDot } from "lucide-react";
import { useSensoryAnimation } from "@/hooks/use-sensory-animation";
import { RecommendedBadge } from "./recommended-badge";
import type { ModulStatus } from "@/stores/progress-store";

export interface ModulDefinition {
  id: string;
  klassenstufe: number;
  name: string;
  beschreibung: string;
  voraussetzungen: string[];
  position: number;
  hasContent: boolean;
}

interface ModuleStationProps {
  modul: ModulDefinition;
  status: ModulStatus;
  bereitsGekonnt: boolean;
  isRecommended: boolean;
  onClick: () => void;
}

function StatusIcon({
  status,
  bereitsGekonnt,
  animationsEnabled,
}: {
  status: ModulStatus;
  bereitsGekonnt: boolean;
  animationsEnabled: boolean;
}) {
  if (bereitsGekonnt) {
    return <CheckCircle2 className="w-6 h-6 text-muted-foreground" />;
  }

  switch (status) {
    case "nicht_gestartet":
      return <CircleDashed className="w-6 h-6 text-muted-foreground/50" />;
    case "in_bearbeitung":
      return animationsEnabled ? (
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      ) : (
        <CircleDot className="w-6 h-6 text-primary" />
      );
    case "bronze":
      return <Star className="w-6 h-6 text-amber-600 fill-amber-600" />;
    case "silber":
      return <Star className="w-6 h-6 text-slate-400 fill-slate-400" />;
    case "gold":
      return <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
  }
}

export function ModuleStation({
  modul,
  status,
  bereitsGekonnt,
  isRecommended,
  onClick,
}: ModuleStationProps) {
  const { enabled, duration } = useSensoryAnimation();

  const isAvailable = modul.hasContent;

  const stationContent = (
    <button
      type="button"
      onClick={isAvailable ? onClick : undefined}
      disabled={!isAvailable}
      className={`
        w-full flex items-center gap-4 p-4 rounded-[var(--sensory-radius)]
        sensory-animate border
        ${
          isRecommended
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border bg-card hover:bg-accent/50"
        }
        ${!isAvailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${status === "gold" ? "ring-1 ring-yellow-400/30" : ""}
      `}
    >
      <div
        className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
          ${status === "nicht_gestartet" && !bereitsGekonnt ? "bg-muted" : "bg-primary/10"}
        `}
      >
        <StatusIcon status={status} bereitsGekonnt={bereitsGekonnt} animationsEnabled={enabled} />
      </div>

      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{modul.name}</span>
          {bereitsGekonnt && (
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              Bereits gekonnt
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {modul.beschreibung}
        </p>
        {!isAvailable && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            Bald verfuegbar
          </p>
        )}
      </div>

      <div className="flex-shrink-0 flex gap-1">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            status === "bronze" || status === "silber" || status === "gold"
              ? "bg-amber-600"
              : "bg-muted"
          }`}
        />
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            status === "silber" || status === "gold"
              ? "bg-slate-400"
              : "bg-muted"
          }`}
        />
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            status === "gold" ? "bg-yellow-400" : "bg-muted"
          }`}
        />
      </div>
    </button>
  );

  return (
    <div className="relative">
      {isRecommended && (
        <div className="flex justify-center mb-1">
          <RecommendedBadge />
        </div>
      )}

      {enabled ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: modul.position * 0.05 }}
        >
          {stationContent}
        </motion.div>
      ) : (
        stationContent
      )}
    </div>
  );
}