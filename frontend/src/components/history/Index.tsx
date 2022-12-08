import Block from "../block/Index"
import Item from "./Item"
import {useSelector} from "react-redux";
import {State} from "../../store";

const History = () => {
  const logs = useSelector((state: State) => state.main.currentlyRepositoryLogs);

  return (
      <Block title="History" >
        <div style={{padding:12}}>
          {logs.map(r=><Item l={r} />)}
        </div>

      </Block>
  );
};

export default History;
