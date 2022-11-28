package utils

import (
	"crypto/md5"
	"errors"
	"fmt"
	"os"
	"os/exec"
)

func IsDir(path string) bool {

	if info, err := os.Stat(path); err == nil {
		return info.IsDir()
	}
	return false
}

func RunCmdByPath(path string, cmdName string, arg ...string) (string, error) {
	if !IsDir(path) {
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

func Md5(s string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(s)))
}
