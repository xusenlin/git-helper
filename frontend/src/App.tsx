import './App.css';
import {State} from "./store";
import {Empty, ConfigProvider, Tabs} from "antd"
import Sides from "./components/sides/Sides"
import SidesTop from "./components/sides/SidesTop"
import Changes from "./components/changes/Index"
import History from "./components/history/Index"
import Tag from "./components/tag/Index"
import Theme from "./components/dialog/Theme"
import Branch from "./components/branch/Index"
import TopBar from "./components/topBar/TopBar"
import DiffWorkView from "./components/diff/DiffWorkView"
import DiffCommitView from "./components/diff/DiffCommitView"
import {setRepository, Category} from "./store/sliceCategory"
import {useDispatch, useSelector} from "react-redux";
import {ReadJsonFile} from "../wailsjs/go/main/App";
import {useState,useEffect} from "react";


function App() {
  const main = useSelector((state: State) => state.main);
  const themeColor = useSelector((state: State) => state.setting.themeColor);
  const dispatch = useDispatch();
  const [activeTab,setActiveTab] = useState("1")



  // ReadJsonFile().then(r => {
  //   console.log("ReadJsonFile")
  //   const data = JSON.parse(r) as Category[]
  //   dispatch(setRepository(data))
  // }).catch(e => {
  //   // warning(JSON.stringify(e))
  //   // console.log(e)
  // })


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
      <div style={{display:activeTab==="1"?"block":"none",padding: "12px 0"}}>
        <DiffWorkView />
      </div>
      <div style={{display:activeTab==="2"?"block":"none",padding:0}}>
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
            {/*<Helper/>*/}
          </>
        </div>
      </ConfigProvider>
  )
}

export default App
