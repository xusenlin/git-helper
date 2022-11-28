package main

import (
	"crypto/md5"
	"fmt"
)

func (a *App) IsGitRepository(path string) (bool, error) {
	_, err := a.runCmdByPath(path, "git", "rev-parse", "--is-inside-work-tree")
	if err != nil {
		return false, err
	}
	fmt.Println(path + "/.git")
	if !a.isDir(path + "/.git") {
		return false, err
	}
	return true, nil
}

func (a *App) GitVersion(path string) (string, error) {
	return a.runCmdByPath(path, "git", "--version")
}

func (a *App) Md5(s string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(s)))
}
