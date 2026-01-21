"use client";

import type { ShopifyVariant } from "../lib/types";
import { classNames } from "../lib/utils";

type VariantSelectorProps = {
  variants: ShopifyVariant[];
  selectedId: string;
  onSelect: (variantId: string) => void;
};

export const VariantSelector = ({
  variants,
  selectedId,
  onSelect
}: VariantSelectorProps) => {
  if (variants.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          className={classNames(
            "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition",
            selectedId === variant.id
              ? "border-blue/60 bg-blue/10 text-ink"
              : "border-line text-mute hover:text-ink"
          )}
        >
          {variant.title}
        </button>
      ))}
    </div>
  );
};
