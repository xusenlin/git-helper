import {useDispatch, useSelector} from "react-redux";
import {Button, Space} from 'antd';
import {warning} from "../../../utils/common";
import {warningNotification,successNotification} from "../../../utils/notification";
import {OpenTerminal, OpenFileManage, GitPull, GitPush, Commits} from "../../../../wailsjs/go/repository/Repository"

import {setOpenRepositoryTag, setOpenRepositoryBranch} from "../../../store/sliceSetting";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CodeOutlined,
  FolderOpenOutlined,
  TagOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import React, {useState,useEffect} from "react";
import {State, store} from "../../../store";
import {setLog} from "../../../store/sliceMain";

const Action = () => {
  const [pullLoading,setPullLoading] = useState<boolean>(false)
  const [pushLoading,setPushLoading] = useState<boolean>(false)
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const branchName = useSelector((state: State) => state.main.selectedRepositoryBranch);

  const dispatch = useDispatch();
  useEffect(()=>{
    setPullLoading(false)
    setPushLoading(false)
  },[selectedRepositoryId])
  const openTerminal = async () => {
    if(!selectedRepositoryId){
      warning("please select a git repository first")
      return
    }
    try {
      await OpenTerminal()
    } catch (e) {
      warning(JSON.stringify(e))
    }
  }
  const openFileManage = () => {
    if(!selectedRepositoryId){
      warning("please select a git repository first")
      return
    }
    OpenFileManage().then(() => {
    }).catch(e => {
      warning(JSON.stringify(e))
    })
  }
  const openRepositoryTag = () => {
    dispatch(setOpenRepositoryTag(true))
  }
  const openRepositoryBranch = () => {
    dispatch(setOpenRepositoryBranch(true))

  }
  // const openMoreHelper = () => {
  //   dispatch(setOpenMoreHelper(true))
  // }
  const pushRepo = () => {
    if(!selectedRepositoryId){
      warning("please select a git repository first")
      return
    }
    setPushLoading(true)
    GitPush().then(out => {
      successNotification(out,{width:500})
      return Commits(branchName)
    }).then(l=>{
      dispatch(setLog(l))
    }).catch(e => {
      warningNotification(e,{width:500})
    }).finally(()=>{setPushLoading(false)})
  }
  const pullRepo = () => {
    if(!selectedRepositoryId){
      warning("please select a git repository first")
      return
    }
    setPullLoading(true)
    GitPull().then(out => {
      successNotification(out,{width:500})
    }).catch(e => {
      warningNotification(e,{width:500})
    }).finally(()=>{setPullLoading(false)})
  }
  return (
      <Space className="action">
        <Button loading={pullLoading} shape="circle" type="primary" onClick={pullRepo} icon={<ArrowDownOutlined/>}/>
        <Button loading={pushLoading} shape="circle" type="primary" onClick={pushRepo} icon={<ArrowUpOutlined/>}/>
        <Button shape="circle" type="primary" onClick={openTerminal} icon={<CodeOutlined/>}/>
        <Button shape="circle" type="primary" onClick={openFileManage} icon={<FolderOpenOutlined/>}/>
        <Button shape="circle" type="primary" onClick={openRepositoryBranch} icon={<BranchesOutlined/>}/>
        <Button shape="circle" type="primary" onClick={openRepositoryTag} icon={<TagOutlined/>}/>
        {/*<Button shape="circle" type="primary" onClick={openMoreHelper} icon={<MoreOutlined/>}/>*/}
      </Space>
  )
}

export default Action
