import {Category, Repository,updateRepositoryStatus} from "../store/sliceCategory";
import {FileStatus, Log} from "../../wailsjs/go/main/App";
import {setLog, setStatus} from "../store/sliceMain";
import {warning} from "./common";
import {store} from "../store";
import {PresetStatusColorType} from "antd/es/_util/colors";

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

export const updateWorkZone = async (id:string,branchName:string) => {
  try {
    const s = await FileStatus()
    store.dispatch(setStatus(s))
    setRepositoryStatus(id,Array.isArray(s)&&s.length!==0)
    const l = await Log(branchName)
    store.dispatch(setLog(l))
  } catch (e) {
    console.log(e)
    warning("updateWorkZone：" + e)
  }
}

export const setRepositoryStatus =  (id:string,isProcessing:boolean) => {
  store.dispatch(updateRepositoryStatus({id,status:isProcessing?'processing':'success'}))
}
