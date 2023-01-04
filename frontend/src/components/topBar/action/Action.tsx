import {useDispatch} from "react-redux";
import {Button, message, notification, Space} from 'antd';
import {warning} from "../../../utils/common";
import {OpenFileManage, OpenTerminal, GitPull, GitPush} from "../../../../wailsjs/go/main/App"
import {setOpenRepositoryTag, setOpenRepositoryBranch, setOpenMoreHelper} from "../../../store/sliceSetting";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CodeOutlined,
  FolderOpenOutlined,
  TagOutlined,
  BranchesOutlined,
  // MoreOutlined
} from '@ant-design/icons';
import React, {useState} from "react";

const Action = () => {
  const [pullLoading,setPullLoading] = useState<boolean>(false)
  const [pushLoading,setPushLoading] = useState<boolean>(false)

  const dispatch = useDispatch();

  const openTerminal = async () => {
    try {
      await OpenTerminal()
      await message.success("Dir cmd has been copied to clipboard.")
    } catch (e) {
      warning(JSON.stringify(e))
    }
  }
  const openFileManage = () => {
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
  const openMoreHelper = () => {
    dispatch(setOpenMoreHelper(true))
  }
  const pushRepo = () => {
    setPushLoading(true)
    GitPush().then(out => {
      notification.success({
        message: `Out`,
        description: <div style={{whiteSpace: "pre-wrap"}}>{out}</div>,
        placement: "topLeft",
        style: {
          width: 500,
          top: 40,
        },
      });
    }).catch(e => {
      notification.warning({
        message: `Tip`,
        description: <div style={{whiteSpace: "pre-wrap"}}>{e}</div>,
        placement: "topLeft",
        style: {
          width: 500,
          top: 40,
        },
      });
    }).finally(()=>{setPushLoading(false)})
  }
  const pullRepo = () => {
    setPullLoading(true)
    GitPull().then(out => {
      notification.success({
        message: `Out`,
        description: <div style={{whiteSpace: "pre-wrap"}}>{out}</div>,
        placement: "topLeft",
        style: {
          width: 500,
          top: 40,
        },
      });
    }).catch(e => {
      notification.warning({
        message: `Tip`,
        description: <div style={{whiteSpace: "pre-wrap"}}>{e}</div>,
        placement: "topLeft",
        style: {
          width: 500,
          top: 40,
        },
      });
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
