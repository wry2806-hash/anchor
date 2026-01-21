export type ShopifyImage = {
  id: string;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
    image?: ShopifyImage | null;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: ShopifyCartLine[];
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};
