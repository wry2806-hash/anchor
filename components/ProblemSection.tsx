import { ImagePlaceholder } from "./ImagePlaceholder";

export const ProblemSection = () => (
  <section className="section-pad">
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h2 className="section-title">WHY TRADITIONAL STRAPS SUCK</h2>
        <div className="section-rule" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { src: "/images/herobgL1.png", label: "Flex kills force" },
          { src: "/images/herobgS1.png", label: "Grip fails first" },
          { src: "/images/solutiongbg.png", label: "Bleed power every rep" }
        ].map((item) => (
          <div
            key={item.src}
            className="rounded-2xl border border-line bg-paper p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="aspect-[4/3] w-full">
              <ImagePlaceholder src={item.src} alt={item.label} />
            </div>
            <p className="mt-4 text-sm font-medium text-ink">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
