import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderComponent from "../header/HeaderComponent";
import styled from "styled-components";
import PageRefreshWarning from "../../utils/PageRefreshWarning";

const { Header, Content } = Layout;

const DashboardLayout = () => {
  return (
    <MainLayout style={{ height: "100vh" }}>
      {/* monitor page refresh globally */}
      <PageRefreshWarning />
      <Sidebar />
      <Layout style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white", padding: "0px" }}>
          <HeaderComponent />
        </Header>
        <Content style={{ margin: "0px 0px 0px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </MainLayout>
  );
};

export default DashboardLayout;

const MainLayout = styled(Layout)`
  .header {
    justify-content: end !important;
  }
  .header-logo {
    display: none;
  }
`;
