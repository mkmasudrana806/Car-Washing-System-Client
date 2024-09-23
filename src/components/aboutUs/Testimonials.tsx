// export default Testimonials;
import { Card, Avatar, Typography, Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
const { Title, Paragraph } = Typography;
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import styled from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Olivia Wilson",
    feedback:
      "The fitness equipment I bought from here has been fantastic! It’s durable and has really improved my workouts.",
    rating: 5,
    imageUrl:
      "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2015/10/cable-crossover-content-chest-pec.jpg?w=1300&h=731&crop=1&quality=86&strip=all",
  },
  {
    id: 2,
    name: "Liam Johnson",
    feedback:
      "Great quality services and the customer service was top-notch. Highly recommend for anyone serious about fitness.",
    rating: 4,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9TPf969-KugRbgV6ZVrTCuciNZJg8uAozA&s",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    feedback:
      "I’m impressed by the variety of accessories available. The delivery was quick, and everything arrived in perfect condition.",
    rating: 5,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3blk49J3qSVZ0PqeYVZBDn-o6V1Z1T_-BMw&s",
  },
  {
    id: 4,
    name: "Ethan Brown",
    feedback:
      "Good value for money. The equipment is sturdy and easy to assemble. Will definitely buy again in the future.",
    rating: 4,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ91vPlsPHonLfUle6axGfJYi00WPquxTi_EQ&s",
  },
];

const Testimonials = () => {
  return (
    <CustomersFeedback>
      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
        Our Valuable Customers Feedback
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {testimonials.map((member, index) => (
          <SwiperSlide key={index}>
            <CardContainer>
              {/* Avatar with Instagram-like gradient border */}
              <CustomAvatar size={70} src={member.imageUrl} />

              {/* Card body */}
              <CardBody>
                <Title level={4} style={{ marginTop: "10px" }}>
                  {member.name}
                </Title>
                <Paragraph style={{ fontSize: "1rem" }}>
                  {member.feedback}
                </Paragraph>
                <Rate disabled defaultValue={member.rating} />
              </CardBody>
            </CardContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomersFeedback>
  );
};

export default Testimonials;

// customer feedback
const CustomersFeedback = styled.div`
  margin-top: 64px;
  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
`;

// custom avatar
const CustomAvatar = styled(Avatar)`
  position: absolute;
  top: 0px; // This moves half of the avatar above the card
  border: 4px solid transparent;
  border-radius: 50%;
  background: linear-gradient(white, white),
    radial-gradient(
      circle at 30% 107%,
      #fddd97,
      #f1e20b,
      #fd5949,
      #d6249f,
      #285aeb
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  z-index: 2;
`;

// card body
const CardBody = styled(Card)`
  width: 300;
  margin-top: 32px;
  padding-top: 16px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// cart container
const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
`;
