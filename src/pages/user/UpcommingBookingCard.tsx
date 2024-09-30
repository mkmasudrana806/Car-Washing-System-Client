import { Statistic } from "antd";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const UpcommingBookingCard = ({
  deadline,
  nearestBooking,
}: {
  deadline: number;
  nearestBooking: any;
}) => {
  return (
    <UpcommingBookingContainer className="imag-container">
      <img src={nearestBooking?.service?.serviceImgUrl} alt="" />
      <div className="overlay"> </div>
      <div className="booking-details">
        <NavLink to={`/services/${nearestBooking?.service?._id}`} style={{ color: "white", fontSize: "1.5rem" }}>
          {nearestBooking?.service?.name}
        </NavLink>
        <p>{dayjs(nearestBooking?.slotDateTime).format("YYYY-MM-DD")}</p>
        <p>
          {nearestBooking?.vehicleInfo?.vehicleBrand}{" "}
          {nearestBooking?.vehicleInfo?.vehicleType}{" "}
          {nearestBooking?.vehicleInfo?.vehicleModel}{" "}
          {nearestBooking?.vehicleInfo?.manufacturingYear}{" "}
          {nearestBooking?.vehicleInfo?.registrationPlate}{" "}
        </p>

        <Statistic.Countdown
          valueStyle={{ color: "white" }}
          style={{
            backgroundColor: "white",
            opacity: "0.9",
            color: "white",
            marginTop: "16px",
            padding: "8px",
          }}
          title="Booking time Remaining"
          value={deadline}
          format="D [Days] HH:mm:ss"
        />
      </div>
    </UpcommingBookingContainer>
  );
};

export default UpcommingBookingCard;

//UpcommingBookingContainer
const UpcommingBookingContainer = styled.div`
  min-width: 100%;
  max-width: 250px;
  min-height: 100%;
  max-height: 220px;
  overflow: hidden;
  object-fit: cover;
  position: relative;
  z-index: 1;
  img {
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .booking-details {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding: 16px;
    p {
      color: white;
      font-size: 1rem;
      margin-top: 8px;
    }
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    opacity: 0.9;
    height: 100%;
    width: 100%;
    background-color: #00000099;
  }
`;
