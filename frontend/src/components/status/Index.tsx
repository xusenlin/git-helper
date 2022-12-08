import Block from "../block/Index"
import "./style.scss"
import {Input, Button, Space, Checkbox} from 'antd';

const {TextArea} = Input;
import React, {useState} from 'react';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {useSelector} from "react-redux";
import FileState from "./FileState"
import {State} from "../../store";


const Changes = () => {

  const fileState = useSelector((state: State) => state.main.currentlyRepositoryState);


  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);


  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < fileState.length);
    setCheckAll(list.length === fileState.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? fileState.map(r => r.file) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const bottom = <div style={{padding: 12}}>
    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
      <Input placeholder="Title"/>
      <TextArea rows={4}/>
      <Button block type="primary">Commit To Branch</Button>
    </Space>
  </div>

  const action = <Space direction="vertical" size="middle" style={{display: 'flex'}}>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>

  return (
      <Block title="Status" bottom={bottom} action={action}>
        <Checkbox.Group value={checkedList} onChange={onChange}
                        className="status-file-list">
          {fileState.map(s => <FileState key={s.file} s={s}/>)}
        </Checkbox.Group>
      </Block>
  );
};

export default Changes;
