import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

const CommentForm = styled.form`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 35px;

  @media screen and (max-width: 29.9999em) {
    padding: 10px;
  }
`

const CommentInput = styled.input`
  font-size: 1rem;
  border-radius: 5px;
  height: 37px;
  width: 100%;
  border: solid #e5e5e5 1px;
  outline: none;
  padding-left: 10px;

  :disabled {
    background-color: #eee;
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SubmitButton = styled.button`
  border-radius: 5px;
  width: 100px;
  font-weight: bold;
  background-color: ${(props) => props.theme.primaryColor};
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
      uid: uid,
    })
    setFormValue('')
  }
  return (
    <FormContainer>
      <CommentForm onSubmit={createComment}>
        <CommentInput
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={'Text'}
        />
        <SubmitButton disabled={!formValue}>Submit</SubmitButton>
      </CommentForm>
    </FormContainer>
  )
}

export default Form
