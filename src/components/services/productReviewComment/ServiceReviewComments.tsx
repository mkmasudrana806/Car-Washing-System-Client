import { Tabs, TabsProps } from "antd";

import { useGetAllReviewsQuery } from "../../../redux/features/reviews/reviewsApi";
import ReviewsContainer from "./ReviewsContainer";
import ServiceFAQ from "./ServiceFAQ";

const onChange = (key: string) => {
  console.log(key);
};

type Props = {
  serviceId: string;
};
// ----------- ServiceReviewComments component
const ServiceReviewComments: React.FC<Props> = ({ serviceId }) => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetAllReviewsQuery({ serviceId });
  
  
 

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Reviews(${reviews?.data?.length})`,
      children: (
        <ReviewsContainer
          serviceId={serviceId}
          isLoading={isLoading}
          isError={isError}
          reviews={reviews?.data}
        />
      ),
    },
    {
      key: "2",
      label: "Comments(0)",
      children: <h1>Not implemented this features yet!</h1>,
      // children: <CommentsContainer />,
    },
    {
      key: "3",
      label: "FAQs(0)",
      children: <ServiceFAQ />,
    },
  ];

  return (
    <Tabs
      style={{ marginTop: "32px" }}
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default ServiceReviewComments;
