import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import {
  clearWishlist,
  selectWishlistItems,
} from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";

export function useMoveWishlistToCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  const moveAllToCart = () => {
    if (items.length === 0) return;

    items.forEach((item) => {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        }),
      );
    });
    toast.success("Items Moved to Cart Successfully");
    dispatch(clearWishlist());
  };
  return { moveAllToCart };
}
