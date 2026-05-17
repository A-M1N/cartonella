export const getCartKey = (userId) =>
  userId ? `cart_${userId}` : "cart_guest";
