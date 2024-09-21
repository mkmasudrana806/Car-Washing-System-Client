import { NavLink } from "react-router-dom";
import styled from "styled-components";
import demoImg from "../../assets/images/frontImg.jpg";

const FeaturedServiceCard = () => {
  const featured = true;
  return (
    <ProductCardContainer className="product">
      <div className="img-container">
        <img src={demoImg} alt="" />
      </div>
      <div className="info">
        <NavLink to={`/services?category=${"pro"}`} className="category">
          category of service
        </NavLink>
        <NavLink to={`/service/${"_id"}`} className="title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          rerum est porro officia nam fugiat ipsa sit quos officiis facere.
        </NavLink>
      </div>
      {featured && (
        <FeaturedButton className="featured-btn">Featured</FeaturedButton>
      )}
    </ProductCardContainer>
  );
};

export default FeaturedServiceCard;

// product container
const ProductCardContainer = styled.div`
  position: relative;
  max-width: 300px;
  min-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  text-align: center;
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
