package main

import (
	"git-helper/utils"
	"strings"
)

type DiffFlag = uint

const (
	DEFAULT DiffFlag = iota
	ADDED
	REMOVED
)

type DiffContent struct {
	Content string   `json:"content"`
	Type    DiffFlag `json:"type"`
	Index   int      `json:"index"`
}

//func (a *App) ChangesInfo(commitId string) ([]DiffContent, error) {
//	path, err := a.RepositoryPath()
//
//	var content []DiffContent
//
//	if err != nil {
//		return content, err
//	}
//	out, err := utils.RunCmdByPath(path, "git", "diff", commitId, "--stat")
//	if err != nil {
//		return content, err
//	}
//	outs := strings.Split(out, "\n")
//
//	for i, s := range outs {
//		f := getDiffFlag(s)
//		content = append(content, DiffContent{
//			Index:   i,
//			Content: s,
//			Type:    f,
//		})
//	}
//
//	return content, nil
//}

func (a *App) DiffWorkStage(filePath string) ([]DiffContent, error) {
	path, err := a.RepositoryPath()

	var content []DiffContent

	if err != nil {
		return content, err
	}
	out, err := utils.RunCmdByPath(path, "git", "diff", filePath)
	if err != nil {
		return content, err
	}
	outs := strings.Split(out, "\n")

	for i, s := range outs {
		f := getDiffFlag(s)
		content = append(content, DiffContent{
			Index:   i,
			Content: s,
			Type:    f,
		})
	}

	return content, nil
}

func getDiffFlag(c string) DiffFlag {
	if strings.HasPrefix(c, "+") {
		return ADDED
	}
	if strings.HasPrefix(c, "-") {
		return REMOVED
	}
	return DEFAULT
}
