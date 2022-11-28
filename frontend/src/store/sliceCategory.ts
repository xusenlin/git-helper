import {Category} from "./dataType"
import {createSlice} from '@reduxjs/toolkit';

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
    addCard(state, action) {

    },
    removeCard(state, action) {
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer
export const { removeCard } = categoriesSlice.actions




