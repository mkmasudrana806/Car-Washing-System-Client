import { ClockCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TService } from "../../types/serviceTypes";
import { Tag } from "antd";

const ServiceCard = ({ service }: { service: TService }) => {
  const { _id, description, duration, name, price, featured, serviceImgUrl } =
    service;
  return (
    <ServiceCardContainer className="service">
      <div className="img-container">
        <img src={serviceImgUrl} alt="" />
      </div>
      <div className="info">
        <NavLink to={`/services/${_id}`} className="category">
          {name}
        </NavLink>
        <NavLink to={`/services/${_id}`} className="title">
          {description}
        </NavLink>
        <div className="service-cart-footer">
          <h1 style={{ color: "tomato", marginBottom: "4px" }}>${price}</h1>
          <Tag icon={<ClockCircleOutlined />} color="default">
            {duration} min
          </Tag>
        </div>
      </div>
      {featured && (
        <FeaturedButton className="featured-btn">Featured</FeaturedButton>
      )}
    </ServiceCardContainer>
  );
};

export default ServiceCard;

// service container
const ServiceCardContainer = styled.div`
  position: relative;
  max-width: 300px;
  min-width: 250px;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  .img-container {
    width: 100%;
    overflow: hidden;
    height: 200px;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .info {
    padding: 10px;
    .category {
      font-weight: 600;
      &:hover {
        text-decoration: underline;
        color: #ff8069;
      }
    }
    .title {
      font-size: 1.3rem;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Number of lines */
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
        color: #ff8069;
      }
    }
    .service-cart-footer {
      position: absolute;
      width: 95%;
      bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

// featured button
const FeaturedButton = styled.button`
  background-image: linear-gradient(
    to right,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
  border: none;
  padding: 3px 5px;
  font-size: 12px;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-position: left center; /* Initial position */

  /* Infinite animation for gradient movement */
  @keyframes gradientShift {
    0% {
      background-position: left center;
    }
    50% {
      background-position: right center;
    }
    100% {
      background-position: left center;
    }
  }

  /* Applying infinite animation */
  animation: gradientShift 1s ease infinite;
`;
