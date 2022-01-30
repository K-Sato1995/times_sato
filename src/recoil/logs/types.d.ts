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

interface Log {
  id: string
  description: string
  logItemID: string
  hours: number
  uid: string
  date: any
  createdAt: any
}

type FormattedLog = {
  date: string
  count: number
}

interface LogItemsByCategory {
  [id: string]: {
    color?: string
    categoryID: string
    items?: DocumentData
  }
}

interface LogCategoryWithChildren {
  id: string
  color: string
  name: string
  uid: string
  createdAt: any
  logItems?: DocumentData
}

interface LogsByDate {
  [id: string]: {
    totalHours: number
    logs: Log[]
  }
}

interface LogItemWithChildLogs {
  id: string
  categoryID: string
  name: string
  totalHours: number
  uid: string
  createdAt: any
  logs?: DocumentData
}
