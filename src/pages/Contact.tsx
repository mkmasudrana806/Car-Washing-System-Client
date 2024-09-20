import { Input } from "antd";
import "../styles/contact.css";
import TextArea from "antd/es/input/TextArea";

const Contact = () => {
  return (
    <div className="contact_us_green">
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        Get in touch
      </h1>
      <div className="responsive-container-block big-container">
        <div className="responsive-container-block container">
          <div
            className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line"
            id="i69b-2"
          >
            <form className="form-box">
              <div className="container-block form-wrapper">
                <div className="head-text-box">
                  <p className="text-blk contactus-head">Contact us</p>
                  <p className="text-blk contactus-subhead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna al
                    iqua. Ut enim
                  </p>
                </div>
                <div className="responsive-container-block">
                  <div
                    className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6"
                    id="i10mt-6"
                  >
                    <p className="text-blk input-title">First Name</p>
                    <Input type="text" name="FirstName" />
                  </div>
                  <div className="responsive-cell-block last-name wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                    <p className="text-blk input-title">Last Name</p>
                    <Input type="text" name="LastName" />
                  </div>
                  <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                    <p className="text-blk input-title">Email</p>
                    <Input type="email" name="Email" />
                  </div>
                  <div className="responsive-cell-block last-name wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                    <p className="text-blk input-title">Phone Number</p>
                    <Input type="number" name="PhoneNumber" />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i634i-6"
                  >
                    <p className="text-blk input-title">
                      What do you have in your mind?
                    </p>
                    <TextArea
                      rows={10}
                      placeholder="Please enter query..."
                    ></TextArea>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <button className="submit-btn">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div
            className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10"
            id="ifgi"
          >
            <div className="container-box">
              <div className="text-content">
                <p className="text-blk contactus-head">Contact us</p>
                <p className="text-blk contactus-subhead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna al
                  iqua. Ut enim
                </p>
              </div>
              <div className="workik-contact-bigbox">
                <div className="workik-contact-box">
                  <div className="phone text-box">
                    <img
                      className="contact-svg"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg"
                    />
                    <p className="contact-text">+1258 3258 5679</p>
                  </div>
                  <div className="address text-box">
                    <img
                      className="contact-svg"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg"
                    />
                    <p className="contact-text">turboshine@gmail.com</p>
                  </div>
                  <div className="mail text-box">
                    <img
                      className="contact-svg"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg"
                    />
                    <p className="contact-text">102 street,dhaka</p>
                  </div>
                </div>
                <div className="social-media-links">
                  <a href="">
                    <img
                      className="social-svg"
                      id="is9ym"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"
                    />
                  </a>
                  <a href="">
                    <img
                      className="social-svg"
                      id="i706n"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg"
                    />
                  </a>
                  <a href="">
                    <img
                      className="social-svg"
                      id="ib9ve"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"
                    />
                  </a>
                  <a href="">
                    <img
                      className="social-svg"
                      id="ie9fx"
                      src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
