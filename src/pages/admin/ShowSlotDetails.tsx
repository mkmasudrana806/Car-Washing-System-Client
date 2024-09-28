import { Form, Input, InputNumber, Tag } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const ShowSlotDetails = () => {
  // -------- redux
  const showSlotData = useAppSelector((state) => state.slots.showSlotData);
  // -------- react
  const [form] = Form.useForm();

  // format   updatedAt into YYYY-MM-DD format
  const updatedAt = dayjs(showSlotData?.updatedAt).format("YYYY-MM-DD");

  // --------- watch the showSlotData
  useEffect(() => {
    if (showSlotData) {
      form.setFieldsValue(showSlotData);
    }
  }, [showSlotData, form]);
  return (
    <div>
      <Timestamp>
        <p>Last modified: {updatedAt}</p>
      </Timestamp>
      <Form
        form={form}
        name="slotForm"
        layout="vertical"
        style={{
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "16px",
        }}
      >
        {/* service Name */}
        <Form.Item label="Service Name" name="serviceName">
          <Input readOnly />
        </Form.Item>

        {/*  slot start time */}
        <Form.Item label="Slot Start Time" name="slotStartTime">
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* slot end time */}
        <Form.Item label="Slot End Time" name="slotEndTime">
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* date */}
        <Form.Item label="Slot Date" name="date">
          <InputNumber readOnly style={{ width: "100%" }} />
        </Form.Item>

        {/* slot status */}
        <Form.Item label="Slot Status" name="status">
          <Tag
            style={{
              cursor:
                showSlotData?.status === "booked" ? "not-allowed" : "pointer",
              opacity: showSlotData?.status === "booked" ? 0.5 : 1,
            }}
            color={
              showSlotData?.status === "available"
                ? "success"
                : showSlotData?.status === "booked"
                ? "processing"
                : "error"
            }
          >
            {showSlotData?.status}
          </Tag>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowSlotDetails;

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
