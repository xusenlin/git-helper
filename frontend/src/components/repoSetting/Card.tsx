import Action from "./Action"
import React from 'react';
import {Card} from 'antd';
import {Droppable, Draggable} from 'react-beautiful-dnd'

type propType = {
    id: string,
    item: string[]
}

const Block = (props: propType) => {
    return (
        <Card bodyStyle={{padding:0}} size="small" title="Recent" extra={<Action/>} className='card'>
            <Droppable droppableId={props.id} type="TASK">
                {(provided, snapshot) => (
                    <div
                        className='card-content'
                        ref={provided.innerRef}
                        style={{backgroundColor: snapshot.isDraggingOver ? '#f2f6f6' : '#fff'}}
                        {...provided.droppableProps}
                    >
                        {props.item.map((n, i)=>(
                            <Draggable key={n} draggableId={n} index={i}>
                                {(provided, snapshot) => (
                                    <div
                                        className="node"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                       I am a droppable!{n}
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
