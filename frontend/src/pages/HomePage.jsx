import BestSelling from "../ui/Sections/Home/BestSelling";
import Categories from "../ui/Sections/Home/Categories";
import DealsSection from "../ui/Sections/Home/DealsSection";
import MainHero from "../ui/Sections/Home/MainHero";
import NewArrival from "../ui/Sections/Home/NewArrival";
import NewsLetter from "../ui/Sections/Home/NewsLetter";
import OurProducts from "../ui/Sections/Home/OurProducts";
import SliderSection from "../ui/Sections/Home/SliderSection";
import TopBrands from "../ui/Sections/Home/TopBrands";
import WhyChooseUs from "../ui/Sections/Home/WhyChooseUs";
import styles from "../pages/HomePage.module.css";

function HomePage() {
  return (
    <>
      <SliderSection />
      <MainHero />
      <DealsSection />
      <Categories />
      <BestSelling />
      <TopBrands />
      <OurProducts />
      <NewArrival />
      <WhyChooseUs />
      <NewsLetter />
    </>
  );
}

export default HomePage;
