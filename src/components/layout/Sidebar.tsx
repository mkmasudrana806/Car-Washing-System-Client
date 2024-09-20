import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarGenerator from "../../utils/sidebarGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

const userRole = {
  admin: "admin",
  user: "user",
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);

  let sidebarItems;
  switch (user!.role) {
    case userRole.admin:
      sidebarItems = sidebarGenerator(adminPaths, userRole.admin);
      break;
    case userRole.user:
      sidebarItems = sidebarGenerator(userPaths, userRole.user);
      break;
    default:
      break;
  }
  return (
    <Sider
      style={{ minHeight: "100vh", backgroundColor: "white" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <HeaderLogo to={"/"}>
        <img src={logo} alt="" />
        <h1> GymBolt</h1>
      </HeaderLogo>
      <Menu
        style={{ height: "100%" }}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;

// header logo
const HeaderLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin: 16px 0px;
  justify-content: center;
  img {
    height: 32px;
    min-width: 32px;
    max-width: 32px;
  }
  h1 {
    font-size: 1.5rem;
  }
`;
