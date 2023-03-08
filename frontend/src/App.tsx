import './App.css';
import {State} from "./store";
import {Empty, ConfigProvider, Tabs} from "antd"
import Sides from "./components/sides/Sides"
import SidesTop from "./components/sides/SidesTop"
import Changes from "./components/changes/Index"
import History from "./components/history/Index"
import Tag from "./components/tag/Index"
import Theme from "./components/dialog/Theme"
import About from "./components/dialog/About"
import Branch from "./components/branch/Index"
import TopBar from "./components/topBar/TopBar"
import DiffWorkView from "./components/diff/DiffWorkView"
import DiffCommitView from "./components/diff/DiffCommitView"
import {useSelector} from "react-redux";
import {useState} from "react";


function App() {
  const main = useSelector((state: State) => state.main);
  const themeColor = useSelector((state: State) => state.setting.themeColor);
  const [activeTab,setActiveTab] = useState("1")


  const content = <>
    <div className="left">
      <Tabs
          style={{height:"100%"}}
          defaultActiveKey={activeTab}
          centered
          onChange={(k:string)=>{setActiveTab(k)}}
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
      <div style={{display:activeTab==="1"?"block":"none",padding: "12px 0",height:"100%"}}>
        <DiffWorkView />
      </div>
      <div style={{display:activeTab==="2"?"block":"none",padding:0,height:"100%"}}>
        <DiffCommitView/>
      </div>
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
            <About/>
          </>
        </div>
      </ConfigProvider>
  )
}

export default App
