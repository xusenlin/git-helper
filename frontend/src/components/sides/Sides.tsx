import {Menu} from 'antd';
import React from 'react';
import type {MenuProps} from 'antd';
import {State} from '../../store/dataType'
import {useDispatch,useSelector} from 'react-redux';
import { setRepository } from "../../store/sliceMain"


type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const Sides = () => {
  const dispatch = useDispatch();
  const repositoryName = useSelector((state: State) => state.main.selectedRepositoryId);
  const category = useSelector((state: State) => state.category);


  const menuData: MenuItem[] = category.map(c=>{
    let children = c.repositories.map(r => getItem(r.name, r.id))
    return getItem(c.name, c.name, null, children, 'group')
  })

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(setRepository(e.key))
  };
  return (
      <div className="sides-content">
        <Menu
            onClick={onClick}
            style={{background: "transparent"}}
            defaultSelectedKeys={[repositoryName]}
            defaultOpenKeys={['Recent']}
            mode="inline"
            items={menuData}
        />
      </div>
  )
}

export default Sides
