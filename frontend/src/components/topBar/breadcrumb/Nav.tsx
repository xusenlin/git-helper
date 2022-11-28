import {Breadcrumb} from 'antd';
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../store/dataType";
import {setBranch} from "../../../store/sliceMain"
import {HomeOutlined, BranchesOutlined} from '@ant-design/icons';


const Nav = () => {
  const main = useSelector((state: State) => state.main);
  const categories = useSelector((state: State) => state.categories);
  const dispatch = useDispatch();

  const selectBranch = (b: string) => {
    dispatch(setBranch(b))
  }
  const getCategoryNameById = (id: string): string | null => {
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i]
      let repo = category.repositories.find(r => r.id === id)
      if (repo && repo.name) return repo.name
    }
    return null
  }

  const branch = main.currentlyRepositoryAllBranch.map(r => {
    return {
      key: r, label: <a href="#!" onClick={() => selectBranch(r)}>{r}</a>
    }
  })

  return (
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <HomeOutlined/>
          <span>{getCategoryNameById(main.selectedRepositoryId) ||
              <span style={{opacity: 0.45}}>select repository</span>}</span>
        </Breadcrumb.Item>
        {main.selectedRepositoryId &&
            <Breadcrumb.Item menu={{items: branch}}>
              <BranchesOutlined/>
              <span>{main.selectedRepositoryBranch || <span style={{opacity: 0.45}}>select branch</span>}</span>
            </Breadcrumb.Item>}
      </Breadcrumb>
  )
}

export default Nav

