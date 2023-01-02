package main

import (
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

type Tag struct {
	Name       string `json:"name"`
	RefName    string `json:"refName"`
	Type       uint   `json:"type"`
	Message    string `json:"message"`
	Hash       string `json:"hash"`
	Time       string `json:"time"`
	CommitHash string `json:"commitHash"`
}

func (a *App) Tag() ([]Tag, error) {
	var tags []Tag
	tagRefs, err := a.repository.Tags()
	if err != nil {
		return tags, err
	}

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
			commit, err := tag.Commit()
			if err != nil {
				return err
			}
			tags = append(tags, Tag{
				Name:       t.Name().Short(),
				RefName:    t.Name().String(),
				Type:       1,
				Message:    tag.Message,
				Hash:       tag.Hash.String(),
				Time:       tag.Tagger.When.Format(TimeLayout),
				CommitHash: commit.Hash.String(),
			})
		} else {
			commit, err := a.repository.CommitObject(t.Hash())
			if err != nil {
				return err
			}
			tags = append(tags, Tag{
				Name:       t.Name().Short(),
				RefName:    t.Name().String(),
				Type:       2,
				Message:    "",
				Hash:       "",
				Time:       commit.Author.When.Format(TimeLayout),
				CommitHash: commit.Hash.String(),
			})
		}

		return nil
	})
	if err != nil {
		return tags, err
	}
	return tags, nil
}

func (a *App) DelTag(tag string) error {

	return a.repository.DeleteTag(tag)
}
func (a *App) CreateTag(tag string, msg string) error {
	h, err := a.repository.Head()
	if err != nil {
		return err
	}
	var opts *git.CreateTagOptions = nil
	if len(msg) != 0 {
		opts = &git.CreateTagOptions{
			//Tagger: &object.Signature{
			//	Name:  "John Doe",
			//	Email: "john@example.com",
			//	When:  time.Now(),
			//},
			Message: msg,
		}
	}
	_, err = a.repository.CreateTag(tag, h.Hash(), opts)
	if err != nil {
		return err
	}
	return nil
}
