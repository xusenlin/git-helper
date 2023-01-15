import './style.scss'
import { Badge } from "antd"
import {useSelector} from "react-redux";
import {State} from "../../store";
import {repository} from "../../../wailsjs/go/models"

const buildFlag = (d:string) => {
  let str = d.split("")
  return str.map((r,index)=>{
    let c = ""
    if(r==="+"){
      c = "#4caf50"
    }else if(r==="-"){
      c = "#f44336"
    }else {
      c = "#222"
    }
    return <span key={index} style={{color:c}}>{r}</span>
  })
}

const diffRow = (c: repository.ChangesFile) => {

      const color = (d:string):string => {
        if(/Bin 0 ->/.test(d)){
          return "#4caf50"
        }
        if(/Bin \d* -> 0 /.test(d)){
          return "#f44336"
        }
        return "#222"
      }

      return <div className="diff-commit-row" key={c.index}>
        <div className="diff-commit-left">{c.fileName}</div>
        {/^\d* [+-]*$/.test(c.desc)?<div className="diff-commit-right">{buildFlag(c.desc)}</div>:<div className="diff-commit-right" style={{color:color(c.desc)}}>{c.desc}</div>}
      </div>

}


const DiffCommitView = () => {
  const diff = useSelector((state: State) => state.diffCommit);
  return <div className="diff-commit">
    <div className="diff-commit-row" style={{height:46,marginBottom:10,borderBottom:"1px solid rgba(5, 5, 5, 0.06)"}}>
      <div className="diff-commit-left" style={{paddingLeft:10}}><Badge status="processing" text={'Hash ：'+diff.commitId.substring(0, 7)} /></div>
      <div className="diff-commit-right" style={{color:"#4caf50"}}>{ diff.statistics }</div>
    </div>
    <div className="diff-changes-file">
      {diff.filesInfo.map(r=>diffRow(r))}
    </div>
  </div>
}
export default DiffCommitView
