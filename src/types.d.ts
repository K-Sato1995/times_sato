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
