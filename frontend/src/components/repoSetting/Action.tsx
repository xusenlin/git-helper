import {Space} from 'antd';
import {useDispatch} from "react-redux";
import {delCategory} from "../../store/sliceCategory";
import { DeleteOutlined } from '@ant-design/icons';
function Action(props:{name:string}) {

    const dispatch = useDispatch()

    return (
        <Space size="middle" className="action">
            {/*<EditOutlined style={{cursor: "pointer", opacity: 0.45}} />*/}
            <DeleteOutlined onClick={()=>{dispatch(delCategory(props.name))}} style={{cursor: "pointer", opacity: 0.45}} />
        </Space>
    )
}

export default Action
