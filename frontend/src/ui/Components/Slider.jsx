import { useState, useRef, useEffect, useCallback } from "react";
import styles from "../Components/Slider.module.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { RiPokerDiamondsLine, RiPokerDiamondsFill } from "react-icons/ri";

export default function Slider({
  slides,
  currentIndex: controlledIndex,
  setCurrentIndex: controlledSetter,
  variant = "default",
  autoPlay = false,
  autoPlayInterval = 4000,
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(false);

  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  const isControlled =
    controlledIndex !== undefined && controlledSetter !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;
  const setCurrentIndex = isControlled ? controlledSetter : setInternalIndex;

  const nextSlide = useCallback(() => {
    setCurrentIndex((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length, setCurrentIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  }, [slides.length, setCurrentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    };
    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };

    startAutoPlay();

    // Pause on hover (desktop)
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("mouseenter", stopAutoPlay);
      slider.addEventListener("mouseleave", startAutoPlay);
    }

    return () => {
      stopAutoPlay();
      if (slider) {
        slider.removeEventListener("mouseenter", stopAutoPlay);
        slider.removeEventListener("mouseleave", startAutoPlay);
      }
    };
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setTranslateX(0);

    // Pause auto-play while touching
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Touch Move
  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  // Touch End
  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = 50; // Minimum swipe distance

    if (translateX > threshold) {
      prevSlide(); // Swipe right → previous
    } else if (translateX < -threshold) {
      nextSlide(); // Swipe left → next
    }

    setTranslateX(0);

    // Resume auto-play
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  };

  // Mouse drag support (for desktop testing)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setTranslateX(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = 50;

    if (translateX > threshold) {
      prevSlide();
    } else if (translateX < -threshold) {
      nextSlide();
    }

    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("keydown", handleKeyDown);
      return () => slider.removeEventListener("keydown", handleKeyDown);
    }
  }, [nextSlide, prevSlide]);

  // Calculate transform
  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    if (isDragging && sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const dragPercent = (translateX / containerWidth) * 100;
      return `translateX(${baseTransform + dragPercent}%)`;
    }
    return `translateX(${baseTransform}%)`;
  };

  // Variant class
  const getVariantClass = () => {
    switch (variant) {
      case "hero":
        return styles.heroVariant;
      case "product":
        return styles.productVariant;
      default:
        return "";
    }
  };

  return (
    <div
      ref={sliderRef}
      className={`${styles.sliderContainer} ${getVariantClass()}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="region"
    >
      <div
        className={styles.sliderWrapper}
        style={{
          transform: getTransform(),
          transition: isDragging ? "none" : "transform 0.4s ease-out",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <img
              className={styles.slideImg}
              src={slide.url}
              title={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />

            {variant === "hero" && slide.title && (
              <div className={styles.slideContent}>
                {slide.cta && (
                  <button className={styles.slideCta}>{slide.cta}</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className={`${styles.arrowBtn} ${styles.leftBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <FaArrowLeftLong />
      </button>
      <button
        className={`${styles.arrowBtn} ${styles.rightBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
      >
        <FaArrowRightLong />
      </button>

      <div className={styles.dotsContainer}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dotBtn} ${i === currentIndex ? styles.dotActive : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
          >
            {i === currentIndex ? (
              <RiPokerDiamondsFill className={styles.activeDot} />
            ) : (
              <RiPokerDiamondsLine className={styles.baseDot} />
            )}
          </button>
        ))}
      </div>
      {/* Slide Counter (optional, good for product galleries) */}
      {variant === "product" && (
        <div className={styles.slideCounter}>
          {currentIndex + 1} / {slides.length}
        </div>
      )}
    </div>
  );
}
