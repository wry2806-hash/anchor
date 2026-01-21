import { ImagePlaceholder } from "./ImagePlaceholder";

export const LifestyleGrid = () => (
  <section className="section-pad bg-tint">
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            src: "/images/ChatGPT_Image_Jan_20_2026_11_34_30_AM.png",
            alt: "Pulldown with straps visible"
          },
          {
            src: "/images/herobgL1.png",
            alt: "Seated row with straps visible"
          },
          {
            src: "/images/herobgS1.png",
            alt: "Detail hands, ring, and attachment"
          }
        ].map((image) => (
          <div key={image.src} className="aspect-[4/5] w-full">
            <ImagePlaceholder src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-mute">
        BUILT FOR PEOPLE WHO TRAIN WITH INTENT.
      </p>
    </div>
  </section>
);
