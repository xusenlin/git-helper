import './style.scss'
import {useSelector} from "react-redux";
import {State} from "../../store";
import {repository} from "../../../wailsjs/go/models"


const diffRow = (c: repository.DiffContent) => {
  switch (c.type) {
    case 1:
      return <p key={c.index} style={{background: "#e7ffed"}}>{c.content}</p>
    case 2:
      return <p key={c.index} style={{background: '#ffeef0'}}>{c.content}</p>
    default:
      return <p key={c.index} style={{marginLeft: 6}}>{c.content}</p>
  }
}


const DiffWorkView = () => {
  const content = useSelector((state: State) => state.diffWork.content);
  return <div className="diff">
    {content.map(r => diffRow(r))}
  </div>
}
export default DiffWorkView
