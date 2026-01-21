"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine
} from "../lib/shopify";
import type { ShopifyCart } from "../lib/types";

type CartContextValue = {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (
    variantId: string,
    quantity: number,
    options?: { openDrawer?: boolean }
  ) => Promise<ShopifyCart | null>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "anchor_cart_id";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hydrateCart = async () => {
      const storedId = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!storedId) return;
      try {
        const existingCart = await getCart(storedId);
        if (!existingCart) {
          window.localStorage.removeItem(CART_STORAGE_KEY);
          return;
        }
        setCart(existingCart);
      } catch (error) {
        console.error("Failed to hydrate cart", error);
      }
    };

    hydrateCart();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addLine = useCallback(
    async (
      variantId: string,
      quantity: number,
      options: { openDrawer?: boolean } = {}
    ) => {
    setIsLoading(true);
    try {
      const currentId = cart?.id ?? window.localStorage.getItem(CART_STORAGE_KEY);
      const nextCart = currentId
        ? await addToCart(currentId, variantId, quantity)
        : await createCart(variantId, quantity);
      setCart(nextCart);
      window.localStorage.setItem(CART_STORAGE_KEY, nextCart.id);
      if (options.openDrawer !== false) {
        setIsOpen(true);
      }
      return nextCart;
    } catch (error) {
      console.error("Failed to add line", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  },
    [cart?.id]
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const nextCart = await updateCartLine(cart.id, lineId, quantity);
        setCart(nextCart);
      } catch (error) {
        console.error("Failed to update line", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const nextCart = await removeCartLine(cart.id, lineId);
        setCart(nextCart);
      } catch (error) {
        console.error("Failed to remove line", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isLoading,
      openCart,
      closeCart,
      addLine,
      updateLine,
      removeLine
    }),
    [cart, isOpen, isLoading, openCart, closeCart, addLine, updateLine, removeLine]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }
  return context;
};
