import Block from "../block/Index"
import "./style.scss"
import { Input,Button,Space,Checkbox } from 'antd';
const { TextArea } = Input;
import React, { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {useSelector} from "react-redux";
import FileState from "./FileState"
import {State} from "../../store/dataType";


const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


const Changes = () => {

  const fileState = useSelector((state: State) => state.main.currentlyRepositoryState);


  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);


  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const bottom =  <div style={{padding:12}}>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Input placeholder="Title" />
      <TextArea rows={4} />
      <Button block type="primary">Commit To Branch</Button>
    </Space>
  </div>

  const action =  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>

    return (
        <Block title="Status" bottom={bottom} action={action}>
          <div style={{padding:12}} className="status-file-list">
            {fileState.map(s=><FileState key={s.file} s={s}/>)}
          </div>
        </Block>
    );
};

export default Changes;
