import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { FaTimes } from 'react-icons/fa'

const TodoForm = styled.form`
  padding: 0.6rem 0;
  display: flex;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
`

const FormLeft = styled.div`
  position: relative;
  width: 5%;
`

const FormCenter = styled.div`
  width: 80%;
`

const FormRight = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 15%;
  border-left: solid ${(props) => props.theme.borderColor} 1px;
`

const StatusIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  border-radius: 2.5px;
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin-top: -5px;
  margin-left: -5px;
  background-color: ${(props: { color?: string }) =>
    props.color ? props.color : (props) => props.theme.primaryColor};
`
const TodoInput = styled(Input)`
  border: none;
  width: 100%;

  :focus {
    outline: none;
  }
`

const CreateButton = styled(Button)`
  padding: 0rem 0.6rem;
  border-radius: 2.5px;
`

const XIcon = styled(FaTimes)`
  font-size: 1rem;
  color: ${(props) => props.theme.secondaryColor};
  cursor: pointer;
  padding-top: 2px;
  transition: 0.2s;

  :hover {
    opacity: 0.7;
  }
`
const NewTaskBox = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 0.6rem 0;
  color: ${(props) => props.theme.secondaryColor};
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;
`

interface Props {
  currentUser: firebase.User
  status: string
  statusColor?: string
}

const Form = ({ currentUser, status, statusColor }: Props) => {
  const todosRef = firestore.collection('todos')
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [formValue, setFormValue] = useState('')
  const { uid } = currentUser

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValue) {
      alert("Text can't be blank")
      return
    }
    await todosRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: status,
      uid: uid,
    })
    setFormValue('')
  }

  return (
    <>
      {displayForm ? (
        <TodoForm onSubmit={createTodo}>
          <FormLeft>
            <StatusIcon color={statusColor} />
          </FormLeft>

          <FormCenter>
            <TodoInput
              placeholder={'Task Name'}
              value={formValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue(e.target.value)
              }
            />
          </FormCenter>

          <FormRight>
            <CreateButton disabled={!formValue} buttonType={'primary'}>
              Save
            </CreateButton>
            <XIcon
              onClick={() => {
                setDisplayForm(false)
              }}
            />
          </FormRight>
        </TodoForm>
      ) : (
        <NewTaskBox
          onClick={() => {
            setDisplayForm(true)
          }}
        >
          + New Task
        </NewTaskBox>
      )}
    </>
  )
}

export default Form
