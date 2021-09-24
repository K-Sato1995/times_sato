/*
  Followed the structure pattern here 
  https://wes-rast.medium.com/recoil-project-structure-best-practices-79e74a475caa
*/

import { atom } from 'recoil'

// LogCategory > LogItems > Logs

const logCategoriesState = atom<LogCategory[]>({
  key: 'logCategory',
  default: [],
})

const logItemsState = atom<LogItem[]>({
  key: 'logItems',
  default: [],
})

const categoriesSortState = atom({
  key: 'categoriesSortState',
  default: 'Sorted',
})

export { logCategoriesState, categoriesSortState, logItemsState }
