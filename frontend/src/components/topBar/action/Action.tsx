import { Button,Space} from 'antd';
import { ArrowUpOutlined,ArrowDownOutlined,ScissorOutlined} from '@ant-design/icons';

function Action() {

    return (
        <Space className="action">
          <Button shape="circle" icon={<ArrowUpOutlined />} />
          <Button shape="circle" icon={<ArrowDownOutlined />} />
          <Button shape="circle" icon={<ScissorOutlined />} />
        </Space>
    )
}

export default Action
