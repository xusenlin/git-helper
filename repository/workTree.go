package repository

import (
	"errors"
	"git-helper/utils"
	"strings"
)

type FileStatus struct {
	Name     string `json:"name"`
	Path     string `json:"path"`
	Staging  string `json:"staging"`
	Worktree string `json:"worktree"`
}

func (r *Repository) FileStatus() ([]FileStatus, error) {
	out, err := utils.RunCmdByPath(r.Path, "git", "--no-optional-locks", "status", "--porcelain")

	if err != nil {
		return nil, err
	}

	var changes []FileStatus
	files := strings.Split(strings.Trim(out, "\n"), "\n")
	if files == nil {
		return changes, nil
	}
	for _, c := range files {
		if len(c) < 4 {
			continue
		}
		staging := c[0:1]
		worktree := c[1:2]
		path := c[3:]

		if staging == "R" {
			p := strings.Split(path, "->")
			if len(p) != 2 {
				return changes, errors.New("staging r error")
			}
			path = strings.TrimSpace(p[1])
		}

		changes = append(changes, FileStatus{
			Name:     c[3:],
			Path:     path,
			Staging:  staging,
			Worktree: worktree,
		})
	}
	return changes, nil
}

func (r *Repository) Commit(title, msg string, fileList []string) (string, error) {
	for _, f := range fileList {
		out, err := utils.RunCmdByPath(r.Path, "git", "add", f)
		if err != nil {
			return out, err
		}
	}
	var message = title
	if msg != "" {
		message = message + "/n" + msg
	}
	out, err := utils.RunCmdByPath(r.Path, "git", "commit", "-m", message)

	if err != nil {
		return out, err
	}
	return out, nil

}

func (r *Repository) DiscardChanges(filePath string) (string, error) {

	out, err := utils.RunCmdByPath(r.Path, "git", "checkout", "HEAD", "--", filePath)

	if err != nil {
		return "", err
	}
	return out, nil
}
