import {Breadcrumb} from 'antd';
import {State} from "../../../store";
import {setBranch} from "../../../store/sliceMain"
import {getRepositoryById,updateWorkZone} from "../../../utils/repo"
import {useSelector, useDispatch} from "react-redux";
import {warning} from "../../../utils/common"
import { SwitchBranch} from "../../../../wailsjs/go/main/App"
import {HomeOutlined, BranchesOutlined} from '@ant-design/icons';
import {resetState as resetWorkDiffState} from "../../../store/sliceWorkDiff";
import {resetState as resetCommitDiffState} from "../../../store/sliceCommitDiff";

const Nav = () => {
  const main = useSelector((state: State) => state.main);
  const categories = useSelector((state: State) => state.categories.val);
  const dispatch = useDispatch();

  const selectBranch = async (b: string) => {
    if(b===main.selectedRepositoryBranch){
      return
    }
    try {
      const ok = await SwitchBranch(b)
      if(!ok){
        warning("Switch branch failed.")
        return
      }
      dispatch(setBranch(b))

      await updateWorkZone(main.selectedRepositoryId)

      dispatch(resetCommitDiffState())
      dispatch(resetWorkDiffState())

    }catch (e) {
      console.log(e)
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
      key: r.name, label: <a href="#!" onClick={() => selectBranch(r.name)}>{r.name}</a>
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

