interface LogCategory {
  id: string
  color: string
  name: string
  uid: string
  createdAt: any
}

interface LogItem {
  id: string
  categoryID: string
  name: string
  totalHours: number
  uid: string
  createdAt: any
}

interface LogItemsByCategory {
  [id: string]: {
    color?: string
    categoryID: string
    items?: DocumentData
  }
}
