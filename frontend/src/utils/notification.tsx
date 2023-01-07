import React from "react";
import {notification} from "antd";


export const successNotification = (out:any,style:React.CSSProperties)=>{
  notification.success({
    message: `Success`,
    description: <div style={{whiteSpace: "pre-wrap"}}>{out}</div>,
    placement:"bottomLeft",
    style,
  });
}

export const warningNotification = (error:any,style:React.CSSProperties)=>{
  notification.warning({
    message: `Error`,
    description: <div style={{whiteSpace: "pre-wrap"}}>{error}</div>,
    placement:"bottomLeft",
    style,
  });
}
