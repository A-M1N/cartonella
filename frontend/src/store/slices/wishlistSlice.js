import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWishlistKey } from "../../utils/getWishlistKey";
const loadWishlistFromStorage = (userId) => {
  try {
    const key = getWishlistKey(userId);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : { items: [] };
  } catch (error) {
    console.error("Error Loading Wishlist from LocalStorage", error);
    return { items: [] };
  }
};

const saveWishlistToStorage = (userId, wishlist) => {
  try {
    const key = getWishlistKey(userId);
    localStorage.setItem(key, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error Saving wishlist to LocalStorage", error);
  }
};

const clearWishlistInStorage = (userId) => {
  const key = getWishlistKey(userId);
  localStorage.removeItem(key);
};

export const loadUserWishlist = createAsyncThunk(
  "wishlist/loadUserWishlist",
  async (userId) => {
    const data = loadWishlistFromStorage(userId);
    return { items: data.items, userId };
  },
);

const initialState = {
  items: [],
  userId: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.find((item) => item.id === newItem.id);

      if (!exists) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          rating: newItem.rating,
          reviewCount: newItem.reviewCount,
          image: newItem.image,
          categorySlug: newItem.categorySlug,
          categoryId: newItem.categoryId,
        });
      }
      saveWishlistToStorage(state.userId, {
        items: state.items,
      });
    },
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);

      saveWishlistToStorage(state.userId, {
        items: state.items,
      });
    },
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          oldPrice: item.oldPrice,
          labelTitle: item.labelTitle,
          labelColor: item.labelColor,
          rating: item.rating,
          reviewCount: item.reviewCount,
          image: item.image,
          categorySlug: item.categorySlug,
          categoryId: item.categoryId,
        });
      }
      saveWishlistToStorage(state.userId, { items: state.items });
    },
    clearWishlist: (state) => {
      clearWishlistInStorage(state.userId);
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.userId = action.payload.userId;
      })
      .addCase("auth/logout", (state) => {
        state.items = [];
        state.userId = null;
      });
  },
});

export const selectWishlistItems = (state) => state.wishlist?.items || [];
export const selectWishlistCount = (state) =>
  state.wishlist?.items?.length || 0;
export const selectIsInWishlist = (id) => (state) => {
  if (!id) return false;
  return state.wishlist?.items?.some((item) => item.id === id) || false;
};

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
