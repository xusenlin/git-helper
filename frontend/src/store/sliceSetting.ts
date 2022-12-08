
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SettingState = {
  showRepositorySetting:boolean
}

const initialState: SettingState = {
  showRepositorySetting:false,
}
const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setOpenRepositorySetting(state, action: PayloadAction<boolean>){
      state.showRepositorySetting = action.payload
    },
  },
});

export const settingReducer = settingSlice.reducer
export const {setOpenRepositorySetting} = settingSlice.actions

