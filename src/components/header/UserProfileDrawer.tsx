import { Drawer, Form, Input, Tag } from "antd";
import React, { useEffect } from "react";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { useGetUserProfileQuery } from "../../redux/features/users/userApi";

// type
type Props = {
  closeProfileDrawer: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  openProfile: boolean;
};

// ---------- user profile component
const UserProfileDrawer: React.FC<Props> = ({
  closeProfileDrawer,
  openProfile,
}) => {
  // -------- redux
  const { data: showUserData } = useGetUserProfileQuery(undefined);
  // -------- react
  const [form] = Form.useForm();

  // --------- watch the showUserData
  useEffect(() => {
    if (showUserData?.data) {
      form.setFieldsValue({
        name:
          showUserData?.data?.name?.firstName +
          " " +
          showUserData?.data?.name?.lastName,
        email: showUserData?.data?.email,
        passwordChangedAt: showUserData?.data?.passwordChangedAt || "N/A",
        age: showUserData?.data?.age || "N/A",
        gender: showUserData?.data?.gender || "N/A",
        contact: showUserData?.data?.contact || "N/A",
        address: showUserData?.data?.address || "N/A",
        role: showUserData?.data?.role,
        status: showUserData?.data?.status,
      });
    }
  }, [showUserData?.data, form]);

  return (
    <Drawer
      zIndex={10}
      title="User Profile"
      onClose={closeProfileDrawer}
      open={openProfile}
    >
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
            <EnvironmentOutlined /> {showUserData?.data?.address}
          </label>
        </Form.Item>

        {/* role */}
        <Form.Item label="Role" name="role">
          <label htmlFor="role">
            <UserOutlined /> {showUserData?.data?.role}
          </label>
        </Form.Item>

        {/* status */}
        <Form.Item label="Status" name="status">
          <Tag
            style={{ cursor: "pointer" }}
            color={
              showUserData?.data?.status === "active" ? "success" : "error"
            }
          >
            {showUserData?.data?.status}
          </Tag>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserProfileDrawer;
