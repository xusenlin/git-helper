package main

//type Branch struct {
//	Hash    string `json:"hash"`
//	Name    string `json:"name"`
//	RefName string `json:"refName"`
//}

//
//func (a *App) GetBranch() ([]Branch, error) {
//
//	branRefs, err := a.repository.Branches()
//	if err != nil {
//		return nil, err
//	}
//	var branch []Branch
//	err = branRefs.ForEach(func(b *plumbing.Reference) error {
//		b.Strings()
//		branch = append(branch, Branch{
//			Hash:    b.Hash().String(),
//			Name:    b.Name().Short(),
//			RefName: b.Name().String(),
//		})
//		return nil
//	})
//	if err != nil {
//		return nil, err
//	}
//	return branch, nil
//}
//
//func (a *App) SwitchBranch(branchName string) (bool, error) {
//	//w, err := a.repository.Worktree()
//	//if err != nil {
//	//	return false, err
//	//}
//	//err = w.Checkout(&git.CheckoutOptions{Branch: plumbing.NewBranchReferenceName(branchName), Keep: true})
//	//if err != nil {
//	//	return false, err
//	//}
//	//return true, nil
//	//上面的代码切换分支会导致缓存区不干净
//	path, err := a.RepositoryPath()
//	if err != nil {
//		return false, err
//	}
//	_, err = utils.RunCmdByPath(path, "git", "checkout", branchName)
//	if err != nil {
//		return false, err
//	}
//	return true, nil
//}

//func (a *App) DelBranch(branchName string, delRemote bool) (string, error) {
//	//BUG DeleteBranch no work
//	//return a.repository.DeleteBranch(branchName)
//	path, err := a.RepositoryPath()
//	if err != nil {
//		return "", err
//	}
//	out, err := utils.RunCmdByPath(path, "git", "branch", "-d", branchName)
//	if err != nil {
//		return out, err
//	}
//	if delRemote {
//		out, err = utils.RunCmdByPath(path, "git", "push", "origin", "-d", branchName)
//		if err != nil {
//			return out, err
//		}
//	}
//	return out, nil
//}

//func (a *App) AddBranch(branchName string) error {
//	//fmt.Println(branchName)
//	//BUG CreateBranch no work
//	//return a.repository.CreateBranch(&config.Branch{Name: branchName})
//	path, err := a.RepositoryPath()
//	if err != nil {
//		return err
//	}
//	_, err = utils.RunCmdByPath(path, "git", "branch", branchName)
//	if err != nil {
//		return err
//	}
//	return nil
//}

//func (a *App) GetLastCommit(branchName string) (string, error) {
//
//	path, err := a.RepositoryPath()
//	if err != nil {
//		return "", err
//	}
//	hash, err := utils.RunCmdByPath(path, "git", "rev-parse", branchName)
//	if err != nil {
//		return "", err
//	}
//	h := strings.TrimSpace(hash)
//	return h, nil
//}
