import {store} from './store';
import {warning} from './utils/common';
import {getRepositoryPathById} from './utils/repo';
import {EventsOn} from "../wailsjs/runtime"
import {IsGitRepository} from "../wailsjs/go/repository/Repository"
import {addDefaultRepository} from "./store/sliceCategory"
import {setOpenRepositorySetting} from "./store/sliceSetting"


//===================Repository Menu Event========

EventsOn("Repository_A", async (id:string,path: string) => {
  let has = getRepositoryPathById(id,store.getState().categories.val)
  if(has){
    warning("This git repository already exists.");
    return
  }
  try {
    const is = await IsGitRepository(path)
    if (!is) {
      warning("This directory does not appear to be a Git repository.");
      return
    }
    const p = path.split('/')
    let name = p[p.length-1]

    store.dispatch(addDefaultRepository({id, path, name,status:"success"}))
  } catch (e) {
    console.log(e)
    warning(JSON.stringify(e))
  }
})
EventsOn("Repository_M",()=>{
  store.dispatch(setOpenRepositorySetting(true))
})

//===================Branch  Menu Event=========
EventsOn("Branch_M",()=>{
  store.dispatch(setOpenRepositorySetting(true))
})

//===================Settings  Menu Event=========
EventsOn("Settings_Theme",()=>{
  store.dispatch(setOpenRepositorySetting(true))
})



//
