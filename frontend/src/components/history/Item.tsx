import {Card} from "antd"
import { CopyOutlined } from "@ant-design/icons"
import {main} from "../../../wailsjs/go/models";

const Item = (props:{l:main.Log}) => {

  return (
      <Card size="small" title={props.l.hash.substring(0,7)} extra={<CopyOutlined />} style={{marginBottom:10}}>
        <p>author：{props.l.author}</p>
        <p>{props.l.message}</p>
      </Card>
  );
};

export default Item;
