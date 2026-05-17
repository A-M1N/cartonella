import { Link } from "react-router-dom";
import styles from "./CardItemList.module.css";
import Label from "./Label";
import { FaRegHeart } from "react-icons/fa6";
import StarRating from "./StarRating";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "../../store/slices/cartSlice";
import { parsePrice } from "../../utils/parsePrice";
import formatPrice from "../../utils/formatPrice";
import toast from "react-hot-toast";
import {
  selectIsInWishlist,
  toggleWishlist,
} from "../../store/slices/wishlistSlice";

export default function CardItemList({
  id,
  title,
  description,
  price,
  oldPrice,
  image,
  rating = 0,
  reviewCount = 0,
  stock = 0,
  labelColor,
  labelTitle,
}) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(id));
  const isinWishlist = useSelector(selectIsInWishlist(id));

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
        description,
        oldPrice,
        rating,
        reviewCount,
        stock,
        labelColor,
        labelTitle,
      }),
    );
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isinWishlist) {
      toast.success("Removed From Wishlist");
    } else {
      toast.success("Added To Wishlist");
    }
    dispatch(
      toggleWishlist({
        id: id,
        name: title,
        price: parsePrice(price),
        image: image,
        description,
        oldPrice,
        rating,
        reviewCount,
        stock,
        labelColor,
        labelTitle,
      }),
    );
  };

  return (
    <div className={styles.container}>
      <Link to={`/product/${id}`} className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          {labelTitle && <Label title={labelTitle} color={labelColor} />}
          <img src={image} alt={title} className={styles.image} />
        </div>
      </Link>

      <div className={styles.infoSection}>
        <Link to={`/product/${id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <div className={styles.ratingRow}>
          <StarRating max={5} defaultValue={rating} size={16} readOnly />
          <span className={styles.reviewCount}>({reviewCount} reviews)</span>
        </div>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.stockStatus}>
          {stock > 0 ? (
            <span className={styles.inStock}>
              ✓ In Stock ({stock} available)
            </span>
          ) : (
            <span className={styles.outOfStock}>✗ Out of Stock</span>
          )}
        </div>
      </div>

      {/* Price & Actions Section */}
      <div className={styles.actionsSection}>
        {/* Price */}
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          {oldPrice && (
            <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span>
          )}
          {oldPrice && (
            <span className={styles.discount}>
              {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.addToCartBtn} ${isInCart ? styles.inCart : ""}`}
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            <MdOutlineShoppingCart size={18} />
            {isInCart ? "Add More" : "Add to Cart"}
          </button>
          <button
            className={styles.wishlistBtn}
            aria-label="Add to wishlist"
            onClick={handleToggleWishlist}
          >
            <FaRegHeart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
