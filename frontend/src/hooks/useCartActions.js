import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  updateQuantity,
  decreaseQuantity,
  clearCart,
  selectIsInCart,
  selectItemQuantity,
} from "../store/slices/cartSlice.js";

export function useCartActions() {
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity = 1) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      }),
    );
    toast.success(`${product.name} added to cart!`, {
      icon: `🛒`,
    });
  };

  const handleRemoveFromCart = (productId, productName) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} removed from cart`);
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart Cleared");
  };

  return {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
  };
}
