import { ImagePlaceholder } from "./ImagePlaceholder";

export const FeatureHero = () => (
  <section className="section-pad">
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="relative aspect-[16/7] w-full">
        <ImagePlaceholder
          src="/images/product-studio-wide.jpg"
          alt="ANCHOR D-ring wrist straps studio wide product shot"
        />
        <div className="absolute left-[12%] top-[25%] flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink">
          <span className="h-2 w-2 rounded-full bg-blue" />
          <span className="h-px w-8 bg-blue/40" />
          <span className="rounded-full border border-line bg-paper px-3 py-1">
            SOLID METAL D-RING
          </span>
        </div>
        <div className="absolute left-[48%] top-[55%] flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink">
          <span className="h-2 w-2 rounded-full bg-blue" />
          <span className="h-px w-8 bg-blue/40" />
          <span className="rounded-full border border-line bg-paper px-3 py-1">
            REINFORCED STITCHING
          </span>
        </div>
        <div className="absolute left-[70%] top-[25%] flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink">
          <span className="h-2 w-2 rounded-full bg-blue" />
          <span className="h-px w-8 bg-blue/40" />
          <span className="rounded-full border border-line bg-paper px-3 py-1">
            COMFORT WRIST SUPPORT
          </span>
        </div>
      </div>
    </div>
  </section>
);
