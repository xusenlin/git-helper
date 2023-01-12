import {Badge, Card, Space} from "antd"
import {copyHashClipboard} from "../../utils/common"
import {SnippetsOutlined, FieldTimeOutlined, UserOutlined, EyeOutlined} from "@ant-design/icons"
import {repository} from "../../../wailsjs/go/models";
import {asyncDiffCommit} from "../../store/sliceCommitDiff";
import {hashLength} from "../../config/app";
import {useSelector} from "react-redux";
import {State} from "../../store";


const style = {
  item:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6a6a6a",
  },
  msg:{color: "#6a6a6a",fontSize:13,marginTop:10}
}

const Item = (props: { l: repository.Commit,nextHash:string }) => {
  const themeColor = useSelector((state: State) => state.setting.themeColor);
  const commitId = useSelector((state: State) => state.diffCommit.commitId);

  const extra = <Space>
    <SnippetsOutlined
        onClick={async () => {await copyHashClipboard(props.l.hash)}}
        style={{cursor: "pointer", opacity: 0.45}}/>
    {props.nextHash &&
    <EyeOutlined
        onClick={()=>{asyncDiffCommit(props.l.hash,props.nextHash)}}
        style={{cursor: "pointer",opacity: 0.45}} />
    }
  </Space>

  return (
      <Card size="small"
            title={<Badge status="success" text={props.l.hash.substring(0, hashLength)} />}
            extra={extra}
            style={{marginBottom: 10,borderColor:props.l.hash === commitId?themeColor:"#f0f0f0"}}
      >
        <div style={style.item}>
          <div>
            <UserOutlined />
            <span style={{marginLeft:10}}>{props.l.committer.name}</span>
          </div>
          <div>
            <FieldTimeOutlined/>
            <span style={{marginLeft:10}}>{props.l.committer.when}</span>
          </div>
        </div>
        <p style={style.msg}>{props.l.message}</p>
      </Card>
  );
};

export default Item;
