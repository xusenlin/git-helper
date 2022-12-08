import {Category, Repository} from "../store/sliceCategory";

export const getRepositoryById = (id: string,categories:Category[]): Repository | null => {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]
    let repo = category.repositories.find(r => r.id === id)
    if (repo) return repo
  }
  return null
}

export const getRepositoryPathById = (id: string,categories:Category[]): string | null => {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]
    let repo = category.repositories.find(r => r.id === id)
    if (repo) return repo.path
  }
  return null
}
