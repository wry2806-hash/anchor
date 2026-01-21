type ProfitInputs = {
  subtotalAmount: number;
  discountAmount?: number;
  shippingAmount?: number;
  taxAmount?: number;
  cogsAmount?: number;
};

export const calculateNetProfit = (inputs: ProfitInputs) => {
  const discount = inputs.discountAmount ?? 0;
  const shipping = inputs.shippingAmount ?? 0;
  const tax = inputs.taxAmount ?? 0;
  const cogs = inputs.cogsAmount ?? 0;
  return Math.max(
    0,
    inputs.subtotalAmount - discount - shipping - tax - cogs
  );
};

export const calculateCommission = (netProfit: number, rate = 0.1) =>
  Math.max(0, netProfit * rate);
