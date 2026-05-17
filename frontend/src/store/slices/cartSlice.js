import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartKey } from "../../utils/getCartKey";
import { loadCartFromStorage } from "../../utils/loadCartFromStorage";
import { saveCartToStorage } from "../../utils/saveCartToStorage";
import { clearCartFromStorage } from "../../utils/clearCartFromStorage";

export const loadUserCart = createAsyncThunk(
  "cart/loadUserCart",
  async (userId) => {
    const cartData = loadCartFromStorage(userId);
    return { items: cartData.items, userId };
  },
);

const initialState = {
  items: [],
  userId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: newItem.quantity || 1,
        });
      }
      saveCartToStorage(state.userId, { items: state.items });
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);

      saveCartToStorage(state.userId, { items: state.items });
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.userId, { items: state.items });
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      saveCartToStorage(state.userId, { items: state.items });
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToStorage(state.userId, { items: state.items });
    },
    clearCart: (state) => {
      clearCartFromStorage(state.userId);
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.userId = action.payload.userId;
      })
      .addCase("auth/logout", (state) => {
        state.items = [];
        state.userId = null;
      });
  },
});

// selectors
export const selectCartItems = (state) => state.cart.items;

//total number of items
export const selectCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
//total price
export const selectCartTotalPrice = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};
//check if item is in cart
export const selectIsInCart = (id) => (state) => {
  return state.cart.items.some((item) => item.id === id);
};

//get specific item quantity
export const selectItemQuantity = (id) => (state) => {
  const item = state.cart.items.find((item) => item.id === id);
  return item ? item.quantity : 0;
};

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
