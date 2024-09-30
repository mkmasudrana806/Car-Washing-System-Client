import styled from "styled-components";
import { useGetUserProfileQuery } from "../../redux/features/users/userApi";
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Bookings from "../admin/Bookings";
import { useGetUserBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { Avatar, Modal } from "antd";
import UpdateUser from "./UpdateUser";
import { useEffect, useState } from "react";
import {
  clearEditUserData,
  setEditUserData,
} from "../../redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EditFilled } from "@ant-design/icons";
import { TUser } from "../../types/userType";
import { TBooking } from "../../types/bookingsType";
import findNearestSlot from "../../utils/findNearestTimeSlot";
import UpcommingBookingCard from "./UpcommingBookingCard";

const UserDashboard = () => {
  // ------------- redux
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserProfileQuery(undefined);
  const { data: bookings } = useGetUserBookingsQuery(undefined);
  const editUserData = useAppSelector((state) => state.users.editUserData);

  // ------------- react
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ------ handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearEditUserData());
  };

  // ------------ handle update user
  const handleUpdateUser = (user: TUser) => {
    dispatch(setEditUserData(user));
    setIsModalOpen(true);
  };

  // ------------ nearest booking countdwon timer
  const [nearestBooking, setNearestBooking] = useState<TBooking | any>(null);
  useEffect(() => {
    if (bookings?.data?.length > 0) {
      const nearestSlot = findNearestSlot(bookings?.data, "one");
      setNearestBooking(nearestSlot);
    }
  }, [bookings]);

  const deadline = nearestBooking?.slotDateTime?.valueOf();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
        User Information
      </h1>
      {/* user information */}
      <Container>
        <Box>
          <div className="profile-section">
            <div
              style={{
                display: "flex",
                columnGap: "16px",
              }}
            >
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                  alt=""
                />

                {/* user edit button  */}
                <UserEditBtn>
                  <Avatar
                    icon={<EditFilled />}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdateUser(user?.data)}
                  />
                </UserEditBtn>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "8px",
                }}
              >
                {/* name */}
                <p>
                  Name: {user?.data?.name?.firstName}{" "}
                  {user?.data?.name?.lastName} ( {user?.data?.name?.middleName}{" "}
                  )
                </p>
                {/* age */}
                <p>Age: {user?.data?.age}</p>
                {/* gender */}
                <p>Gender: {user?.data?.gender}</p>
                {/* role */}
                <p>
                  Role: <UserOutlined /> {user?.data?.role}
                </p>

                {/* status */}
                <p>
                  Status:{" "}
                  <span style={{ color: "green" }}>{user?.data?.status}</span>
                </p>

                {/* email */}
                <p>Email: {user?.data?.email}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "32px",
              marginTop: "8px",
            }}
          >
            <p>
              {" "}
              <PhoneOutlined /> {user?.data?.contact}
            </p>
            <p>
              <EnvironmentOutlined /> {user?.data?.address}
            </p>
          </div>
        </Box>

        {/* upcomming bookings  */}
        <Box>
          {!nearestBooking && (
            <h1 style={{ fontSize: "1.5rem" }}>No upcomming bookings!</h1>
          )}
          {nearestBooking && (
            <UpcommingBookingCard
              deadline={deadline}
              nearestBooking={nearestBooking}
            />
          )}
        </Box>
      </Container>

      {/*  user bookings */}
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            marginTop: "48px",
          }}
        >
          My All Bookings
        </h1>
        <Bookings bookings={bookings?.data} />
      </div>

      {/* create service modal  */}
      <Modal
        onCancel={handleCloseModal}
        footer={null}
        title={editUserData ? "Update User Details" : "Create a new User "}
        open={isModalOpen}
      >
        <UpdateUser handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default UserDashboard;

// Styled container for layout
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;

  gap: 16px;
  .profile-section {
    .profile-img {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 160px;
      max-width: 160px;
      min-height: 180px;
      max-height: 180px;
      overflow: hidden;
      img {
        object-fit: cover;
      }
    }
  }
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

// Styled box for left and right content
const Box = styled.div`
  width: 50%; /* Adjusts to 100% in column mode */
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;

// user edit button
const UserEditBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  .ant-avatar {
    cursor: pointer;
    min-width: 32px;
    background-color: #ff917d;
    &:hover {
      background-color: #fa7760;
    }
  }
`;
