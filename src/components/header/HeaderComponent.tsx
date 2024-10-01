import { Button, Layout } from "antd";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import HeaderNavlinks from "./HeaderNavlinks";
import HeaderNavlinkDrawer from "./HeaderNavlinkDrawer";
import UserProfileDrawer from "./UserProfileDrawer";
import styled from "styled-components";
const { Header } = Layout;

const HeaderComponent = () => {
 
  // react
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // show navlinks drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  // close navlinks drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // show user profile drawer
  const showProfileDrawer = () => {
    setOpenProfile(true);
  };

  // close user profile drawer
  const closeProfileDrawer = () => {
    setOpenProfile(false);
  };

  return (
    <Header className="header" style={headerStyles}>
      <HeaderLogo className={"header-logo"} to={"/"}>
        <img src={logo} alt="" />
        <h1> TurboShine</h1>
      </HeaderLogo>

      {/* header nav links  */}
      <HeaderNavlinks showProfileDrawer={showProfileDrawer} />

      {/* show drawer when screen is small  */}
      <Button
        className="menu-button"
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      {/* navlink drawer on small screen  */}
      <HeaderNavlinkDrawer
        closeDrawer={closeDrawer}
        isDrawerVisible={isDrawerVisible}
        showProfileDrawer={showProfileDrawer}
      />
      
      {/* show user profile drawer  */}
      <UserProfileDrawer
        closeProfileDrawer={closeProfileDrawer}
        openProfile={openProfile}
      />
    </Header>
  );
};

export default HeaderComponent;

// header styles
const headerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px",
  backgroundColor: "white",
};

// header logo
const HeaderLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  column-gap: 16px;
  img {
    height: 32px;
    min-width: 32px;
    max-width: 32px;
  }
  h1 {
    font-size: 1.5rem;
  }
`;
