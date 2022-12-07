import React, {ReactNode, useState} from "react"
import {Button, Input, Modal} from "antd";

type Props = {
  title:string
  msg?:string
  action:ReactNode
  inputVal:(v:string)=>void
}

const DialogInput:React.FC<Props> =  (props:Props) => {
  const [val,setVal] = useState<string>("")
  const [open,setOpen] = useState<boolean>(false)

  return (<>

    <div onClick={() => { setOpen(true)}}>{props.action}</div>
    <Modal
        title={props.title}
        centered
        open={open}
        onCancel={()=>{setOpen(false)}}
        footer={[
          <Button type="primary" onClick={() => {
            props.inputVal(val)
            setVal("")
            setOpen(false)
          }}>OK</Button>
        ]}
        width='380px'
    >
      <div style={{padding:"10px 0"}}>
        <Input
            value={val}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setVal(e.target.value)
            }}
        />
        {props.msg && <p style={{marginTop:20,fontSize:14}}>{props.msg}</p>}
      </div>
    </Modal>
  </>)
}

export default DialogInput
