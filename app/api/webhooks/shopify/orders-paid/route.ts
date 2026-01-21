import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { calculateCommission, calculateNetProfit } from "../../../../lib/commission";

type ShopifyOrderPayload = {
  id: string;
  current_subtotal_price?: string;
  total_discounts?: string;
  total_shipping_price_set?: { shop_money?: { amount?: string } };
  total_tax?: string;
  currency?: string;
  discount_codes?: Array<{ code: string }>;
};

export async function POST(request: Request) {
  // TODO: Verify Shopify webhook signature using Admin API secret.
  const payload = (await request.json()) as ShopifyOrderPayload;

  const code = payload.discount_codes?.[0]?.code?.toUpperCase();
  const creator = code
    ? await prisma.creator.findUnique({ where: { code } })
    : null;

  const subtotal = Number(payload.current_subtotal_price ?? 0);
  const discount = Number(payload.total_discounts ?? 0);
  const shipping = Number(payload.total_shipping_price_set?.shop_money?.amount ?? 0);
  const tax = Number(payload.total_tax ?? 0);

  const netProfit = calculateNetProfit({
    subtotalAmount: subtotal,
    discountAmount: discount,
    shippingAmount: shipping,
    taxAmount: tax,
    cogsAmount: 0
  });

  const order = await prisma.order.create({
    data: {
      shopifyOrderId: payload.id,
      creatorId: creator?.id,
      subtotalAmount: subtotal,
      discountAmount: discount,
      shippingAmount: shipping,
      taxAmount: tax,
      cogsAmount: 0,
      netProfitAmount: netProfit,
      currency: payload.currency ?? "USD"
    }
  });

  if (creator) {
    await prisma.commission.create({
      data: {
        creatorId: creator.id,
        orderId: order.id,
        amount: calculateCommission(netProfit, creator.commissionRate),
        status: "pending"
      }
    });
  }

  return NextResponse.json({ ok: true });
}
