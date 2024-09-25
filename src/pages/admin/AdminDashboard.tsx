import styled from "styled-components";
import usersIcon from "../../assets/icons/users.png";
import servicesIcon from "../../assets/icons/services.png";
import bookingsIcon from "../../assets/icons/bookings.png";
import { useLoadAllBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";
import { useGetAllUsersQuery } from "../../redux/features/users/userApi";
import Bookings from "./Bookings";
import { Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import getDateFromString from "../../utils/getDateFromValue";
const { Option } = Select;

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  // redux
  const limit = 25;
  const date = selectedDate;
  const fields =
    "_id,date,user.name,user.email,service.price,service.name,slot.startTime,slot.endTime";
  const { data: bookings } = useLoadAllBookingsQuery({
    limit,
    fields,
    date,
  });
  const { data: services } = useLoadAllServicesQuery({});
  const { data: users } = useGetAllUsersQuery(undefined);

  // ---------- handle date range change
  const handleDateRangeChange = (value: string) => {
    setSelectedDate(getDateFromString(value));
  };

  return (
    <div>
      {/* dashboard insights for users, bookings and services  */}
      <InsightsBoxes className="insight-boxes">
        <Box className="box">
          <img src={bookingsIcon} alt="" />
          <div className="box-info">
            <h1>Bookings</h1>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                columnGap: "8px",
              }}
            >
              <p>{bookings?.data?.length > 0 ? bookings?.data?.length : 0} </p>
              <Select
                style={{ width: "auto" }}
                popupMatchSelectWidth={false}
                size="small"
                placeholder="Last 7 Days"
                onChange={handleDateRangeChange}
              >
                <Option value="all">All</Option>
                <Option value="today">Today</Option>
                <Option value="yesterday">Yesterday</Option>
                <Option value="last7days">Last 7 Days</Option>
                <Option value="last10days">Last 10 Days</Option>
                <Option value="last30days">Last 30 Days</Option>
                <Option value="lastYear">Last Year</Option>
                <Option value="last2years">Last 2 Years</Option>
              </Select>
            </div>
          </div>
        </Box>
        <Box className="box">
          <img src={usersIcon} alt="" />
          <div className="box-info">
            <h1>Users</h1>
            <p>
              {users?.data?.length > 0 ? users?.data?.length : 0}{" "}
              <span>Total users</span>
            </p>
          </div>
        </Box>
        <Box className="box">
          <img src={servicesIcon} alt="" />
          <div className="box-info">
            <h1>Services</h1>
            <p>
              {services?.data?.length > 0 ? services?.data?.length : 0}{" "}
              <span>Total services</span>
            </p>
          </div>
        </Box>
      </InsightsBoxes>
      {/* recent bookings  */}
      <h1 style={{ fontSize: "1.5rem", marginTop: "24px" }}>
        Today's Bookings
      </h1>
      <Bookings bookings={bookings?.data} />
    </div>
  );
};

export default AdminDashboard;

// insight boxes like bookings, users, services
const InsightsBoxes = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

// users, bookings, services box
const Box = styled.div`
  display: flex;
  column-gap: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  img {
    min-width: 60px;
    max-width: 80px;
  }
  .box-info {
    .ant-select-selection-placeholder {
      font-size: 0.8rem;
      font-weight: 400;
      color: gray;
    }
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.5rem;
      font-weight: 700;
      span {
        font-size: 0.8rem;
        font-weight: 400;
        color: gray;
      }
    }
  }
`;
