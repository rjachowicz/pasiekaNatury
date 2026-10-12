export const formatPolishCurrency = (grosze: number) => {
  const value = grosze / 100;
  const hasGrosze = grosze % 100 !== 0;

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: hasGrosze ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
};
