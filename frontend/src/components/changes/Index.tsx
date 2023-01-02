import "./style.scss"
import {State} from "../../store";
import Block from "../block/Index"
import FileState from "./FileState"
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Input, Button, Space, Checkbox} from 'antd';
import { Commit } from "../../../wailsjs/go/main/App"
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {success, warning} from "../../utils/common";
import {updateWorkZone} from "../../utils/repo";


const {TextArea} = Input;


const Changes = () => {
  const branch = useSelector((state: State) => state.main.selectedRepositoryBranch);
  const fileState = useSelector((state: State) => state.main.currentlyRepositoryState);

  const [commitName,setCommitName] = useState<string>("")
  const [commitMessage,setCommitMessage] = useState<string>("")

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const commit = async () => {

    try {
      const hash = await Commit(commitName,commitMessage,checkedList as string[]);
      success("Commit hash:"+hash)
      setCommitName("")
      setCommitMessage("")
      await updateWorkZone()
    }catch (e) {
      console.log(e)
      warning(JSON.stringify(e))
    }
  }

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
      <Input value={commitName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setCommitName(e.target.value)
      }} placeholder="Title"/>
      <TextArea value={commitMessage} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommitMessage(e.target.value)
      }} rows={4}/>
      <Button block type="primary" onClick={async ()=>{await commit()}}>Commit to { branch }</Button>
    </Space>
  </div>

  const action = <Space direction="vertical" size="middle" style={{display: 'flex'}}>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>

  return (
      <Block title="Status" bottom={bottom} action={action}>
        <Checkbox.Group
            value={checkedList}
            onChange={onChange}
            className="status-file-list">
          {fileState.map(s => <FileState key={s.file} s={s}/>)}
        </Checkbox.Group>
      </Block>
  );
};

export default Changes;
