import { Avatar, Typography } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    id: 1,
    name: "Alice Carter",
    role: "Founder & CEO",
    bio: "Alice founded the company with a mission to revolutionize fitness equipment through innovation and sustainability.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPRNouJ5gxblrmGu5GpuAYf6MwpMLsVMOoEQ&s",
  },
  {
    id: 2,
    name: "Mark Robinson",
    role: "Chief Operations Officer",
    bio: "Mark oversees all operational aspects, ensuring efficiency in product manufacturing and supply chain management.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLORw7E9D2b5jEwa391u7J_es0YNDxS3u2OA&s",
  },
  {
    id: 3,
    name: "Emily Walker",
    role: "Head of Product Development",
    bio: "Emily leads the product team, focusing on research and development of innovative fitness solutions.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnuY_Yq40a4u9EIlX-vowqDvot8r8tyafGXA&s",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Chief Marketing Officer",
    bio: "David is responsible for driving the company’s brand strategy and customer engagement across all platforms.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx6I830MoGniE-WiL6H9yrReTtHZU4h6TzUQ&s",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Sales Director",
    bio: "Jessica manages the global sales team, ensuring the company's products reach customers worldwide.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvYhgm3mp2kIS2xb2VAKrXatPN5gzFohsgRA&s",
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Customer Support Manager",
    bio: "Michael ensures top-notch customer support, helping clients with product inquiries and after-sales service.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf4751We0FwJoCh-lrcM0zGZO4LyvvHH19A&s",
  },
];

const TeamIntroduction = () => {
  return (
    <TeamIdentity>
      <h1
        style={{
          textAlign: "center",
          margin: "64px 0px 32px 0px",
          fontSize: "2rem",
        }}
      >
        Our Teams
      </h1>

      <Swiper
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          // when window width is >= 480px
          670: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          // when window width is >= 992px
          892: {
            slidesPerView: 3,
          },
          // when window width is >= 1170px
          1170: {
            slidesPerView: 4,
          },
        }}
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide style={{ padding: "16px" }} key={index}>
            <TeamCart>
              <Avatar size={80} src={member.avatarUrl} />
              <Title level={3} style={{ marginTop: "10px" }}>
                {member.name}
              </Title>
              <Paragraph>{member.role}</Paragraph>
              <Paragraph style={{ fontSize: "1rem" }}>{member.bio}</Paragraph>
            </TeamCart>
          </SwiperSlide>
        ))}
      </Swiper>
    </TeamIdentity>
  );
};

export default TeamIntroduction;

// team cart
const TeamCart = styled.div`
  text-align: "center";
  border: 1px solid rgba(3, 3, 3, 0.122);
  padding: 16px;
`;

// team identification
const TeamIdentity = styled.div`
  padding: 0px 4px;
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
