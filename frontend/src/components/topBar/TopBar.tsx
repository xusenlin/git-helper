import './index.scss';
import Nav from './breadcrumb/Nav'
import Action from './action/Action'
import {Input} from 'antd';


const branch = [
  {
    key: '1',
    label: (
        <span>
          Master
        </span>
    ),
  },
  {
    key: '2',
    label: (
        <span>
          Main
        </span>
    ),
  },
  {
    key: '3',
    label: (
        <span>
          Branch
        </span>
    ),
  },
];

function TopBar() {

    return (
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="breadcrumb"><Nav/></div>
            <Action/>
            <Input style={{width:240}} placeholder="请输入关键词搜索项目名称" />
          </div>
        </div>
    )
}

export default TopBar
