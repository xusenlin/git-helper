import "./style.scss"
import Item from "./Item"
import {State} from "../../store";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Space,Drawer,Empty} from "antd";
import { AddBranch,GetBranch } from "../../../wailsjs/go/main/App"
import {setOpenRepositoryBranch} from "../../store/sliceSetting";
import {setAllBranch} from "../../store/sliceMain";
import { warning } from "../../utils/common"

const Branch = () => {
  const dispatch = useDispatch();
  const branch = useSelector((state: State) => state.main.currentlyRepositoryAllBranch);
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const showRepositoryBranch = useSelector((state: State) => state.setting.showRepositoryBranch);

  const [branchName,setBranchName] = useState<string>("")

  const addBranch = async () => {
    try {
      await AddBranch(branchName)
      const t = await GetBranch()
      dispatch(setAllBranch(t))
      setBranchName("")
    }catch (e) {
      console.log(e)
      warning("Branch："+JSON.stringify(e))
    }
  }

  const onCloseBranch = () => {
    dispatch(setOpenRepositoryBranch(false))
  }


  const bottom = <div>
    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
      <Input placeholder="Name" value={branchName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setBranchName(e.target.value)
      }}/>
      <Button block type="primary" onClick={async ()=>{await addBranch()}}>Add New Branch</Button>
    </Space>
  </div>

  const content = <>
    <div style={{flex:1,overflowY:"auto",padding:20}}>
      { branch.map(r=><Item b={r} key={r.hash} />)}
    </div>
    <div style={{padding:20}}>
      {bottom}
    </div>
  </>
  return (
      <Drawer
          title="Branch manage"
          bodyStyle={{display:'flex',flexDirection:"column",padding:0}}
          placement="right"
          onClose={onCloseBranch}
          open={showRepositoryBranch}
      >
        {selectedRepositoryId?content:<Empty style={{marginTop:200}} description="please select a git repository first" />}
      </Drawer>
  );
};

export default Branch;
