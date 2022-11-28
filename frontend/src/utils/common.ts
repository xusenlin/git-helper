import {notification} from "antd";

export const warning = (desc: string) => {
  notification.warning({
    message: `Tip`,
    description: desc,
    placement: "topRight",
    style: {
      top: 40,
    },
  });
}

export const success = (desc: string) => {
  notification.success({
    message: `Tip`,
    description: desc,
    placement: "topRight",
    style: {
      top: 40,
    },
  });
}
