declare module 'react-tiny-link'
declare module 'react-syntax-highlighter'

interface StyledCompsProps {
  backgroundColor?: string
  textColor?: string
  isVisible?: string
}

type TodosByStatus = {
  [id: string]: {
    color?: string
    order: number
    todos?: firebase.firestore.DocumentData
  }
}

type LogItemsByCategory = {
  [id: string]: {
    color?: string
    categoryID: string
    items?: firebase.firestore.DocumentData
  }
}
