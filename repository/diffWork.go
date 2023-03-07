package repository

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

func (r *Repository) DiffWorkStage(filePath string) ([]DiffContent, error) {

	var content []DiffContent

	out, err := utils.RunCmdByPath(r.Path, "git", "diff", filePath)
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

func (r *Repository) ShowWorkTreeFile(filePath string, flag DiffFlag) ([]DiffContent, error) {

	var content []DiffContent

	out, err := utils.RunCmdByPath(r.Path, "git", "show", ":"+filePath)
	if err != nil {
		return content, err
	}
	outs := strings.Split(out, "\n")

	for i, s := range outs {
		content = append(content, DiffContent{
			Index:   i,
			Content: s,
			Type:    flag,
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
