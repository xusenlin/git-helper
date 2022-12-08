import {main} from "../../wailsjs/go/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Main = {
  selectedRepositoryId: string
  selectedRepositoryBranch: string
  currentlyRepositoryAllBranch: main.Branch[]
  currentlyRepositoryTag: main.Tag[]
  currentlyRepositoryState: main.Status[]
  currentlyRepositoryLogs: main.Log[]
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
    setAllBranch(state, action: PayloadAction<main.Branch[]>) {
      state.currentlyRepositoryAllBranch = action.payload || []
    },
    setStatus(state, action: PayloadAction<main.Status[]>) {
      state.currentlyRepositoryState = action.payload || []
    },
    setTag(state, action: PayloadAction<main.Tag[]>) {
      state.currentlyRepositoryTag = action.payload || []
    },
    setLog(state, action: PayloadAction<main.Log[]>){
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

