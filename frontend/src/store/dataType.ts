
export type Repository = {
  name:string //唯一
  path:string
}
export type Category = {
  name:string
  repositories:Repository[]
}
export type Main = {
  selectedRepositoryName:string
  selectedRepositoryBranch:string
  currentlyRepositoryAllBranch:string[]
}
export type State = {
  category:Category[]
  main:Main
}
