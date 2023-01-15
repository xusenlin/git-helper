import './index.scss';
import Nav from './breadcrumb/Nav'
import Action from './action/Action'

function TopBar() {

    return (
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="breadcrumb"><Nav/></div>
            <Action/>
          </div>
        </div>
    )
}

export default TopBar
