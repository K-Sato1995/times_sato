import React, { useState } from 'react'
import styled from 'styled-components'
import { db } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { doc, serverTimestamp, runTransaction } from 'firebase/firestore'
import { firestoreAutoId } from 'firebaseConfig'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = React.lazy(() => import('react-datepicker'))

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
  uid: string
}

const Form = ({ itemID, uid, currTotalHours }: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const formDefaultValue = { description: '', date: null, hours: null }
  const [formValue, setFormValue] = useState<{
    description: string
    date: any
    hours: number | null
  }>(formDefaultValue)

  const createLogItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const logsRef = doc(db, 'logs', firestoreAutoId())
    const logItemRef = doc(db, 'logItems', itemID)

    if (!formValue.date || !formValue.description || !formValue.hours) {
      alert("Anything can't be blank")
      return
    }

    try {
      await runTransaction(db, async (transaction) => {
        await transaction.set(logsRef, {
          description: formValue.description,
          date: formValue.date,
          hours: formValue.hours,
          uid: uid,
          createdAt: serverTimestamp(),
          logItemID: itemID,
        })

        await transaction.update(logItemRef, {
          totalHours: currTotalHours + formValue.hours!,
        })
      })
    } catch (e) {
      alert('Something went wrong.....')
    }

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
