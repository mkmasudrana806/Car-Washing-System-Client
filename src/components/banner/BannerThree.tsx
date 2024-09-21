import styled from "styled-components";
import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
const overlayStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "99%",
  background:
    "linear-gradient(to right, rgba(0, 0, 0, 0.719), rgba(0, 0, 0, 0))",
  zIndex: 1,
};

// banner three
const BannerThree = () => {
  return (
    <BannerSection>
      <BannerImg>
        <img
          src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3dhc2gtY2FyLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fSwidG9Gb3JtYXQiOiJhdmlmIn19"
          alt=""
        />
      </BannerImg>
      <div className="hero-overlay" style={overlayStyle}></div>
      <HeroContent>
        <h1 className="slide">
          <span>Clean Car, Happy You!</span>
        </h1>
        <h2 className="sign-painted">Schedule Your Wash Now!</h2>
        <p>
          Feel the joy of driving a spotless car by scheduling your wash today.
        </p>
        <NavLink to={"/products"}>
          {" "}
          <ShopNowBtn className="book-btn">Book Now</ShopNowBtn>
        </NavLink>
      </HeroContent>
    </BannerSection>
  );
};

export default BannerThree;

// banner section
const BannerSection = styled.div`
  width: 100%;
  margin-top: 16px;
  position: relative;
`;

// const banner image container
const BannerImg = styled.div`
  height: 100vh;
  overflow: hidden;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// here content
const HeroContent = styled.div`
  min-width: 350px;
  max-width: 600px;
  font-family: "HelveticaNeue-Bold";
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-10%, -50%);
  z-index: 2;

  // slide
  .slide {
    span {
      font-size: 3rem;
      display: inline-block;
      background: white -webkit-gradient(
          linear,
          left top,
          right top,
          from(white),
          to(white),
          color-stop(0.5, tomato)
        ) 0 0 no-repeat;
      -webkit-background-size: 125px 100%;
      background-size: 125px 100%;
      color: rgba(255, 255, 255, 0.1);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-animation: shine 2s infinite;
      animation: shine 2s infinite;
    }
    @-webkit-keyframes shine {
      0% {
        background-position: top left;
      }
      100% {
        background-position: top right;
      }
    }

    @keyframes shine {
      0% {
        background-position: top left;
      }
      100% {
        background-position: top right;
      }
    }
  }

  // sign painted
  .sign-painted {
    margin-top: 32px;
    font-size: 5rem;
    line-height: 1;
    font-family: Rancho;
    color: #e9e9e9;
    font-weight: bold;
    text-shadow: 0.02em 0.03em tomato, 0.05em 0.06em #1ba29a;
  }

  // outlined animated
  .outlined-3d {
    margin-top: 32px;
    text-shadow: 2px 3px 3px #6e6e6e;
    letter-spacing: -2px;
    -webkit-text-stroke: 1px white;
    font-size: 3.7rem;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottombottom,
      from(black),
      color-stop(50%, transparent),
      to(black)
    );
    mask-image: -webkit-gradient(
      linear,
      left top,
      left bottombottom,
      from(black),
      color-stop(50%, transparent),
      to(black)
    );
  }

  p {
    margin-top: 16px;
    color: white;
    font-size: 1.2rem;
  }
  @media screen and (min-width: 324px) and (max-width: 769px) {
    .slide {
      span {
        font-size: 2rem;
      }
    }
    .sign-painted {
      margin-top: 16px;
      font-size: 2.5rem;
    }
    .outlined-3d {
      font-size: 2rem;
      margin-top: 16px;
    }
    .book-btn {
      margin-top: 16px;
    }
  }
`;

// show now button
const ShopNowBtn = styled.div`
  margin-top: 32px;
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ff6347d5;
    border-radius: 10rem;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #ff4727;
    transition: all 0.3s;
    border-radius: 10rem;
    z-index: -1;
  }
  &:hover {
    color: #fff;
  }
  &:hover:before {
    width: 100%;
  }
`;
