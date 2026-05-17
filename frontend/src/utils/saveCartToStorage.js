import { getCartKey } from "./getCartKey";

export const saveCartToStorage = (userId, cart) => {
  try {
    const key = getCartKey(userId);

    localStorage.setItem(key, JSON.stringify(cart));
  } catch (error) {
    console.error("Error Saving Cart to LocalStorage:", error);
  }
};
