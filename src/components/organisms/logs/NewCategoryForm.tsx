import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { Input, Button } from 'components/atoms'
import { CirclePicker } from 'react-color'
import { useDetectOutsideClick } from 'hooks'

const FormButton = styled(Button)`
  padding: 0.3rem 0.6rem;
  border-radius: 2.5px;
  :first-child {
    margin-right: 0.5rem;
  }
`

const NewCategoryForm = styled.form`
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
  display: block;
  padding: 0.5rem 0;
  width: 252px;
  margin: 0 auto;
  margin-top: 0.5rem;

  :focus {
    outline: none;
  }
`

const NewCategoryButton = styled.span`
  margin: 2rem 0;
  font-size: 0.8rem;
  width: 100%;
  color: ${(props) => props.theme.secondaryColor};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
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
  currentUser: firebase.User
}

const Form = ({ currentUser }: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const categoryesRef = firestore.collection('logCategories')
  const formInitialValue = { name: '', color: '' }
  const [formValue, setFormValue] = useState(formInitialValue)
  const { uid } = currentUser
  const wrapperRef = useRef(null)
  useDetectOutsideClick(wrapperRef, setDisplayForm)

  const createCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValue.name) {
      alert("CategoryName can't be blank")
      return
    }
    if (!formValue.color) {
      alert("CategoryColor can't be blank")
      return
    }

    await categoryesRef.add({
      name: formValue.name,
      color: formValue.color,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
    })

    setFormValue(formInitialValue)
    setDisplayForm(false)
  }

  return (
    <>
      <NewCategoryButton
        onClick={() => {
          setDisplayForm(true)
        }}
        isDisplayed={displayForm}
      >
        New Category
      </NewCategoryButton>

      <NewCategoryForm
        isDisplayed={displayForm}
        borderColor={formValue.color}
        onSubmit={createCategory}
        ref={wrapperRef}
      >
        <FormMiddle>
          <TodoInput
            placeholder={'Category Name'}
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
      </NewCategoryForm>
    </>
  )
}

export default React.memo(Form)
