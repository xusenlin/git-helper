import {warning} from '../utils/common'
import {createSlice} from '@reduxjs/toolkit';
import { PresetStatusColorType } from "antd/es/_util/colors"
import type {PayloadAction} from '@reduxjs/toolkit'
import {SaveJsonFile} from "../../wailsjs/go/main/App"

export type Repository = {
  id: string
  name: string
  status: PresetStatusColorType
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
      for (let i = 0; i < state.val.length; i++) {
        let c =  state.val[i]
        let index = c.repositories.findIndex(r=>r.id === action.payload)
        if(index!==-1){
          state.val[index].repositories.splice(i, 1)
          saveJsonData(state.val)
          return
        }
      }
    },
    editRepositoryName(state, action: PayloadAction<{ id:string,name:string }>){
      for (let i = 0; i < state.val.length; i++) {
        let c =  state.val[i]
        let index = c.repositories.findIndex(r=>r.id === action.payload.id)
        if(index!==-1){
          state.val[i].repositories[index].name = action.payload.name
          saveJsonData(state.val)
          return
        }
      }
    },
    moveRepository(state, action: PayloadAction<{ source: Droppable, destination: Droppable }>) {
      let sourceIndex = state.val.findIndex(r => r.name === action.payload.source.droppableId)
      let destinationIndex = state.val.findIndex(r => r.name === action.payload.destination.droppableId)
      let r = state.val[sourceIndex].repositories.splice(action.payload.source.index, 1)
      state.val[destinationIndex].repositories.splice(action.payload.destination.index, 0, r[0])

      saveJsonData(state.val)

    },
    updateRepositoryStatus(state, {payload}: PayloadAction<{ id:string,status:PresetStatusColorType }>){
      for (let i = 0; i < state.val.length; i++) {
        let c =  state.val[i]
        let index = c.repositories.findIndex(r=>r.id === payload.id)
        if(index!==-1){
          state.val[i].repositories[index].status = payload.status
          saveJsonData(state.val)
          return
        }
      }

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
  editRepositoryName,updateRepositoryStatus
} = categoriesSlice.actions




