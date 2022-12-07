package main

import (
	"errors"
	"git-helper/utils"
	"github.com/go-git/go-git/v5"
)

func (a *App) IsGitRepository(path string) (bool, error) {
	if !utils.IsDir(path + "/.git") {
		return false, errors.New("please select a git repository")
	}
	return true, nil
}

func (a *App) BindRepository(path string) (bool, error) {
	r, err := git.PlainOpen(path)
	if err != nil {
		return false, err
	}
	a.repository = r
	return true, nil
}
