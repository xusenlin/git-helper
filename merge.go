package main

import (
	"errors"
	"git-helper/utils"
	"regexp"
	"strconv"
	"strings"
)

type MergeKind int

const conflictRegexp = `\+[<>=]{7}\s\.our[\w\W]*?\+[<>=]{7}\s\.their`

const (
	Invalid MergeKind = iota
	Conflicted
	Clean
)

type MergeResult struct {
	Kind  MergeKind `json:"kind"`
	Count int       `json:"count"`
}

func (a *App) PreMergeResult(currentHash, MergeHash string) (MergeResult, error) {
	path, err := a.RepositoryPath()
	var invalidResult = MergeResult{
		Kind:  Invalid,
		Count: 0,
	}
	if err != nil {
		return invalidResult, err
	}
	h, err := utils.RunCmdByPath(path, "git", "merge-base", currentHash, MergeHash)
	if err != nil {
		return invalidResult, err
	}
	baseHash := strings.TrimSpace(h)
	out, err := utils.RunCmdByPath(path, "git", "merge-tree", baseHash, currentHash, MergeHash)
	if err != nil {
		return invalidResult, err
	}

	r := regexp.MustCompile(conflictRegexp)
	matches := r.FindAllString(out, -1)

	if len(matches) != 0 {
		return MergeResult{Kind: Conflicted, Count: len(matches)}, nil
	}
	out, err = utils.RunCmdByPath(path, "git", "rev-list", "--left-right", "--count", currentHash, MergeHash)
	if err != nil {
		return invalidResult, err
	}

	c := strings.Split(out, "\t")

	if len(c) != 2 {
		return invalidResult, errors.New("rev-list out err")
	}
	i, err := strconv.ParseInt(strings.TrimSpace(c[1]), 10, 64)
	if err != nil {
		return invalidResult, err
	}
	return MergeResult{Kind: Clean, Count: int(i)}, nil
}
