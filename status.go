package main

type Status struct {
	File     string `json:"file"`
	Staging  string `json:"staging"`
	Worktree string `json:"worktree"`
}

func (a *App) FileStatus() ([]Status, error) {
	w, err := a.repository.Worktree()
	if err != nil {
		return nil, err
	}
	s, err := w.Status()
	if err != nil {
		return nil, err
	}
	var changes []Status
	for f, s := range s {
		changes = append(changes, Status{
			File:     f,
			Staging:  string(s.Staging),
			Worktree: string(s.Worktree),
		})
	}
	return changes, nil
}
