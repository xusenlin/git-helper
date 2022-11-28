import {createSlice} from "@reduxjs/toolkit";
import {Main} from "./dataType"

const initialState: Main = {
  selectedRepositoryId: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryAllBranch: ['master', 'main']
}
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setRepository(state, action) {
      state.selectedRepositoryId = action.payload
    },
    setBranch(state, action) {
      state.selectedRepositoryBranch = action.payload
    },
    setAllBranch(state, action) {
      state.currentlyRepositoryAllBranch = action.payload
    },
  },
});

export const mainReducer = mainSlice.reducer
export const { setRepository,setBranch,setAllBranch } = mainSlice.actions

