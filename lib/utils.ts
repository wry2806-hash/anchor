export const formatMoney = (amount: string, currencyCode: string) => {
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2
  }).format(value);
};

export const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");
