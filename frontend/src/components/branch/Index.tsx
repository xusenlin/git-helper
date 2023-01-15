import "./style.scss"
import Item from "./Item"
import {State} from "../../store";
import React, {useState, useRef, useMemo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Space, Drawer, Empty} from "antd";
import {AddBranch,GetAllBranch} from "../../../wailsjs/go/repository/Repository"
import {repository} from "../../../wailsjs/go/models"
import {setOpenRepositoryBranch} from "../../store/sliceSetting";
import {warning} from "../../utils/common"
import MergeDialog from "./mergeDialog"


const Branch = () => {
  const limit = 20

  const dispatch = useDispatch();
  const [branch,setBranch] = useState<repository.Branch[]>([]);

  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const showRepositoryBranch = useSelector((state: State) => state.setting.showRepositoryBranch);
  const mergeDialogComponentRef = useRef<{ OpenMergeDialog: (branchName: string) => void }>(null);
  const [branchName, setBranchName] = useState<string>("")

  const [keyword,setKeyword] = useState<string>("")
  const computedBranch = useMemo(() => (branch.filter(r=>r.name.indexOf(keyword)!==-1)), [keyword,branch]);

  const getAllBranch = () => {
    if(!selectedRepositoryId){
      return
    }
    GetAllBranch().then(b=>{
      setBranch(b||[])
    }).catch(e=>{
      warning(JSON.stringify(e))
    })
  }
  useEffect(() => {
    getAllBranch()
  }, [selectedRepositoryId]);


  const addBranch = async () => {
    try {
      await AddBranch(branchName)
      getAllBranch()
      setBranchName("")
    } catch (e) {
      console.log(e)
      warning("Branch：" + JSON.stringify(e))
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
      <Button block type="primary" onClick={async () => {
        await addBranch()
      }}>Add New Branch</Button>
    </Space>
  </div>

  const content = <>
    <div style={{flex: 1, overflowY: "auto", padding: 20}}>
      <Input value={keyword} style={{marginBottom:10}} placeholder="Search all branch" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
      }} />
      {(computedBranch.length > limit ? computedBranch.slice(0, limit) : computedBranch).map(r => <Item merge={() => {
        mergeDialogComponentRef.current?.OpenMergeDialog(r.name)
      }} b={r} key={r.name}/>)}
    </div>
    <div style={{padding: 20}}>
      {bottom}
    </div>
  </>

  return (
      <Drawer
          title="Branch manage"
          extra={<div style={{fontSize:12,color:'#999'}}>Total：{branch.length}</div>}
          bodyStyle={{display: 'flex', flexDirection: "column", padding: 0}}
          placement="right"
          onClose={onCloseBranch}
          destroyOnClose={true}
          open={showRepositoryBranch}
      >
        <MergeDialog ref={mergeDialogComponentRef}/>
        {selectedRepositoryId ? content :
            <Empty style={{marginTop: 200}} description="please select a git repository first"/>}
      </Drawer>
  );
};

export default Branch;
