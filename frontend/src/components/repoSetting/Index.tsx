import './index.scss';
import Card from "./Card"
import React from 'react';
import {Modal, Button, Input} from 'antd';
import {DragDropContext} from 'react-beautiful-dnd'
import {useSelector} from "react-redux";
import {State} from "../../store/dataType";

type propType = {
    open: boolean,
    setOpen: (val: boolean) => void
}

const RepoSetting = (props: propType) => {
    const categories = useSelector((state: State) => state.categories);


    return (

        <Modal
            title="Repository Setting"
            centered
            open={props.open}
            onCancel={() => props.setOpen(false)}
            footer={[
                <Input style={{width:200,marginRight:10}} placeholder="Input Category Name" />,
                <Button type="primary" onClick={()=>{}}>
                    Add Category
                </Button>
            ]}
            width='80%'
        >
            <div className='repo-stting'>
                <DragDropContext
                    onDragEnd={e => {
                        console.log(e)
                    }}
                >
                    {categories.map(r=><Card key={r.name} name={r.name} repositories={r.repositories}/>)}
                </DragDropContext>
            </div>
        </Modal>
    );
};

export default RepoSetting;
