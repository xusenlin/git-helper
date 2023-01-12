package repository

import "git-helper/utils"

type Repository struct {
	path string
}

func New() *Repository {
	return &Repository{}
}

func (r *Repository) SwitchRepository(path string) {
	r.path = path
	//前端最后一个改的函数
}

func (r *Repository) GitPull() (string, error) {
	return utils.RunCmdByPath(r.path, "git", "pull")
}
func (r *Repository) GitPush() (string, error) {
	return utils.RunCmdByPath(r.path, "git", "push")
}
