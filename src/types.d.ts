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
