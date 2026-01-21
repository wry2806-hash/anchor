"use client";

type QuantityStepperProps = {
  quantity: number;
  onChange: (value: number) => void;
};

export const QuantityStepper = ({ quantity, onChange }: QuantityStepperProps) => (
  <div className="flex items-center rounded-full border border-line bg-paper">
    <button
      type="button"
      onClick={() => onChange(Math.max(1, quantity - 1))}
      className="px-3 py-2 text-sm text-mute hover:text-ink"
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span className="px-4 text-sm">{quantity}</span>
    <button
      type="button"
      onClick={() => onChange(quantity + 1)}
      className="px-3 py-2 text-sm text-mute hover:text-ink"
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);
