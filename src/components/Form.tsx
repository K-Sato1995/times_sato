import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { FaInfoCircle } from 'react-icons/fa'
import { Button, Textarea } from 'components/atoms'

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

const CommentInput = styled(Textarea)`
  border-radius: 5px;
  width: 100%;
  padding: 0;
  padding-left: 0.1rem;
  padding-top: 0.3rem;
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

const SubmitButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  margin-right: -0.1rem;
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue(e.target.value)
            }
            placeholder={'Text'}
            minRows={3}
            maxRows={6}
          />
        </FormTop>
        <FormBottom>
          <InfoMessage>
            <InfoIcon /> Markdown Available
          </InfoMessage>
          <SubmitButton buttonType="primary" disabled={!formValue}>
            Submit
          </SubmitButton>
        </FormBottom>
      </CommentForm>
    </FormContainer>
  )
}

export default Form
