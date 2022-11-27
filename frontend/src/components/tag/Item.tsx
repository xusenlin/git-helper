import {Card} from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const Item = () => {

  return (
      <Card size="small" title="v1.0.1" extra={<DeleteOutlined />} style={{marginBottom:10}}>
        <p>username：徐森林</p>
        <p>Card contentCard contentCard contentCard content</p>
      </Card>
  );
};

export default Item;
