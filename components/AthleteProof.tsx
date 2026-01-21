"use client";

import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const AthleteProof = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section id="testimony" className="section-pad pt-0">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line shadow-soft">
          {videoError ? (
            <ImagePlaceholder
              src="/images/athlete-demo-poster.jpg"
              alt="Athlete demo still with ANCHOR straps"
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/athlete-demo-poster.jpg"
              onError={() => setVideoError(true)}
            >
              <source src="/video/athlete-demo.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-semibold uppercase tracking-[0.2em]">
            “MY GRIP USED TO BE THE LIMITER. NOT ANYMORE.”
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-mute">
            ALEX M. — STRENGTH COACH
          </p>
        </div>
      </div>
    </section>
  );
};
