import styles from "../Components/CardItem.module.css";
import Label from "./Label";
import formatPrice from "../../utils/formatPrice";
import { parsePrice } from "../../utils/parsePrice";
import { FaRegHeart } from "react-icons/fa6";
import StarRating from "../Components/StarRating";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  selectIsInWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../../store/slices/wishlistSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function CardItem({
  id,
  title,
  price,
  oldPrice,
  image,
  rating,
  reviewCount,
  labelColor,
  labelTitle,
  categorySlug,
  categoryId,
  mode = "default",
}) {
  const dispatch = useDispatch();
  const product = {
    id,
    name: title,
    price,
    oldPrice,
    image,
    rating,
    reviewCount,
    labelColor,
    labelTitle,
    categorySlug,
    categoryId,
  };
  const isInCart = useSelector(selectIsInCart(id));
  const isinWishlist = useSelector(selectIsInWishlist(id));

  // Parse price for cart

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        id: id,
        name: title,
        price: parsePrice(price),
        image: image,
        quantity: 1,
      }),
    );
    toast.success("Added to Cart");
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isinWishlist) {
      toast.success("Removed From Wishlist");
    } else {
      toast.success("Added To Wishlist");
    }
    dispatch(toggleWishlist(product));
  };
  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  const isWishlist = mode === "wishlist";
  const isCart = mode === "cart";
  return (
    <div className={styles.cardContainer}>
      {!isWishlist && (
        <button
          className={styles.wishlistBtn}
          aria-label="Add to wishlist"
          onClick={handleToggleWishlist}
        >
          <FaRegHeart
            className={`${styles.icon} ${isinWishlist ? styles.activeHeart : ""}`}
          />
        </button>
      )}
      {isWishlist && (
        <button
          className={styles.removeBtn}
          aria-label="Remove from wishlist"
          onClick={handleRemoveFromWishlist}
        >
          <IoTrashOutline className={styles.icon} />
        </button>
      )}

      {isCart && (
        <button className={styles.removeBtn} aria-label="Remove from cart">
          <IoTrashOutline className={styles.icon} />
        </button>
      )}

      {labelTitle && <Label title={labelTitle} color={labelColor} />}
      <Link to={`/product/${id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img src={image} className={styles.image} alt={title} />
        </div>
      </Link>

      <button
        className={`${styles.addCartBtn} ${isInCart ? styles.inCart : ""}`}
        onClick={handleAddToCart}
      >
        {isInCart ? "Add More" : "Add To Cart"}
        <MdOutlineShoppingCart size={18} />
      </button>

      <Link to={`/product/${id}`} className={styles.titleLink}>
        <h3 className={styles.itemTitle}>{title}</h3>
      </Link>

      <div className={styles.row}>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          {oldPrice && (
            <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span>
          )}
        </div>
        <StarRating max={5} defaultValue={rating} size={18} readOnly />
        <span className={styles.reviewsNumber}>({reviewCount})</span>
      </div>
    </div>
  );
}
