"use client";

import { useMemo, useState } from "react";
import type { ShopifyProduct } from "../lib/types";
import { formatMoney } from "../lib/utils";
import { useCart } from "./CartContext";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";

type BuyModuleProps = {
  product: ShopifyProduct;
};

export const BuyModule = ({ product }: BuyModuleProps) => {
  const { addLine, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  );
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId),
    [product.variants, selectedVariantId]
  );

  const price = selectedVariant?.price ?? product.variants[0]?.price;

  const handleAddToCart = async () => {
    if (!selectedVariantId) return;
    await addLine(selectedVariantId, quantity);
  };

  const handleBuyNow = async () => {
    if (!selectedVariantId) return;
    const nextCart = await addLine(selectedVariantId, quantity, {
      openDrawer: false
    });
    if (nextCart?.checkoutUrl) {
      window.location.href = nextCart.checkoutUrl;
    }
  };

  return (
    <section id="buy" className="section-pad bg-tint">
      <div className="mx-auto max-w-6xl space-y-10">
        <div>
          <h2 className="section-title">BUY</h2>
          <div className="section-rule" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
          <div className="aspect-[4/5] w-full">
            {selectedImage ? (
              <ImagePlaceholder
                src={selectedImage.url}
                alt={selectedImage.altText ?? product.title}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-line text-sm text-mute">
                Product image
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="h-16 w-16 overflow-hidden rounded-xl border border-line shadow-soft"
                  aria-label={`View ${product.title} image`}
                >
                  <ImagePlaceholder
                    src={image.url}
                    alt={image.altText ?? product.title}
                  />
                </button>
              ))}
            </div>
          )}
          </div>

          <div className="rounded-3xl border border-line bg-paper p-8 shadow-soft">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-mute">ANCHOR</p>
              <h3 className="text-3xl font-semibold uppercase tracking-[0.2em]">
                {product.title.toUpperCase()}
              </h3>
              <p className="text-lg text-deep">
                {price ? formatMoney(price.amount, price.currencyCode) : "--"}
              </p>
              <p className="text-sm text-mute">{product.description}</p>
            </div>

            <div className="mt-6 space-y-4">
              <VariantSelector
                variants={product.variants}
                selectedId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
              <QuantityStepper quantity={quantity} onChange={setQuantity} />
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariantId}
                className="btn-primary w-full disabled:opacity-50"
              >
                ADD TO CART
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isLoading || !selectedVariantId}
                className="btn-outline w-full disabled:opacity-50"
              >
                BUY IT NOW
              </button>
              <p className="text-xs text-mute">
                SECURE CHECKOUT POWERED BY SHOPIFY.
              </p>
              <div className="space-y-1 text-xs text-mute">
                <p>FAST SHIPPING. EASY RETURNS.</p>
                <p>30-DAY GUARANTEE.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
