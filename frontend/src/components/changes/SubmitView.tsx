import {State} from "../../store";
import React, {useState} from "react";
import {Button, Input,Space} from 'antd';
import { useSelector} from "react-redux";
import {success, warning} from "../../utils/common"
import {Commit} from "../../../wailsjs/go/repository/Repository"

const {TextArea} = Input;

const SubmitView = (props: { checkedList :string[],unchangedFileInWorkspace:string[],success:()=>void }) => {
  const [commitName,setCommitName] = useState<string>("")
  const [commitMessage,setCommitMessage] = useState<string>("")
  const branch = useSelector((state: State) => state.main.selectedRepositoryBranch);

  const commit = async () => {
    if(commitName.length === 0){
      warning("Please fill in the title for the submission.")
      return
    }
    if(props.checkedList.length === 0 && props.unchangedFileInWorkspace.length==0){
      warning("Please check the box for the file you want to submit.")
      return
    }
    let submitList =  props.checkedList.filter((item) => !props.unchangedFileInWorkspace.includes(item));

    try {
      const hash = await Commit(commitName,commitMessage,submitList);
      success("Commit hash:"+hash)
      setCommitName("")
      setCommitMessage("")
      props.success()
    }catch (e) {
      console.log(e)
      warning(JSON.stringify(e))
    }
  }

  return <div style={{padding: 12}}>
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
}

export default SubmitView
