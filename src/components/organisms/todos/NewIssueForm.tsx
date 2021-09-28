import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { db } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { useDetectOutsideClick } from 'hooks'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import 'react-datepicker/dist/react-datepicker.css'
const DatePicker = React.lazy(() => import('react-datepicker'))

const IssueFormWrapper = styled.div``
const IssueItemForm = styled.form`
  padding: 1rem 1rem;
  padding-bottom: 0.6rem;
  background-color: #fff;
  .react-datepicker-wrapper {
    display: block;
  }
`

const IssueInput = styled(Input)`
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

const NewIssueBox = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 0.6rem 0;
  color: ${(props) => props.theme.secondaryColor};
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;
`

interface Props {
  statusID: string
  uid: string
}

const Form = ({ statusID, uid }: Props) => {
  const wrapperRef = useRef(null)
  const issuesRef = collection(db, 'todos')
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const formDefaultValue = { text: '', due: null }
  const [formValue, setFormValue] = useState<{
    text: string
    due: any
  }>(formDefaultValue)
  useDetectOutsideClick(wrapperRef, setDisplayForm)

  const createIssueItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValue.text) {
      alert("Anything can't be blank")
      return
    }

    await addDoc(issuesRef, {
      text: formValue.text,
      due: formValue.due,
      uid: uid,
      createdAt: serverTimestamp(),
      status: statusID,
    })
    setFormValue({ ...formDefaultValue })
  }

  return (
    <IssueFormWrapper ref={wrapperRef}>
      {displayForm ? (
        <IssueItemForm onSubmit={createIssueItem}>
          <FormContent>
            <IssueInput
              placeholder={'Issue Name'}
              value={formValue.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, text: e.target.value })
              }
            />
            <DatePicker
              selected={formValue.due}
              placeholderText="Due Date/Time"
              onChange={(dateTime) =>
                setFormValue({ ...formValue, due: dateTime })
              }
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<IssueInput />}
            />
          </FormContent>

          <FormBottom>
            <Buttons>
              <FormButton disabled={!formValue.text} buttonType={'primary'}>
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
        </IssueItemForm>
      ) : (
        <NewIssueBox
          onClick={() => {
            setDisplayForm(true)
          }}
        >
          + New Issue
        </NewIssueBox>
      )}
    </IssueFormWrapper>
  )
}

export default Form
