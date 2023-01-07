import {Button, Modal, Result} from 'antd';
import { LoadingOutlined } from "@ant-design/icons"
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {useState, useImperativeHandle, forwardRef} from "react";
import {success, warning} from "../../utils/common";
import {GetLastCommit, PreMergeResult, MergeCommit, MergeRebase, MergeSquash, Log} from "../../../wailsjs/go/main/App";
import {main} from "../../../wailsjs/go/models";
import {warningNotification} from "../../utils/notification";
import {setLog} from "../../store/sliceMain";


const MergeDialog = (props: {}, ref: any) => {
  const dispatch = useDispatch();
  const currentBranchName = useSelector((state: State) => state.main.selectedRepositoryBranch);
  const [openMerge, setOpenMerge] = useState(false);
  const [loading, setLoading] = useState(false);

  const [preMergeResult, setPreMergeResult] = useState<main.MergeResult | null>(null);

  const [mergeContent, setMergeContent] = useState({
    ourBranchHash: "",
    ourBranchName: "",
    theirBranchHash: "",
    theirBranchName: "",
  });

  const OpenMergeDialog = async (mergeName: string) => {
    setOpenMerge(true)
    setLoading(true)
    try {
      let ourBranchHash = await GetLastCommit(currentBranchName)
      let theirBranchHash = await GetLastCommit(mergeName)
      setMergeContent({
        ourBranchHash,
        ourBranchName: currentBranchName,
        theirBranchHash,
        theirBranchName: mergeName,
      })

      const result = await PreMergeResult(ourBranchHash, theirBranchHash)
      setPreMergeResult(result)

    } catch (e) {
      console.log(e)
      warning(JSON.stringify(e))
    }finally {
      setTimeout(()=>{setLoading(false)},500)
    }

  }


  useImperativeHandle(ref, () => ({OpenMergeDialog}))


  const subTitle = () => {
    if(preMergeResult?.kind === 1){
      return <div>There will be <strong>{preMergeResult.count}</strong> conflicted file when merging <strong>{mergeContent.theirBranchName}</strong> into <strong>{mergeContent.ourBranchName}</strong></div>
    }
    if(preMergeResult?.kind === 2){
      if(preMergeResult?.count === 0){
        return <div>This branch is up to date with <strong>{mergeContent.theirBranchName}</strong></div>
      }else {
        return <div>
          This will merge <strong>{preMergeResult?.count}</strong> commit{preMergeResult?.count >=2 ?'s':''} from <strong>{mergeContent.theirBranchName}</strong> into <strong>{mergeContent.ourBranchName}</strong></div>
      }
    }
    return
  }


  const rebaseMerge = () => {
    MergeRebase(mergeContent.ourBranchName,mergeContent.theirBranchName).then(out=>{
      success(out)
      return Log()
    }).then(l=>{
      dispatch(setLog(l))
      setOpenMerge(false)
    }).catch(e=>{
      warningNotification(e,{width:500})
    })

  }
  const squashMerge = () => {
    MergeSquash(mergeContent.ourBranchName,mergeContent.theirBranchName).then(out=>{
      success(out)
      return Log()
    }).then(l=>{
      dispatch(setLog(l))
      setOpenMerge(false)
    }).catch(e=>{
      warningNotification(e,{width:500})
    })
  }
  const commitMerge = () => {
    MergeCommit(mergeContent.ourBranchName,mergeContent.theirBranchName).then(out=>{
      success(out)
      return Log()
    }).then(l=>{
      dispatch(setLog(l))
      setOpenMerge(false)
    }).catch(e=>{
      warningNotification(e,{width:500})
    })
  }

  return <Modal
      width={600}
      open={openMerge}
      title={`Merge branch ${mergeContent.theirBranchName} into ${mergeContent.ourBranchName}.`}
      onCancel={() => {
        setOpenMerge(false)
        setPreMergeResult(null)
      }}
      footer={[
        <Button key="rebase" type="primary" onClick={rebaseMerge}>
          Rebase
        </Button>,
        <Button key="squash" type="primary" onClick={squashMerge}>
          Squash and merge
        </Button>,
        <Button key="submit" type="primary" onClick={commitMerge}>
          Create a merge commit
        </Button>,
      ]}
  >
    <Result
      status={preMergeResult?.kind === 1 ? 'warning' : 'success'}
      icon={loading ? <LoadingOutlined /> :''}
      subTitle={subTitle()}/>
  </Modal>
}

export default forwardRef(MergeDialog)

