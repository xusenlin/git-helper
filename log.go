package main

import (
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
)

type Log struct {
	Hash         string   `json:"hash"`
	Author       string   `json:"author"`
	Committer    string   `json:"committer"`
	Message      string   `json:"message"`
	TreeHash     string   `json:"treeHash"`
	ParentHashes []string `json:"parentHashes"`
}

func (a *App) Log() ([]Log, error) {

	var logs []Log
	l, err := a.repository.Log(&git.LogOptions{})

	if err != nil {
		return nil, err
	}
	err = l.ForEach(func(c *object.Commit) error {
		var parentHashes []string
		for _, h := range c.ParentHashes {
			parentHashes = append(parentHashes, h.String())
		}
		logs = append(logs, Log{
			Hash:         c.Hash.String(),
			Author:       c.Author.String(),
			Committer:    c.Committer.String(),
			Message:      c.Message,
			TreeHash:     c.TreeHash.String(),
			ParentHashes: parentHashes,
		})
		return nil
	})

	return logs, nil
}
