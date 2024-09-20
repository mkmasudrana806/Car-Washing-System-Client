import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const ErrorComponent = () => (
  <Result
    status="warning"
    title="There are some problems with your operation."
    extra={
      <NavLink to={"/"}>
        <Button type="primary" key="console">
          Go Home
        </Button>
      </NavLink>
    }
  />
);

export default ErrorComponent;
