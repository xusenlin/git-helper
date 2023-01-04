import {message, notification} from "antd";
import {Clipboard} from "../../wailsjs/go/main/App";

export const warning = (desc: string) => {
  notification.warning({
    message: `Tip`,
    description: desc,
    placement: "topRight",
    duration:0,
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



export const copyHashClipboard = async (r: string) => {
  try {
    await Clipboard(r)
    await message.success("Hash has been copied to clipboard.")
  } catch (e) {
    warning(JSON.stringify(e))
  }
}
