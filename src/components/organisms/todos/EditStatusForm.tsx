import React, { useState } from 'react'
import styled from 'styled-components'
import { db, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { CirclePicker } from 'react-color'
import { doc, updateDoc } from 'firebase/firestore'

const FormButton = styled(Button)`
  padding: 0.2rem 0.5rem;
  border-radius: 2.5px;
`

const EditStatusForm = styled.form`
  background: #fff;
  z-index: 1000;
  max-width: 300px; // Width of the Circle Picker
  overflow-y: auto;
  display: flex;
`

const StatusInput = styled(Input)`
  border: solid 1px
    ${(props: { borderColor?: string; isDisplayed?: boolean }) =>
      props.borderColor
        ? props.borderColor
        : (props) => props.theme.borderColor};

  border-top-left-radius: 2.5px;
  border-top-right-radius: 2.5px;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  width: 252px;
  margin: 0 auto;

  :focus {
    outline: none;
  }
`

const ColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 100;
  border: solid 1px ${(props) => props.theme.borderColor};
  margin-top: 2rem;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 5px;
  > .circle-picker {
    padding: 1rem;
  }
`

interface Props {
  status: firebase.firestore.DocumentData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ setIsEditing, status }: Props) => {
  const { id, name, color } = status
  const statusRef = doc(db, 'statuses', id)
  const [formValue, setFormValue] = useState({ name: name, color: color })

  const updateStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateDoc(statusRef, {
      name: formValue.name,
      color: formValue.color,
    })
      .then(() => {
        console.log('Document successfully updated!')
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  }

  return (
    <EditStatusForm onSubmit={updateStatus}>
      <StatusInput
        placeholder={'Status Name'}
        value={formValue.name}
        borderColor={formValue.color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormValue({ ...formValue, name: e.target.value })
        }
      />

      <FormButton
        disabled={!formValue.name || !formValue.color}
        buttonType={'primary'}
      >
        Submit
      </FormButton>

      <ColorPickerWrapper>
        <CirclePicker
          onChangeComplete={(color) =>
            setFormValue({ ...formValue, color: color.hex })
          }
        />
      </ColorPickerWrapper>
    </EditStatusForm>
  )
}

export default React.memo(Form)
