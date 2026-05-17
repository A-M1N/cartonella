export const parsePrice = (priceValue) => {
  if (typeof priceValue === "number") return priceValue;
  return parseFloat(String(priceValue).replace(/[^0-9.]/g, "")) || 0;
};
