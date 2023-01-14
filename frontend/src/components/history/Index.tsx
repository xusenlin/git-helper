import Block from "../block/Index"
import Item from "./Item"
import {useSelector} from "react-redux";
import {State} from "../../store";

const History = () => {
  const logs = useSelector((state: State) => state.main.currentlyRepositoryCommits);

  return (
      <Block>
        <div style={{padding:12}}>
          {logs.map((r,index)=><Item nextHash={index===(logs.length-1)?"":logs[index+1].hash} l={r} key={r.hash} />)}
        </div>
      </Block>
  );
};

export default History;
