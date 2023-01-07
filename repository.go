package main

import (
	"errors"
	"git-helper/utils"
	"github.com/go-git/go-git/v5"
	"os/exec"
	sysRuntime "runtime"
)

func (a *App) RepositoryPath() (string, error) {
	if a.repository == nil {
		return "", errors.New("please select a git repository first")
	}
	w, err := a.repository.Worktree()
	if err != nil {
		return "", err
	}

	return w.Filesystem.Root(), nil
}
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

func (a *App) OpenTerminal() error {
	path, err := a.RepositoryPath()
	if err != nil {
		return err
	}
	var cmd *exec.Cmd
	switch sysRuntime.GOOS {
	case "darwin":
		cmd = exec.Command("open", "-b", "com.apple.Terminal", path)
	case "linux":
		cmd = exec.Command("x-terminal-emulator")
	case "windows":
		cmd = exec.Command("start", "cmd")
	default:
		return errors.New("unsupported operating system")
	}
	err = cmd.Run()
	if err != nil {
		return err
	}
	return nil
}

func (a *App) OpenFileManage() error {
	path, err := a.RepositoryPath()
	if err != nil {
		return err
	}

	var cmd *exec.Cmd
	switch sysRuntime.GOOS {
	case "darwin":
		cmd = exec.Command("open", path)
	case "linux":
		cmd = exec.Command("xdg-open", path)
	case "windows":
		cmd = exec.Command(`cmd`, `/c`, `explorer`, path)
	default:
		return errors.New("unsupported operating system")
	}
	err = cmd.Start()
	if err != nil {
		return err
	}
	return nil
}

func (a *App) GitPull() (string, error) {
	path, err := a.RepositoryPath()
	if err != nil {
		return "", err
	}
	return utils.RunCmdByPath(path, "git", "pull")
}
func (a *App) GitPush() (string, error) {
	path, err := a.RepositoryPath()
	if err != nil {
		return "", err
	}
	return utils.RunCmdByPath(path, "git", "push")
}
