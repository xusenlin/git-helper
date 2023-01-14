package repository

import (
	"fmt"
	"git-helper/utils"
	"strings"
)

type Tag struct {
	Name    string `json:"name"`
	RefName string `json:"refName"`
	Type    string `json:"type"`
	Message string `json:"message"`
	Hash    string `json:"hash"`
	Time    string `json:"time"`
}

func (r *Repository) Tags() ([]Tag, error) {
	var tags []Tag
	f := fmt.Sprintf("--format=%s", `%(refname:short)<||>%(refname)<||>%(objecttype)<||>%(subject)<||>%(objectname)<||>%(creatordate:relative)<|n|>`)

	out, err := utils.RunCmdByPath(r.Path, "git", "tag", f)
	if err != nil {
		return nil, err
	}
	fmt.Println(out)
	outs := strings.Split(out, "<|n|>")

	for _, tag := range outs {
		rows := strings.Split(strings.TrimSpace(tag), "<||>")
		if len(rows) != 6 {
			continue
		}
		tags = append(tags, Tag{
			Name:    rows[0],
			RefName: rows[1],
			Type:    rows[2],
			Message: rows[3],
			Hash:    rows[4],
			Time:    rows[5],
		})
	}
	return tags, nil
	//下面这种如果用户标签信息中含有"会导致失败
	//var tags []Tag
	//f := fmt.Sprintf("--format=%s", `{"name":"%(refname:short)","refName":"%(refname)","type":"%(objecttype)","message":"%(subject)","hash":"%(objectname)","time":"%(creatordate:relative)"},`)
	//
	//out, err := utils.RunCmdByPath(r.Path, "git", "tag", f)
	//if err != nil {
	//	return nil, err
	//}
	//jsonStr := fmt.Sprintf("[%s]", strings.TrimRight(strings.TrimSpace(out), ","))
	//fmt.Println(jsonStr)
	//err = json.Unmarshal([]byte(jsonStr), &tags)
	//if err != nil {
	//	return nil, err
	//}
	//
	//return tags, nil
}

func (r *Repository) DelTag(tagName string, delRemote bool) (string, error) {

	if delRemote {
		out, err := utils.RunCmdByPath(r.Path, "git", "push", "origin", "--delete", "tag", tagName)
		if err != nil {
			return out, err
		}
	}

	out, err := utils.RunCmdByPath(r.Path, "git", "tag", "-d", tagName)
	if err != nil {
		return out, err
	}

	return out, nil
}

//git tag  v10.0 -m "version 1.0"
//git push origin v1.0

func (r *Repository) CreateTag(tag string, msg string) (string, error) {
	var out string
	var err error
	if msg == "" {
		out, err = utils.RunCmdByPath(r.Path, "git", "tag", tag)
	} else {
		out, err = utils.RunCmdByPath(r.Path, "git", "tag", tag, "-m", msg)
	}
	if err != nil {
		return out, err
	}
	return out, nil
}

func (r *Repository) CreateTagByCommitId(tag string, commitId string) (string, error) {
	//git tag v1.0 a867b4af
	out, err := utils.RunCmdByPath(r.Path, "git", "tag", tag, commitId)
	if err != nil {
		return out, err
	}
	return out, nil
}
