import React, { useState } from "react";
import { Button, Input, Rate, Space, Card, message } from "antd";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { useAppSelector } from "../redux/hooks";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "../redux/features/reviews/reviewsApi";
import showNotification from "../utils/openNotification";
import { TReview } from "../types/reviewType";
import dayjs from "dayjs";
const { TextArea } = Input;

const OverviewSection: React.FC = () => {
  // --------- redux
  const isUserExist = useAppSelector((state) => state.auth.token);
  const [createReview] = useCreateReviewMutation();
  const { data: reviews } = useGetAllReviewsQuery({});
  const totalRating = reviews?.data.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );
  const averageRating = (totalRating / reviews?.data?.length).toFixed(2);

  // ---------- react
  const [rating, setRating] = useState<number | undefined>(5);
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(false);

  // --------- get latest two reviews
  const getLatestTwoReviews = reviews?.data
    .sort(
      (a: TReview, b: TReview) =>
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    )
    .slice(0, 2);

  // -------- Simulate a login
  const handleLogin = () => {
    navigate("/login#review-section", {
      state: { from: location },
    });
  };

  // --------- handle submit rating
  const handleRatingSubmit = async () => {
    let result: any = null;
    if (rating && feedback) {
      result = await createReview({ rating, comment: feedback });
      if (result?.data) {
        message.success(result?.data?.message);
        setShowOverview(true);
      } else if (result?.error) {
        showNotification(
          "error",
          "Review Submission failed",
          result?.error?.data?.message
        );
      }
      setRating(1);
      setFeedback("");
    }
  };

  return (
    <ReviewContainer id="review-section">
      {/* Overlay when user is not logged in */}
      {!isUserExist && (
        <LoggedInBtn>
          <Button style={{ pointerEvents: "auto" }} onClick={handleLogin}>
            Log in to rate
          </Button>
        </LoggedInBtn>
      )}

      {/* Rating and Feedback Form */}
      {!showOverview && (
        <Card title="Rate Our Service">
          <div style={{ marginBottom: "16px" }}>
            <Rate
              onChange={setRating}
              value={rating}
              disabled={!isUserExist} // Disable rating if not logged in
            />
          </div>
          <TextArea
            rows={4}
            placeholder="Please leave your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={!isUserExist} // Disable text area if not logged in
          />
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              type="primary"
              onClick={handleRatingSubmit}
              disabled={!rating || !feedback || !isUserExist} // Disable button if not logged in
              style={{ zIndex: 2 }}
            >
              Submit Rating
            </Button>
          </div>
        </Card>
      )}
      {/* Second Component: Site Overall Rating & Latest Reviews */}
      {showOverview && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>
              See all reviews
            </h1>
            <Button>
              <NavLink to={"/reviews"}>View all</NavLink>
            </Button>
          </div>
          <Card title="Site Overall Rating">
            <Title level={4}>Overall Rating: {averageRating}/5</Title>
            <p>Based on {reviews?.data?.length} reviews</p>
            <div style={{ marginTop: "24px" }}>
              <Title level={5}>Latest Reviews</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {getLatestTwoReviews?.map((review: TReview) => (
                  <Card key={review?._id}>
                    <p>
                      {review?.userId?.name?.firstName}{" "}
                      {review?.userId?.name?.lastName}
                    </p>
                    <Rate disabled defaultValue={review?.rating} />
                    <p>{review?.comment}</p>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>
        </div>
      )}
    </ReviewContainer>
  );
};

export default OverviewSection;

// review section container
const ReviewContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 64px;
`;

// login buttonc
const LoggedInBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.562);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;

  button {
    background-color: #ff6347d5 !important;
    border: none;
    pointer-events: "auto";
    span {
      color: white;
    }
  }
`;
