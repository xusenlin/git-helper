import {main,repository} from "../../wailsjs/go/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Main = {
  selectedRepositoryId: string
  selectedRepositoryBranch: string
  currentlyRepositoryAllBranch: repository.Branch[]
  currentlyRepositoryTag: repository.Tag[]
  currentlyRepositoryState: main.Status[]
  currentlyRepositoryLogs: repository.Commit[]
}


const initialState: Main = {
  selectedRepositoryId: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryAllBranch: [],
  currentlyRepositoryTag: [],
  currentlyRepositoryState: [],
  currentlyRepositoryLogs: []
}
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    resetState(state) {
      state.selectedRepositoryBranch = ''
      state.currentlyRepositoryAllBranch = []
      state.currentlyRepositoryTag = []
      state.currentlyRepositoryState = []
      state.currentlyRepositoryLogs = []
    },
    setRepository(state, action: PayloadAction<string>) {
      state.selectedRepositoryId = action.payload
    },
    setBranch(state, action: PayloadAction<string>) {
      state.selectedRepositoryBranch = action.payload
    },
    setAllBranch(state, action: PayloadAction<repository.Branch[]>) {
      state.currentlyRepositoryAllBranch = action.payload || []
    },
    setStatus(state, {payload}: PayloadAction<main.Status[]>) {
      state.currentlyRepositoryState = payload || []
    },
    setTag(state, action: PayloadAction<repository.Tag[]>) {
      state.currentlyRepositoryTag = action.payload || []
    },
    setLog(state, action: PayloadAction<repository.Commit[]>){
      state.currentlyRepositoryLogs = action.payload||[]
    }
  },
});

export const mainReducer = mainSlice.reducer
export const {
  setRepository,
  setBranch,
  setAllBranch,
  setStatus,
  setTag,
  setLog,
  resetState,
} = mainSlice.actions

