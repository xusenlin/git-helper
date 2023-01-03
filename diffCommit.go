package main

import (
	"git-helper/utils"
	"strings"
)

type ChangesFile struct {
	FileName string `json:"fileName"`
	Index    int    `json:"index"`
	Desc     string `json:"desc"`
}
type DiffCommitInfo struct {
	ChangesFiles []ChangesFile `json:"changesFiles"`
	Statistics   string        `json:"statistics"`
}

func (a *App) DiffCommit(commitId string) (DiffCommitInfo, error) {
	path, err := a.RepositoryPath()

	var content DiffCommitInfo

	if err != nil {
		return content, err
	}
	out, err := utils.RunCmdByPath(path, "git", "diff", commitId, "--stat")
	if err != nil {
		return content, err
	}

	outs := strings.Split(strings.Trim(out, "\n"), "\n")

	content.Statistics = outs[len(outs)-1]

	var changes []ChangesFile

	for i, s := range outs[0 : len(outs)-1] {
		sa := strings.Split(s, "|")
		if len(sa) != 2 {
			changes = append(changes, ChangesFile{
				FileName: s,
				Index:    i,
				Desc:     "",
			})
		} else {
			changes = append(changes, ChangesFile{
				FileName: strings.Trim(sa[0], " "),
				Index:    i,
				Desc:     strings.Trim(sa[1], " "),
			})
		}

	}
	content.ChangesFiles = changes
	return content, nil
}
