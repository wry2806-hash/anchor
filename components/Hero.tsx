"use client";

import Image from "next/image";
import { useHeroMedia } from "../hooks/useHeroMedia";

export const Hero = () => {
  const { choice } = useHeroMedia();

  const heroBackground = {
    lifestyle: "/images/herobgL1.png",
    studio: "/images/herobgS1.png"
  } as const;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-0 pb-0"
    >
      {/* Background Image */}
      <Image
        src={heroBackground[choice]}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-contain object-top"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="max-w-2xl space-y-6 pt-24 md:pt-28 lg:pt-32">
          <h1
            className="text-4xl font-semibold tracking-[0.08em] text-white md:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 12px rgba(255, 255, 255, 0.35)" }}
          >
            TRAIN PAST GRIP FAILURE.
          </h1>

          <p className="text-lg text-white">
            Metal D-ring wrist straps engineered for maximum cable efficiency.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#buy" className="btn-primary btn-glow">
              BUY NOW
            </a>
            <a href="#solution" className="btn-outline btn-glow">
              SEE HOW IT WORKS
            </a>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-white">
            FAST SHIPPING • EASY RETURNS • SATISFACTION GUARANTEE
          </p>
        </div>
      </div>
    </section>
  );
};
