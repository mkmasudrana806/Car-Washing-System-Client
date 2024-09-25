import { Form, Input, InputNumber, Switch, Button, message } from "antd";
import { TService } from "../../types/serviceTypes";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../../redux/features/services/serviceApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  clearEditServiceData,
  updateSingleService,
} from "../../redux/features/services/ServiceSlice";

type Props = {
  handleCloseModal: () => void;
};
// ------------ add service component
const AddService: React.FC<Props> = ({ handleCloseModal }) => {
  // -------- redux
  const dispatch = useAppDispatch();
  const editServiceData = useAppSelector(
    (state) => state.services.editServiceData
  );
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  // -------- react
  const [form] = Form.useForm();

  // --------- watch changes for update service
  useEffect(() => {
    if (editServiceData) {
      form.setFieldsValue(editServiceData);
    } else {
      form.resetFields();
    }
  }, [editServiceData, form]);

  // ----------- add service
  const onFinish = async (values: TService) => {
    // add service
    if (!editServiceData) {
      const result = await createService(values).unwrap();
      if (result?.success) {
        form.resetFields();
        message.success(result?.message);
        handleCloseModal();
      }
    }
    // update service
    else {
      const result = await updateService({
        service: values,
        serviceId: editServiceData._id,
      }).unwrap();
      dispatch(
        updateSingleService({
          service: result?.data,
          serviceId: result?.data?._id,
        })
      );
      if (result?.success) {
        dispatch(clearEditServiceData());
        form.resetFields();
        message.success(result.message);
        handleCloseModal();
      }
    }
  };

  return (
    <Form
      form={form}
      name="serviceForm"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ featured: false }}
      style={{
        maxWidth: "100%",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        padding: "12px",
      }}
    >
      {/* Name */}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the service name!" }]}
      >
        <Input placeholder="Enter service name" />
      </Form.Item>

      {/* Price */}
      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: "Please input the service price!" },
          { type: "number", min: 0, message: "Price cannot be negative" },
        ]}
      >
        <InputNumber
          placeholder="Enter service price"
          type="number"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* duration */}
      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          { required: true, message: "Please input the service duration!" },
          { type: "number", min: 0, message: "duration cannot be negative" },
        ]}
      >
        <InputNumber
          placeholder="Enter service duration"
          type="number"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Featured */}
      <Form.Item label="Featured" name="featured" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the service description!" },
        ]}
      >
        <Input.TextArea placeholder="Enter service description" rows={4} />
      </Form.Item>

      {/* Service Image URL */}
      <Form.Item
        label="Service Image URL"
        name="serviceImgUrl"
        rules={[
          { required: true, message: "Please input the service image URL!" },
        ]}
      >
        <Input placeholder="Enter service image URL" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          block
          style={{ backgroundColor: "#fa7760ce" }}
          type="primary"
          htmlType="submit"
        >
          {editServiceData ? "Update Service" : " Add Service"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddService;
