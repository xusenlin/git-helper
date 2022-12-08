import {warning} from '../utils/common'
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {SaveJsonFile} from "../../wailsjs/go/main/App"

export type Repository = {
  id: string
  name: string
  path: string
}
export type Category = {
  name: string
  repositories: Repository[]
}

export type CategoryState = {
  val: Category[]
}

export type Droppable = {
  droppableId: string
  index: number
}

const saveJsonData = (c: Category[]) => {
  SaveJsonFile(JSON.stringify(c)).then(()=>{
  }).catch(e=>{
    warning(JSON.stringify(e))
  })
}

const initialState: CategoryState = {
  val:[
    {
      name: 'Default',
      repositories: []
    }
  ]
};


const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    setRepository(state, action: PayloadAction<Category[]>) {
      state.val = action.payload
    },
    addDefaultRepository(state, action: PayloadAction<Repository>) {

      let defaultIndex = state.val.findIndex(r => r.name === "Default")
      state.val[defaultIndex].repositories.push(action.payload)
      saveJsonData(state.val)
    },
    delRepository(state, action: PayloadAction<string>){
      let cIndex=-1,rIndex=-1;
      state.val.forEach((c,i)=>{
        rIndex = c.repositories.findIndex(r=>r.id === action.payload)
        if(rIndex!==-1){
          cIndex = i
        }
      })
      state.val[cIndex].repositories.splice(rIndex, 1)
      saveJsonData(state.val)
    },
    editRepositoryName(state, action: PayloadAction<{ id:string,name:string }>){
      let cIndex=-1,rIndex=-1;
      state.val.forEach((c,i)=>{
        rIndex = c.repositories.findIndex(r=>r.id === action.payload.id)
        if(rIndex!==-1){
          cIndex = i
        }
      })
      state.val[cIndex].repositories[rIndex].name = action.payload.name

      saveJsonData(state.val)
    },
    moveRepository(state, action: PayloadAction<{ source: Droppable, destination: Droppable }>) {
      let sourceIndex = state.val.findIndex(r => r.name === action.payload.source.droppableId)
      let destinationIndex = state.val.findIndex(r => r.name === action.payload.destination.droppableId)
      let r = state.val[sourceIndex].repositories.splice(action.payload.source.index, 1)
      state.val[destinationIndex].repositories.splice(action.payload.destination.index, 0, r[0])

      saveJsonData(state.val)

    },
    addCategory(state, action: PayloadAction<string>) {
      if (!action.payload) {
        return;
      }
      let has = state.val.find(r => r.name === action.payload)
      if (has) {
        warning(action.payload + " already exists.")
        return
      }
      state.val.push({
        name: action.payload,
        repositories: []
      })
      saveJsonData(state.val)

    },
    delCategory(state, action: PayloadAction<string>) {
      let index = state.val.findIndex(c => c.name === action.payload)
      if (index === -1) {
        return
      }
      if (state.val[index].repositories.length !== 0) {
        warning("Repositories is not empty.")
        return;
      }
      state.val.splice(index, 1)

      saveJsonData(state.val)
    }
  },
});


export const categoriesReducer = categoriesSlice.reducer
export const {
  addDefaultRepository,
  moveRepository,
  addCategory,
  delCategory,
  setRepository,
  delRepository,
  editRepositoryName
} = categoriesSlice.actions




