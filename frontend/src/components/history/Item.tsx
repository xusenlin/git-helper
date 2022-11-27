import {Card} from "antd"
import { CopyOutlined } from "@ant-design/icons"

const Item = () => {

  return (
      <Card size="small" title="8fb214a" extra={<CopyOutlined />} style={{marginBottom:10}}>
        <p>title：提交改变</p>
        <p>username：徐森林</p>
        <p>Card contentCard contentCard contentCard content</p>
      </Card>
  );
};

export default Item;
