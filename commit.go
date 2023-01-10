package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"git-helper/utils"
	"strings"
)

type Signature struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	When  string `json:"when"`
}

type Log struct {
	Hash         string    `json:"hash"`
	Author       string    `json:"author"`
	Committer    Signature `json:"committer"`
	Message      string    `json:"message"`
	TreeHash     string    `json:"treeHash"`
	ParentHashes string    `json:"parentHashes"`
	OnMainBranch bool      `json:"onMainBranch"`
}

func (a *App) Log(branch string) ([]Log, error) {
	if branch == "" {
		return nil, errors.New("branch name error")
	}
	path, err := a.RepositoryPath()
	if err != nil {
		return nil, err
	}
	var logs []Log
	f := fmt.Sprintf("--format=format:%s", `{"hash":"%H","author":"%an","message":"%s","treeHash":"%T","parentHashes":"%P","committer":{"name":"%cn","email":"%ce","when":"%cr"}},`)

	out, err := utils.RunCmdByPath(path, "git", "log", branch, f, "-n 100")
	if err != nil {
		return nil, err
	}
	jsonStr := fmt.Sprintf("[%s]", strings.TrimRight(out, ","))

	err = json.Unmarshal([]byte(jsonStr), &logs)
	if err != nil {
		return nil, err
	}

	if branch == "main" {
		for i := range logs {
			logs[i].OnMainBranch = true
		}
		return logs, nil
	}

	out, err = utils.RunCmdByPath(path, "git", "log", "main", "--format=format:'%H'")
	if err != nil {
		return nil, err
	}
	mainCommitIds := strings.Split(strings.TrimSpace(out), "/n")
	fmt.Println(mainCommitIds)

	for i := range logs {

		logs[i].OnMainBranch = strings.Contains(strings.Join(mainCommitIds, " "), logs[i].Hash)
	}
	return logs, nil

	//git log main --format=format:'%H'
	//
	//var logs []Log
	//l, err := a.repository.Log(&git.LogOptions{})
	//fmt.Println(err)
	//if err != nil {
	//	return nil, err
	//}
	//
	//err = l.ForEach(func(c *object.Commit) error {
	//	if len(logs) >= 80 {
	//		return nil
	//	}
	//	var parentHashes []string
	//	for _, h := range c.ParentHashes {
	//		parentHashes = append(parentHashes, h.String())
	//	}
	//	//Format(time.RFC1123)
	//	t := c.Committer.When
	//
	//	logs = append(logs, Log{
	//		Hash:   c.Hash.String(),
	//		Author: c.Author.String(),
	//		Committer: Signature{
	//			Name:  c.Committer.Name,
	//			Email: c.Committer.Email,
	//			When:  t.Format(TimeLayout),
	//		},
	//		Message:      c.Message,
	//		TreeHash:     c.TreeHash.String(),
	//		ParentHashes: parentHashes,
	//	})
	//
	//	return nil
	//})
	//
	//return logs, nil
}
