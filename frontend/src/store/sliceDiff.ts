import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiffWorkStage} from "../../wailsjs/go/main/App"
import {warning} from "../utils/common";
import {store} from './index';


export type DiffState = {
  content: string[]
  filePath: string
}

const initialState: DiffState = {
  content: [],
  filePath: ""
}
const diffSlice = createSlice({
  name: 'diffSlice',
  initialState,
  reducers: {
    updateContent(state, action: PayloadAction<string[]>) {
      state.content = action.payload
    },
    updatePath(state, action: PayloadAction<string>) {
      state.filePath = action.payload
    }
  },
});

export const diffReducer = diffSlice.reducer
export const {
  updateContent,updatePath
} = diffSlice.actions

//===============
export const asyncDiffWorkStage = (path: string) => {
  DiffWorkStage(path).then(content => {
    store.dispatch(updateContent(content))
    store.dispatch(updatePath(path))
  }).catch(e => {
    console.log(e)
    warning(JSON.stringify(e))
  })
}
