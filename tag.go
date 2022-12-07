package main

import (
	"fmt"
	"github.com/go-git/go-git/v5/plumbing"
)

type Tag struct {
	Name    string `json:"name"`
	RefName string `json:"refName"`
	Type    uint   `json:"type"`
	Message string `json:"message"`
	Hash    string `json:"hash"`
}

func (a *App) Tag() ([]Tag, error) {
	tagRefs, err := a.repository.Tags()
	if err != nil {
		return nil, err
	}
	var tags []Tag
	err = tagRefs.ForEach(func(t *plumbing.Reference) error {
		o, err := a.repository.Object(plumbing.AnyObject, t.Hash())
		if err != nil {
			return err
		}
		if o.Type() == plumbing.TagObject {
			tag, err := a.repository.TagObject(t.Hash())
			if err != nil {
				return err
			}

			tags = append(tags, Tag{
				Name:    t.Name().Short(),
				RefName: t.Name().String(),
				Type:    1,
				Message: tag.Message,
				Hash:    tag.Hash.String(),
			})
			fmt.Println(tag)
		} else {
			c, err := a.repository.CommitObject(t.Hash())
			if err != nil {
				return err
			}

			tags = append(tags, Tag{
				Name:    t.Name().Short(),
				RefName: t.Name().String(),
				Type:    2,
				Message: c.Message,
				Hash:    c.Hash.String(),
			})
		}

		return nil
	})
	return tags, nil
}
