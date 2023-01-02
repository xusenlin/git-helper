

export type GitCmd = {
  cmd:string,
  tip:string
}

export const cmd:GitCmd[] = [
  // {cmd:"git checkout .",tip:"that restores all files in the current working directory to their state at the most recent commit."},
  {cmd:"git remote prune origin",tip:"used to delete branches from the specified remote repository that no longer exist"},
]
