export const formatProductCount = (count: number) => {
  if (count === 1) return "1 produkt";
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return `${count} produkty`;
  }
  return `${count} produktów`;
};
