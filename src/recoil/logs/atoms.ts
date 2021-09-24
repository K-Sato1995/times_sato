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

const logItemState = atom<LogItem | null>({
  key: 'logItem',
  default: null,
})

const logsState = atom<Log[]>({
  key: 'logs',
  default: [],
})

export { logCategoriesState, logItemsState, logItemState, logsState }
