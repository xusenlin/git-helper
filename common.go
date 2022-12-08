package main

import (
	"git-helper/utils"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/ioutil"
)

const jsonPath = "./Data.json"

func (a *App) Sha1(s string) string {
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

	if err := utils.RemoveFile(jsonPath); err != nil {
		return err
	}
	err := ioutil.WriteFile(jsonPath, []byte(t), 0666)

	if err != nil {
		return err
	}
	return nil
}
func (a *App) ReadJsonFile() (string, error) {

	b, err := ioutil.ReadFile(jsonPath)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
