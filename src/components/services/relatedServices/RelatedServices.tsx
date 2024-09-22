import { useLoadAllServicesQuery } from "../../../redux/features/services/serviceApi";
import { TService } from "../../../types/serviceTypes";
import DataNotFound from "../../messages/DataNotFound";
import ErrorComponent from "../../messages/ErrorComponent";
import LoadingComponent from "../../messages/LoadingComponent";
import ServiceCard from "../ServiceCard";
import styled from "styled-components";

const RelatedServices = (category: { category: string }) => {
  const {
    data: services,
    isLoading,
    isFetching,
    isError,
  } = useLoadAllServicesQuery(category);

  // decide what to render
  let content = null;
  // component to render
  if (isLoading || isFetching) {
    content = <LoadingComponent />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && services?.data?.length === 0) {
    content = <DataNotFound />;
  } else if (
    !isLoading &&
    !isError &&
    services?.data &&
    services?.data?.length > 0
  ) {
    content = services?.data?.map((service: TService) => (
      <ServiceCard key={service?._id} service={service} />
    ));
  }

  return (
    <div style={{ marginTop: "32px" }}>
      <h1 style={{ fontSize: "2.5rem" }}>You may alos like</h1>
      <RelatedServicesContainer>{content}</RelatedServicesContainer>
    </div>
  );
};

export default RelatedServices;

// related Services containers
const RelatedServicesContainer = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  .service {
    min-width: 180px;
    max-width: 250px;
    height: 270px;
    .img-container {
      height: 120px;
    }
    .info {
      .category {
        font-size: 0.8rem;
      }
      .title {
        font-size: 1.1rem;
      }
    }
  }

  // responsive
  @media screen and (min-width: 868px) and (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // responsive
  @media screen and (min-width: 768px) and (max-width: 868px) {
    grid-template-columns: repeat(3, 1fr);
  }

  // responsive
  @media screen and (min-width: 576px) and (max-width: 768px) {
    .service {
      max-width: 100%;
      height: 300px;
      .img-container {
        height: 150px;
      }
    }
    grid-template-columns: repeat(2, 1fr);
  }

  // responsive
  @media screen and (min-width: 324px) and (max-width: 576px) {
    display: block;
    .service {
      min-width: 100%;
      max-width: 100%;
      height: fit-content;
      display: flex;
      margin-bottom: 16px;
      .service-cart-footer {
        div:nth-child(1) {
          display: flex;
          column-gap: 32px;
        }
        .details {
          display: none;
        }
      }
    }
  }
`;
