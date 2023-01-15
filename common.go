package main

import (
	"errors"
	"git-helper/utils"
	"github.com/atotto/clipboard"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/ioutil"
)

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

	if err := utils.RemoveFile(a.dataSaveJson); err != nil {
		return err
	}
	err := ioutil.WriteFile(a.dataSaveJson, []byte(t), 0666)

	if err != nil {
		return err
	}
	return nil
}
func (a *App) ReadJsonFile() (string, error) {

	b, err := ioutil.ReadFile(a.dataSaveJson)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
func (a *App) Clipboard(t string) error {
	return clipboard.WriteAll(t)
}
func (a *App) IsGitRepository(path string) (bool, error) {
	if !utils.IsDir(path + "/.git") {
		return false, errors.New("not a git repository")
	}
	return true, nil
}
