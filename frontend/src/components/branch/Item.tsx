import {Card, Modal,Space,Checkbox} from "antd"
import dayjs from "dayjs"
import {useState} from "react"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import relativeTime from 'dayjs/plugin/relativeTime';
import {warning, success, copyHashClipboard} from "../../utils/common";
import {main} from "../../../wailsjs/go/models"
import {DelBranch, GetBranch} from "../../../wailsjs/go/main/App"
import {DeleteOutlined, SnippetsOutlined,ArrowRightOutlined} from "@ant-design/icons"
import {setAllBranch} from "../../store/sliceMain";
import {useDispatch} from "react-redux";
import {mainBranch} from "../../config/app";

dayjs.extend(relativeTime)


const Item = (props: { b: main.Branch }) => {
  const dispatch = useDispatch();

  const delBranch = (name: string) => {
    Modal.warning({
      closable: true,
      title: 'Confirm message',
      content: <div style={{padding:"20px 0"}}>
        <p>Are you sure you want to delete this branch?</p>
        <Checkbox id="delRemoteBranchCheckbox" style={{marginRight:10}}>Delete the remote branch at the same time.</Checkbox>
      </div>,
      onOk() {
        const checkbox = document.getElementById("delRemoteBranchCheckbox") as HTMLInputElement
        DelBranch(name,checkbox.checked).then(out => {
          success(out);
          return GetBranch()
        }).then(b => {
          dispatch(setAllBranch(b))
        }).catch(e => {
          warning(JSON.stringify(e))
        })
      }
    });
  }

  const extra = <Space>
    {
        (mainBranch != props.b.name) &&
        <DeleteOutlined onClick={() => {
          delBranch(props.b.name)
        }} style={{cursor: "pointer", opacity: 0.45}}/>
    }
    <ArrowRightOutlined style={{cursor: "pointer", opacity: 0.45}} />
  </Space>

  return (
      <Card size="small" title={props.b.name} extra={extra} style={{marginBottom: 10}}>
        <div className="branch-content">
          <p>{props.b.refName}</p>
          <div className="item">
            <div>Hash:{props.b.hash.substring(0, 7)}</div>
            <SnippetsOutlined onClick={async () => {
              await copyHashClipboard(props.b.hash)
            }} style={{cursor: "pointer", opacity: 0.65}}/>
          </div>
        </div>
      </Card>
  );
};

export default Item;
