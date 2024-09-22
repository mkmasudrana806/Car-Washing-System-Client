import type { FormProps } from "antd";
import { Button, Form, notification } from "antd";
import TextArea from "antd/es/input/TextArea";

type FieldType = {
  description?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const CommentForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "We are sorry...",
      description:
        "The comment functionality is not implemented yet. it will be Future work..",
      duration: 0,
    });
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Comment"
        name="description"
        rules={[{ required: true, message: "Please write your comment!" }]}
      >
        <TextArea style={{ width: "300px" }} />
      </Form.Item>

      {/* show notifications that comment functionality is not implemented yet  */}
      {contextHolder}
      <Form.Item>
        <Button
          onClick={openNotification}
          type="primary"
          htmlType="submit"
          ghost
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
