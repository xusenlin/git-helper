import './index.scss';
import Nav from './breadcrumb/Nav'
import Action from './action/Action'
// import {Input} from 'antd';


function TopBar() {

    return (
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="breadcrumb"><Nav/></div>
            <Action/>
            {/*<Input style={{width:200}} placeholder="Search repository name." />*/}
          </div>
        </div>
    )
}

export default TopBar
