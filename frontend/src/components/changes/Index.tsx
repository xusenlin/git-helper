import "./style.scss"
import {State} from "../../store";
import Block from "../block/Index"
import FileState from "./FileState"
import React, {useState,useMemo,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Space, Checkbox,Badge} from 'antd';
import { PresetStatusColorType } from "antd/es/_util/colors"
import {FileStatus} from "../../../wailsjs/go/repository/Repository"
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import {success, warning} from "../../utils/common";
import {setRepositoryStatus, updateWorkZone} from "../../utils/repo";
import {setStatus} from "../../store/sliceMain";
import SubmitView  from "./SubmitView";



const Changes = () => {
  const dispatch = useDispatch();
  const branch = useSelector((state: State) => state.main.selectedRepositoryBranch);
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const [badgeStatus,setBadgeStatus] = useState<PresetStatusColorType>("success")

  const fileState = useSelector((state: State) => state.main.currentlyRepositoryFileState);

  const changedFileInWorkspace = useMemo( ()=>fileState.filter(r=>(r.worktree != " ")).map(r => r.path),[fileState])
  const unchangedFileInWorkspace = useMemo( ()=>fileState.filter(r=>(r.worktree == " ")).map(r => r.path),[fileState])

  const [checkedList, setCheckedList] = useState<string[]>(unchangedFileInWorkspace);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(()=>{
    setCheckedList(unchangedFileInWorkspace)
  },[fileState])

  useEffect(()=>{
    if(fileState.length===0){
      setCheckAll(false);
      setIndeterminate(false);
      return
    }
    setCheckAll(checkedList.length === fileState.length);
    setIndeterminate(checkedList.length !==0 && checkedList.length < fileState.length);
  },[checkedList])

  const commitSuccess = async () => {
    try {
      setCheckedList([])
      await updateWorkZone(selectedRepositoryId,branch)
    }catch (e) {
      console.log(e)
      warning(JSON.stringify(e))
    }
  }

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list as string[]);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    let checkedList = e.target.checked ? [...changedFileInWorkspace,...unchangedFileInWorkspace] : unchangedFileInWorkspace
    setCheckedList(checkedList);
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

  const action = <Space size="middle" style={{display: 'flex'}}>
    <div>{checkedList.length}</div>
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      Check all
    </Checkbox>
  </Space>


  return (
      <Block
          title={
            <div style={{cursor:'pointer'}} onClick={getChangesStatus}>
              <Badge status={badgeStatus} text="Refresh"/>
            </div>
          }
          bottom={<SubmitView checkedList={checkedList} success={commitSuccess} unchangedFileInWorkspace={unchangedFileInWorkspace}/>}
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
