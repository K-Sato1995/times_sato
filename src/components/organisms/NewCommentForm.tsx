import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { CommentForm } from 'components/molecules'

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
  const commentsRef = firestore.collection('comments')
  const [formValue, setFormValue] = useState('')
  const { uid } = currentUser

  const createComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await commentsRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      deleted: false,
      uid: uid,
    })
    setFormValue('')
  }

  return (
    <FormContainer>
      <CommentForm
        formValue={formValue}
        setFormValue={setFormValue}
        onSubmit={createComment}
      />
    </FormContainer>
  )
}

export default Form
