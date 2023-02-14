package repository

import (
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
	IsRemoteSync bool      `json:"isRemoteSync"`
}

func (r *Repository) Commits(branch string) ([]Commit, error) {
	if branch == "" {
		return nil, errors.New("branch name error")
	}

	var logs []Commit
	//f := fmt.Sprintf("--format=format:%s", `{"hash":"%H","author":"%an","message":"%s","treeHash":"%T","parentHashes":"%P","committer":{"name":"%cn","email":"%ce","when":"%cr"}},`)
	f := fmt.Sprintf("--format=format:%s", `%H<||>%an<||>%s<||>%T<||>%P<||>%cn<||>%ce<||>%cr<|n|>`)
	out, err := utils.RunCmdByPath(r.Path, "git", "log", branch, f, "-n 60")
	if err != nil {
		return nil, err
	}
	isRemoteRepo, err := r.IsRemoteRepo()
	if err != nil {
		return nil, err
	}
	var noRemoteSyncHash string
	if isRemoteRepo {
		//TODO是否有这个远程分支
		arg := fmt.Sprintf("origin/%s...%s", branch, branch)
		noRemoteSyncHash, err = utils.RunCmdByPath(r.Path, "git", "log", `--pretty=format:"%H"`, arg)
		if err != nil {
			return nil, err
		}
	}
	outs := strings.Split(out, "<|n|>")
	for _, r := range outs {
		rows := strings.Split(strings.TrimSpace(r), "<||>")
		if len(rows) != 8 {
			continue
		}
		//`{"hash":"%H","author":"%an","message":"%s","treeHash":"%T","parentHashes":"%P","committer":{"name":"%cn","email":"%ce","when":"%cr"}},`
		hash := strings.TrimSpace(rows[0])

		var isRemoteSync bool
		if isRemoteRepo {
			isRemoteSync = !strings.Contains(noRemoteSyncHash, hash)
		}

		logs = append(logs, Commit{
			Hash:         hash,
			Author:       rows[1],
			Message:      rows[2],
			TreeHash:     rows[3],
			ParentHashes: rows[4],
			Committer: Signature{
				Name:  rows[5],
				Email: rows[6],
				When:  rows[7],
			},
			IsRemoteSync: isRemoteSync,
		})
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

	f := fmt.Sprintf("--pretty=%s", `%h<||>%p<||>%d<||>%an<||>%s<|n|>`)

	out, err := utils.RunCmdByPath(r.Path, "git", "log", "--all", "--date-order", "-n 100", f)
	if err != nil {
		return nil, err
	}

	outs := strings.Split(out, "<|n|>")
	var commitIds []string
	var logs []Log
	for _, log := range outs {
		rows := strings.Split(strings.TrimSpace(log), "<||>")
		if len(rows) != 5 {
			continue
		}
		commitIds = append(commitIds, rows[0])
		logs = append(logs, Log{
			Hash:         rows[0],
			ParentHashes: strings.Split(strings.TrimSpace(rows[1]), " "),
			Desc:         parseDesc(rows[2]),
			Author:       rows[3],
			Message:      rows[4],
		})
	}

	commitIdsStr := strings.Join(commitIds, "")
	for i, log := range logs {
		var ph []string
		for _, p := range log.ParentHashes {
			//如果父元素等于空字符表示它没有父元素，是提交的起点
			//因为只取了100条日志，如果父元素没在本次的记录里面，也当为空
			if p == "" || !strings.Contains(commitIdsStr, p) {
				ph = append(ph, "")
			} else {
				ph = append(ph, p)
			}
		}
		logs[i].ParentHashes = ph
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
