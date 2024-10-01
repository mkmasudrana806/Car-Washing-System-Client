import { Badge, Button, Drawer, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
type onCloseType = (
  e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
) => void;

type onClickType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

type THeaderNavlinkDrawer = {
  isDrawerVisible: boolean;
  closeDrawer: onCloseType;
  showProfileDrawer: onClickType;
};

// ------------- header navlink drawer on small devices
const HeaderNavlinkDrawer = ({
  isDrawerVisible,
  closeDrawer,
  showProfileDrawer,
}: THeaderNavlinkDrawer) => {
  // redux
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // react
  const navigate = useNavigate();
  // handle logout user

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Drawer
      zIndex={5}
      title="GymBolt"
      placement="right"
      onClose={closeDrawer}
      open={isDrawerVisible}
    >
      <Menu mode="vertical" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home">
          {" "}
          <NavLink to={"/"}>Home</NavLink>
        </Menu.Item>
        <Menu.Item key="services">
          <NavLink to={"/services"}>Services</NavLink>
        </Menu.Item>
        {user?.role && (
          <Menu.Item key="dashboard">
            <Badge offset={[5, 1]} color="#E15B40" count={5}>
              <NavLink to={`/${user?.role}/dashboard`}>Dashboard</NavLink>
            </Badge>
          </Menu.Item>
        )}

        <Menu.Item key="about us">
          <NavLink to={"/about-us"}>About Us</NavLink>
        </Menu.Item>
        <Menu.Item key="contact us">
          <NavLink to={"/contact-us"}>Contact Us</NavLink>
        </Menu.Item>
        {user?.role ? (
          <>
            <Menu.Item key="logout">
              <Button onClick={handleLogout} icon={<LogoutOutlined />}>
                Logout
              </Button>
            </Menu.Item>

            <Menu.Item key="user-profile">
              <Button onClick={showProfileDrawer} icon={<UserOutlined />}>
                Profile
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <NavLink to={"/login"}>Login</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Drawer>
  );
};

export default HeaderNavlinkDrawer;
