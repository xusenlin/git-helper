package main

import (
	"context"
	"fmt"
	"git-helper/repository"
	"git-helper/utils"
	"github.com/go-git/go-git/v5"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os/user"
)

// App struct
type App struct {
	ctx          context.Context
	repository   *git.Repository
	repo         *repository.Repository
	dataSaveJson string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	fmt.Println(ctx)
	a.ctx = ctx
	u, err := user.Current()
	if err != nil {
		panic(err)
	}
	a.dataSaveJson = u.HomeDir + "/Git_Helper.json"
}

// Greet returns a greeting for the given name
func (a *App) menu() *menu.Menu {
	appMenu := menu.NewMenu()

	appMenu.Append(menu.EditMenu())

	repo := appMenu.AddSubmenu("Repository")
	repo.AddText("Add local repository", keys.CmdOrCtrl("a"), func(_ *menu.CallbackData) {
		path, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
			Title: "Select Local Git Repository",
		})
		if err != nil || len(path) == 0 {
			return
		}
		id := utils.Sha256(path)
		runtime.EventsEmit(a.ctx, "Repository_A", id, path)
	})
	repo.AddText("Repository manage", keys.CmdOrCtrl(""), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Repository_M")
	})

	branch := appMenu.AddSubmenu("Branch")
	branch.AddText("New Branch", keys.CmdOrCtrl(""), func(_ *menu.CallbackData) {

	})
	branch.AddText("Branch manage", keys.CmdOrCtrl(""), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Branch_M")
	})

	settings := appMenu.AddSubmenu("Settings")
	settings.AddText("Theme", keys.CmdOrCtrl("t"), func(_ *menu.CallbackData) {
		runtime.EventsEmit(a.ctx, "Settings_Theme")
	})
	//settings.AddText("Branch", keys.CmdOrCtrl("b"), func(_ *menu.CallbackData) {
	//
	//})

	//other.AddText("About", keys.CmdOrCtrl("a"), func(_ *menu.CallbackData) {
	//
	//})
	//other.AddText("Version", keys.CmdOrCtrl("v"), func(_ *menu.CallbackData) {
	//
	//})
	//other.AddText("Github", keys.CmdOrCtrl("g"), func(_ *menu.CallbackData) {
	//
	//})

	return appMenu
}
