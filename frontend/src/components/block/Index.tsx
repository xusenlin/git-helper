import "./index.scss"
import {ReactNode} from "react"

type propType = {
  title: string
  children: ReactNode
  bottom?: ReactNode
  action?:ReactNode
}

const Changes = (props: propType) => {
  return (
      <div className="main-block">
        <div className="top-title">
          <div className='title'>{props.title}</div>
          <div className="action">{props.action}</div>
        </div>
        <div className="main-block-content">
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

export default Changes;
