
export type GitCmd = {
  cmdName:string
  arg?:string[]
  desc?:string
}

export const remotePruneOrigin:GitCmd = {
  cmdName:"git",
  arg:['remote','prune','origin'],
  desc:"used to delete branches from the specified remote repository that no longer exist"
}
