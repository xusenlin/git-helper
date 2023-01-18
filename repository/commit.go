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
	UnRemoteSync bool      `json:"unRemoteSync"`
}

func (r *Repository) Commits(branch string) ([]Commit, error) {
	if branch == "" {
		return nil, errors.New("branch name error")
	}

	var logs []Commit
	f := fmt.Sprintf("--format=format:%s", `{"hash":"%H","author":"%an","message":"%s","treeHash":"%T","parentHashes":"%P","committer":{"name":"%cn","email":"%ce","when":"%cr"}},`)

	out, err := utils.RunCmdByPath(r.Path, "git", "log", branch, f, "-n 60")
	if err != nil {
		return nil, err
	}
	jsonStr := fmt.Sprintf("[%s]", strings.TrimRight(out, ","))

	err = json.Unmarshal([]byte(jsonStr), &logs)
	if err != nil {
		return nil, err
	}
	arg := fmt.Sprintf("origin/%s...%s", branch, branch)

	unRemoteSyncOut, err := utils.RunCmdByPath(r.Path, "git", "log", `--pretty=format:"%H"`, arg)

	if err != nil {
		return nil, err
	}

	for i, r := range logs {
		if strings.Contains(unRemoteSyncOut, r.Hash) {
			logs[i].UnRemoteSync = true
		}
	}

	return logs, nil
}

type LogDesc struct {
	Tag    []string `json:"tag"`
	Branch []string `json:"branch"`
}

type Log struct {
	Hash         string   `json:"hash"`
	ParentHashes []string `json:"parentHashes"`
	Desc         LogDesc  `json:"desc"`
	Author       string   `json:"author"`
	Message      string   `json:"message"`
}

func (r *Repository) CommitsLog() ([]Log, error) {
	//git log --all --date-order --pretty="%h<|>%p<|>%d<|>%an<|>%s<|n|>"
	var logs []Log
	f := fmt.Sprintf("--pretty=%s", `%h<||>%p<||>%d<||>%an<||>%s<|n|>`)

	out, err := utils.RunCmdByPath(r.Path, "git", "log", "--all", "--date-order", "-n 100", f)
	if err != nil {
		return nil, err
	}
	fmt.Println(out)
	outs := strings.Split(out, "<|n|>")
	lastIndex := len(outs) - 1
	for i := lastIndex; i >= 0; i-- {
		rows := strings.Split(strings.TrimSpace(outs[i]), "<||>")
		if len(rows) != 5 {
			continue
		}
		ph := strings.Split(strings.TrimSpace(rows[1]), " ")

		if i == lastIndex-1 {
			ph = nil
		}

		logs = append(logs, Log{
			Hash:         rows[0],
			ParentHashes: ph,
			Desc:         parseDesc(rows[2]),
			Author:       rows[3],
			Message:      rows[4],
		})
	}
	return logs, nil
}

func parseDesc(d string) LogDesc {
	s := strings.TrimSpace(d)
	r := strings.TrimRight(s, ")")
	str := strings.TrimLeft(r, "(")
	outs := strings.Split(str, ",")
	var desc LogDesc
	for _, f := range outs {
		flag := strings.TrimSpace(f)
		if strings.HasPrefix(flag, "tag:") {
			tag := strings.TrimLeft(flag, "tag:")
			desc.Tag = append(desc.Tag, strings.TrimSpace(tag))
		} else if flag != "" {
			desc.Branch = append(desc.Branch, flag)
		}
	}
	return desc
}
