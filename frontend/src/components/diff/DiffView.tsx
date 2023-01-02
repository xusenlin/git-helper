import {useSelector} from "react-redux";
import {State} from "../../store";
import {main} from "../../../wailsjs/go/models"

const style = {
  margin:0,
  padding:6,
  whiteSpace: "pre-wrap",
  fontSize:14,
}

const diffRow = (c : main.DiffContent) => {
  switch (c.type){
    case 1:
      return <p style={{...style,background:"#ffeef0"}}>{c.content}</p>
    case 2:
      return <p style={{...style,background:'#e7ffed'}}>{c.content}</p>
    default:
      return <p style={{...style,marginLeft:6}}>{c.content}</p>
  }
}


const DiffView = () => {
  const content = useSelector((state: State) => state.diff.content);
  return <div>
    {content.map(r=>diffRow(r))}
  </div>
}
export default DiffView
