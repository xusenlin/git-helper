import {createSlice, PayloadAction,Dispatch} from "@reduxjs/toolkit";
import {DiffWorkStage} from "../../wailsjs/go/repository/Repository"
import {repository} from "../../wailsjs/go/models"
import {warning} from "../utils/common";
import {store} from './index';


export type DiffWorkState = {
  content: repository.DiffContent[]
  filePath: string
}

const initialState: DiffWorkState = {
  content: [],
  filePath: ""
}
const diffWorkSlice = createSlice({
  name: 'diffWorkSlice',
  initialState,
  reducers: {
    updateContent(state, {payload}: PayloadAction<repository.DiffContent[]>) {
      state.content = payload
    },
    updatePath(state, {payload}: PayloadAction<string>) {
      state.filePath = payload
    },
    resetState: () => initialState,
  },
});

export const diffWorkReducer = diffWorkSlice.reducer
export const {
  updateContent,updatePath,resetState
} = diffWorkSlice.actions

//async action ===============
export const asyncDiffWorkStage = (path: string) => {
  DiffWorkStage(path).then(content => {
    store.dispatch(updateContent(content))
    store.dispatch(updatePath(path))
  }).catch(e => {
    console.log(e)
    warning(JSON.stringify(e))
  })
}
