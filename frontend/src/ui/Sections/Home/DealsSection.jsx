import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Home/DealsSection.module.css";
import Slider from "../../Components/Slider";
import { formatNumber } from "../../../utils/formatNumber";

import { useDealOfDay } from "../../../hooks/useDeals";
import { useCartActions } from "../../../hooks/useCartActions";
import Spinner from "../../Components/Spinner";

export default function DealsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { addToCart } = useCartActions();

  const { data: deal, isLoading, error } = useDealOfDay();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!deal?.expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiresAt = new Date(deal.expiresAt);
      const difference = expiresAt - now;
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deal?.expiresAt]);

  const itemSlides = useMemo(() => {
    if (!deal?.product) return [];

    const product = deal.product;
    const slides = [];

    // main img
    if (product.image) {
      slides.push({
        url: product.image.startsWith("http") ? product.image : "",
        title: product.name,
      });
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        slides.push({
          url: img.startsWith("http") ? img : "",
          title: product.name,
        });
      });
    }
    if (slides.length === 0) {
      slides.push({
        url: "/placeholder-product.png",
        title: "Product",
      });
    }
    return slides;
  }, [deal?.product]);

  const handleBuyNow = () => {
    if (!deal?.product) return;

    addToCart({
      id: deal.product.id,
      name: deal.product.name,
      price: deal.dealPrice,
      image: deal.product.image,
    });
    navigate("/checkout");
  };

  const getDescriptionList = () => {
    if (!deal?.product?.description) return [];
    return deal.product.description
      .split(/[\n.]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10)
      .slice(0, 4);
  };

  if (isLoading) {
    return (
      <div className={styles.dealsContainer}>
        <div className={styles.dealsTitleContainer}>
          <h2 className={styles.dealsTitle}>DEAL OF THE DAY</h2>
        </div>
        <div className={styles.loadingContainer}>
          <Spinner size={25} />
          <p>Loading today's deal...</p>
        </div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className={styles.dealsContainer}>
        <div className={styles.dealsTitleContainer}>
          <h2 className={styles.dealsTitle}>DEALS OF THE DAY</h2>
        </div>
        <div className={styles.noDealContainer}>
          <p>🎉 Check back tomorrow for amazing deals!</p>
          <Link to="/products?onSale=true" className={styles.browseLink}>
            Browse Sale Items →
          </Link>
        </div>
      </div>
    );
  }

  const { product, dealPrice, originalPrice, savings, freeShipping, freeGift } =
    deal;
  const discountPercent = Math.round((savings / originalPrice) * 100);
  const descriptionList = getDescriptionList();

  return (
    <div className={styles.dealsContainer}>
      <div className={styles.dealsTitleContainer}>
        <h2 className={styles.dealsTitle}>DEALS OF THE DAY</h2>
      </div>
      <div className={styles.dealsRowContent}>
        <div className={styles.leftImgsContainer}>
          {itemSlides.length > 1 && (
            <div className={styles.listImgContainer}>
              {itemSlides.map((slide, i) => (
                <div
                  className={styles.imgContainer}
                  onClick={() => setCurrentIndex(i)}
                  key={i}
                >
                  <img className={styles.listImg} src={slide.url} />
                </div>
              ))}
            </div>
          )}

          <div className={styles.itemlabel}>
            <p className={styles.save}>SAVE {discountPercent}%</p>
            <p className={styles.price}>${savings.toFixed(2)}</p>
          </div>
          <div className={styles.sliderSection}>
            <Slider
              slides={itemSlides}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              variant="product"
            />
          </div>
        </div>
        <div className={styles.rightItemContainer}>
          <Link to={`/product/${product.id}`} className={styles.titleLink}>
            <h2 className={styles.itemTitle}>{product.name}</h2>
          </Link>

          <span className={styles.itemDiscountPrice}>
            ${dealPrice.toFixed(2)}
          </span>
          <span className={styles.itemPrice}> ${originalPrice.toFixed(2)}</span>

          {descriptionList.length > 0 && (
            <ul className={styles.listDescriptionContainer}>
              {descriptionList.map((item, index) => (
                <li key={index} className={styles.listDescription}>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {freeShipping && (
            <span className={styles.freeWords}>FREE SHIPPING</span>
          )}
          {freeGift && <span className={styles.freeWords}>FREE GIFT</span>}

          <div className={styles.timerContainer}>
            <p className={styles.promotionMsg}>
              HURRY UP! PROMOTION WILL EXPIRE IN
            </p>
            <div className={styles.timerGroup}>
              <div className={styles.timeUnit}>
                <span className={styles.timeLabel}>Hours</span>
                <div className={styles.timeRow}>
                  <div className={styles.timeBox}>
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className={styles.colon}>:</span>
                </div>
              </div>

              <div className={styles.timeUnit}>
                <span className={styles.timeLabel}>Minutes</span>
                <div className={styles.timeRow}>
                  <div className={styles.timeBox}>
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className={styles.colon}>:</span>
                </div>
              </div>

              <div className={styles.timeUnit}>
                <span className={styles.timeLabel}>Seconds</span>
                <div className={styles.timeRow}>
                  <div className={styles.timeBox}>
                    {formatNumber(timeLeft.seconds)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.btnBuy} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
