import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { FaTimes } from 'react-icons/fa'

const CreateButton = styled(Button)`
  padding: 0.3rem 0.6rem;
  border-radius: 2.5px;
`

const NewStatusForm = styled.form`
  margin: 2rem 0;
  border: solid 1px ${(props) => props.theme.borderColor};
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;

  ${(props: { isDisplayed: boolean }) =>
    !props.isDisplayed &&
    css`
      display: none;
    `}
`

const FormTop = styled.div`
  position: relative;
  background-color: #fafbfc;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  height: 1.5rem;
`

const FormBottom = styled.div`
  background-color: #fafbfc;
  padding: 0.3rem;
  text-align: right;
`

const CloseIcon = styled(FaTimes)`
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColor};
`

const FormMiddle = styled.div`
  padding: 0 0.25rem;
  color: ${(props) => props.theme.secondaryColor};
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`

const TodoInput = styled(Input)`
  border: none;
  padding: 0.5rem 0;
  width: 100%;

  :first-child {
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
  }

  :focus {
    outline: none;
  }
`

interface Props {
  currentUser: firebase.User
  displayNewStatusForm: any
  setDisplayNewStatusForm: any
}

const Form = ({
  currentUser,
  displayNewStatusForm,
  setDisplayNewStatusForm,
}: Props) => {
  const statusesRef = firestore.collection('statuses')
  const formInitialValue = { name: '', color: '' }
  const [formValue, setFormValue] = useState(formInitialValue)
  const { uid } = currentUser

  const createStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await statusesRef.add({
      name: formValue.name,
      color: formValue.color,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
    })
    setFormValue(formInitialValue)
  }

  return (
    <NewStatusForm isDisplayed={displayNewStatusForm} onSubmit={createStatus}>
      <FormTop>
        <CloseIcon
          onClick={() => {
            setDisplayNewStatusForm(false)
          }}
        />
      </FormTop>
      <FormMiddle>
        <TodoInput
          placeholder={'Name'}
          value={formValue.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormValue({ ...formValue, name: e.target.value })
          }
        />
        <TodoInput
          placeholder={'Color'}
          value={formValue.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormValue({ ...formValue, color: e.target.value })
          }
        />
      </FormMiddle>

      <FormBottom>
        <CreateButton buttonType={'primary'}>Submit</CreateButton>
      </FormBottom>
    </NewStatusForm>
  )
}

export default Form
