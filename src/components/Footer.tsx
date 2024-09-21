import { Button, Input } from "antd";
import {
  FacebookFilled,
  LinkedinFilled,
  GithubFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>Info</h4>
          <ul className="links">
            <li>
              <NavLink to={"/about-us"}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={"/about-us#feedback"}>Customer's Feedback</NavLink>
            </li>
            <li>
              <NavLink to={"/about-us#contact"}>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>services</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="links">
            <li>
              <NavLink to={"/services"}>Featured Services</NavLink>
            </li>
            <li>
              <NavLink to={"/popular-reviews"}>Popular Reviews</NavLink>
            </li>
            <li>
              <NavLink to={"/special-offers"}>Special Offers</NavLink>
            </li>
            <li>
              <NavLink to={"/upcomming-services"}>Up Comming Services</NavLink>
            </li>
            <li>
              <NavLink to={"/payment-methods"}>Payment Methods</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="links">
            <li>
              <NavLink to={"/customer-agreement"}>Customer Agreement</NavLink>
            </li>
            <li>
              <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to={"/gdpr"}>GDPR</NavLink>
            </li>
            <li>
              <NavLink to={"/security"}>Security</NavLink>
            </li>
            <li>
              <NavLink to={"/terms-and-conditions"}>Terms & Conditions</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose of news, updates,
            helpful tips, and exclusive offers.
          </p>
          <form action="#">
            <Input placeholder="Your email address" />
            <Button type="primary">Subscribe</Button>
          </form>
          <div className="icons">
            <FacebookFilled />
            <GithubFilled />
            <LinkedinFilled />
            <TwitterOutlined />
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "20px " }}>
        © {new Date().getFullYear()} TurboShine. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
