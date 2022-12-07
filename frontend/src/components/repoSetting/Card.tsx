import React from 'react';
import {Card} from 'antd';
import Action from "./Action"
import {Category} from "../../store/dataType";
import {Droppable, Draggable} from 'react-beautiful-dnd'


const Block = (props: Category) => {
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
                                      { r.name }
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
