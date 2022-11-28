import {EventsOn} from "../wailsjs/runtime"
import {IsGitRepository,Md5} from "../wailsjs/go/main/App"
import {notification} from 'antd';


const warning = (desc: string) => {
  notification.warning({
    message: `Tip`,
    description: desc,
    placement: "topRight",
    style: {
      top: 40,
    },
  });
}

//===================Repository Menu Event========

EventsOn("Repository_A", async (path: string) => {
  try {
    const is = await IsGitRepository(path)
    if (!is) {
      warning("This directory does not appear to be a Git repository.");
      return
    }
    const md5 = await Md5(path)
    console.log(path,md5)
  }catch (e) {
    warning(JSON.stringify(e))
  }
})
