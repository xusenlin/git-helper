import {Card} from "antd"
import {copyHashClipboard} from "../../utils/common"
import {SnippetsOutlined, FieldTimeOutlined,UserOutlined} from "@ant-design/icons"
import {main} from "../../../wailsjs/go/models";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const style = {
  item:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6a6a6a",
  },
  msg:{color: "#6a6a6a",fontSize:13,marginTop:10}
}

const Item = (props: { l: main.Log }) => {

  return (
      <Card size="small"
            title={props.l.hash.substring(0, 7)}
            extra={<SnippetsOutlined onClick={() => {
              copyHashClipboard(props.l.hash)
            }} style={{cursor: "pointer", opacity: 0.45}}/>}
            style={{marginBottom: 10}}
      >
        <div style={style.item}>
          <div>
            <UserOutlined />
            <span style={{marginLeft:10}}>{props.l.committer.name}</span>
          </div>
          <div>
            <FieldTimeOutlined/>
            <span style={{marginLeft:10}}>{dayjs(props.l.committer.when).fromNow()}</span>
          </div>
        </div>
        <p style={style.msg}>{props.l.message}</p>
      </Card>
  );
};

export default Item;
