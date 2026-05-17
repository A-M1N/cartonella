import { useState } from "react";
import style from "../Components/Card.module.css";
import { Link } from "react-router-dom";

function Card({ bgImage, title, label, labelColor, titleColor, slug }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <Link to={`/products?category=${slug}`} style={{ textDecoration: "none" }}>
      <div className={style.cardContainer}>
        <img
          src={bgImage}
          alt={title}
          fetchPriority="high"
          loading="eager"
          className={`${style.cardImage} ${imageLoaded ? style.imageLoaded : ""}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {!imageLoaded && !imageError && (
          <div className={style.cardSkeleton}>
            <div className={style.skeletonPulse} />
          </div>
        )}

        <span
          className={style.cardLabel}
          style={{ backgroundColor: `${labelColor}` }}
        >
          {label}
        </span>
        <span className={style.cardTitle} style={{ color: `${titleColor}` }}>
          {title}
        </span>
      </div>
    </Link>
  );
}

export default Card;
