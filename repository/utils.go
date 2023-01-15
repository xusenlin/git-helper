package repository

import (
	"errors"
	"git-helper/utils"
	"os/exec"
	sysRuntime "runtime"
)

func (r *Repository) OpenTerminal() error {

	var cmd *exec.Cmd
	switch sysRuntime.GOOS {
	case "darwin":
		cmd = exec.Command("open", "-b", "com.apple.Terminal", r.Path)
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
		cmd = exec.Command("open", r.Path)
	case "linux":
		cmd = exec.Command("xdg-open", r.Path)
	case "windows":
		cmd = exec.Command(`cmd`, `/c`, `explorer`, r.Path)
	default:
		return errors.New("unsupported operating system")
	}
	err := cmd.Start()
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) RunCmdInRepository(cmd string, arg []string) (string, error) {
	return utils.RunCmdByPath(r.Path, cmd, arg...)
}
