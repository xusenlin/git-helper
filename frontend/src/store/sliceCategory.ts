import {warning} from '../utils/common'
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {Category, Droppable, Repository} from "./dataType"

const initialState: Category[] = [
  {
    name: 'Default',
    repositories: []
  }
];


const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    addDefaultRepository(state, action: PayloadAction<Repository>) {

      //TODO
      let defaultIndex = state.findIndex(r => r.name === "Default")
      state[defaultIndex].repositories.push(action.payload)
    },
    moveRepository(state, action: PayloadAction<{ source: Droppable, destination: Droppable }>) {
      let sourceIndex = state.findIndex(r => r.name === action.payload.source.droppableId)
      let destinationIndex = state.findIndex(r => r.name === action.payload.destination.droppableId)
      let r = state[sourceIndex].repositories.splice(action.payload.source.index, 1)
      state[destinationIndex].repositories.splice(action.payload.destination.index, 0, r[0])
    },
    addCategory(state, action: PayloadAction<string>) {
      if(!action.payload){
        return;
      }
      let has = state.find(r=>r.name===action.payload)
      if(has){
        warning(action.payload + " already exists.")
        return
      }
      state.push({
        name: action.payload,
        repositories: []
      })
    },
    delCategory(state, action:PayloadAction<string>){
      let index = state.findIndex(c=>c.name===action.payload)
      if(index===-1){
        return
      }
      if(state[index].repositories.length!==0){
        warning("Repositories is not empty.")
        return;
      }
      state.splice(index,1)
    }
  },
});


export const categoriesReducer = categoriesSlice.reducer
export const {addDefaultRepository, moveRepository,addCategory,delCategory} = categoriesSlice.actions




