import {Main} from "./dataType"
import { main } from "../../wailsjs/go/models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Main = {
  selectedRepositoryId: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryAllBranch: [],
  showRepositorySetting:false,//这个放到其它地方
  currentlyRepositoryTag:[],
  currentlyRepositoryState:[]
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
    setAllBranch(state, action: PayloadAction<main.Branch[]>) {
      state.currentlyRepositoryAllBranch = action.payload
    },
    setOpenRepositorySetting(state, action: PayloadAction<boolean>){
      state.showRepositorySetting = action.payload
    },
    setStatus(state, action: PayloadAction<main.Status[]>) {
      state.currentlyRepositoryState = action.payload
    },
  },
});

export const mainReducer = mainSlice.reducer
export const {
  setRepository,
  setBranch,
  setAllBranch,
  setOpenRepositorySetting,setStatus } = mainSlice.actions

