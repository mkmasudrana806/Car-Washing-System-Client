import { Row, Col, Typography } from "antd";
import styled from "styled-components";
import companyImg from "../../assets/images/companyTeam.jpg";
import { useGetAllUsersQuery } from "../../redux/features/users/userApi";
import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";
import { useGetAllReviewsQuery } from "../../redux/features/reviews/reviewsApi";

const { Title, Paragraph } = Typography;

const CompanyOverview = () => {
  // ------------ redux
  const { data: users } = useGetAllUsersQuery({});
  const { data: services } = useLoadAllServicesQuery({});
  const { data: reviews } = useGetAllReviewsQuery({});

  return (
    <HeroSection>
      <Row gutter={32} align="middle">
        {/* Image on the left, About Us on the right */}
        <Col
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          xs={24}
          md={12}
        >
          <img
            src={companyImg}
            alt="Hero Image"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>

        <Col xs={24} md={12} className="about-text">
          {/* About Us Section */}
          <Title level={1}>About Us</Title>
          <p style={{ fontSize: "1.1rem" }}>
            "We are TurboShine, your car's best friend. Our mission is to
            deliver top-tier car cleaning solutions with convenience and care.
            Our dedicated team of 15+ members is committed to providing
            exceptional service, ensuring your vehicle gets the attention it
            deserves"
          </p>

          {/* Stats Section */}
          <div className="stats-boxes">
            {/* Box 1 */}
            <div style={{ textAlign: "center" }}>
              <Title level={2}>{users?.data?.length}</Title>
              <Paragraph>Users</Paragraph>
            </div>

            {/* Box 2 */}
            <div style={{ textAlign: "center" }}>
              <Title level={2}>{services?.data?.length}</Title>
              <Paragraph>Services</Paragraph>
            </div>

            {/* Box 3 */}
            <div style={{ textAlign: "center" }}>
              <Title level={2}>{reviews?.data?.length}</Title>
              <Paragraph>Reviews</Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </HeroSection>
  );
};

export default CompanyOverview;

// Styled component for custom responsiveness
const HeroSection = styled.div`
  padding: 50px 20px;

  .about-text {
    padding: 20px;
  }

  .stats-boxes {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;
