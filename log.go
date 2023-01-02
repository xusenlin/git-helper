package main

import (
	"fmt"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
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
	ParentHashes []string  `json:"parentHashes"`
}

func (a *App) Log() ([]Log, error) {

	var logs []Log
	l, err := a.repository.Log(&git.LogOptions{})
	fmt.Println(err)
	if err != nil {
		return nil, err
	}

	err = l.ForEach(func(c *object.Commit) error {
		if len(logs) >= 80 {
			return nil
		}
		var parentHashes []string
		for _, h := range c.ParentHashes {
			parentHashes = append(parentHashes, h.String())
		}
		//Format(time.RFC1123)
		t := c.Committer.When

		logs = append(logs, Log{
			Hash:   c.Hash.String(),
			Author: c.Author.String(),
			Committer: Signature{
				Name:  c.Committer.Name,
				Email: c.Committer.Email,
				When:  t.Format(TimeLayout),
			},
			Message:      c.Message,
			TreeHash:     c.TreeHash.String(),
			ParentHashes: parentHashes,
		})

		return nil
	})

	return logs, nil
}
