import { Reveal } from "./Reveal";

export const SolutionSection = () => (
  <section
    id="solution"
    className="relative overflow-hidden pb-0"
    style={{
      backgroundColor: "#F4F8FF",
      backgroundImage: "url(/images/solutiongbg.png)",
      backgroundPosition: "left top",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
      minHeight: "calc(100vw * 1899 / 3375)"
    }}
  >
    <div className="absolute inset-0 z-10">
      <div className="mx-auto max-w-6xl space-y-10 px-6 pt-16 md:px-10 md:pt-20 lg:px-16 lg:pt-24">
        <div className="ml-0">
          <h2 className="section-title">A STRONGER CONNECTION CHANGES EVERYTHING</h2>
          <div className="section-rule" />
        </div>
        <div className="relative h-full min-h-[560px]">
        <Reveal className="pointer-events-none absolute inset-0 hidden lg:block">
          <div
            className="h-full w-full"
            aria-label="ANCHOR straps product diagram with feature callouts"
            role="img"
          />
        </Reveal>
        <div className="relative space-y-6 bg-transparent p-0 lg:absolute lg:right-[4%] lg:top-[42%] lg:w-[38%] lg:-translate-y-1/2">
          <div className="space-y-4 text-base text-mute">
            <p>Traditional straps introduce movement where there shouldn’t be any.</p>
            <p>
              ANCHOR eliminates flex at the connection point — keeping force exactly
              where it belongs.
            </p>
            <p>
              The result is more control on cables, more effective reps, and no
              wasted energy. When your grip is locked in, the muscle does the work —
              not your gear.
            </p>
          </div>
          <a href="/video/athlete-demo.mp4" className="btn-outline inline-flex">
            SEE HOW IT WORKS
          </a>
        </div>
        </div>
      </div>
    </div>
  </section>
);
