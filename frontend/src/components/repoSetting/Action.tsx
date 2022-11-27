import {Space} from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';

function Action() {

    return (
        <Space size="middle" className="action">
            <EditOutlined style={{cursor: "pointer", opacity: 0.45}} />
            <DeleteOutlined style={{cursor: "pointer", opacity: 0.45}} />
        </Space>
    )
}

export default Action
