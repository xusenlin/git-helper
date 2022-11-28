package main

import (
	"errors"
	"os"
	"os/exec"
)

func (a *App) isDir(path string) bool {

	if info, err := os.Stat(path); err == nil {
		return info.IsDir()
	}
	return false
}

func (a *App) runCmdByPath(path string, cmdName string, arg ...string) (string, error) {
	if !a.isDir(path) {
		return "", errors.New("Can't find repository path:" + path)
	}

	cmd := exec.Command(cmdName, arg...)
	cmd.Dir = path

	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", errors.New(string(out))
	}
	return string(out), nil
}
