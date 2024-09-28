import React from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useCreateSlotMutation } from "../../redux/features/slots/slotApi";
import { TSlot } from "../../types/slotTypes";
import dayjs, { Dayjs } from "dayjs";
import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";
import { TService } from "../../types/serviceTypes";
import showNotification from "../../utils/openNotification";
const { Option } = Select;

type Props = {
  handleCloseModal: () => void;
};

// ------------- Add slot component
const AddSlot: React.FC<Props> = ({ handleCloseModal }) => {
  // -------- redux
  const { data: services } = useLoadAllServicesQuery({});
  const [createSlot] = useCreateSlotMutation();

  // -------- react
  const [form] = Form.useForm();

  // ----------- add slot
  const onFinish = async (values: TSlot) => {
    let result;
    try {
      result = await createSlot({
        ...values,
        date: dayjs(values.date).format("YYYY-MM-DD"),
      }).unwrap();
      if (result?.success) {
        form.resetFields();
        message.success(result?.message);
        handleCloseModal();
      }
    } catch (error: any) {
      const errors = error?.data?.errorMessages;
      showNotification(
        "error",
        "Faild to create a slot",
        errors
          .map((err: { path: string; message: string }) => err.message)
          .join(", ")
      );
    }
  };

  // Disable past dates
  const disabledDate = (current: Dayjs) => {
    return current < dayjs().startOf("day");
  };

  return (
    <Form
      form={form}
      name="slotForm"
      onFinish={onFinish}
      layout="vertical"
      style={{
        maxWidth: "100%",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        padding: "16px",
      }}
    >
      {/* Service name */}
      <Form.Item label="Service Name" name="service">
        <Select
          style={{ width: "100%" }}
          popupMatchSelectWidth={false}
          placeholder="Select a service"
        >
          {services?.data.map((service: TService) => (
            <Option key={service._id} value={service._id}>
              {service.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* date */}
      <Form.Item label="Slot Date" name="date">
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%", marginTop: "16px" }}
        />
      </Form.Item>

      {/*  slot start time */}
      <Form.Item label="Slot Start Time" name="startTime">
        <Input style={{ width: "100%" }} />
      </Form.Item>

      {/* slot end time */}
      <Form.Item label="Slot End Time" name="endTime">
        <Input style={{ width: "100%" }} />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          block
          style={{ backgroundColor: "#fa7760ce" }}
          type="primary"
          htmlType="submit"
        >
          Add Service
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSlot;
