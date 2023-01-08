import {main} from "../../../wailsjs/go/models"
import React from "react";
import {Checkbox, Dropdown, MenuProps,Modal} from 'antd';
import { WarningOutlined } from "@ant-design/icons"
import {asyncDiffWorkStage} from "../../store/sliceWorkDiff"
import {useSelector} from "react-redux";
import {State} from "../../store";
import { DiscardChanges } from "../../../wailsjs/go/main/App"
import {success, warning} from "../../utils/common"
import {updateWorkZone} from "../../utils/repo";

const color = (s: string) => {
  // Unmodified         StatusCode = ' '
  // Untracked          StatusCode = '?'
  // Modified           StatusCode = 'M'
  // Added              StatusCode = 'A'
  // Deleted            StatusCode = 'D'
  // Renamed            StatusCode = 'R'
  // Copied             StatusCode = 'C'
  // UpdatedButUnmerged StatusCode = 'U'
  switch (s) {
    case "M":
      return {background: "#d48806"}
    case "A":
      return {background: "#7cb305"}
    case "D":
      return {background: "#d4380d"}
    case "R":
      return {background: "#0958d9"}
    case "C":
      return {background: "#531dab"}
    case "U":
      return {background: "#c41d7f"}
    default:
      return {background: "#8c8c8c"}
  }

}


const FileState = (props: { s: main.Status }) => {
  const path = useSelector((state: State) => state.diffWork.filePath);
  const repoId = useSelector((state: State) => state.main.selectedRepositoryId);

  const contextMenu = (path:string):MenuProps['items'] => {

    const confirmDiscardChanges = () => {
      Modal.confirm({
        title: 'Confirm discard changes.',
        icon: <WarningOutlined />,
        content: <div style={{padding:"10px 0"}}>
          <p>This file will be restored to its previous state.</p>
          <p>file:{path}</p>
        </div>,
        onOk() {
          return new Promise((resolve, reject) => {
            DiscardChanges(path).then(()=>{
              resolve("success")
              return updateWorkZone(repoId)
            }).catch((e)=>{
              reject(e)
            })
          }).catch((e) => warning(e));
        },
        onCancel() {},
      });
    };

    const discardChanges = {
      label:<a href="#!" onClick={confirmDiscardChanges}>DiscardChanges</a>,
      key:'discard-changes',
      icon:<WarningOutlined />
    }
    return [discardChanges]
  }

  return <div className="file">
    <Checkbox value={props.s.path} style={{marginRight: 6}}/>
    <Dropdown menu={{ items:contextMenu(props.s.path) }} trigger={['contextMenu']}>
      <span
          className="file-name"
          style={{opacity: path == props.s.path ? 1 : 0.45}}
          onClick={() => {
            asyncDiffWorkStage(props.s.path)
          }}
      >{props.s.name}</span>
    </Dropdown>
    <div style={{display: "flex"}}>
      <span className="dot" style={color(props.s.staging)}>{props.s.staging}</span>
      <span className="dot" style={color(props.s.worktree)}>{props.s.worktree}</span>
    </div>

  </div>
}

export default FileState
