// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import BannerOne from "./BannerOne";
import BannerTwo from "./BannerTwo";
import BannerThree from "./BannerThree";
import { Autoplay } from "swiper/modules";

export default function Banner() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerOne />
        </SwiperSlide>
        <SwiperSlide>
          <BannerTwo />
        </SwiperSlide>
        <SwiperSlide>
          <BannerThree />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
