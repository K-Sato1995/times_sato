import React, { useState } from 'react'
import styled from 'styled-components'
import { db, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { CirclePicker } from 'react-color'
import { updateDoc, doc } from 'firebase/firestore'

const FormButton = styled(Button)`
  padding: 0.2rem 0.5rem;
  border-radius: 2.5px;
`

const EditCategoryForm = styled.form`
  background: #fff;
  z-index: 1000;
  max-width: 300px;
  overflow-y: auto;
  display: flex;
`

const CategoryInput = styled(Input)`
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
  logCategory: firebase.firestore.DocumentData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ setIsEditing, logCategory }: Props) => {
  const { id, name, color } = logCategory
  const categoryRef = doc(db, 'logCategories', id)

  const [formValue, setFormValue] = useState({ name: name, color: color })

  const updateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updateDoc(categoryRef, {
      name: formValue.name,
      color: formValue.color,
    })
      .then(() => {
        // alert('Document successfully updated!')
        setIsEditing(false)
      })
      .catch((error: any) => {
        console.error('Error updating document: ', error)
      })
  }

  return (
    <EditCategoryForm onSubmit={updateCategory}>
      <CategoryInput
        placeholder={'Category Name'}
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
    </EditCategoryForm>
  )
}

export default Form
