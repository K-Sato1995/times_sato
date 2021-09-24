/*
  Followed the structure pattern here 
  https://wes-rast.medium.com/recoil-project-structure-best-practices-79e74a475caa
*/

import { atom } from 'recoil'

const issueStatusState = atom<IssueStatus[]>({
  key: 'issueStatusState',
  default: [],
})

const issuesState = atom<Issue[]>({
  key: 'issuesState',
  default: [],
})

export { issueStatusState, issuesState }
