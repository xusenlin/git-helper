import {Menu} from 'antd';
import React from 'react';
import type {MenuProps} from 'antd';
import {State} from '../../store/index'
import {warning} from "../../utils/common";
import {getRepositoryPathById} from "../../utils/repo";
import {setRepository,setAllBranch,resetState} from "../../store/sliceMain"
import {useDispatch, useSelector} from 'react-redux';
import {BindRepository,GetBranch} from "../../../wailsjs/go/main/App";


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
  const repositoryId = useSelector((state: State) => state.main.selectedRepositoryId);
  const categories = useSelector((state: State) => state.categories.val);


  const menuData: MenuItem[] = categories.map(c => {
    let children = c.repositories.map(r => getItem(r.name, r.id))
    return getItem(c.name, c.name, null, children, 'group')
  })

  const onClick: MenuProps['onClick'] = async (e) => {
    const {key} = e
    if(key === repositoryId){
      return
    }
    try {
      const path = getRepositoryPathById(key,categories)
      if(!path){
        warning("No git repository path was found for the specified ID.")
        return
      }
      const ok = await BindRepository(path)
      if(!ok){
        warning("Error binding repository.")
        return
      }
      dispatch(resetState())

      dispatch(setRepository(key))
      const b = await GetBranch()
      dispatch(setAllBranch(b))
    } catch (e) {
      warning(JSON.stringify(e))
    }

  };
  return (
      <div className="sides-content">
        <Menu
            onClick={onClick}
            style={{background: "transparent"}}
            defaultSelectedKeys={[repositoryId]}
            defaultOpenKeys={['Recent']}
            mode="inline"
            items={menuData}
        />
      </div>
  )
}

export default Sides
