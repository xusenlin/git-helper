import {message, notification} from "antd";
import {Clipboard} from "../../wailsjs/go/main/App";

export const warning = (desc: string) => {
  notification.warning({
    message: `Tip`,
    description: desc,
    placement: "bottomLeft",
  });
}

export const success = (desc: string) => {
  notification.success({
    message: `Tip`,
    description: desc,
    placement: "bottomLeft",
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
