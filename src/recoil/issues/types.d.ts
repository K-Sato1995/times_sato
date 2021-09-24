interface IssueStatus {
  id: string
  color: string
  name: string
  uid: string
  order: number
  createdAt: any
}

interface Issue {
  id: string
  status: string
  text: string
  due: any
  uid: string
  createdAt: any
}

type FormattedLog = {
  date: string
  count: number
}

type IssuesByStatus = {
  [id: string]: {
    id: string
    color?: string
    order: number
    issues?: DocumentData
  }
}
