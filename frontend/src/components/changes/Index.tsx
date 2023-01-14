import "./style.scss"
import {State, store} from "../../store";
import Block from "../block/Index"
import FileState from "./FileState"
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Input, Button, Space, Checkbox,Badge,Tooltip} from 'antd';
import { PresetStatusColorType } from "antd/es/_util/colors"
import {FileStatus,Commit} from "../../../wailsjs/go/repository/Repository"
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {success, warning} from "../../utils/common";
import {setRepositoryStatus, updateWorkZone} from "../../utils/repo";
import {setStatus} from "../../store/sliceMain";
import {resetState} from "../../store/sliceWorkDiff";


const {TextArea} = Input;


const Changes = () => {
  const dispatch = useDispatch();
  const branch = useSelector((state: State) => state.main.selectedRepositoryBranch);
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const fileState = useSelector((state: State) => state.main.currentlyRepositoryFileState);

  const [commitName,setCommitName] = useState<string>("")
  const [commitMessage,setCommitMessage] = useState<string>("")

  const [badgeStatus,setBadgeStatus] = useState<PresetStatusColorType>("success")


  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const commit = async () => {
    if(commitName.length === 0){
      warning("Please fill in the title for the submission.")
      return
    }
    if(checkedList.length === 0){
      warning("Please check the box for the file you want to submit.")
      return
    }
    try {
      const hash = await Commit(commitName,commitMessage,checkedList as string[]);
      success("Commit hash:"+hash)
      setCommitName("")
      setCommitMessage("")
      setCheckedList([])
      await updateWorkZone(selectedRepositoryId,branch)
      dispatch(resetState())
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
    setCheckedList(e.target.checked ? fileState.map(r => r.path) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const getChangesStatus = () => {
    setBadgeStatus('processing')
    FileStatus().then((s)=>{
      dispatch(setStatus(s))
      setRepositoryStatus(selectedRepositoryId,Array.isArray(s)&&s.length !==0)
    }).catch(e=>{
      console.log(e)
      warning( JSON.stringify(e))
    }).finally(()=>{
      setTimeout(()=>{
        setBadgeStatus('success')
      },1000)
    })
  }

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

  const action = <Space size="middle" style={{display: 'flex'}}>
    <div>{checkedList.length}</div>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>



  return (
      <Block
          // title={<Badge status="success" /><RedoOutlined onClick={getChangesStatus} style={{cursor:'pointer'}} />}
          title={
            <div style={{cursor:'pointer'}} onClick={getChangesStatus}>
              <Badge status={badgeStatus} text="Refresh"/>
            </div>
          }
          bottom={bottom}
          action={action}>
        <Checkbox.Group
            value={checkedList}
            onChange={onChange}
            className="status-file-list">
          {fileState.map(s => <FileState key={s.path} s={s}/>)}
        </Checkbox.Group>
      </Block>
  );
};

export default Changes;
