"use client";

import { classNames } from "../lib/utils";

type Option<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange
}: SegmentedControlProps<T>) => (
  <div className="inline-flex items-center gap-1 rounded-full border border-line bg-paper p-1 text-xs uppercase tracking-[0.3em] text-mute shadow-soft">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={classNames(
          "rounded-full px-3 py-1 transition",
          value === option.value
            ? "bg-blue/10 text-ink"
            : "hover:text-ink"
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);
