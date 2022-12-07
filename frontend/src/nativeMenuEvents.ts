import {store} from './store';
import {warning} from './utils/common';
import {EventsOn} from "../wailsjs/runtime"
import {IsGitRepository} from "../wailsjs/go/main/App"
import {addDefaultRepository} from "./store/sliceCategory"
import {setOpenRepositorySetting} from "./store/sliceMain"



//===================Repository Menu Event========

EventsOn("Repository_A", async (id:string,path: string) => {
  try {
    const is = await IsGitRepository(path)
    if (!is) {
      warning("This directory does not appear to be a Git repository.");
      return
    }
    const p = path.split('/')
    let name = path
    if (p.length >= 2) {
      name = [p[p.length - 2], p[p.length - 1]].join('/')
    }else if(p.length >= 1){
      name = p[0]
    }
    store.dispatch(addDefaultRepository({id, path, name}))
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



