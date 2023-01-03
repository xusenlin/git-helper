import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiffCommit} from "../../wailsjs/go/main/App"
import {main} from "../../wailsjs/go/models"
import {warning} from "../utils/common";
import {store} from './index';


export type DiffCommitState = {
  filesInfo: main.ChangesFile[]
  statistics: string
  commitId: string
}

const initialState: DiffCommitState = {
  filesInfo:[],
  statistics: "",
  commitId: ""
}

const diffCommitSlice = createSlice({
  name: 'diffCommitSlice',
  initialState,
  reducers: {
    updateState(state, {payload}: PayloadAction<DiffCommitState>) {
      return payload
    },
    resetState: () => initialState,
  },
});

export const diffCommitReducer = diffCommitSlice.reducer
export const {
  resetState,updateState
} = diffCommitSlice.actions

//async action ===============
export const asyncDiffCommit = (commitId: string) => {
  DiffCommit(commitId).then(r => {
    store.dispatch(updateState({
      commitId,
      filesInfo:r.changesFiles||[],
      statistics:r.statistics||""
    }))
  }).catch(e => {
    console.log(e)
    warning(JSON.stringify(e))
  })
}
