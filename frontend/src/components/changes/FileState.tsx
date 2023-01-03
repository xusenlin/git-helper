import { main } from "../../../wailsjs/go/models"
import React from "react";
import { Checkbox } from 'antd';
import { asyncDiffWorkStage } from "../../store/sliceWorkDiff"
import {useSelector} from "react-redux";
import {State} from "../../store";

const color = (s:string) => {
  // Unmodified         StatusCode = ' '
  // Untracked          StatusCode = '?'
  // Modified           StatusCode = 'M'
  // Added              StatusCode = 'A'
  // Deleted            StatusCode = 'D'
  // Renamed            StatusCode = 'R'
  // Copied             StatusCode = 'C'
  // UpdatedButUnmerged StatusCode = 'U'
  switch (s){
    case "M":
      return {background:"#d48806"}
    case "A":
      return {background:"#7cb305"}
    case "D":
      return {background:"#d4380d"}
    case "R":
      return {background:"#0958d9"}
    case "C":
      return {background:"#531dab"}
    case "U":
      return {background:"#c41d7f"}
    default:
      return {background:"#8c8c8c"}
  }

}


const FileState = (props:{s:main.Status}) => {
  const path = useSelector((state: State) => state.diffWork.filePath);

  return <div className="file">
    <Checkbox value={props.s.file} style={{marginRight:6}}/>
    <span
        className="file-name"
        style={{opacity:path==props.s.file?1:0.45}}
        onClick={()=>{asyncDiffWorkStage(props.s.file)}}
    >{props.s.file}</span>
    <div style={{display:"flex"}}>
      <span className="dot" style={color(props.s.staging)}>{props.s.staging}</span>
      <span className="dot" style={color(props.s.worktree)}>{props.s.worktree}</span>
    </div>
  </div>
}

export default FileState
