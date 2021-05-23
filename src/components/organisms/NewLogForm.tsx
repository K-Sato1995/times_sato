import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { FaTimes } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

/* 
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!! UPDATE TOAL HOURS !!!!!!!!!!!!!!!!!!!!!
*/

const LogItemForm = styled.form`
  padding: 0.6rem 0 0.6rem 1rem;
  display: flex;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
`

const FormCenter = styled.div`
  width: 85%;
  display: flex;
`

const FormRight = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 15%;
  border-left: solid ${(props) => props.theme.borderColor} 1px;
`

const LogInput = styled(Input)`
  border: none;

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
const NewLogBox = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 0.6rem 0;
  color: ${(props) => props.theme.secondaryColor};
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;
`

interface Props {
  itemID: string
}

const Form = ({ itemID }: Props) => {
  const logsRef = firestore.collection('logs')
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const formDefaultValue = { description: '', date: null, hours: null }
  const [formValue, setFormValue] = useState<{
    description: string
    date: any
    hours: number | null
  }>(formDefaultValue)

  const createLogItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValue.date || !formValue.description || !formValue.hours) {
      alert("Anything can't be blank")
      return
    }
    await logsRef.add({
      description: formValue.description,
      date: formValue.date,
      hours: formValue.hours,
      uid: process.env.REACT_APP_MY_UID,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      logItemID: itemID,
    })
    setFormValue({ ...formDefaultValue, hours: 0 })
  }

  return (
    <>
      {displayForm ? (
        <LogItemForm onSubmit={createLogItem}>
          <FormCenter>
            <DatePicker
              selected={formValue.date}
              isClearable
              placeholderText="Date"
              onChange={(date) => setFormValue({ ...formValue, date: date })}
              customInput={<LogInput />}
            />
            <LogInput
              placeholder={'Description'}
              value={formValue.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, description: e.target.value })
              }
            />
            <LogInput
              placeholder={'Hours'}
              value={formValue.hours}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, hours: Number(e.target.value) })
              }
            />
          </FormCenter>

          <FormRight>
            <CreateButton
              disabled={
                !formValue.date || !formValue.description || !formValue.hours
              }
              buttonType={'primary'}
            >
              Save
            </CreateButton>
            <XIcon
              onClick={() => {
                setDisplayForm(false)
              }}
            />
          </FormRight>
        </LogItemForm>
      ) : (
        <NewLogBox
          onClick={() => {
            setDisplayForm(true)
          }}
        >
          + New Log
        </NewLogBox>
      )}
    </>
  )
}

export default Form
