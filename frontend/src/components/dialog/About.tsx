import React from "react"
import { Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import { version } from "../../config/app"
import {setOpenAbout} from "../../store/sliceSetting";



const About =  () => {
  const showAbout = useSelector((state: State) => state.setting.showAbout);
  const dispatch = useDispatch();

  return (<>
    <Modal
        title="About"
        centered
        open={showAbout}
        onCancel={()=>{dispatch(setOpenAbout(false))}}
        footer={[]}
    >
      <div style={{padding:"40px 0"}}>
        <p>Version:{version}</p>
        <p>github:https://github.com/xusenlin/git-helper</p>
      </div>
    </Modal>
  </>)
}

export default About
