import { main } from "../../../wailsjs/go/models"
import React from "react";
import { Checkbox,Row } from 'antd';
import { yellow } from '@ant-design/colors';

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

const FileState = (props:{s:main.Status}) => <div className="file">
  <Checkbox value={props.s.file} style={{flex:1,overflow:"hidden",marginRight:6}}><span className="file-name">{props.s.file}</span></Checkbox>
  <div style={{display:"flex"}}>
    <span className="dot" style={color(props.s.staging)}>{props.s.staging}</span>
    <span className="dot" style={color(props.s.worktree)}>{props.s.worktree}</span>
  </div>
</div>
export default FileState
