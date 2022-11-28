package main

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) menu() *menu.Menu {
	appMenu := menu.NewMenu()

	appMenu.Append(menu.EditMenu())

	repo := appMenu.AddSubmenu("Repository")
	repo.AddText("Add Local Repository", keys.CmdOrCtrl("a"), func(_ *menu.CallbackData) {
		path, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
			Title: "Select Local Git Repository",
		})
		if err != nil || len(path) == 0 {
			return
		}
		runtime.EventsEmit(a.ctx, "Repository_A", path)
	})

	branch := appMenu.AddSubmenu("Branch")
	branch.AddText("New Branch", keys.CmdOrCtrl("b"), func(_ *menu.CallbackData) {

	})

	other := appMenu.AddSubmenu("Other")
	other.AddText("Theme", keys.CmdOrCtrl("t"), func(_ *menu.CallbackData) {

	})
	other.AddText("About", keys.CmdOrCtrl("a"), func(_ *menu.CallbackData) {

	})
	other.AddText("Version", keys.CmdOrCtrl("v"), func(_ *menu.CallbackData) {

	})
	other.AddText("Github", keys.CmdOrCtrl("g"), func(_ *menu.CallbackData) {

	})

	return appMenu
}
