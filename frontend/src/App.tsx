import './App.css';
import {Empty} from "antd"
import Sides from "./components/sides/Sides"
import SidesTop from "./components/sides/SidesTop"
import Changes from "./components/status/Index"
import History from "./components/history/Index"
import Tag from "./components/tag/Index"
import TopBar from "./components/topBar/TopBar"
import {useSelector} from "react-redux";
import {State} from "./store/dataType";

function App() {
  const main = useSelector((state: State) => state.main);

  const content = <div className="main"><Changes/><History/><Tag/></div>

  const empty = <div className="main" style={{justifyContent: "center", alignItems: 'center'}}>
    <Empty description={false}/>
  </div>

  return (
      <div className="app">
        <div className="sides">
          <SidesTop/>
          <Sides/>
        </div>
        <div className="container">
          <TopBar/>
          {main.selectedRepositoryId && main.selectedRepositoryBranch ? content : empty}
        </div>
      </div>
  )
}

export default App
