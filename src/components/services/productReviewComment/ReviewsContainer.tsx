import { Button, Divider, Empty } from "antd";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import ErrorComponent from "../../messages/ErrorComponent";
import DataNotFound from "../../messages/DataNotFound";
import { useAppSelector } from "../../../redux/hooks";
import Reviews from "./Reviews";
import { TReview } from "../../../types/reviewType";

type TReviewsProps = {
  serviceId: string;
  reviews: TReview[];
  isLoading: boolean;
  isError: boolean;
};

// reviews component
const ReviewsContainer = ({
  serviceId,
  reviews,
  isLoading,
  isError,
}: TReviewsProps) => {
  // ---------- redux
  const user = useAppSelector((state) => state.auth.user);
  // react
  const [isReview, setIsReview] = useState(false);

  //  decide what to render
  let content = null;
  if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && reviews?.length === 0) {
    content = <DataNotFound />;
  } else if (!isLoading && !isError && reviews?.length > 0) {
    content = <Reviews reviews={reviews} />;
  }

  return (
    <div>
      <p>Get specific details about this services from customers who own it</p>
      <Divider />
      {/* review form  */}
      {user?.userId && reviews?.length !== 0 && !isReview && (
        <ReviewForm serviceId={serviceId} />
      )}
      {isReview && <ReviewForm serviceId={serviceId} />}

      {/* when no reviews, show empty message  */}
      {reviews?.length === 0 && !isReview && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <p>
              This service has no reviews yet. Be the first one to write a
              review
            </p>
          }
        >
          {user?.userId && (
            <Button onClick={() => setIsReview(true)} ghost type="primary">
              Write a review
            </Button>
          )}
        </Empty>
      )}
      {content}
    </div>
  );
};

export default ReviewsContainer;
