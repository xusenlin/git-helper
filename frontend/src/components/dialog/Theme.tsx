import React from "react"
import { Modal,Space} from "antd";
import {State} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import { theme,localThemeKey } from "../../config/app"
import {setOpenThemeSetting,setThemeColor} from "../../store/sliceSetting";


const ColorsBlock = (p:{c:string})=>{
  const themeColor = useSelector((state: State) => state.setting.themeColor);
  const dispatch = useDispatch();

  return <div
      onClick={()=>{
        dispatch(setThemeColor(p.c))
        localStorage.setItem(localThemeKey,p.c)
      }}
      style={{
        width:40,
        height:40,
        cursor:"pointer",
        borderRadius:"50%",
        background:p.c,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
  }}
  >
    {p.c === themeColor && <div style={{backgroundColor:"#fff",width:10,height:10,borderRadius:"50%",}}></div>}
  </div>
}


const ThemeSetting =  () => {
  const showThemeSetting = useSelector((state: State) => state.setting.showThemeSetting);

  const dispatch = useDispatch();


  return (<>
    <Modal
        title="Theme color select."
        centered
        open={showThemeSetting}
        onCancel={()=>{dispatch(setOpenThemeSetting(false))}}
        footer={[]}
    >
      <Space style={{padding:"40px 0"}}>
        {theme.map(r=><ColorsBlock key={r} c={r}/>)}
      </Space>
    </Modal>
  </>)
}

export default ThemeSetting
