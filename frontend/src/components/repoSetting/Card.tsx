import React from 'react';
import {State} from "../../store";
import Action from "./Action"
import DialogInput from "../dialog/Input";
import {Card, Space,Popover,Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {DeleteOutlined, InfoCircleOutlined, EditOutlined} from "@ant-design/icons"
import {Category, Repository, delRepository, editRepositoryName} from "../../store/sliceCategory";

const Details = (p: {r:Repository}) => <div>
  <p>ID:{p.r.id}</p>
  <p>Name:{p.r.name}</p>
  <p>Path:{p.r.path}</p>
</div>


const Block = (props: Category) => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: State) => state.main.selectedRepositoryId);


  const delRepo = (id:string)=>{
    Modal.warning({
      closable:true,
      title: 'Confirm message',
      content: 'Confirm removal of this git repository directory? You can add it back again later.',
      onOk(){
        dispatch(delRepository(id))
      }
    });
  }

  return (
        <Card bodyStyle={{padding:0}} size="small" title={props.name} extra={props.name==='Default'?'':<Action name={props.name} />} className='card'>
            <Droppable droppableId={props.name} type="TASK">
                {(provided, snapshot) => (
                    <div
                        className='card-content'
                        ref={provided.innerRef}
                        style={{backgroundColor: snapshot.isDraggingOver ? '#f2f6f6' : '#fff'}}
                        {...provided.droppableProps}
                    >
                        {props.repositories.map((r, i)=>(
                            <Draggable key={r.id} draggableId={r.id} index={i}>
                                {(provided, snapshot) => (
                                    <div
                                        className="node"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                      <div style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:6}}>
                                        { r.name }
                                      </div>
                                      <Space className="action">
                                        <Popover content={<Details r={r}/>} title="Repository details" trigger="hover">
                                          <InfoCircleOutlined style={{cursor: "pointer", opacity: 0.45}} />
                                        </Popover>
                                        <DialogInput defaultVal={r.name} action={<EditOutlined style={{cursor: "pointer", opacity: 0.45}} />} title="Edit the repository name" inputVal={v=>{dispatch(editRepositoryName({id:r.id,name:v}))}}/>
                                        { (selectedId !== r.id) &&  <DeleteOutlined onClick={()=>{delRepo(r.id)}}  style={{cursor: "pointer", opacity: 0.45}} /> }
                                      </Space>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Card>
    );
};

export default Block;
