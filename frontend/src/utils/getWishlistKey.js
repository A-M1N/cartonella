export const getWishlistKey = (userId) =>
  userId ? `wishlist_${userId}` : "wishlist_guest";
