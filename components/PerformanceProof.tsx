export const PerformanceProof = () => (
  <section id="proof" className="section-pad bg-tint">
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="section-title">PROOF</h2>
        <div className="section-rule" />
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {[
          "BUILT FOR DAILY TRAINING",
          "DESIGNED FOR CABLE PRECISION",
          "SECURE, CONSISTENT CONNECTION",
          "COMFORT-FIRST SUPPORT"
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-line bg-paper p-6 text-sm text-ink shadow-soft"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-deep">
              <span className="h-2 w-2 rounded-full bg-blue" />
              <span>ANCHOR</span>
            </div>
            <p className="mt-4 text-sm font-medium text-ink">{item}</p>
          </div>
        ))}
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-mute">
        TESTED IN REAL TRAINING
      </p>
    </div>
  </section>
);
