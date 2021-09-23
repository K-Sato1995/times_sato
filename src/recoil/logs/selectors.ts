import { selector } from 'recoil'
import { logCategoriesState, categoriesSortState } from 'recoil/logs'

export const sortedCategoriesState = selector({
  key: 'sortedCategoriesState',
  get: ({ get }) => {
    const sort = get(categoriesSortState)
    const list = get(logCategoriesState)

    switch (sort) {
      case 'Sorted':
        return [...list].sort((a, b) => a.createdAt - b.createdAt)
      case 'UnSorted':
        return list
      default:
        return list
    }
  },
})
