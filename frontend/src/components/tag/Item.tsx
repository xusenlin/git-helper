import {Card} from "antd"
import { main } from "../../../wailsjs/go/models"
import { DeleteOutlined } from "@ant-design/icons"

const Item = (props:{t:main.Tag}) => {

  return (
      <Card size="small" title={props.t.name} extra={<DeleteOutlined />} style={{marginBottom:10}}>
        <div className="tag-content">
          <p>name:{props.t.refName}</p>
          <p>hash:{props.t.hash.substring(0,7)}</p>
          <p>type:{props.t.type === 1?'annotated':'lightweight'}</p>
          <p>message:</p>
          <div>{props.t.message}</div>
        </div>
      </Card>
  );
};

export default Item;
