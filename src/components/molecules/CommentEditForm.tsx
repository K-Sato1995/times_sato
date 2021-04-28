import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { FaInfoCircle } from 'react-icons/fa'
import { Button, Textarea } from 'components/atoms'

const CommentForm = styled.form`
  width: 100%;
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
  comment: firebase.firestore.DocumentData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ comment, setIsEditing }: Props) => {
  const { id, text } = comment
  const [formValue, setFormValue] = useState<string>(text)

  const commentRef = firestore.collection('comments').doc(id)

  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await commentRef
      .update({
        text: formValue,
      })
      .then(() => {
        alert('Document successfully updated!')
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  }

  return (
    <CommentForm onSubmit={updateComment}>
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
  )
}

export default Form
