"use client";

import { useState } from "react";
import { classNames } from "../lib/utils";

const items = [
  {
    q: "DO THESE WORK ON ALL CABLE MACHINES?",
    a: "Yes. The straps loop onto standard cable attachments used in most gyms."
  },
  {
    q: "ARE THEY BEGINNER-FRIENDLY?",
    a: "Absolutely. They remove grip fatigue so you can focus on form and control."
  },
  {
    q: "HOW ARE THESE DIFFERENT THAN STANDARD STRAPS?",
    a: "Metal D-rings minimize flex, creating a more direct transfer of force."
  },
  {
    q: "WHAT’S THE FIT LIKE?",
    a: "One size fits most wrists with adjustable wrap and secure closure."
  },
  {
    q: "WHAT’S YOUR RETURN POLICY?",
    a: "30-day guarantee with easy returns."
  },
  {
    q: "HOW LONG DOES SHIPPING TAKE?",
    a: "About one week to Canada and the USA."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h2 className="section-title">FAQ</h2>
          <div className="section-rule" />
        </div>
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full rounded-2xl border border-line bg-paper p-5 text-left shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[0.2em]">
                    {item.q}
                  </span>
                  <span className="text-mute">{isOpen ? "—" : "+"}</span>
                </div>
                <div
                  className={classNames(
                    "mt-3 text-sm text-mute",
                    isOpen ? "block" : "hidden"
                  )}
                >
                  {item.a}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
