import {Space} from 'antd';
import React, {useState} from 'react';
import {SettingOutlined} from '@ant-design/icons';
import RepoSetting from '../repoSetting/Index'

const SidesTop: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
      <>
        <Space className='sides-top' size="middle">
          <svg className="theme-icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"  width="64" height="64">
            <path
                d="M517.78756813 963.02833313c-248.20624839 0-450.14412281-201.93786116-450.14412292-450.14412274s201.93786116-450.14412281 450.14412292-450.14412293 450.14412281 201.93786116 450.14412269 450.14412293c0 110.01201254-54.54782202 174.46299818-176.8584166 208.99548464-18.13438105 5.1444977-34.40386711 7.25053268-56.09117547 7.25053245-7.3469941 0-15.54605323-0.24115299-25.04729943-0.67521515a469.43601209 469.43601209 0 0 0-20.4493977-0.51445125c-36.55813255 0-45.46455228 5.56250078-59.16180948 26.09228721-12.13781811 18.19868433-15.41743385 34.01803535 3.68154668 61.05883651 1.55942577 2.21856863 3.15100963 4.38890686 5.11233931 6.97723435l5.56250076 7.29876343c17.10547892 22.47505743 31.49401053 45.49671041 19.9349601 79.64335214l-1.89704011 5.59464564-3.42430764 4.8229824C629.53584301 961.27598479 594.40853004 963.02833313 517.78756813 963.02833313z m0-819.90536181c-203.88313189 0-369.76123919 165.87810694-369.76123914 369.76123907s165.87810694 369.76123919 369.76123914 369.76123899c37.2976513 0 55.09443111-0.90028283 64.30630705-2.79732269-0.41798999-0.57875404-0.90028283-1.18966641-1.38258884-1.81665161l-5.53034276-7.25053241a322.01381491 322.01381491 0 0 1-6.88077321-9.3726402c-36.23660395-51.26820641-37.89249105-102.4238655-4.87119975-151.95579598 34.24310269-51.34858158 75.15799728-61.89481598 126.04034521-61.894816 7.45952764 0 15.43350624 0.22506734 24.05055567 0.61089915 26.68711402 1.17359408 39.86990654 0.83597968 55.65711286-3.64937491 88.51762698-24.98299647 118.35575041-58.18112471 118.35575039-131.63500434 0.01607252-203.88313189-165.84594893-369.76123919-369.74516662-369.76123907z"
                fill="#000000"></path>
            <path
                d="M300.75380167 440.53962147m-56.26802518 0a56.26801236 56.26801236 0 1 0 112.53603734 0 56.26801236 56.26801236 0 1 0-112.53603734 0Z"
                fill="#000000"></path>
            <path
                d="M734.82133467 440.53962147m-56.26801214 0a56.26801236 56.26801236 0 1 0 112.53603733 0 56.26801236 56.26801236 0 1 0-112.53603733 0Z"
                fill="#000000"></path>
            <path
                d="M429.3664027 295.85044411m-56.26801231 0a56.26801236 56.26801236 0 1 0 112.53602443 0 56.26801236 56.26801236 0 1 0-112.53602443 0Z"
                fill="#000000"></path>
            <path
                d="M606.2087337 295.85044411m-56.26801201 0a56.26801236 56.26801236 0 1 0 112.5360242 0 56.26801236 56.26801236 0 1 0-112.5360242 0Z"
                fill="#000000"></path>
          </svg>
          <SettingOutlined onClick={() => setOpen(true)} style={{cursor: "pointer", opacity: 0.45}}/>
        </Space>
        <RepoSetting open={open} setOpen={setOpen}/>
      </>
  )
}

export default SidesTop

