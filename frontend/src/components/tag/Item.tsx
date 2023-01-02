import dayjs from "dayjs"
import {Card, Modal} from "antd"
import {useDispatch} from "react-redux";
import {setTag} from "../../store/sliceMain";
import { main } from "../../../wailsjs/go/models"
import relativeTime from 'dayjs/plugin/relativeTime';
import {DelTag, Tag} from "../../../wailsjs/go/main/App"
import {warning, success, copyHashClipboard} from "../../utils/common";
import {DeleteOutlined, FieldTimeOutlined, SnippetsOutlined, TagOutlined} from "@ant-design/icons"

dayjs.extend(relativeTime)


const Item = (props:{t:main.Tag}) => {
  const dispatch = useDispatch();
  const delTag = (name:string)=>{
    Modal.warning({
      closable:true,
      title: 'Confirm message',
      content: 'Are you sure you want to delete this tag?',
      onOk(){
        DelTag(name).then(()=>{
          success("Delete success");
          Tag().then(t=>{
            dispatch(setTag(t))
          }).catch(e=>{
            console.log(e)
            warning("Tag："+JSON.stringify(e))
          })
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
          {props.t.type === 1&&<div className="item">
            <div>hash:{props.t.hash.substring(0,7)}</div>
            <SnippetsOutlined onClick={async () => {await copyHashClipboard(props.t.hash)}} style={{cursor: "pointer", opacity: 0.65}}/>
          </div>}
          <div className="item">
            <div>commitHash:{props.t.commitHash.substring(0,7)}</div>
            <SnippetsOutlined onClick={async () => {await copyHashClipboard(props.t.commitHash)}} style={{cursor: "pointer", opacity: 0.65}}/>
          </div>
          <div className="item">
            <div>
              <TagOutlined />
              <span style={{marginLeft:10}}>{props.t.type === 1?'annotated':'lightweight'}</span>
            </div>
            <div>
              <FieldTimeOutlined/>
              <span style={{marginLeft:10}}>{dayjs(props.t.time).fromNow()}</span>
            </div>
          </div>
          <div className="msg">{props.t.message}</div>
        </div>
      </Card>
  );
};

export default Item;
