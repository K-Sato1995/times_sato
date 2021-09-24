import { selector } from 'recoil'
import { issuesState, issueStatusState } from 'recoil/issues'

export const issuesByStatusState = selector({
  key: 'issuesByStatus',
  get: ({ get }) => {
    const statuses = get(issueStatusState)
    const issues = get(issuesState)

    const issuesByStatus: IssuesByStatus = {}

    statuses.forEach((status) => {
      let tmp = issues?.filter((issue) => issue.status === status.id)
      issuesByStatus[status.name] = {
        id: status.id,
        color: status.color,
        order: status.order,
        issues: tmp,
      }
    })

    return issuesByStatus
  },
})
