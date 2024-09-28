import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const showNotification = (
  type: NotificationType,
  title: string,
  description: string
) => {
  notification[type]({
    message: title,
    description: description,
    duration: 3,
  });
};

export default showNotification;
