import {Badge, Card, Checkbox, Modal,Space,Spin,message} from "antd"
import {repository} from "../../../wailsjs/go/models"
import {DelTag,PushTag} from "../../../wailsjs/go/repository/Repository"
import {warning, success, copyHashClipboard} from "../../utils/common";
import {DeleteOutlined,ArrowUpOutlined, FieldTimeOutlined, SnippetsOutlined, TagOutlined} from "@ant-design/icons"


const Item = (props: {isRemoteSync:boolean, t: repository.Tag, refresh: () => void }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const pushTag = (name:string) => {
    messageApi.open({
      type: 'loading',
      content: 'Pushing...',
      duration: 0,
    });
    PushTag(name).then(out=>{
      success(out)
      props.refresh()
    }).catch(e=>{
      warning(e)
    }).finally(messageApi.destroy)
  }

  const delTag = (name: string) => {
    Modal.warning({
      closable: true,
      title: 'Confirm message',
      content: <div style={{padding: "20px 0"}}>
        <p>Are you sure you want to delete this tag??</p>
        <Checkbox id="delRemoteTagCheckbox" style={{marginRight: 10}}>Delete the remote Tag at the same time.</Checkbox>
      </div>,
      onOk() {
        const checkbox = document.getElementById("delRemoteTagCheckbox") as HTMLInputElement
        DelTag(name, checkbox.checked).then(() => {
          success("Delete success");
          props.refresh()
        }).catch(e => {
          warning(JSON.stringify(e))
        })
      }
    });
  }
  return (
      <Card
          size="small"
          title={<Badge status={props.isRemoteSync?'success':'warning'} text={props.t.name}/>}
          extra={
              <Space>
                { !props.isRemoteSync && <ArrowUpOutlined  onClick={() => {
                  pushTag(props.t.name)
                }} style={{cursor: "pointer", opacity: 0.45}}/> }
                <DeleteOutlined onClick={() => {
                  delTag(props.t.name)
                }} style={{cursor: "pointer", opacity: 0.45}}/>
              </Space>
          }
          style={{marginBottom: 10}}
      >
        {contextHolder}
        <div className="tag-content">
          <p>{props.t.refName}</p>
          <div className="item">
            <div>hash:{props.t.hash.substring(0, 7)}</div>
            <SnippetsOutlined onClick={async () => {
              await copyHashClipboard(props.t.hash)
            }} style={{cursor: "pointer", opacity: 0.65}}/>
          </div>
          <div className="item">
            <div>
              <TagOutlined/>
              <span style={{marginLeft: 10}}>{props.t.type}</span>
            </div>
            <div>
              <FieldTimeOutlined/>
              <span style={{marginLeft: 10}}>{props.t.time}</span>
            </div>
          </div>
          {
              props.t.type !== "commit" && <div className="msg">{props.t.message}</div>
          }
        </div>
      </Card>
  );
};

export default Item;
