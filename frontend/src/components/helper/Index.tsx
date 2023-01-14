import {State} from "../../store";
import React, {useState} from "react";
import {cmd} from "../../config/gitCmd"
import {useDispatch, useSelector} from "react-redux";
import {PlayCircleOutlined} from "@ant-design/icons";
import {RunCmd} from "../../../wailsjs/go/main/App"
import {setOpenMoreHelper} from "../../store/sliceSetting";
import {Input, Space, Drawer, Empty, Tag, theme, Tooltip, notification} from "antd";

const {useToken} = theme;
const Helper = () => {
  const {token} = useToken();
  const dispatch = useDispatch();
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const showMore = useSelector((state: State) => state.setting.showMore);
  const [keyword, setKeyword] = useState<string>("")

  const onCloseHelper = () => {
    dispatch(setOpenMoreHelper(false))
  }
  const runCmd = (cmd: string) => {
    RunCmd(cmd).then(out => {
      notification.success({
        message: `Tip`,
        description: <pre>{out}</pre>,
        placement: "bottomRight",
        style: {
          top: 40,
        },
      });
      //TODO
    }).catch(e => {
      notification.warning({
        message: `Tip`,
        description: <div style={{whiteSpace: "pre-wrap"}}>{e}</div>,
        placement: "bottomRight",
        style: {
          width: 500,
          top: 40,
        },
      });
    })
  }

  const content = <div style={{padding: 20}}>
    <Input placeholder="Keyword" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
    }}/>
    <Space wrap style={{marginTop: 20, width: "100%"}}>
      {
        cmd.filter(c => c.cmd.indexOf(keyword) !== -1).map(c => <Tooltip title={c.tip} placement="bottom">
          <Tag onClick={() => {
            runCmd(c.cmd)
          }} style={{cursor: "pointer"}} color={token.colorPrimary} icon={<PlayCircleOutlined/>}>{c.cmd}</Tag>
        </Tooltip>)
      }
    </Space>
  </div>
  return (
      <Drawer
          title="Helper cmd"
          bodyStyle={{display: 'flex', flexDirection: "column", padding: 0}}
          placement="right"
          onClose={onCloseHelper}
          open={showMore}
      >
        {selectedRepositoryId ? content :
            <Empty style={{marginTop: 200}} description="please select a git repository first"/>}
      </Drawer>
  );
};

export default Helper;
