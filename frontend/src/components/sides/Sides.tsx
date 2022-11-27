import {Menu} from 'antd';
import React from 'react';
import type {MenuProps} from 'antd';
import { SET_SELECT_REPO } from "../../store/actions"
import {useDispatch,useSelector} from 'react-redux';
import {State} from '../../store/dataType'


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
  const main = useSelector((state: State) => state.main);
  const category = useSelector((state: State) => state.category);

  // const menuData: MenuItem[] = useMemo(() => {
  //   let items: MenuItem[] = []
  //   category.forEach(c => {
  //     let children = c.repositories.map(r => getItem(r.name, r.name))
  //     items.push(getItem(c.name, c.name, null, children, 'group'))
  //   })
  //   return items
  // }, [category])

  const menuData: MenuItem[] = category.map(c=>{
    let children = c.repositories.map(r => getItem(r.name, r.name))
    return getItem(c.name, c.name, null, children, 'group')
  })

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch({type:SET_SELECT_REPO,selectedRepositoryName:e.key})
  };
  return (
      <div className="sides-content">
        <Menu
            onClick={onClick}
            style={{background: "transparent"}}
            defaultSelectedKeys={[main.selectedRepositoryName]}
            defaultOpenKeys={['Recent']}
            mode="inline"
            items={menuData}
        />
      </div>
  )
}

export default Sides
