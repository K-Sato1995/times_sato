import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { TextAreaForm as TodoForm } from 'components/molecules'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin: 2.25rem;
  padding: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-radius: 5px;

  @media screen and (max-width: 29.9999em) {
    margin: 0.625rem;
  }
`

interface Props {
  currentUser: firebase.User
}

const Form = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')
  const [formValue, setFormValue] = useState('')
  const { uid } = currentUser

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await todosRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
      uid: uid,
    })
    setFormValue('')
  }

  return (
    <FormContainer>
      <TodoForm
        formValue={formValue}
        setFormValue={setFormValue}
        onSubmit={createTodo}
      />
    </FormContainer>
  )
}

export default Form
