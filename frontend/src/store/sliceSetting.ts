import { theme,localThemeKey  } from "../config/app"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
const localTheme = localStorage.getItem(localThemeKey)
export type SettingState = {
  showRepositorySetting:boolean
  showRepositoryTag:boolean
  showRepositoryBranch:boolean
  showThemeSetting:boolean
  showAbout:boolean
  themeColor:string
}

const initialState: SettingState = {
  showRepositorySetting:false,
  showRepositoryTag:false,
  showRepositoryBranch:false,
  showThemeSetting:false,
  showAbout:false,
  themeColor:localTheme?localTheme:theme[0]
}
const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setOpenRepositorySetting(state, action: PayloadAction<boolean>){
      state.showRepositorySetting = action.payload
    },
    setOpenRepositoryTag(state, action: PayloadAction<boolean>){
      state.showRepositoryTag = action.payload
    },
    setOpenRepositoryBranch(state, action: PayloadAction<boolean>){
      state.showRepositoryBranch = action.payload
    },
    setOpenThemeSetting(state, action: PayloadAction<boolean>){
      state.showThemeSetting = action.payload
    },
    setThemeColor(state, action: PayloadAction<string>){
      state.themeColor = action.payload
    },
    setOpenAbout(state, action: PayloadAction<boolean>){
      state.showAbout = action.payload
    }
  },
});

export const settingReducer = settingSlice.reducer
export const {
  setOpenRepositorySetting,
  setOpenRepositoryTag,
  setOpenRepositoryBranch,
  setOpenThemeSetting,
  setOpenAbout,
  setThemeColor
} = settingSlice.actions

