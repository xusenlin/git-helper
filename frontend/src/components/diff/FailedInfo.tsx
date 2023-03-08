import {Result} from "antd";

const Info = (tip:string) => {
  return <div className="diff-tip">
    <Result status="warning" title={tip}/>
  </div>
}
export default Info
