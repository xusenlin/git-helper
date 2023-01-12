package repository

import (
	"errors"
	"git-helper/utils"
	"os/exec"
	sysRuntime "runtime"
)

func (r *Repository) IsGitRepository(path string) (bool, error) {
	if !utils.IsDir(path + "/.git") {
		return false, errors.New("please select a git repository")
	}
	return true, nil
}

func (r *Repository) OpenTerminal() error {

	var cmd *exec.Cmd
	switch sysRuntime.GOOS {
	case "darwin":
		cmd = exec.Command("open", "-b", "com.apple.Terminal", r.path)
	case "linux":
		cmd = exec.Command("x-terminal-emulator")
	case "windows":
		cmd = exec.Command("start", "cmd")
	default:
		return errors.New("unsupported operating system")
	}
	err := cmd.Run()
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) OpenFileManage() error {
	var cmd *exec.Cmd
	switch sysRuntime.GOOS {
	case "darwin":
		cmd = exec.Command("open", r.path)
	case "linux":
		cmd = exec.Command("xdg-open", r.path)
	case "windows":
		cmd = exec.Command(`cmd`, `/c`, `explorer`, r.path)
	default:
		return errors.New("unsupported operating system")
	}
	err := cmd.Start()
	if err != nil {
		return err
	}
	return nil
}
