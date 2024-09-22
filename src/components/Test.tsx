import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { TService } from "../types/serviceTypes";
import demoImg from "../assets/images/companyTeam.jpg";
import { useState } from "react";
import { Button, Calendar, Card, message, Row, Col, DatePicker } from "antd";
import moment from "moment";

// List of available time slots
const timeSlots = [
  { _id: 1, time: "08-12", booked: false },
  { _id: 2, time: "12-16", booked: true },
  { _id: 3, time: "16-20", booked: false },
];

const Test = () => {
  // ---------- redux
  const dispatch = useAppDispatch();

  // --------- react
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Disable past dates
  const disabledDate = (current: moment.Moment) => {
    return current && current < moment().endOf("day");
  };

  // Date selection handler
  const handleDateChange = (date: moment.Moment | null) => {
    if (date) {
      setSelectedDate(date);
      message.info(`Selected Date: ${date.format("YYYY-MM-DD")}`);
    }
  };

  // Time slot selection handler
  const handleSlotSelect = (slot: any) => {
    if (!slot.booked) {
      setSelectedSlot(slot);
      message.success(`Selected Slot: ${slot.time}`);
    }
  };

  // Book service handler
  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      message.success(
        `Service booked on ${selectedDate.format("YYYY-MM-DD")} during ${
          selectedSlot.time
        }`
      );
    } else {
      message.error("Please select a date and time slot.");
    }
  };
  // ---------- handle add to cart service
  const handleAddToCart = (service: TService) => {
    const cartIitem = {
      _id: service._id,
      name: service.name,
      serviceImgUrl: service.serviceImgUrl,
      price: service.price,
    };
  };

  // ---------- handle buy service
  const handleBuyService = (service: TService) => {
    const cartIitem = {
      _id: service._id,
      name: service.name,
      serviceImgUrl: service.serviceImgUrl,
      price: service.price,
    };

    message.success("service added");
    navigate("/user/carts");
  };
  return (
    <ServiceContainer>
      <ServiceDetails>
        {/* service image  */}
        <div className="service-img-container">
          <img src={demoImg} alt="" />
        </div>
        {/* Service information  */}
        <ServiceInfo className="service-info">
          <h2>Service Name</h2>

          {/* DatePicker Section */}

          <DatePicker
            value={selectedDate}
            disabledDate={disabledDate}
            onChange={handleDateChange}
            style={{ width: "100%", marginTop: "16px" }}
          />

          {/* Time Slots Section */}
          <Card style={{ marginTop: "16px" }} title="Select a Time Slot">
            <Row gutter={[8]}>
              {timeSlots.map((slot) => (
                <Col key={slot._id} >
                  <Button
                    
                    disabled={slot.booked}
                    onClick={() => handleSlotSelect(slot)}
                    style={{
                      backgroundColor:
                        selectedSlot?._id === slot._id ? "#1890ff" : "#f0f0f0",
                      color: slot.booked ? "#d9d9d9" : "#000",
                    }}
                  >
                    {slot.time}
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Booking Button */}
          <Button
            type="primary"
            shape="round"
            onClick={handleBooking}
            style={{ marginTop: "20px" }}
          >
            Book This Service
          </Button>
        </ServiceInfo>
      </ServiceDetails>
      <div className="service-description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
        similique. Facere explicabo architecto inventore esse atque asperiores
        incidunt, perferendis accusamus?
      </div>
    </ServiceContainer>
  );
};

export default Test;

// Service details
const ServiceContainer = styled.div`
  margin-top: 16px;
`;

// Service details
const ServiceDetails = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  .service-img-container {
    max-height: 400px;
    object-fit: cover;
    overflow: hidden;
  }
  .service-img-container,
  .service-info {
    width: 50%;
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
  @media screen and (min-width: 769px) and (max-width: 869px) {
    .service-info {
      .service-title {
        font-size: 1.5rem;
      }
      .service-price {
        font-size: 1.2rem;
      }
    }
  }
`;

// Service info
const ServiceInfo = styled.div`
  .service-title {
    font-size: 2rem;
  }
  .service-category {
    cursor: pointer;
    &:hover {
      color: tomato;
    }
  }
`;
