"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export type HeroMediaOption = "lifestyle" | "studio";

const STORAGE_KEY = "anchor_hero_variant";

export const useHeroMedia = () => {
  const searchParams = useSearchParams();
  const [choice, setChoice] = useState<HeroMediaOption>(() => {
    if (typeof window === "undefined") return "lifestyle";
    const param = new URLSearchParams(window.location.search)
      .get("hero")
      ?.toLowerCase();
    if (param === "lifestyle" || param === "studio") {
      window.localStorage.setItem(STORAGE_KEY, param);
      return param;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "lifestyle" || stored === "studio") {
      return stored;
    }
    const randomChoice = Math.random() < 0.5 ? "lifestyle" : "studio";
    window.localStorage.setItem(STORAGE_KEY, randomChoice);
    return randomChoice;
  });

  useEffect(() => {
    const param = searchParams.get("hero")?.toLowerCase();
    if (param === "lifestyle" || param === "studio") {
      if (param !== choice) {
        setChoice(param);
      }
      window.localStorage.setItem(STORAGE_KEY, param);
      return;
    }
  }, [searchParams, choice]);

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: "hero_variant", variant: choice });
    }
  }, [choice]);

  return { choice };
};
