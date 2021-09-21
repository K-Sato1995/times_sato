import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { firestore, firebase, db } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { CirclePicker } from 'react-color'
import { useDetectOutsideClick } from 'hooks'
import { User } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

const FormButton = styled(Button)`
  padding: 0.3rem 0.6rem;
  border-radius: 2.5px;
  :first-child {
    margin-right: 0.5rem;
  }
`

const NewStatusForm = styled.form`
  margin: 2rem 0;
  border: solid 1px
    ${(props: { borderColor?: string; isDisplayed?: boolean }) =>
      props.borderColor
        ? props.borderColor
        : (props) => props.theme.borderColor};
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  max-width: 280px; // Width of the Circle Picker
  overflow-y: auto;

  ${(props: { borderColor?: string; isDisplayed?: boolean }) =>
    !props.isDisplayed &&
    css`
      display: none;
    `}
`

const FormBottom = styled.div`
  background-color: #fafbfc;
  padding: 0.3rem;
  text-align: right;
`

const FormMiddle = styled.div`
  padding: 0 0.25rem;
  color: ${(props) => props.theme.secondaryColor};
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`

const TodoInput = styled(Input)`
  border: none;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  padding: 0.5rem 0;
  display: block;
  width: 252px;
  margin: 0 auto;
  margin-top: 0.5rem;

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

const ColorPickerWrapper = styled.div`
  position: relative;
  margin: 1rem 0;

  > .circle-picker {
    margin: 0 auto !important;
  }
`

interface Props {
  currentUser: User
  statuses?: firebase.firestore.DocumentData[]
  currOrder: number
}

const Form = ({ currentUser, statuses, currOrder }: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const statusesRef = collection(db, 'statuses')
  const formInitialValue = { name: '', color: '' }
  const [formValue, setFormValue] = useState(formInitialValue)
  const { uid } = currentUser
  const wrapperRef = useRef(null)
  useDetectOutsideClick(wrapperRef, setDisplayForm)

  const createStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValue.name) {
      alert("StatusName can't be blank")
      return
    }
    if (!formValue.color) {
      alert("StatusColor can't be blank")
      return
    }

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

    await addDoc(statusesRef, {
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

      <NewStatusForm
        isDisplayed={displayForm}
        borderColor={formValue.color}
        onSubmit={createStatus}
        ref={wrapperRef}
      >
        <FormMiddle>
          <TodoInput
            placeholder={'Status Name'}
            value={formValue.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue({ ...formValue, name: e.target.value })
            }
          />
          <ColorPickerWrapper>
            <CirclePicker
              onChangeComplete={(color) =>
                setFormValue({ ...formValue, color: color.hex })
              }
            />
          </ColorPickerWrapper>
        </FormMiddle>

        <FormBottom>
          <FormButton
            type={'button'}
            buttonType={'secondary'}
            onClick={() => {
              setDisplayForm(false)
            }}
          >
            Close
          </FormButton>

          <FormButton
            disabled={!formValue.name || !formValue.color}
            buttonType={'primary'}
          >
            Submit
          </FormButton>
        </FormBottom>
      </NewStatusForm>
    </>
  )
}

export default React.memo(Form)
