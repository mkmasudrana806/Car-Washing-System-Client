import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Form, Input, Tag } from "antd";
import styled from "styled-components";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";

const ShowUserDetails = () => {
  // -------- redux
  const showUserData = useAppSelector((state) => state.users.showUserData);
  // -------- react
  const [form] = Form.useForm();

  // updateat timestamp
  const createdAt = dayjs(showUserData?.updatedAt).format("YYYY-MM-DD");
  const updatedAt = dayjs(showUserData?.updatedAt).format("YYYY-MM-DD");

  // --------- watch the showUserData
  useEffect(() => {
    if (showUserData) {
      form.setFieldsValue({
        name:
          showUserData?.name?.firstName + " " + showUserData?.name?.lastName,
        email: showUserData?.email,
        passwordChangedAt: showUserData?.passwordChangedAt || "N/A",
        age: showUserData?.age || "N/A",
        gender: showUserData?.gender || "N/A",
        contact: showUserData?.contact || "N/A",
        address: showUserData?.address || "N/A",
        role: showUserData?.role,
        status: showUserData?.status,
        profileImgUrl: showUserData?.profileImg || "N/A",
      });
    }
  }, [showUserData, form]);

  return (
    <div>
      <Timestamp>
        <p>created: {createdAt}</p>
        <p>last modified: {updatedAt}</p>
      </Timestamp>
      <Form
        form={form}
        name="userForm"
        layout="vertical"
        style={{
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "16px",
        }}
      >
        {/* Name */}
        <Form.Item label="Name" name="name">
          <Input readOnly />
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email" name="email">
          <Input readOnly />
        </Form.Item>

        {/* Last Password Changed at */}
        <Form.Item label="Last password changed " name="passwordChangedAt">
          <Input readOnly />
        </Form.Item>

        {/* age */}
        <Form.Item label="Age" name="age">
          <Input readOnly />
        </Form.Item>

        {/* gender */}
        <Form.Item label="Gender" name="gender">
          <Input readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* contact */}
        <Form.Item label="Contact" name="contact">
          <Input readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* address */}
        <Form.Item label="Address" name="address">
          <label htmlFor="address">
            <EnvironmentOutlined /> {showUserData?.address}
          </label>
        </Form.Item>

        {/* role */}
        <Form.Item label="Role" name="role">
          <label htmlFor="role">
            <UserOutlined /> {showUserData?.role}
          </label>
        </Form.Item>

        {/* status */}
        <Form.Item label="Status" name="status">
          <Tag
            style={{ cursor: "pointer" }}
            color={showUserData?.status === "active" ? "success" : "error"}
          >
            {showUserData?.status}
          </Tag>
        </Form.Item>

        {/* User Image URL */}
        <Form.Item label="User Image URL" name="profileImgUrl">
          <Input readOnly />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowUserDetails;

// timestamp
const Timestamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  p {
    font-size: 14px;
    color: #7e7e7e;
  }
`;
