import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";
import DataNotFound from "../../components/messages/DataNotFound";
import { useGetServiceByIdQuery } from "../../redux/features/services/serviceApi";
import ServiceDetailsCart from "../../components/services/ServiceDetailsCart";
import RelatedServices from "../../components/services/relatedServices/RelatedServices";
import ServiceReviewComments from "../../components/services/productReviewComment/ServiceReviewComments";

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: service,
    isError,
    isFetching,
    isLoading,
  } = useGetServiceByIdQuery(id);

  let content = null;
  // component to render
  if (isLoading || isFetching) {
    content = <LoadingComponent />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && !service?.data) {
    content = <DataNotFound />;
  } else if (service?.data) {
    content = (
      <>
        <ServiceDetailsCart />
        <RelatedServices category={service?.data?.category} />
        <ServiceReviewComments serviceId={id!} />
      </>
    );
  }
  return <div>{content}</div>;
};

export default ServiceDetailsPage;
