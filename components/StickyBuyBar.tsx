"use client";

import { useEffect, useState } from "react";
import type { ShopifyProduct } from "../lib/types";
import { useCart } from "./CartContext";
import { formatMoney } from "../lib/utils";
import { useInView } from "../hooks/useInView";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { VariantSelector } from "./VariantSelector";

type StickyBuyBarProps = {
  product: ShopifyProduct;
};

export const StickyBuyBar = ({ product }: StickyBuyBarProps) => {
  const { addLine, isOpen } = useCart();
  const heroInView = useInView("hero", "0px");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const shouldShow = isMobile && !heroInView && !isOpen;

  const price = product.variants[0]?.price;

  const handleAdd = async () => {
    if (product.variants.length > 1) {
      setSheetOpen(true);
      return;
    }
    if (selectedVariantId) {
      await addLine(selectedVariantId, 1);
    }
  };

  const handleSheetAdd = async () => {
    if (!selectedVariantId) return;
    await addLine(selectedVariantId, 1);
    setSheetOpen(false);
  };

  if (!shouldShow) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-40 flex items-center gap-4 rounded-2xl border border-line bg-paper/90 p-3 shadow-soft backdrop-blur">
        <div className="h-12 w-12">
          {product.images[0] ? (
            <ImagePlaceholder
              src={product.images[0].url}
              alt={product.images[0].altText ?? product.title}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl border border-line text-[10px] text-mute">
              Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{product.title}</p>
          <p className="text-xs text-mute">
            {price ? formatMoney(price.amount, price.currencyCode) : "--"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn-compact"
        >
          ADD TO CART
        </button>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="w-full rounded-t-3xl border-t border-line bg-paper px-6 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Choose your variant</p>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-mute"
              >
                Close
              </button>
            </div>
            <div className="mt-4">
              <VariantSelector
                variants={product.variants}
                selectedId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
            </div>
            <button
              type="button"
              onClick={handleSheetAdd}
              className="btn-primary w-full"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </>
  );
};
