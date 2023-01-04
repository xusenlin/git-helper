import './style.css'
import App from './App'
import React from 'react'
import 'antd/dist/reset.css';
import './nativeMenuEvents.ts'
import {store} from './store';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client'
import {ReadJsonFile} from "../wailsjs/go/main/App";
import {Category, setRepository} from "./store/sliceCategory";

const container = document.getElementById('root')

const root = createRoot(container!)

ReadJsonFile().then(r => {
  console.log("ReadJsonFile")
  const data = JSON.parse(r) as Category[]
  store.dispatch(setRepository(data))
}).catch(e => {
  // warning(JSON.stringify(e))
  // console.log(e)
})

root.render(
    <Provider store={store}>
      <App/>
    </Provider>
)
