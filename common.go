package main

import (
	"git-helper/utils"
	"github.com/wailsapp/wails/v2/pkg/runtime"
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
