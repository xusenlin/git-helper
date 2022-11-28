import {Menu} from 'antd';
import React from 'react';
import type {MenuProps} from 'antd';
import {State} from '../../store/dataType'
import {warning} from "../../utils/common";
import {setRepository,setAllBranch} from "../../store/sliceMain"
import {useDispatch, useSelector} from 'react-redux';
import {GetBranchByPath} from "../../../wailsjs/go/main/App";


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
  const categories = useSelector((state: State) => state.categories);


  const menuData: MenuItem[] = categories.map(c => {
    let children = c.repositories.map(r => getItem(r.name, r.id))
    return getItem(c.name, c.name, null, children, 'group')
  })

  const onClick: MenuProps['onClick'] = async (e) => {
    try {
      let {key} = e
      dispatch(setRepository(key))
      let b = await GetBranchByPath(key)
      dispatch(setAllBranch(b))
    } catch (e) {
      dispatch(setAllBranch([]))
      warning(JSON.stringify(e))
    }

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
