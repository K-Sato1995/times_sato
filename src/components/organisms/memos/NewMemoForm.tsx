import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { TextAreaForm } from 'components/molecules'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 1rem;
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
  const memosRef = firestore.collection('memos')
  const [formValue, setFormValue] = useState('')
  const { uid } = currentUser

  const createMemo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValue) {
      alert("Memo can't be blank")
      return
    }

    await memosRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      deleted: false,
      uid: uid,
    })
    setFormValue('')
  }

  return (
    <FormContainer>
      <TextAreaForm
        formValue={formValue}
        setFormValue={setFormValue}
        onSubmit={createMemo}
      />
    </FormContainer>
  )
}

export default Form
