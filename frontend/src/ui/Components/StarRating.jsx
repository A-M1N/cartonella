import Star from "../Components/Star";
import { useState, useEffect } from "react";

export default function StarRating({
  max = 5,
  rating: externalRating,
  defaultValue = 5,
  size = 12,
  readOnly = true,
  onRatingChange,
}) {
  const [internalRating, setInternalRating] = useState(defaultValue);
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(null);

  // If external rating changes, update internal state
  useEffect(() => {
    if (externalRating !== undefined) {
      setInternalRating(externalRating);
    }
  }, [externalRating]);

  // Determine which rating to display
  const displayRating =
    externalRating !== undefined ? externalRating : internalRating;

  const handleClick = (index) => {
    if (readOnly) return;
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = hover
          ? starValue <= hover
          : starValue <= displayRating;
        return (
          <Star
            key={i}
            size={size}
            filled={isFilled}
            hovered={hover === starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={readOnly ? undefined : () => setHover(starValue)}
            onMouseLeave={readOnly ? undefined : () => setHover(null)}
            readOnly={readOnly}
          />
        );
      })}
    </div>
  );
}
