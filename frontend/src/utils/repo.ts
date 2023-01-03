import {Category, Repository} from "../store/sliceCategory";
import {FileStatus, Log} from "../../wailsjs/go/main/App";
import {setLog, setStatus} from "../store/sliceMain";


import {warning} from "./common";
import {store} from "../store";

export const getRepositoryById = (id: string, categories: Category[]): Repository | null => {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]
    let repo = category.repositories.find(r => r.id === id)
    if (repo) return repo
  }
  return null
}

export const getRepositoryPathById = (id: string, categories: Category[]): string | null => {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]
    let repo = category.repositories.find(r => r.id === id)
    if (repo) return repo.path
  }
  return null
}

export const updateWorkZone = async () => {
  try {
    const s = await FileStatus()
    store.dispatch(setStatus(s))
    const l = await Log()
    store.dispatch(setLog(l))

  } catch (e) {
    console.log(e)
    warning("updateWorkZone：" + JSON.stringify(e))
  }
}
