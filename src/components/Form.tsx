import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
// import { useAuthState } from 'react-firebase-hooks/auth'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

const CommentForm = styled.form`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 35px;
`

const CommentInput = styled.input`
  border-radius: 5px;
  height: 37px;
  width: 100%;
  border: solid #e5e5e5 1px;
`

const SubmitButton = styled.button`
  border-radius: 5px;
  width: 100px;
  font-weight: bold;
  background-color: #2c7b7d;
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Form = () => {
  const commentsRef = firestore.collection('comments')

  const [formValue, setFormValue] = useState('')

  const createComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const { uid, photoURL } = auth.currentUser

    await commentsRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      // uid,
      // photoURL,
    })

    setFormValue('')
  }
  return (
    <FormContainer>
      <CommentForm onSubmit={createComment}>
        <CommentInput
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={'リンクか言葉を入力'}
        />
        <SubmitButton disabled={!formValue}>Submit</SubmitButton>
      </CommentForm>
    </FormContainer>
  )
}

export default Form
