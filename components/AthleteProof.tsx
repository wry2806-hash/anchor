"use client";

import { ImagePlaceholder } from "./ImagePlaceholder";

export const AthleteProof = () => {
  const proofImage = "/images/solutiongbg.png";

  return (
    <section id="testimony" className="section-pad pt-0">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line shadow-soft">
          <ImagePlaceholder
            src={proofImage}
            alt="Athlete demo still with ANCHOR straps"
          />
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
