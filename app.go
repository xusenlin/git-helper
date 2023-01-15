package main

import (
	"context"
	"git-helper/repository"
	"git-helper/utils"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os/user"
)

// App struct
type App struct {
	ctx          context.Context
	repository   *repository.Repository
	dataSaveJson string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	u, err := user.Current()
	if err != nil {
		panic(err)
	}
	a.dataSaveJson = u.HomeDir + "/Git_Helper.json"
}
func (a *App) setRepository(r *repository.Repository) {
	a.repository = r
}

// Greet returns a greeting for the given name
func (a *App) menu() *menu.Menu {
	appMenu := menu.NewMenu()

	appMenu.Append(menu.EditMenu())

	repo := appMenu.AddSubmenu("Repository")
	repo.AddText("Add local repository", keys.CmdOrCtrl("r"), func(_ *menu.CallbackData) {
		path, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
			Title: "Select Local Git Repository",
		})
		if err != nil || len(path) == 0 {
			return
		}
		id := utils.Sha256(path)
		runtime.EventsEmit(a.ctx, "Repository_A", id, path)
	})

	repo.AddText("Repository manage", keys.CmdOrCtrl("m"), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Repository_M")
	})

	bt := appMenu.AddSubmenu("Branch&Tag")

	bt.AddText("Branch manage", keys.CmdOrCtrl("b"), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Branch_M")
	})
	bt.AddText("Tag manage", keys.CmdOrCtrl("t"), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Tag_M")
	})

	other := appMenu.AddSubmenu("Other")
	other.AddText("Theme", keys.CmdOrCtrl(""), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Settings_Theme")
	})
	other.AddText("About", keys.CmdOrCtrl(""), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Settings_About")
	})

	return appMenu
}
