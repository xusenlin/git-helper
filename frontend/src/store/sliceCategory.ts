import {Category, Repository} from "./dataType"
import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Category[] = [
  {
    name: 'Default',
    repositories: [
      {id:"12",name: "Home/marewood1", path: "/User/Home/marewood"},
      {id:"122",name: "Home/marewood2", path: "/User/Home/marewood"},
      {id:"123",name: "Home/marewood3", path: "/User/Home/marewood"},
      {id:"124",name: "Home/marewood4", path: "/User/Home/marewood"}
    ]
  },
  {
    name: 'Berry',
    repositories: [
      {id:"1332",name: "Berry/marewood1", path: "/User/Home/marewood"},
    ]
  }
];


const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    addDefaultRepository(state, action: PayloadAction<Repository>) {
      let defaultIndex =  state.findIndex(r=>r.name === "Default")
      state[defaultIndex].repositories.push(action.payload)
    },
  },
});




export const categoriesReducer = categoriesSlice.reducer
export const { addDefaultRepository } = categoriesSlice.actions




