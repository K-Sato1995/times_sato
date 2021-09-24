interface StyledCompsProps {
  backgroundColor?: string
  textColor?: string
  isVisible?: string
}

type IssuesByStatus = {
  [id: string]: {
    id: string
    color?: string
    order: number
    issues?: DocumentData
  }
}
