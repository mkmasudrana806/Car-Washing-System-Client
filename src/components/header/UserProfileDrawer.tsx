import { Drawer } from "antd";
import React from "react";

// type
type TProfileDrawer = {
  closeProfileDrawer: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  openProfile: boolean;
};

// user profile component
const UserProfileDrawer = ({
  closeProfileDrawer,
  openProfile,
}: TProfileDrawer) => {
  return (
    <Drawer
      zIndex={10}
      title="User Profile"
      onClose={closeProfileDrawer}
      open={openProfile}
    >
      <p>Masud Rana</p>
      <p>Address: Dhaka</p>
      <p>Email: masud.rana11311@gmail.com</p>
    </Drawer>
  );
};

export default UserProfileDrawer;
