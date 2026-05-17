import { getCartKey } from "./getCartKey";

export const clearCartFromStorage = (userId) => {
  const key = getCartKey(userId);
  localStorage.removeItem(key);
};
