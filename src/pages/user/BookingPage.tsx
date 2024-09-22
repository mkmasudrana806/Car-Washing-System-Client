import styled from "styled-components";
import demoImg from "../../assets/images/companyTeam.jpg";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { useGetUserProfileQuery } from "../../redux/features/users/userApi";
import { useEffect } from "react";
import { loadUserProfile } from "../../redux/features/users/userSlice";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// ---------- service details carts component
const BookingPage = () => {
  // redux
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.profile);

  // react
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // load user profile to store
  useEffect(() => {
    if (userProfile) {
      dispatch(loadUserProfile(userProfile.data));
      if (user) {
        form.setFieldsValue({
          name: `${user?.name?.firstName} ${user?.name?.middleName} ${user?.name?.lastName}`,
          email: user?.email,
          contact: user?.contact,
        });
      }
    }
  }, [userProfile, form, user, dispatch]);

  // handle pay now button
  const handlePayNow = () => {
    navigate("/user/purchase-success");
  };
  return (
    <BookingPageContainer>
      {/* service image  */}
      <div className="service-img-container">
        <img src={demoImg} alt="" />
        <TimeSlot className="featured-btn">07-10</TimeSlot>
      </div>
      {/* Service information  */}
      <div className="service-info">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          {/* name field */}
          <Form.Item name="name" label="Name">
            <Input readOnly />
          </Form.Item>
          {/* email field */}
          <Form.Item name="email" label="Email">
            <Input readOnly />
          </Form.Item>
          {/* selected time */}
          <Form.Item name="contact" label="Selected time">
            <Input readOnly />
          </Form.Item>
          <div className="paynow-btn">
            <Button onClick={handlePayNow} shape="round" type="primary">
              Pay Now
            </Button>
          </div>
        </Form>
      </div>
    </BookingPageContainer>
  );
};

export default BookingPage;

// Service details
const BookingPageContainer = styled.div`
  margin-top: 48px;
  margin-bottom: 16px;
  width: 100%;
  display: flex;

  gap: 16px;
  .service-img-container {
    position: relative;
    max-height: 300px;
    object-fit: cover;
    overflow: hidden;
  }
  .service-img-container,
  .service-info {
    width: 50%;
  }
  .paynow-btn {
    display: flex;
    justify-content: end;
  }
  img {
    width: 100%;
  }
  // media query 768px
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .service-img-container,
    .service-info {
      width: 100%;
    }
  }
`;

// time slot
const TimeSlot = styled.button`
  background-image: linear-gradient(
    to right,
    #ff512f 0%,
    #ee8c03 51%,
    #ff512f 100%
  );
  border: none;
  padding: 3px 20px;
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
`;
