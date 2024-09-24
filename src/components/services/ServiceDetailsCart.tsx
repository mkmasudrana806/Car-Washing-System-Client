import styled from "styled-components";
import { Button, Card, Col, DatePicker, message, Row, Tag } from "antd";
import { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { TService } from "../../types/serviceTypes";
import { TSlot } from "../../types/slotTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentBooking } from "../../redux/features/bookings/bookingSlice";

type Props = {
  serviceInfo: TService & { slots: TSlot[] };
};
// ---------- service details carts component
const ServiceDetailsCart: React.FC<Props> = ({ serviceInfo }) => {
  // ---------- redux
  const dispatch = useDispatch();
  // --------- react
  const { slots, ...service } = serviceInfo;
  const navigate = useNavigate();
  const { duration, description, name, serviceImgUrl } = service as TService;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  // Filter slots based on the selected date
  const filteredSlots = slots.filter((slot) => {
    if (!selectedDate) return false;
    return slot.date === selectedDate.format("YYYY-MM-DD");
  });

  // Disable past dates
  const disabledDate = (current: Dayjs) => {
    return current < dayjs().startOf("day");
  };

  // Date selection handler
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  // Time slot selection handler
  const handleSlotSelect = (slot: TSlot) => {
    setSelectedSlot(slot);
    message.success(`Selected slot: ${slot.startTime}-${slot.endTime}`, 1);
  };

  // Book service handler
  const handleBooking = () => {
    dispatch(setCurrentBooking({ slot: selectedSlot, amount: service.price }));
    navigate("/user/booking");
  };

  return (
    <ServiceContainer>
      <ServiceDetails>
        {/* service image  */}
        <div className="service-img-container">
          <img src={serviceImgUrl} alt="" />
        </div>
        {/* Service information  */}
        <div className="service-info">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>{name}</h2>
            <Tag icon={<ClockCircleOutlined />} color="default">
              {duration} min
            </Tag>
          </div>

          {/* DatePicker Section */}

          <DatePicker
            value={selectedDate}
            disabledDate={disabledDate}
            onChange={handleDateChange}
            style={{ width: "100%", marginTop: "16px" }}
          />

          {/* Time Slots Section */}
          <Card style={{ marginTop: "16px" }} title="Select a Time Slot">
            <Row gutter={[8, 8]}>
              {filteredSlots?.map((slot) => (
                <Col key={slot._id}>
                  <Button
                    disabled={slot.isBooked === "booked"}
                    onClick={() => handleSlotSelect(slot)}
                    style={{
                      backgroundColor:
                        selectedSlot?._id === slot._id ? "#1890ff" : "#f0f0f0",
                      color: slot.isBooked === "booked" ? "#d9d9d9" : "#000",
                    }}
                  >
                    {slot.startTime} - {slot.endTime}
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
            disabled={!selectedSlot}
            style={{ marginTop: "20px" }}
          >
            Book This Service
          </Button>
        </div>
      </ServiceDetails>
      <div className="service-description">{description}</div>
    </ServiceContainer>
  );
};

export default ServiceDetailsCart;

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
`;
