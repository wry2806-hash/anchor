"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";
import { formatMoney } from "../lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const CartDrawer = () => {
  const { cart, isOpen, closeCart, updateLine, removeLine, isLoading } =
    useCart();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const subtotal =
    cart?.cost.subtotalAmount &&
    formatMoney(
      cart.cost.subtotalAmount.amount,
      cart.cost.subtotalAmount.currencyCode
    );

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/20"
        onClick={closeCart}
        role="button"
        tabIndex={-1}
        aria-label="Close cart overlay"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-line bg-paper p-6 shadow-lift backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em]">
            CART
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.3em] text-mute hover:text-ink"
          >
            CLOSE
          </button>
        </div>

        <div className="mt-6 space-y-6 overflow-y-auto pr-2">
          {!cart?.lines.length && (
            <p className="text-sm text-mute">Your cart is empty.</p>
          )}
          {cart?.lines.map((line) => (
            <div key={line.id} className="flex gap-4">
              <div className="h-20 w-20">
                {line.merchandise.image?.url ? (
                  <ImagePlaceholder
                    src={line.merchandise.image.url}
                    alt={line.merchandise.image.altText ?? line.merchandise.title}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl border border-line text-xs text-mute">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {line.merchandise.product.title}
                </p>
                <p className="text-xs text-mute">{line.merchandise.title}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                      className="px-2 py-1 text-xs text-mute hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateLine(line.id, line.quantity + 1)}
                      className="px-2 py-1 text-xs text-mute hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="text-xs uppercase tracking-[0.3em] text-mute hover:text-ink"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <div className="text-sm">
                {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-mute">Subtotal</span>
            <span>{subtotal ?? "--"}</span>
          </div>
          <button
            type="button"
            onClick={() => cart?.checkoutUrl && (window.location.href = cart.checkoutUrl)}
            className="btn-primary mt-6 w-full"
            disabled={!cart?.checkoutUrl || isLoading}
          >
            CHECKOUT
          </button>
        </div>
      </aside>
    </div>
  );
};
