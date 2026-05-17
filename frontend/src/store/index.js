import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./listeners";
import authReducer from "../store/slices/authSlice";
import cartReducer from "../store/slices/cartSlice";
import wishlistReducer from "../store/slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
