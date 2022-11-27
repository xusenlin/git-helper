import {Breadcrumb} from 'antd';
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../store/dataType";
import {SET_SELECT_BRANCH} from "../../../store/actions"
import {HomeOutlined, BranchesOutlined} from '@ant-design/icons';


const Nav = () => {
  const main = useSelector((state: State) => state.main);
  const dispatch = useDispatch();

  const selectBranch = (b: string) => {
    dispatch({type: SET_SELECT_BRANCH, selectedRepositoryBranch: b})
  }

  const branch = main.currentlyRepositoryAllBranch.map(r => {
    return {
      key: r, label: <a href="javascript:void(0)" onClick={()=>selectBranch(r)}>{r}</a>
    }
  })

  return (
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <HomeOutlined/>
          <span>{main.selectedRepositoryName || <span style={{opacity: 0.45}}>select repository</span>}</span>
        </Breadcrumb.Item>
        {main.selectedRepositoryName &&
            <Breadcrumb.Item menu={{items: branch}}>
              <BranchesOutlined/>
              <span>{main.selectedRepositoryBranch || <span style={{opacity: 0.45}}>select branch</span>}</span>
            </Breadcrumb.Item>}

      </Breadcrumb>
  )
}

export default Nav

