"use client";

import { useCallback, useRef } from "react";
import { useProfileStore } from "@/stores/profile-store";

/**
 * Plays simple reward sounds using Web Audio API (AC-6.10).
 * - Reizarm: no sound
 * - Standard: subtle "ding" sound
 * - Reizreich: jubel/celebration sound (longer, richer)
 */
export function useRewardSound() {
  const sensoryProfile = useProfileStore((s) => s.sensoryProfile);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const playDing = useCallback(() => {
    if (sensoryProfile === "reizarm") return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio not available - silently ignore
    }
  }, [sensoryProfile, getCtx]);

  const playJubel = useCallback(() => {
    if (sensoryProfile === "reizarm") return;
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      const volume = sensoryProfile === "reizreich" ? 0.2 : 0.12;

      // Three ascending notes for celebration
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = "sine";
        const start = now + i * 0.12;
        gain.gain.setValueAtTime(volume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Audio not available - silently ignore
    }
  }, [sensoryProfile, getCtx]);

  return { playDing, playJubel };
}
