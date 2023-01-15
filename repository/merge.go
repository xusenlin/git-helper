package repository

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

func (r *Repository) PreMergeResult(currentHash, MergeHash string) (MergeResult, error) {

	var invalidResult = MergeResult{
		Kind:  Invalid,
		Count: 0,
	}

	h, err := utils.RunCmdByPath(r.Path, "git", "merge-base", currentHash, MergeHash)
	if err != nil {
		return invalidResult, err
	}
	baseHash := strings.TrimSpace(h)
	out, err := utils.RunCmdByPath(r.Path, "git", "merge-tree", baseHash, currentHash, MergeHash)
	if err != nil {
		return invalidResult, err
	}

	reg := regexp.MustCompile(conflictRegexp)
	matches := reg.FindAllString(out, -1)

	if len(matches) != 0 {
		return MergeResult{Kind: Conflicted, Count: len(matches)}, nil
	}
	out, err = utils.RunCmdByPath(r.Path, "git", "rev-list", "--left-right", "--count", currentHash+"..."+MergeHash)
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

func (r *Repository) MergeRebase(ourBranch, theirBranch string) (string, error) {

	ok, err := r.SwitchBranch(ourBranch)
	if err != nil {
		return "", err
	}
	if !ok {
		return "", errors.New("switch branch error")
	}
	out, err := utils.RunCmdByPath(r.Path, "git", "rebase", theirBranch)

	if err != nil {
		return "", err
	}
	return out, nil
}

func (r *Repository) MergeCommit(ourBranch, theirBranch string) (string, error) {
	ok, err := r.SwitchBranch(ourBranch)
	if err != nil {
		return "", err
	}
	if !ok {
		return "", errors.New("switch branch error")
	}
	out, err := utils.RunCmdByPath(r.Path, "git", "merge", theirBranch)

	if err != nil {
		return "", err
	}
	return out, nil
}

func (r *Repository) MergeSquash(ourBranch, theirBranch string) (string, error) {
	ok, err := r.SwitchBranch(ourBranch)
	if err != nil {
		return "", err
	}
	if !ok {
		return "", errors.New("switch branch error")
	}
	out, err := utils.RunCmdByPath(r.Path, "git", "merge", "--squash", theirBranch)

	if err != nil {
		return "", err
	}
	return out, nil
}
