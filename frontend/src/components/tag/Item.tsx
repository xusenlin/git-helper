// import dayjs from "dayjs"
import {Card, Checkbox, Modal} from "antd"
// import {useDispatch} from "react-redux";
import { repository } from "../../../wailsjs/go/models"
// import relativeTime from 'dayjs/plugin/relativeTime';
import {DelTag} from "../../../wailsjs/go/repository/Repository"
import {Tags} from "../../../wailsjs/go/repository/Repository"

import {warning, success, copyHashClipboard} from "../../utils/common";
import {DeleteOutlined, FieldTimeOutlined, SnippetsOutlined, TagOutlined} from "@ant-design/icons"

// dayjs.extend(relativeTime)


const Item = (props:{t:repository.Tag,refresh:()=>void}) => {
  const delTag = (name:string)=>{
    Modal.warning({
      closable:true,
      title: 'Confirm message',
      content: <div style={{padding:"20px 0"}}>
        <p>Are you sure you want to delete this tag??</p>
        <Checkbox id="delRemoteTagCheckbox" style={{marginRight:10}}>Delete the remote Tag at the same time.</Checkbox>
      </div>,
      onOk(){
        const checkbox = document.getElementById("delRemoteTagCheckbox") as HTMLInputElement
        DelTag(name,checkbox.checked).then(()=>{
          success("Delete success");
          props.refresh()
          // Tags().then(t=>{
          //   dispatch(setTag(t))
          // }).catch(e=>{
          //   console.log(e)
          //   warning("Tag："+JSON.stringify(e))
          // })
        }).catch(e=>{
          warning(JSON.stringify(e))
        })
      }
    });
  }
  return (
      <Card size="small" title={props.t.name} extra={
        <DeleteOutlined onClick={()=>{delTag(props.t.name)}} style={{cursor: "pointer", opacity: 0.45}} />
      } style={{marginBottom:10}}>
        <div className="tag-content">
          <p>{props.t.refName}</p>
          <div className="item">
            <div>hash:{props.t.hash.substring(0,7)}</div>
            <SnippetsOutlined onClick={async () => {await copyHashClipboard(props.t.hash)}} style={{cursor: "pointer", opacity: 0.65}}/>
          </div>
          <div className="item">
            <div>
              <TagOutlined />
              <span style={{marginLeft:10}}>{props.t.type}</span>
            </div>
            <div>
              <FieldTimeOutlined/>
              <span style={{marginLeft:10}}>{props.t.time}</span>
            </div>
          </div>
          <div className="msg">{props.t.message}</div>
        </div>
      </Card>
  );
};

export default Item;
