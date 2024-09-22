import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../../redux/features/reviews/reviewsApi";
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearEditReviewData } from "../../../redux/features/reviews/reviewsSlice";

type FieldType = {
  rating?: string;
  comment?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ReviewForm = ({ serviceId }: { serviceId: string }) => {
  // redux
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const editReviewData = useAppSelector(
    (state: RootState) => state.reviews.editReviewData
  );

  // --------- watch changes for update review
  useEffect(() => {
    if (editReviewData) {
      form.setFieldsValue(editReviewData);
    }
  }, [editReviewData, form]);

  //--------- create a new review
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!editReviewData) {
      const newProuduct = {
        ...values,
        serviceId,
        rating: Number(values.rating),
      };
      await createReview(newProuduct).unwrap();
      form.resetFields();
    } else {
      const result = await updateReview({
        values: { ...values, rating: Number(values.rating) },
        reviewId: editReviewData._id,
      }).unwrap();

      // Clear the edit form state after submission
      dispatch(clearEditReviewData());
      form.resetFields();
      message.success(result.message);
    }
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Rating"
        name="rating"
        rules={[{ required: true, message: "Please input your rating!" }]}
      >
        <Input min={1} max={5} style={{ width: "300px" }} type="number" />
      </Form.Item>

      <Form.Item<FieldType> label="Comment" name="comment">
        <Input style={{ width: "300px" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" ghost>
          {editReviewData ? "Update Review" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
