import './App.css';
import {Empty, ConfigProvider, Tabs} from "antd"
import Sides from "./components/sides/Sides"
import SidesTop from "./components/sides/SidesTop"
import Changes from "./components/changes/Index"
import History from "./components/history/Index"
import Tag from "./components/tag/Index"
import Theme from "./components/dialog/Theme"
import Branch from "./components/branch/Index"
// import Helper from "./components/helper/Index"
import TopBar from "./components/topBar/TopBar"
import DiffView from "./components/diff/DiffView"
import {setRepository, Category} from "./store/sliceCategory"
import {useDispatch, useSelector} from "react-redux";
import {State} from "./store";
import {ReadJsonFile} from "../wailsjs/go/main/App";


function App() {
  const main = useSelector((state: State) => state.main);
  const themeColor = useSelector((state: State) => state.setting.themeColor);
  const dispatch = useDispatch();

  ReadJsonFile().then(r => {
    const data = JSON.parse(r) as Category[]
    dispatch(setRepository(data))
  }).catch(e => {
    // warning(JSON.stringify(e))
    // console.log(e)
  })


  const content = <>
    <div className="left">
      <Tabs
          style={{height:"100%"}}
          defaultActiveKey="1"
          centered
          items={[
            {
              label: `Changes`,
              key: "1",
              children: <Changes/>,
            },
            {
              label: `History`,
              key: "2",
              children: <History/>,
            }
          ]}
      />
    </div>
    <div className="right">
      <DiffView/>
    </div>
  </>

  const empty = <div className="main">
    <Empty description={false}/>
  </div>

  return (
      <ConfigProvider
          theme={{token: {colorPrimary: themeColor}}}
      >
        <div className="app">
          <div className="sides">
            <SidesTop/>
            <Sides/>
          </div>
          <div className="container">
            <TopBar/>
            <div className="main">
              {main.selectedRepositoryId && main.selectedRepositoryBranch ? content : empty}
            </div>
          </div>
          <>
            <Tag/>
            <Branch/>
            <Theme/>
            {/*<Helper/>*/}
          </>
        </div>
      </ConfigProvider>
  )
}

export default App
