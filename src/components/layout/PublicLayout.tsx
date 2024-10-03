import { FloatButton, Layout, Tooltip } from "antd";
import "../../styles/publicLayout.css";

import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import HeaderComponent from "../header/HeaderComponent";
import ScrollToSepcificSection from "../../utils/ScrollToSepcificSection";

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <>
      {/* globally handle page scroll to top  */}
      <ScrollToTop />

      {/* scroll bottom to top float button  */}
      <Tooltip title="Scroll to top">
        <FloatButton.BackTop />
      </Tooltip>

      {/* scroll to specific section by hash id  */}
      <ScrollToSepcificSection />

      <Layout className="layout-container">
        <HeaderComponent />
        <Content style={{ backgroundColor: "white" }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default PublicLayout;
