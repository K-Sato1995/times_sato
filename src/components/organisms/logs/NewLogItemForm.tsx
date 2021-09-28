import React, { useState } from 'react'
import styled from 'styled-components'
import { db } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const LogItemForm = styled.form`
  display: flex;
  /* border-bottom: solid ${(props) => props.theme.borderColor} 1px; */
`

const FormLeft = styled.div`
  position: relative;
  width: 5%;
`

const FormCenter = styled.div`
  width: 80%;
  display: grid;
  place-items: center;
`

const FormRight = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.5rem;
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
const LogItemInput = styled(Input)`
  border: none;
  width: 100%;
  padding: 0;

  :focus {
    outline: none;
  }
`

const FormButton = styled(Button)`
  display: inline-block;
  padding: 0rem 0.6rem;
  border-radius: 2.5px;

  :first-child {
    margin-bottom: 0.2rem;
  }
`

const NewLogItemBox = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 0.6rem 0;
  color: ${(props) => props.theme.secondaryColor};
  /* border-bottom: solid ${(props) => props.theme.borderColor} 1px; */
  cursor: pointer;
`

interface Props {
  currentUser: User
  categoryID: string
  categoryColor?: string
}

const Form = ({ currentUser, categoryID, categoryColor }: Props) => {
  const itemsRef = collection(db, 'logItems')
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [formValue, setFormValue] = useState('')
  const { uid } = currentUser

  const createLogItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValue) {
      alert("Text can't be blank")
      return
    }
    await addDoc(itemsRef, {
      name: formValue,
      createdAt: serverTimestamp(),
      totalHours: 0,
      uid: uid,
      categoryID,
    })
    setFormValue('')
  }

  return (
    <>
      {displayForm ? (
        <LogItemForm onSubmit={createLogItem}>
          <FormLeft>
            <StatusIcon color={categoryColor} />
          </FormLeft>

          <FormCenter>
            <LogItemInput
              placeholder={'LogItem Name'}
              value={formValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue(e.target.value)
              }
            />
          </FormCenter>

          <FormRight>
            <FormButton disabled={!formValue} buttonType={'primary'}>
              Save
            </FormButton>

            <FormButton
              onClick={() => {
                setDisplayForm(false)
              }}
              buttonType={'secondary'}
            >
              Close
            </FormButton>
          </FormRight>
        </LogItemForm>
      ) : (
        <NewLogItemBox
          onClick={() => {
            setDisplayForm(true)
          }}
        >
          + New LogItem
        </NewLogItemBox>
      )}
    </>
  )
}

export default Form
