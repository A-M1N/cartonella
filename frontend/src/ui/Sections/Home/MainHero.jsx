import { useCollection } from "../../../hooks/useCollection";
import style from "../Home/MainHero.module.css";
import Card from "../../Components/Card";
import gamingFallback from "../../../data/gaming.png";
import clothesFallback from "../../../data/2.jpg";

import electronicsFallback from "../../../data/electronics.jpg";
import toysFallback from "../../../data/toy.png";

const API_URL = "http://localhost:5000";

const fallbackImages = {
  gaming: gamingFallback,
  electronics: electronicsFallback,
  fashion: clothesFallback,
  toys: toysFallback,
};

function MainHero() {
  const { data: collections, isLoading, error } = useCollection();

  if (isLoading) {
    return (
      <section className={style.heroSectionContainer}>
        <div className={style.cardsWrapper}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={style.cardSkeleton}>
              <div className={style.skeletonPulse} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error || !collections || collections.length === 0) {
    const fallbackCategories = [
      {
        slug: "video-games",
        image: gamingFallback,
        label: "BESTSELLER",
        name: "GAMING",
        titleColor: "white",
        labelColor: "red",
      },
      {
        slug: "electronics",
        name: "TECHNOLOGY",
        image: electronicsFallback,
        label: "PROMO",
        titleColor: "white",
        labelColor: "black",
      },
      {
        slug: "fashion",
        name: "Fashion",
        image: clothesFallback,
        label: "DISCOUNTS",
        titleColor: "black",
        labelColor: "#5170ff",
      },
      {
        slug: "toys",
        name: "TOYS",
        image: toysFallback,
        label: "PROMO",
        titleColor: "white",
        labelColor: "#D54202",
      },
    ];
    return (
      <section className={style.heroSectionContainer}>
        <div className={style.cardsWrapper}>
          {fallbackCategories.map((category) => (
            <Card
              key={category.slug}
              bgImage={category.image}
              label={category.label}
              title={category.name}
              titleColor={category.titleColor}
              labelColor={category.labelColor}
              slug={category.slug}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={style.heroSectionContainer}>
      <div className={style.cardsWrapper}>
        {collections.map((collection) => {
          const bgImage = collection.image
            ? collection.image.startsWith("http")
              ? collection.image
              : `${API_URL}${collection.image}`
            : fallbackImages[collection.slug] || fallbackImages.gaming;

          return (
            <Card
              key={collection.id}
              bgImage={bgImage}
              label={collection.label || "NEW"}
              title={collection.name.toUpperCase()}
              titleColor={collection.titleColor || "white"}
              labelColor={collection.labelColor || "#5170ff"}
              slug={collection.slug}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MainHero;
