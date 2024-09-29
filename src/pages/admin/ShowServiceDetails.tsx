import { Form, Input, InputNumber, Switch } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const ShowServiceDetails = () => {
  // -------- redux
  const showServiceData = useAppSelector(
    (state) => state.services.showServiceData
  );
  // -------- react
  const [form] = Form.useForm();

  // format createdAt, updatedAt into YYYY-MM-DD format
  const createdAt = dayjs(showServiceData?.createdAt).format("YYYY-MM-DD");
  const updatedAt = dayjs(showServiceData?.updatedAt).format("YYYY-MM-DD");

  // --------- watch the showServiceData
  useEffect(() => {
    if (showServiceData) {
      form.setFieldsValue(showServiceData);
    }
  }, [showServiceData, form]);

 
  return (
    <div>
      <Timestamp>
        <p>CreatedAt: {createdAt}</p>
        <p>UpdatedAt: {updatedAt}</p>
      </Timestamp>
      <Form
        form={form}
        name="serviceForm"
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

        {/* Price */}
        <Form.Item label="Price" name="price">
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* duration */}
        <Form.Item label="Duration" name="duration">
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* Featured */}
        <Form.Item label="Featured" name="featured" valuePropName="checked">
          <Switch disabled />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea readOnly rows={4} />
        </Form.Item>

        {/* Service Image URL */}
        <Form.Item label="Service Image URL" name="serviceImgUrl">
          <Input readOnly />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowServiceDetails;

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
