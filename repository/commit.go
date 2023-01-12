package repository

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

type Commit struct {
	Hash         string    `json:"hash"`
	Author       string    `json:"author"`
	Committer    Signature `json:"committer"`
	Message      string    `json:"message"`
	TreeHash     string    `json:"treeHash"`
	ParentHashes string    `json:"parentHashes"`
}

func (r *Repository) Commits(branch string) ([]Commit, error) {
	if branch == "" {
		return nil, errors.New("branch name error")
	}

	var logs []Commit
	f := fmt.Sprintf("--format=format:%s", `{"hash":"%H","author":"%an","message":"%s","treeHash":"%T","parentHashes":"%P","committer":{"name":"%cn","email":"%ce","when":"%cr"}},`)

	out, err := utils.RunCmdByPath(r.path, "git", "log", branch, f, "-n 100")
	if err != nil {
		return nil, err
	}
	jsonStr := fmt.Sprintf("[%s]", strings.TrimRight(out, ","))

	err = json.Unmarshal([]byte(jsonStr), &logs)
	if err != nil {
		return nil, err
	}

	return logs, nil
}
