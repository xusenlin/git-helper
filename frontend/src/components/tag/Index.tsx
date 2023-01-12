import "./style.scss"
import Item from "./Item"
import {State} from "../../store";
import React, {useState,useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Space,Drawer,Empty} from "antd";
import { CreateTag } from "../../../wailsjs/go/main/App"
import { Tags } from "../../../wailsjs/go/repository/Repository"
import {warning} from "../../utils/common";
import {setTag} from "../../store/sliceMain";
import {setOpenRepositoryTag} from "../../store/sliceSetting";

const { TextArea } = Input;
const Tag = () => {

  const limit = 20

  const dispatch = useDispatch();
  const tags = useSelector((state: State) => state.main.currentlyRepositoryTag);
  const selectedRepositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const showRepositoryTag = useSelector((state: State) => state.setting.showRepositoryTag);

  const [tagName,setTagName] = useState<string>("")
  const [tagMessage,setTagMessage] = useState<string>("")
  const [keyword,setKeyword] = useState<string>("")

  const computedTags = useMemo(() => (tags.filter(r=>r.name.indexOf(keyword)!==-1)), [keyword,tags]);

  const addTag = () => {
    CreateTag(tagName,tagMessage).then(()=>{
      Tags().then(t=>{
        dispatch(setTag(t))
        setTagName("")
        setTagMessage("")
      }).catch(e=>{
        console.log(e)
        warning("Tag："+JSON.stringify(e))
      })
    }).catch(e=>{
      warning("CreateTag"+JSON.stringify(e))
    })
  }
  const onCloseTag = () => {
    dispatch(setOpenRepositoryTag(false))
  }

  const bottom = <div>
    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
      <Input placeholder="Name" value={tagName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(e.target.value)
      }}/>
      <TextArea rows={4} value={tagMessage} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTagMessage(e.target.value)
      }}/>
      <Button block type="primary" onClick={()=>{addTag()}}>Add New Tag</Button>
    </Space>
  </div>

  const content = <>
    <div style={{flex:1,overflowY:"auto",padding:20}}>
      <Input value={keyword} style={{marginBottom:10}} placeholder="Search all tags" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
      }} />
      { (computedTags.length > limit ? computedTags.slice(0,limit) : computedTags).map(r=><Item t={r} key={r.hash} />)}
    </div>
    <div style={{padding:20}}>
      {bottom}
    </div>
  </>
  return (
      <Drawer
          title={<div className="tag-manage-title">
            <div>Tag manage</div>
            <div style={{fontSize:12,color:'#999'}}>Total：{tags.length}</div>
          </div>}
          bodyStyle={{display:'flex',flexDirection:"column",padding:0}}
          placement="right"
          onClose={onCloseTag}
          open={showRepositoryTag}
      >
        {selectedRepositoryId?content:<Empty style={{marginTop:200}} description="please select a git repository first" />}
      </Drawer>
  );
};

export default Tag;
