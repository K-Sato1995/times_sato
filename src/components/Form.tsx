import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import TextareaAutosize from 'react-textarea-autosize'
import { FaInfoCircle } from 'react-icons/fa'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin: 2.25rem;
  padding: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;

  @media screen and (max-width: 29.9999em) {
    margin: 0.625rem;
  }
`

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`

const FormTop = styled.div`
  max-width: 100%;
  position: relative;
`

const FormBottom = styled.div`
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
`

const CommentInput = styled(TextareaAutosize)`
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  border: solid ${(props) => props.theme.borderColor} 1px;
  outline: none;
  resize: none;
  padding: 0;
  padding-left: 0.1rem;
  padding-top: 0.3rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  :focus {
    outline: auto ${(props) => props.theme.primaryColor} 1px;
  }
  :disabled {
    background-color: #eee;
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const InfoIcon = styled(FaInfoCircle)`
  font-size: 0.8rem;
  position: absolute;
  left: 0;
  top: 30%;
`

const InfoMessage = styled.span`
  position: relative;
  display: inline-block;
  font-size: 0.8rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: ${(props) => props.theme.secondaryColor};
`

const SubmitButton = styled.button`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  background-color: ${(props) => props.theme.primaryColor};
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;
  margin-right: -0.1rem;

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
        <FormTop>
          <CommentInput
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder={'Text'}
            minRows={3}
            maxRows={6}
          />
        </FormTop>
        <FormBottom>
          <InfoMessage>
            <InfoIcon /> Markdown Available
          </InfoMessage>
          <SubmitButton disabled={!formValue}>Submit</SubmitButton>
        </FormBottom>
      </CommentForm>
    </FormContainer>
  )
}

export default Form
