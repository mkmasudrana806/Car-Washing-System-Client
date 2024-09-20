import Register from "./Register";
import Login from "./Login";
import "../styles/login.css";
import BackImg from "../assets/images/backImg.jpg";
import FrontImg from "../assets/images/frontImg.jpg";

const AuthContainer = () => {
  return (
    <div className="login-form">
      <div className="login-container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src={FrontImg} alt="" />
            <div className="text">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src={BackImg} alt="" />
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <Login />
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
