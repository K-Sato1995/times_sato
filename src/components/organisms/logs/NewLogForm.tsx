import React, { useState } from 'react'
import styled from 'styled-components'
import { db, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { updateDoc, addDoc, doc, collection } from 'firebase/firestore'

const LogItemForm = styled.form`
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: none;
  .react-datepicker-wrapper {
    display: block;
  }
`

const LogInput = styled(Input)`
  border: none;
  padding: 0;
  padding-bottom: 0.3rem;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  display: block;
  width: 100%;
  margin-top: 2rem;

  :focus {
    outline: none;
  }
`

const FormContent = styled.div``

const FormBottom = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row-reverse;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const FormButton = styled(Button)`
  padding: 0.6rem 0.6rem;
  border-radius: 2.5px;

  :first-child {
    margin-right: 1rem;
  }
`

const NewLogBox = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  padding: 0.6rem 0;
  color: ${(props) => props.theme.secondaryColor};
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: none;
  cursor: pointer;
`

interface Props {
  itemID: string
  currTotalHours: number
  logItem?: firebase.firestore.DocumentData
  uid: string
}

const Form = ({ itemID, logItem, uid, currTotalHours }: Props) => {
  const logsRef = collection(db, 'logs')
  const logItemRef = doc(db, 'logItems', itemID)

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

    await updateDoc(logItemRef, {
      totalHours: currTotalHours + formValue.hours,
    })

    await addDoc(logsRef, {
      description: formValue.description,
      date: formValue.date,
      hours: formValue.hours,
      uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      logItemID: itemID,
    })
    setFormValue({ ...formDefaultValue, hours: 0 })
  }

  return (
    <>
      {displayForm ? (
        <LogItemForm onSubmit={createLogItem}>
          <FormContent>
            <DatePicker
              selected={formValue.date}
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
              step="0.1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, hours: Number(e.target.value) })
              }
            />
          </FormContent>

          <FormBottom>
            <Buttons>
              <FormButton
                disabled={
                  !formValue.date || !formValue.description || !formValue.hours
                }
                buttonType={'primary'}
              >
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
            </Buttons>
          </FormBottom>
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
