import {Breadcrumb} from 'antd';
import {State} from "../../../store/dataType";
import {setBranch} from "../../../store/sliceMain"
import {getRepositoryById} from "../../../utils/repo"
import {useSelector, useDispatch} from "react-redux";
import {success, warning} from "../../../utils/common"
import { GitCheckout } from "../../../../wailsjs/go/main/App"
import {HomeOutlined, BranchesOutlined} from '@ant-design/icons';


const Nav = () => {
  const main = useSelector((state: State) => state.main);
  const categories = useSelector((state: State) => state.categories);
  const dispatch = useDispatch();

  const selectBranch = async (b: string) => {
    if(b===main.selectedRepositoryBranch){
      return
    }
    try {
      const out = await GitCheckout(main.selectedRepositoryId,b)
      dispatch(setBranch(b))
      success(out)
    }catch (e) {
      warning(JSON.stringify(e))
    }



  }
  const getCategoryNameById = (id: string): string | null => {
    let r = getRepositoryById(id,categories)
    if(r)return r.name
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
            <Breadcrumb.Item className="branch" menu={{items: branch}} >
              <BranchesOutlined/>
              <span>{main.selectedRepositoryBranch || <span style={{opacity: 0.45}}>select branch</span>}</span>
            </Breadcrumb.Item>}
      </Breadcrumb>
  )
}

export default Nav

