import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

// show notification by passing notification type, title and description
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
