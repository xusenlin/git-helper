package main

import (
	"git-helper/utils"
	"strings"
)

type Status struct {
	File     string `json:"file"`
	Staging  string `json:"staging"`
	Worktree string `json:"worktree"`
}

func (a *App) FileStatus() ([]Status, error) {
	//w, err := a.repository.Worktree()
	//if err != nil {
	//	return nil, err
	//}
	//s, err := w.Status()
	//if err != nil {
	//	return nil, err
	//}
	//var changes []Status
	//for f, s := range s {
	//	changes = append(changes, Status{
	//		File:     f,
	//		Staging:  string(s.Staging),
	//		Worktree: string(s.Worktree),
	//	})
	//}
	//return changes, nil
	path, err := a.RepositoryPath()

	if err != nil {
		return nil, err
	}
	out, err := utils.RunCmdByPath(path, "git", "--no-optional-locks", "status", "--porcelain")

	if err != nil {
		return nil, err
	}

	var changes []Status
	files := strings.Split(strings.Trim(out, "\n"), "\n")
	if files == nil {
		return changes, nil
	}
	for _, c := range files {
		if len(c) < 4 {
			continue
		}
		changes = append(changes, Status{
			File:     c[3:],
			Staging:  c[0:1],
			Worktree: c[1:2],
		})
	}
	return changes, nil
}

func (a *App) Commit(title, msg string, fileList []string) (string, error) {
	//w, err := a.repository.Worktree()
	//
	//if err != nil {
	//	return "", err
	//}
	//for _, f := range fileList {
	//	_, err := w.Add(f)
	//	if err != nil {
	//		return "", err
	//	}
	//}
	//h, err := w.Commit(title+": "+msg, &git.CommitOptions{})
	//if err != nil {
	//	return "", err
	//}
	//
	//return h.String(), nil
	path, err := a.RepositoryPath()

	if err != nil {
		return "", err
	}

	for _, f := range fileList {
		out, err := utils.RunCmdByPath(path, "git", "add", f)
		if err != nil {
			return out, err
		}
	}
	out, err := utils.RunCmdByPath(path, "git", "commit", "-m", title+":"+msg)

	if err != nil {
		return out, err
	}
	return out, nil

}
