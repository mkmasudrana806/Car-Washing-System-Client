import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";
import DataNotFound from "../../components/messages/DataNotFound";
import { useGetServiceWithSlotsQuery } from "../../redux/features/services/serviceApi";
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
  } = useGetServiceWithSlotsQuery(id);

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
        <ServiceDetailsCart serviceInfo={service?.data} />
        <RelatedServices name={service?.data.name} />
        <ServiceReviewComments serviceId={id!} />
      </>
    );
  }
  return <div>{content}</div>;
};

export default ServiceDetailsPage;
