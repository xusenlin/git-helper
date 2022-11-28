import {Main} from "./dataType"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Main = {
  selectedRepositoryId: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryAllBranch: ['master', 'main']
}
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setRepository(state, action: PayloadAction<string>) {
      state.selectedRepositoryId = action.payload

    },
    setBranch(state, action: PayloadAction<string>) {
      state.selectedRepositoryBranch = action.payload
    },
    setAllBranch(state, action: PayloadAction<string[]>) {
      state.currentlyRepositoryAllBranch = action.payload
    },
  },
});

export const mainReducer = mainSlice.reducer
export const { setRepository,setBranch,setAllBranch } = mainSlice.actions

