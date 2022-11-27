import Block from "../block/Index"
import Item from "./Item"
import {Button, Input, Space} from "antd";
const { TextArea } = Input;
const Tag = () => {

  const bottom = <div style={{padding:12}}>
    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
      <Input placeholder="Name"/>
      <TextArea rows={4}/>
      <Button block type="primary">Add New Tag</Button>
    </Space>
  </div>

  return (
      <Block title="Tag" bottom={bottom}>
        <div style={{padding:12}}>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
        </div>

      </Block>
  );
};

export default Tag;
