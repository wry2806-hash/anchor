import {
  ShopifyCart,
  ShopifyProduct,
  ShopifyVariant,
  ShopifyImage
} from "./types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const PRODUCT_HANDLE = process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const shopifyFetch = async <T>(
  query: string,
  variables?: Record<string, unknown>
) => {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error("Missing Shopify Storefront environment variables.");
  }

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store"
    }
  );

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((err) => err.message).join(", "));
  }
  return json.data as T;
};

const imageFragment = `
  id
  url
  altText
  width
  height
`;

const productQuery = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      images(first: 10) {
        nodes {
          ${imageFragment}
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const getProductByHandle = async (
  handle = PRODUCT_HANDLE
): Promise<ShopifyProduct | null> => {
  if (!handle) return null;
  const data = await shopifyFetch<{
    productByHandle: {
      id: string;
      handle: string;
      title: string;
      description: string;
      images: { nodes: ShopifyImage[] };
      variants: { nodes: ShopifyVariant[] };
    } | null;
  }>(productQuery, { handle });

  if (!data.productByHandle) return null;
  const product = data.productByHandle;
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    images: product.images.nodes,
    variants: product.variants.nodes
  };
};

const cartFields = `
  id
  checkoutUrl
  lines(first: 25) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          product {
            title
          }
          image {
            ${imageFragment}
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
`;

const cartCreateMutation = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${cartFields}
      }
    }
  }
`;

const cartLinesAddMutation = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${cartFields}
      }
    }
  }
`;

const cartLinesUpdateMutation = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${cartFields}
      }
    }
  }
`;

const cartLinesRemoveMutation = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${cartFields}
      }
    }
  }
`;

const cartQuery = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ${cartFields}
    }
  }
`;

const normalizeCart = (cart: any): ShopifyCart => ({
  id: cart.id,
  checkoutUrl: cart.checkoutUrl,
  lines: cart.lines.nodes,
  cost: cart.cost
});

export const createCart = async (variantId: string, quantity: number) => {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>(cartCreateMutation, {
    input: {
      lines: [{ merchandiseId: variantId, quantity }]
    }
  });

  return normalizeCart(data.cartCreate.cart);
};

export const addToCart = async (
  cartId: string,
  variantId: string,
  quantity: number
) => {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>(cartLinesAddMutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }]
  });

  return normalizeCart(data.cartLinesAdd.cart);
};

export const updateCartLine = async (
  cartId: string,
  lineId: string,
  quantity: number
) => {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>(cartLinesUpdateMutation, {
    cartId,
    lines: [{ id: lineId, quantity }]
  });

  return normalizeCart(data.cartLinesUpdate.cart);
};

export const removeCartLine = async (cartId: string, lineId: string) => {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>(cartLinesRemoveMutation, {
    cartId,
    lineIds: [lineId]
  });

  return normalizeCart(data.cartLinesRemove.cart);
};

export const getCart = async (cartId: string) => {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(cartQuery, {
    cartId
  });
  return data.cart ? normalizeCart(data.cart) : null;
};
