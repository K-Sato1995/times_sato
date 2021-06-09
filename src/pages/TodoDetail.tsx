import React from 'react'
import styled from 'styled-components'
import { firestore } from 'firebaseConfig'
import { useParams } from 'react-router-dom'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Input, Textarea, ContentWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DetailFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const FormInput = styled(Input)`
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  word-wrap: break-word;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  margin: 0.5rem 0;

  :focus {
    outline: solid ${(props) => props.theme.borderColor} 1px;
    border: none;
  }

  :hover {
    border: solid ${(props) => props.theme.borderColor} 1px;
  }
`

const TodoTitle = styled(FormInput)`
  font-size: 1.2rem;
`
const Due = styled(FormInput)``

const Description = styled(FormInput)`
  border: solid ${(props) => props.theme.borderColor} 1px;
`

type TodoObj = {
  text: string
  due: any
  description: string
}

const TodoDetail = () => {
  const { itemID } = useParams<{ itemID: string }>()
  const todoRef = firestore.doc(`todos/${itemID}`)

  const updateTodo = async (todoObj: TodoObj) => {
    await todoRef
      .update(todoObj)
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  }

  const [todo, loading, error] = useDocumentData(todoRef, {
    idField: 'id',
  })

  if (error) {
    console.log(error.message)
  }

  if (loading) return <LoadingState />

  return (
    <ContentWrapper>
      <DetailFormWrapper>
        <TodoTitle
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateTodo({ ...todo, text: e.target.value } as TodoObj)
          }}
          value={todo?.text}
          placeholder={'Title'}
        />
        <DatePicker
          selected={todo?.due ? new Date(todo?.due.toDate()) : new Date()}
          placeholderText="Due"
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(dateTime) =>
            updateTodo({ ...todo, due: dateTime } as TodoObj)
          }
          customInput={<Due />}
        />

        <Description
          as={Textarea}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateTodo({ ...todo, description: e.target.value } as TodoObj)
          }}
          minRows={10}
          value={todo?.description}
          placeholder={'Description'}
        />
      </DetailFormWrapper>
    </ContentWrapper>
  )
}

export default TodoDetail
