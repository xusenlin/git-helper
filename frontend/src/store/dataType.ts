
export type Repository = {
  id:string
  name:string
  path:string
}
export type Category = {
  name:string
  repositories:Repository[]
}
export type Main = {
  selectedRepositoryId:string
  selectedRepositoryBranch:string
  currentlyRepositoryAllBranch:string[]
}
export type State = {
  categories:Category[]
  main:Main
}
