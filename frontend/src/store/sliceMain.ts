import {repository} from "../../wailsjs/go/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Main = {
  selectedRepositoryId: string
  selectedRepositoryBranch: string
  currentlyRepositoryLocalBranch: repository.Branch[]
  currentlyRepositoryFileState: repository.FileStatus[]
  currentlyRepositoryCommits: repository.Commit[]
}


const initialState: Main = {
  selectedRepositoryId: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryLocalBranch: [],
  currentlyRepositoryFileState: [],
  currentlyRepositoryCommits: []
}
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    resetState(state) {
      state.selectedRepositoryBranch = ''
      state.currentlyRepositoryLocalBranch = []
      state.currentlyRepositoryFileState = []
      state.currentlyRepositoryCommits = []
    },
    setRepository(state, action: PayloadAction<string>) {
      state.selectedRepositoryId = action.payload
    },
    setBranch(state, action: PayloadAction<string>) {
      state.selectedRepositoryBranch = action.payload
    },
    setAllBranch(state, action: PayloadAction<repository.Branch[]>) {
      state.currentlyRepositoryLocalBranch = action.payload || []
    },
    setStatus(state, {payload}: PayloadAction<repository.FileStatus[]>) {
      state.currentlyRepositoryFileState = payload || []
    },
    setLog(state, action: PayloadAction<repository.Commit[]>){
      state.currentlyRepositoryCommits = action.payload||[]
    }
  },
});

export const mainReducer = mainSlice.reducer
export const {
  setRepository,
  setBranch,
  setAllBranch,
  setStatus,
  setLog,
  resetState,
} = mainSlice.actions

