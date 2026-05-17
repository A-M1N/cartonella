import AboutSection from "../ui/Sections/AboutUs/AboutSection";

import img1 from "../data/about/5.jpg";
import img2 from "../data/about/6.jpg";
import img3 from "../data/about/4.png";
import img4 from "../data/about/7.jpg";

function AboutUs() {
  return (
    <>
      <AboutSection
        title="Who We Are"
        text="Cartonella is a modern ecommerce platform built to deliver quality, speed, and style. We believe shopping should feel effortless and inspiring."
        image={img1}
        bg="black"
      />

      <AboutSection
        title="Designed for the Future"
        text="From gaming gear to fashion and tech, Cartonella blends performance with aesthetics, ensuring every product meets modern expectations."
        image={img2}
        bg="white"
        reverse
      />

      <AboutSection
        title="Technology at Our Core"
        text="Built using modern web technologies, Cartonella focuses on speed, security, and scalability to give users a seamless experience."
        image={img3}
        bg="black"
      />

      <AboutSection
        title="More Than Just Shopping"
        text="We’re building a brand, a community, and a digital space where innovation meets trust."
        image={img4}
        bg="white"
        reverse
      />
    </>
  );
}

export default AboutUs;
