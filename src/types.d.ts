interface StyledCompsProps {
  backgroundColor?: string
  textColor?: string
  isVisible?: string
}

type TodosByStatus = {
  [id: string]: {
    id: string
    color?: string
    order: number
    todos?: DocumentData
  }
}

type LogItemsByCategory = {
  [id: string]: {
    color?: string
    categoryID: string
    items?: DocumentData
  }
}
