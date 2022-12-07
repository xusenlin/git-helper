package utils

import (
	"crypto/sha256"
	"errors"
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

func Sha256(s string) string {
	h := sha256.New()
	h.Write([]byte(s))
	return string(h.Sum(nil))
}
