import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { loadUserCart } from "./slices/cartSlice";
import { loadUserWishlist } from "./slices/wishlistSlice"; // optional
import { login, register, googleLogin, logout } from "./slices/authSlice";

export const listenerMiddleware = createListenerMiddleware();

// Listen for any auth success or logout
listenerMiddleware.startListening({
  matcher: isAnyOf(
    login.fulfilled,
    register.fulfilled,
    googleLogin.fulfilled,
    logout,
  ),
  effect: async (action, listenerApi) => {
    // Get the latest user ID from auth state
    const state = listenerApi.getState();
    const userId = state.auth.user?.id || null;
    // Reload user‑specific cart (and wishlist)
    listenerApi.dispatch(loadUserCart(userId));
    listenerApi.dispatch(loadUserWishlist(userId));
  },
});
