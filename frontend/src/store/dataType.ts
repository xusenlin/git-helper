import { main } from "../../wailsjs/go/models"
export type Repository = {
  id:string
  name:string
  path:string
}
export type Category = {
  name:string
  repositories:Repository[]
}
export type Tag = {
  title:string
  username:string
  msg:string
}
export type Main = {
  selectedRepositoryId:string
  selectedRepositoryBranch:string
  currentlyRepositoryAllBranch:main.Branch[]
  showRepositorySetting:boolean
  currentlyRepositoryTag:Tag[]
  currentlyRepositoryState:main.Status[]
}
export type State = {
  categories:Category[]
  main:Main
}

export type Droppable = {
  droppableId:string
  index:number
}
