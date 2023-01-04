import "./index.scss"
import {ReactNode} from "react"

type propType = {
  title?: string|ReactNode
  children: ReactNode
  bottom?: ReactNode
  action?:ReactNode
}

const Block = (props: propType) => {
  return (
      <div className="main-block">
        { props.action || props.title ?<div className="top-title">
          <div className='title'>{props.title}</div>
          {/*<div className='title'></div>*/}
          <div className="action">{props.action}</div>
        </div>:'' }

        <div className="main-block-content" style={{ height: props.action?"calc(100% - 40px)":"100%"}}>
          <div className="top">
            {props.children}
          </div>
          <div className="bottom">
            {props.bottom}
          </div>
        </div>
      </div>
  );
};

export default Block;
