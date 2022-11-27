import './index.scss';
import Card from "./Card"
import React from 'react';
import {Modal, Button, Input} from 'antd';
import {DragDropContext} from 'react-beautiful-dnd'

type propType = {
    open: boolean,
    setOpen: (val: boolean) => void
}

const RepoSetting = (props: propType) => {
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
                    onDragEnd={() => {
                    }}
                >
                    <Card id='ada' item={['111','222','333']}/>
                    <Card id='www' item={['444','555','666']}/>
                    <Card id='rrr' item={['777','888','999']}/>
                    <Card id='tyt' item={['qqq','www','eee','rrr','ttt','yyy']}/>

                </DragDropContext>

            </div>
        </Modal>
    );
};

export default RepoSetting;
