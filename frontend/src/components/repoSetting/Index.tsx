import './index.scss';
import Card from "./Card"
import React from 'react';
import {Modal } from 'antd';
import {State} from "../../store/index";
import {DragDropContext} from 'react-beautiful-dnd'
import {useSelector, useDispatch} from "react-redux";
import {moveRepository} from "../../store/sliceCategory";
import {setOpenRepositorySetting} from "../../store/sliceSetting";


const RepoSetting = () => {
  const categories = useSelector((state: State) => state.categories.val);
  const showRepositorySetting = useSelector((state: State) => state.setting.showRepositorySetting);

  const dispatch = useDispatch()
  return (

      <Modal
          title="Repository Setting"
          centered
          open={showRepositorySetting}
          onCancel={()=>{dispatch(setOpenRepositorySetting(false))}}
          width='80%'
          footer={[]}
      >
        <div className='repo-setting'>
          <DragDropContext
              onDragEnd={e => {
                let {source, destination} = e
                destination && dispatch(moveRepository({source, destination}))
              }}
          >
            {categories.map(r => <Card key={r.name} name={r.name} repositories={r.repositories}/>)}
          </DragDropContext>
        </div>
      </Modal>
  );
};

export default RepoSetting;
