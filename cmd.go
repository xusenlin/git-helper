package main

import (
	"fmt"
	"git-helper/utils"
	"strings"
)

func (a *App) IsGitRepository(id string) (bool, error) {
	path := a.repository[id]
	_, err := utils.RunCmdByPath(path, "git", "rev-parse", "--is-inside-work-tree")
	if err != nil {
		return false, err
	}
	fmt.Println(path + "/.git")
	if !utils.IsDir(path + "/.git") {
		return false, err
	}
	return true, nil
}

func (a *App) GitVersion(id string) (string, error) {
	path := a.repository[id]
	return utils.RunCmdByPath(path, "git", "--version")
}

func (a *App) Md5(s string) string {
	return utils.Md5(s)
}

func (a *App) GetBranchByPath(id string) ([]string, error) {
	path := a.repository[id]
	out, err := utils.RunCmdByPath(path, "git", "branch", "-r")
	if err != nil {
		return []string{}, err
	}

	deleteOrigin := strings.ReplaceAll(out, "origin/", "")

	branch := strings.Split(strings.Trim(strings.ReplaceAll(deleteOrigin, " ", ""), "\n"), "\n")

	var newBranch []string
	for _, b := range branch {
		if !strings.Contains(b, "HEAD") {
			newBranch = append(newBranch, b)
		}
	}
	return newBranch, nil
}

func (a *App) GitCheckout(id string, branch string) (string, error) {
	path := a.repository[id]
	return utils.RunCmdByPath(path, "git", "checkout", branch)
}
