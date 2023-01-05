package main

import (
	"git-helper/utils"
	"github.com/atotto/clipboard"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/ioutil"
	"strings"
)

const JsonDataPath = "./Data.json"
const TimeLayout = "2006-01-02 15:04:05"

func (a *App) Sha256(s string) string {
	return utils.Sha256(s)
}
func (a *App) MessageDialog(title string, message string) {
	_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   title,
		Message: message,
	})
}
func (a *App) SaveJsonFile(t string) error {

	if err := utils.RemoveFile(JsonDataPath); err != nil {
		return err
	}
	err := ioutil.WriteFile(JsonDataPath, []byte(t), 0666)

	if err != nil {
		return err
	}
	return nil
}
func (a *App) ReadJsonFile() (string, error) {

	b, err := ioutil.ReadFile(JsonDataPath)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
func (a *App) Clipboard(t string) error {
	return clipboard.WriteAll(t)
}

func (a *App) RunCmd(cmd string) (string, error) {
	path, err := a.RepositoryPath()
	if err != nil {
		return "", err
	}
	c := strings.Split(cmd, " ")

	return utils.RunCmdByPath(path, c[0], c[1:]...)

}
