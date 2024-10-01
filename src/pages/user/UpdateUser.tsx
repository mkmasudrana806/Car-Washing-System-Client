import { Form, Input, InputNumber, Button, Tag, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  clearEditUserData,
  updateSingleUser,
} from "../../redux/features/users/userSlice";
import { TUser } from "../../types/userType";
import { useUpdateUserMutation } from "../../redux/features/users/userApi";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type Props = {
  handleCloseModal: () => void;
};
// ------------ add user component
const UpdateUser: React.FC<Props> = ({ handleCloseModal }) => {
  // -------- redux
  const dispatch = useAppDispatch();
  const editUserData = useAppSelector((state) => state.users.editUserData);
  const [updateUser] = useUpdateUserMutation();

  // -------- react
  const [form] = Form.useForm();

  // updateat timestamp
  const createdAt = dayjs(editUserData?.updatedAt).format("YYYY-MM-DD");
  const updatedAt = dayjs(editUserData?.updatedAt).format("YYYY-MM-DD");

  // --------- watch the editUserData
  useEffect(() => {
    if (editUserData) {
      form.setFieldsValue({
        firstName: editUserData?.name?.firstName,
        middleName: editUserData?.name?.middleName,
        lastName: editUserData?.name?.lastName,
        passwordChangedAt: editUserData?.passwordChangedAt || "N/A",
        age: editUserData?.age || "N/A",
        gender: editUserData?.gender || "N/A",
        contact: editUserData?.contact || "N/A",
        address: editUserData?.address || "N/A",
        role: editUserData?.role,
        status: editUserData?.status,
        profileImgUrl: editUserData?.profileImg || "N/A",
      });
    }
  }, [editUserData, form]);

  // ----------- add user
  const onFinish = async (values: TUser) => {
    const updatedUserData = {
      name: {
        firstName: values?.firstName,
        middleName: values?.middleName,
        lastName: values?.lastName,
      },
      age: values?.age,
      gender: values?.gender,
      contact: values?.contact,
      address: values?.address,
      profileImgUrl: values?.profileImgUrl,
    };

    // add user
    const result = await updateUser({
      updatedUserData,
      userId: editUserData!._id,
    }).unwrap();
    dispatch(
      updateSingleUser({
        user: result?.data,
        userId: result?.data?._id,
      })
    );

    if (result?.success) {
      dispatch(clearEditUserData());
      form.resetFields();
      message.success(result.message);
      handleCloseModal();
    }
  };

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
        onFinish={onFinish}
        style={{
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "16px",
        }}
      >
        {/* first name */}
        <Form.Item label="First name" name="firstName">
          <Input />
        </Form.Item>

        {/* middle name */}
        <Form.Item label="Middle name" name="middleName">
          <Input />
        </Form.Item>

        {/* last name */}
        <Form.Item label="Last name" name="lastName">
          <Input />
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
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        {/* gender */}
        <Form.Item label="Gender" name="gender">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        {/* contact */}
        <Form.Item label="Contact" name="contact">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        {/* address */}
        <Form.Item label="Address" name="address">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        {/* role */}
        <Form.Item label="Role" name="role">
          <label htmlFor="role">
            <UserOutlined /> {editUserData?.role}
          </label>
        </Form.Item>

        {/* status */}
        <Form.Item label="Status" name="status">
          <Tag
            style={{ cursor: "pointer" }}
            color={editUserData?.status === "active" ? "success" : "error"}
          >
            {editUserData?.status}
          </Tag>
        </Form.Item>

        {/* User Image URL */}
        <Form.Item label="User Image URL" name="profileImgUrl">
          <Input />
        </Form.Item>

        {/* user update button */}
        <Form.Item>
          <Button htmlType="submit" block type="primary">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;

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
