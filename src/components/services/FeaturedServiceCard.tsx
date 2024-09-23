import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TService } from "../../types/serviceTypes";

type Props = {
  service: TService;
};

const FeaturedServiceCard: React.FC<Props> = ({ service }) => {
  return (
    <ServiceCardContainer className="service">
      <div className="img-container">
        <img src={service?.serviceImgUrl} alt="" />
      </div>
      <div className="info">
        <NavLink to={`/services/${service?._id}`} className="name">
          {service?.name}
        </NavLink>
        <NavLink to={`/services/${service?._id}`} className="title">
          {service?.description}
        </NavLink>
      </div>
      {service?.featured && (
        <FeaturedButton className="featured-btn">Featured</FeaturedButton>
      )}
    </ServiceCardContainer>
  );
};

export default FeaturedServiceCard;

// service container
const ServiceCardContainer = styled.div`
  position: relative;
  max-width: 300px;
  min-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  text-align: center;
  min-height: 350px;
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
    .name {
      font-weight: 600;
      &:hover {
        text-decoration: underline;
        color: #ff8069;
      }
    }
    .title {
      font-size: 1.2rem;
      display: -webkit-box;
      -webkit-line-clamp: 4; /* Number of lines */
      line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
        color: #ff8069;
      }
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
