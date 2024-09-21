import React, { useState } from "react";
import { Button, Input, Rate, Space, Card } from "antd";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
const { TextArea } = Input;

interface Review {
  user: string;
  rating: number;
  feedback: string;
}

const OverviewSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login status
  const [rating, setRating] = useState<number | undefined>(5);
  const [feedback, setFeedback] = useState("");

  const [showOverview, setShowOverview] = useState(false);
  const [latestReviews, setLatestReviews] = useState<Review[]>([]);

  // Simulate a login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRatingSubmit = () => {
    if (rating && feedback) {
      const newReview: Review = { user: "User123", rating, feedback };
      setLatestReviews([...latestReviews, newReview]);
      setShowOverview(true);
      // Handle the rating submission
      console.log("Rating submitted:", rating, feedback);
    }
  };

  return (
    <ReviewContainer>
      {/* Overlay when user is not logged in */}
      {!isLoggedIn && (
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
              disabled={!isLoggedIn} // Disable rating if not logged in
            />
          </div>
          <TextArea
            rows={4}
            placeholder="Please leave your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={!isLoggedIn} // Disable text area if not logged in
          />
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              type="primary"
              onClick={handleRatingSubmit}
              disabled={!rating || !feedback || !isLoggedIn} // Disable button if not logged in
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
          <Card title="Site Overall Rating">
            <Title level={4}>Overall Rating: 4.5/5</Title>
            <p>Based on 200 reviews</p>
            <div style={{ marginTop: "24px" }}>
              <Title level={5}>Latest Reviews</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {latestReviews.slice(-2).map((review, index) => (
                  <Card key={index}>
                    <p>{review.user}</p>
                    <Rate disabled defaultValue={review.rating} />
                    <p>{review.feedback}</p>
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
