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

const NewStatusButton = styled.span`
  margin: 1rem 0;
  font-size: 0.8rem;
  width: 100%;
  color: ${(props) => props.theme.secondaryColor};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s;

  ${(props: { isDisplayed: boolean }) =>
    props.isDisplayed &&
    css`
      display: none;
    `}

  :hover {
    color: ${(props) => props.theme.primaryColor};
    opacity: 1;
  }

  &:before,
  &:after {
    content: '';
    display: inline-block;
    border-bottom: solid 1px ${(props) => props.theme.borderColor};
    flex: 1 1 auto;
    margin: 0 1rem;
  }
`

interface Props {
  currentUser: firebase.User
  statuses?: firebase.firestore.DocumentData[]
  currOrder: number
}

const Form = ({ currentUser, statuses, currOrder }: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const statusesRef = firestore.collection('statuses')
  const formInitialValue = { name: '', color: '' }
  const [formValue, setFormValue] = useState(formInitialValue)
  const { uid } = currentUser

  const createStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const previousStatuses = statuses?.filter(
      (status) => currOrder <= status.order,
    )

    previousStatuses?.forEach((status) => {
      const { id } = status
      const statusRef = firestore.collection('statuses').doc(id)

      statusRef.update({
        order: status.order + 1,
      })
    })

    await statusesRef.add({
      name: formValue.name,
      color: formValue.color,
      order: currOrder,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
    })

    setFormValue(formInitialValue)
    setDisplayForm(false)
  }

  return (
    <>
      <NewStatusButton
        onClick={() => {
          setDisplayForm(true)
        }}
        isDisplayed={displayForm}
      >
        New Status
      </NewStatusButton>

      <NewStatusForm isDisplayed={displayForm} onSubmit={createStatus}>
        <FormTop>
          <CloseIcon
            onClick={() => {
              setDisplayForm(false)
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
    </>
  )
}

export default Form
