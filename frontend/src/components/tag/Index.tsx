import Block from "../block/Index"
import Item from "./Item"
import {Button, Input, Space} from "antd";
import {useSelector} from "react-redux";
import "./style.scss"
import {State} from "../../store";
const { TextArea } = Input;
const Tag = () => {
  const tags = useSelector((state: State) => state.main.currentlyRepositoryTag);

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
          { tags.map(r=><Item t={r}/>)}
        </div>

      </Block>
  );
};

export default Tag;
