import './style.css'
import App from './App'
import React from 'react'
import 'antd/dist/reset.css';
import './nativeMenuEvents.ts'
import { store } from './store';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client'
const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <Provider store={store}>
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#673ab7',
            },
          }}
      >
        <App/>
      </ConfigProvider>
    </Provider>
)
