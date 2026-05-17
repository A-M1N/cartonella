import { useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProducts";
import { useProductReviews } from "../hooks/useReviews";
import { useCartActions } from "../hooks/useCartActions";
import { useNavigate } from "react-router";
import styles from "../pages/ProductDetail.module.css";

import StarRating from "../ui/Components/StarRating.jsx";
import ColorSelector from "../ui/Components/ColorSelector.jsx";
import RadioSizeInput from "../ui/Components/RadioSizeInput.jsx";
import QuantitySelect from "../ui/Components/QuantitySelect.jsx";

import { FaRegHeart } from "react-icons/fa6";

import FeatureCard from "../ui/Components/FeatureCard.jsx";
import returnIcon from "../data/choose-us-icons/return.png";
import deliveryIcon from "../data/choose-us-icons/truck.png";
import Slider from "../ui/Components/Slider.jsx";
import SectionIntro from "../ui/Components/SectionIntro.jsx";
import CardItem from "../ui/Components/CardItem.jsx";

import CustomerReviews from "../ui/Sections/Product/CustomerReviews";
import Accordion from "../ui/Components/Accordion.jsx";
import ProductDetailSkeleton from "../ui/Sections/Product/ProductDetailSkeleton.jsx";
import RelatedItems from "../ui/Components/RelatedItems.jsx";

import {
  toggleWishlist,
  selectIsInWishlist,
} from "../store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function ProductDetail() {
  const { productId } = useParams();

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(productId);

  const isInWishlist = useSelector(
    selectIsInWishlist(product ? product.id : null),
  );
  //fetch reviews
  const { data: reviewsData, isLoading: reviewsLoading } =
    useProductReviews(productId);

  const dispatch = useDispatch();
  const handleAddToWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        labelTitle: product.labelTitle,
        labelColor: product.labelColor,
        rating: product.rating,
        reviewCount: product.reviewCount,
        image: product.image,
        categorySlug: product.categorySlug,
        categoryId: product.categoryId,
      }),
    );
    if (isInWishlist) {
      toast.success("Item Removed");
    } else {
      toast.success("Item Added to wishlist");
    }
  };
  // toast cart actions
  const { addToCart } = useCartActions();

  if (productLoading) {
    return <ProductDetailSkeleton />;
  }
  if (productError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  const descriptionFeatures = product.description
    ? product.description
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => `${item}.`)
    : [];

  const itemSlides = [product.image, ...(product.images || [])].map((img) => ({
    title: product.name,
    url: img.startsWith("http") ? img : "",
  }));

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        labelTitle: product.labelTitle,
        labelColor: product.labelColor,
        rating: product.rating,
        reviewCount: product.reviewCount,
        image: product.image,
        categorySlug: product.categorySlug,
        categoryId: product.categoryId,
      },
      quantity,
    );
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        labelTitle: product.labelTitle,
        labelColor: product.labelColor,
        rating: product.rating,
        reviewCount: product.reviewCount,
        image: product.image,
        categorySlug: product.categorySlug,
        categoryId: product.categoryId,
      },
      quantity,
    );
    navigate("/checkout");
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.listImgContainer}>
            {itemSlides.map((slide, i) => (
              <div
                className={`${styles.imgContainer} ${currentIndex === i ? styles.imgContainerActive : ""}`}
                onClick={() => setCurrentIndex(i)}
                key={i}
              >
                <img
                  className={styles.listImg}
                  src={slide.url}
                  alt={slide.title}
                />
              </div>
            ))}
          </div>
          <div className={styles.sliderSection}>
            <Slider
              slides={itemSlides}
              variant="product"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </div>

        <div className={styles.rightPanel}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.row}>
            <div className={styles.ratingRow}>
              <StarRating rating={product.rating} size={16} readOnly />
              <span className={styles.reviews}>
                ({product.reviewCount} Reviews)
              </span>
            </div>

            <span className={styles.verticalDivider}>|</span>
            <span
              className={product.stock > 0 ? styles.inStock : styles.outOfStock}
            >
              {product.stock > 0 ? "In Stock" : "Out Of Stock"}
            </span>
          </div>

          <div className={styles.price}>{product.price}$</div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.divider}></div>

          <ColorSelector value={color} onChange={setColor} title={true} />

          <RadioSizeInput selectedSize={size} onChange={setSize} />

          <div className={styles.rowOptions}>
            <QuantitySelect
              value={quantity}
              onChange={setQuantity}
              max={product.stock < 10 ? product.stock : 10}
            />
            <button
              className={styles.btn}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
            <button className={styles.heartBtn} onClick={handleAddToWishlist}>
              <FaRegHeart className={styles.icon} />
            </button>
          </div>

          <button
            className={styles.btnSec}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add To Cart
          </button>
          <Accordion
            title="Features"
            defaultOpen={true}
            features={descriptionFeatures}
          />
          <div className={styles.featuresContainer}>
            <FeatureCard
              title="Free Delivery"
              description="Free Delivery on your first order!"
              icon={deliveryIcon}
              variant="product"
            />
            <FeatureCard
              title="Return Delivery"
              description="Free 30 Days Delivery Returns."
              icon={returnIcon}
              variant="product"
            />
          </div>
        </div>
      </div>

      <div className={styles.relatedItemsContainer}>
        <RelatedItems
          categorySlug={product.category.slug}
          currentProductId={product.id}
        />
      </div>

      <CustomerReviews
        productId={parseInt(productId)}
        reviews={reviewsData?.reviews || []}
        stats={reviewsData?.stats}
        isLoading={reviewsLoading}
      />
    </div>
  );
}

export default ProductDetail;
