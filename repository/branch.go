package repository

import (
	"encoding/json"
	"fmt"
	"git-helper/utils"
	"strings"
)

type Branch struct {
	Hash     string `json:"hash"`
	Name     string `json:"name"`
	RefName  string `json:"refName"`
	Upstream string `json:"upstream"`
}

func (r *Repository) PushBranch(name string) (string, error) {
	//git push -u origin main
	out, err := utils.RunCmdByPath(r.Path, "git", "push", "-u", "origin", name)
	if err != nil {
		return "", err
	}

	return out, nil
}

func (r *Repository) getBranch(isAll bool) ([]Branch, error) {

	var branch []Branch

	f := fmt.Sprintf("--format=%s", `{"hash":"%(objectname)","name":"%(refname:strip=2)","refName":"%(refname)","upstream":"%(upstream)"},`)
	var out string
	var err error
	if isAll {
		out, err = utils.RunCmdByPath(r.Path, "git", "branch", f, "-a", "--sort=-committerdate")
	} else {
		out, err = utils.RunCmdByPath(r.Path, "git", "branch", f, "--sort=-committerdate")
	}
	if err != nil {
		return nil, err
	}
	jsonStr := fmt.Sprintf("[%s]", strings.TrimRight(strings.TrimSpace(out), ","))

	err = json.Unmarshal([]byte(jsonStr), &branch)
	if err != nil {
		return nil, err
	}

	return branch, nil
}

func (r *Repository) GetLocalBranch() ([]Branch, error) { //menu
	return r.getBranch(false)
}
func (r *Repository) GetAllBranch() ([]Branch, error) { //use branch manage
	return r.getBranch(true)
}
func (r *Repository) SwitchBranch(branchName string) (bool, error) {
	_, err := utils.RunCmdByPath(r.Path, "git", "checkout", branchName)
	if err != nil {
		return false, err
	}
	return true, nil
}
func (r *Repository) AddBranch(branchName string) error {
	_, err := utils.RunCmdByPath(r.Path, "git", "branch", branchName)
	if err != nil {
		return err
	}
	return nil
}
func (r *Repository) DelBranch(branchName string, delRemote bool) (string, error) {

	if delRemote {
		out, err := utils.RunCmdByPath(r.Path, "git", "push", "origin", "-d", branchName)
		if err != nil {
			return out, err
		}
	}

	out, err := utils.RunCmdByPath(r.Path, "git", "branch", "-d", branchName)
	if err != nil {
		return out, err
	}

	return out, nil
}

func (r *Repository) GetBranchHash(branchName string) (string, error) {

	hash, err := utils.RunCmdByPath(r.Path, "git", "rev-parse", branchName)
	if err != nil {
		return "", err
	}
	h := strings.TrimSpace(hash)
	return h, nil
}

func (r *Repository) GetCurrentBranch() (string, error) {
	branch, err := utils.RunCmdByPath(r.Path, "git", "rev-parse", "--abbrev-ref", "HEAD")
	if err != nil {
		return "", err
	}
	b := strings.TrimSpace(branch)
	if strings.HasPrefix(b, "heads/") {
		b = strings.TrimLeft(b, "heads/")
	}
	return b, nil
}
