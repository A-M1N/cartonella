import { getCartKey } from "./getCartKey";

export const loadCartFromStorage = (userId) => {
  try {
    const key = getCartKey(userId);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : { items: [] };
  } catch (error) {
    console.error("Error Loading Cart from LocalStorage", error);
    return { items: [] };
  }
};
