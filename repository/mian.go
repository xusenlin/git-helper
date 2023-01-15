package repository

import "git-helper/utils"

type Repository struct {
	Path string
}

func New() *Repository {
	return &Repository{}
}

func (r *Repository) SwitchRepository(path string) error {
	r.Path = path
	return nil
}

func (r *Repository) GitPull() (string, error) {
	return utils.RunCmdByPath(r.Path, "git", "pull")
}
func (r *Repository) GitPush() (string, error) {
	return utils.RunCmdByPath(r.Path, "git", "push")
}
