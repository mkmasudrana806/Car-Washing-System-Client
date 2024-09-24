import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const PurchaseSuccessMessage = () => {
  return (
    <Result
      status={"success"}
      title={"Successfully Purchased Your services"}
      subTitle={
        "it will takes some days to deliver to your locaion, please wait"
      }
      extra={[
        <NavLink key={"my-bookings"} to={"/user/my-bookings"}>
          <Button type="primary">My Bookings</Button>
        </NavLink>,
        <NavLink key={"buy-again"} to={"/bookings"}>
          <Button>Buy Again</Button>
        </NavLink>,
      ]}
    />
  );
};

export default PurchaseSuccessMessage;
