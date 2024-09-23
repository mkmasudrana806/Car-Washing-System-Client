import styled from "styled-components";

import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import FeaturedServiceCard from "./FeaturedServiceCard";
import { TService } from "../../types/serviceTypes";

type Props = {
  services: TService[];
};

const FeaturedServices: React.FC<Props> = ({ services }) => {
  return (
    <FeaturedService>
      <div className="container-title">
        <h1>Featured Services</h1>
        <NavLink to={"/services"}>
          <Button icon={<ArrowRightOutlined />} iconPosition={"end"}>
            More
          </Button>
        </NavLink>
      </div>
      <Swiper
        style={{ padding: "4px" }}
        spaceBetween={16}
        slidesPerView={1}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {services?.length > 0 &&
          services.slice(0, 7).map(
            (service) =>
              service?.featured && (
                <SwiperSlide
                  key={service?._id}
                  style={{
                    minWidth: "300px",
                    maxWidth: "300px",
                    height: "fit-content",
                  }}
                >
                  <FeaturedServiceCard key={service._id} service={service} />
                </SwiperSlide>
              )
          )}
      </Swiper>
    </FeaturedService>
  );
};

export default FeaturedServices;

const FeaturedService = styled.div`
  margin-top: 48px;
  .container-title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 2.5rem;
    }
  }
  .services-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
`;
