import { EventsOn } from "../wailsjs/runtime"

//===================Repository Menu Event========

EventsOn("Repository_A", (path:string)=>{
  alert(path)
  console.log(path)
})
