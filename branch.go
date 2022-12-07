package main

import (
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

type Branch struct {
	Hash    string `json:"hash"`
	Name    string `json:"name"`
	RefName string `json:"refName"`
}

func (a *App) GetBranch() ([]Branch, error) {

	branRefs, err := a.repository.Branches()
	if err != nil {
		return nil, err
	}
	var branch []Branch
	err = branRefs.ForEach(func(b *plumbing.Reference) error {
		branch = append(branch, Branch{
			Hash:    b.Hash().String(),
			Name:    b.Name().Short(),
			RefName: b.Name().String(),
		})
		return nil
	})
	if err != nil {
		return nil, err
	}
	return branch, nil
}

func (a *App) SwitchBranch(branchName string) (bool, error) {
	w, err := a.repository.Worktree()
	if err != nil {
		return false, err
	}
	err = w.Checkout(&git.CheckoutOptions{Branch: plumbing.NewBranchReferenceName(branchName), Keep: true})
	if err != nil {
		return false, err
	}
	return true, nil
}
