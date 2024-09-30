import { FloatButton, Layout, Tooltip } from "antd";
import "../../styles/publicLayout.css";

import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import PageRefreshWarning from "../../utils/PageRefreshWarning";
import HeaderComponent from "../header/HeaderComponent";

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <>
      {/* monitor page refresh globally */}
      <PageRefreshWarning />
      {/* globally handle page scroll to top  */}
      <ScrollToTop />

      {/* scroll bottom to top float button  */}
      <Tooltip title="Scroll to top">
        <FloatButton.BackTop />
      </Tooltip>
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
