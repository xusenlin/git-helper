import './style.scss'
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {repository} from "../../../wailsjs/go/models"
import {resetState} from "../../store/sliceWorkDiff";
import FailedInfo from "./FailedInfo"

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
  const dispatch = useDispatch();
  const diff = useSelector((state: State) => state.diffWork);
  const changesFileFile = useSelector((state: State) => state.main.currentlyRepositoryFileState);
  useEffect(()=>{
    console.log("DiffWorkViewUseEffect")
    dispatch(resetState())
  },[changesFileFile])

  return <div className="diff">
    { diff.failedInfo ? FailedInfo(diff.failedInfo) : diff.diffText.map(r => diffRow(r))}
  </div>
}
export default DiffWorkView
