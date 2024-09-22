import { Avatar, List, message, Rate } from "antd";
import { TReview } from "../../../types/reviewType";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useDeleteReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { setEditReviewData } from "../../../redux/features/reviews/reviewsSlice";

const Reviews = ({ reviews }: { reviews: TReview[] }) => {
  // ---------- redux
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [deleteReview] = useDeleteReviewMutation();

  // ---------- handle update review
  const handleUpdateReview = (review: Partial<TReview>) => {
    dispatch(setEditReviewData(review));
  };

  // ---------- handle delete review
  const handleDeleteReview = async (_id: string) => {
    await deleteReview(_id).unwrap();
    message.success("Review deleted successfully");
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item key={review?._id}>
          <List.Item.Meta
            avatar={<Avatar size={48} src={`${review?.userId?.profileImg}`} />}
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* user review  */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "18px" }}>
                      {review?.userId?.name.firstName}{" "}
                      {review?.userId?.name.lastName}{" "}
                    </p>
                    <CustomRate
                      style={{ fontSize: "5px !important" }}
                      disabled
                      value={review?.rating}
                      defaultValue={review?.rating}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontWeight: "200",
                    }}
                  >
                    {review?.createdAt}
                  </span>
                </div>

                {/* reviews update and delete. showed only if user own  */}
                {user?.userId === review?.userId?._id && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "top",
                      columnGap: "8px",
                    }}
                  >
                    <Avatar
                      icon={<EditFilled />}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleUpdateReview({
                          _id: review._id,
                          rating: review.rating,
                          comment: review.comment,
                        })
                      }
                    />
                    <Avatar
                      icon={<DeleteFilled />}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteReview(review._id)}
                    />
                  </div>
                )}
              </div>
            }
            description={review?.comment}
          />
        </List.Item>
      )}
    />
  );
};

export default Reviews;

// custom Rate size
const CustomRate = styled(Rate)`
  .ant-rate-star {
    svg {
      font-size: 12px;
    }
  }
`;
