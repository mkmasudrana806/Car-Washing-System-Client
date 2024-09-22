import { Drawer, Pagination, PaginationProps } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";
import DataNotFound from "../../components/messages/DataNotFound";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSearchParams } from "react-router-dom";

import { TService } from "../../types/serviceTypes";
import {
  addCategoryFilters,
  setLimit,
  setPage,
} from "../../redux/features/services/filterSlice";
import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";
import ServiceFiltersSidebar from "../../components/services/ServiceFiltersSidebar";
import ServiceFiltersHeader from "../../components/services/ServiceFilterHeader";
import ServiceCard from "../../components/services/ServiceCard";

// paginations props
const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <a>Previous</a>;
  }
  if (type === "next") {
    return <a>Next</a>;
  }
  return originalElement;
};

// service page
const ServicesPage = () => {
  // redux
  const dispatch = useAppDispatch();
  const { searchTerm, priceRange, selectedCategories, sort, limit, page } =
    useAppSelector((state: RootState) => state.filters);

  const {
    data: services,
    isLoading,
    isError,
  } = useLoadAllServicesQuery({
    searchTerm,
    priceRange,
    selectedCategories,
    sort,
    limit,
    page,
  });

  // react
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (category) {
      dispatch(addCategoryFilters(category));
    }
  }, [category, dispatch]);

  let content = null;
  // component to render
  if (isLoading) {
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
  const handlePaginationChange = (currentPage: number, pageSize?: number) => {
    dispatch(setPage(currentPage));
    if (pageSize && pageSize !== limit) {
      dispatch(setLimit(pageSize));
    }
  };

  return (
    <ServicePage>
      {/* service filters sidebar  */}
      <div className="filters-sidebar">
        <ServiceFiltersSidebar />
      </div>

      <Drawer title="Filters Services" onClose={onClose} open={open}>
        <ServiceFiltersSidebar />
      </Drawer>
      <Container>
        {/* service filters header */}
        <ServiceFiltersHeader showDrawer={showDrawer} />

        {/* services containers */}
        <ServicesContainer>{content}</ServicesContainer>

        {/* paginations  */}
        {!isLoading && (
          <Pagination
            current={page}
            total={services?.meta?.total}
            pageSize={limit}
            onChange={handlePaginationChange}
            style={{ margin: "30px 0px" }}
            showSizeChanger
            pageSizeOptions={["10", "20", "50"]} // limit per page
            itemRender={itemRender}
          />
        )}
      </Container>
    </ServicePage>
  );
};

export default ServicesPage;

// this page
const ServicePage = styled.div`
  display: flex;
  column-gap: 16px;

  .filters-sidebar {
    padding: 8px;
    width: 300px;
  }

  // hide filters sidebar when
  @media screen and (max-width: 1000px) {
    .filters-sidebar {
      display: none;
    }
  }
`;

// services filter + services container
const Container = styled.div`
  width: 100%;
  margin-top: 8px;
  .service-fitlers {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
`;

// services container
const ServicesContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 24px;

  @media screen and (min-width: 576px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    .service {
      max-width: 250px;
      min-width: 180px;
      height: 270px;
      .img-container {
        height: 120px;
      }
      .info {
        .category {
          font-size: 14px;
          font-weight: 100;
        }
        .title {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
  }
`;
