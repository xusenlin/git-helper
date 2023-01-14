package repository

import "git-helper/utils"

type Repository struct {
	Path string
}

func New() *Repository {
	return &Repository{}
}

func (r *Repository) SwitchRepository(path string) {
	r.Path = path
	//前端最后一个改的函数
}

func (r *Repository) GitPull() (string, error) {
	return utils.RunCmdByPath(r.Path, "git", "pull")
}
func (r *Repository) GitPush() (string, error) {
	return utils.RunCmdByPath(r.Path, "git", "push")
}
