import styled from "styled-components";
import demoImg from "../../assets/images/companyTeam.jpg";
import { Button, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useGetUserProfileQuery } from "../../redux/features/users/userApi";
import { useEffect } from "react";
import { loadUserProfile } from "../../redux/features/users/userSlice";
import { useMakeAnBookingMutation } from "../../redux/features/bookings/bookingApi";
import { loadStripe } from "@stripe/stripe-js";
import { SerializedError } from "@reduxjs/toolkit";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// ---------- service details carts component
const BookingPage = () => {
  // redux
  const currentBooking = useAppSelector(
    (state) => state.bookings.currentBooking
  );
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.profile);
  const [makeAnBooking] = useMakeAnBookingMutation();

  // react
  const [form] = Form.useForm();

  // load user profile to store
  useEffect(() => {
    if (userProfile) {
      dispatch(loadUserProfile(userProfile.data));
      if (user) {
        form.setFieldsValue({
          name: `${user?.name?.firstName} ${user?.name?.lastName} ( ${user?.name?.middleName} )`,
          email: user?.email,
          selectedTime: `${currentBooking?.slot?.startTime} - ${currentBooking?.slot?.endTime}`,
          vehicleType: "car",
          vehicleBrand: "car",
          vehicleModel: "car",
          manufacturingYear: "324234",
          registrationPlate: "car",
        });
      }
    }
  }, [userProfile, form, user, dispatch, currentBooking?.slot]);

  // ---------- handle pay now button ----------------------
  const handlePayNow = async (values: any) => {
    const stripe = await loadStripe(
      import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
    );

    // make a new booking object
    const newBooking = {
      slot: currentBooking?.slot?._id,
      service: currentBooking?.slot?.service,
      vehicleInfo: {
        vehicleType: values.vehicleType,
        vehicleBrand: values.vehicleBrand,
        vehicleModel: values.vehicleModel,
        manufacturingYear: Number(values.manufacturingYear),
        registrationPlate: values.registrationPlate,
      },
      amount: currentBooking?.amount,
    };

    const session = await makeAnBooking(newBooking);
    // Check if the response is an error
    if ((session as SerializedError).message) {
      // Handle the error case
      message.error(
        (session as SerializedError).message || "Something went wrong"
      );
    } else if ("data" in session) {
      // Handle the successful case
      stripe?.redirectToCheckout({
        sessionId: session.data.data,
      });
    } else {
      message.error("Unexpected response format");
    }
  };
  return (
    <BookingPageContainer>
      {/* service image  */}
      <div className="service-img-container">
        <img src={demoImg} alt="" />
        <TimeSlot className="featured-btn">
          {currentBooking?.slot?.startTime} - {currentBooking?.slot?.endTime}
        </TimeSlot>
      </div>
      {/* Service information  */}
      <div className="service-info">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={handlePayNow}
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
          <Form.Item name="selectedTime" label="Selected time">
            <Input readOnly />
          </Form.Item>
          {/* vehicleType */}
          <Form.Item
            name="vehicleType"
            label="Vehicle type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* vehicleBrand */}
          <Form.Item
            name="vehicleBrand"
            label="Vehicle brand"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* vehicleModel */}
          <Form.Item
            name="vehicleModel"
            label="Vehicle model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* manufacturalYear */}
          <Form.Item
            name="manufacturingYear"
            label="Manufacturing year"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          {/* registrationPlate*/}
          <Form.Item
            name="registrationPlate"
            label="Fegistration plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div className="paynow-btn">
              <Button htmlType="submit" shape="round" type="primary">
                Pay Now
              </Button>
            </div>
          </Form.Item>
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
    max-height: 500px;
    object-fit: cover;
    overflow: hidden;
  }
  .service-img-container,
  .service-info {
    width: 50%;
    height: 100%;
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
