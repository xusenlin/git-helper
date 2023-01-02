import {useSelector} from "react-redux";
import {State} from "../../store";

const DiffView = () => {
  const content = useSelector((state: State) => state.diff.content);

  return <div>
    {content.map((r,i)=><p key={i} style={{marginBottom:8,whiteSpace: "pre-wrap"}}>{r}</p>)}
  </div>
}
export default DiffView
