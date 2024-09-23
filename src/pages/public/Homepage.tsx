import Banner from "../../components/banner/Banner";
import ReviewSection from "../../components/ReviewSection";
import FeaturedServices from "../../components/services/FeaturedServices";
import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";

const Homepage = () => {
  // redux
  const {
    data: services,
    isLoading,
    isError,
  } = useLoadAllServicesQuery({ featured: true });

  return (
    <>
      <Banner />
      {!isLoading && !isError && services?.data && (
        <FeaturedServices services={services?.data} />
      )}
      <ReviewSection />
    </>
  );
};

export default Homepage;
