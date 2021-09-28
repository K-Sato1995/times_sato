import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'components/atoms'

import { DocumentData } from 'firebase/firestore'

const Form = styled.form`
  margin: 0.8rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const FormLeft = styled.div``

const FormRight = styled.div``

const NameInput = styled(Input)`
  border: none;
  padding-bottom: 0.2rem;
  display: block;
  width: 100%;
  display: block;
  background-color: #f2f4f7;

  :focus {
    outline: none;
  }
`

const ButtonList = styled.div``

const FormButton = styled(Button)`
  display: inline-block;
  border-radius: 2.5px;
  padding: 0.2rem 0.6rem;

  :first-child {
    margin-right: 0.5rem;
  }
`

interface Props {
  logItem: DocumentData
  updateLogItem: (
    name: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  setIsOptionListDisplayed: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditLogItemForm = ({
  logItem,
  updateLogItem,
  setIsEditing,
  setIsOptionListDisplayed,
}: Props) => {
  const [title, setTitle] = React.useState<string>(logItem.name)

  return (
    <Form
      onSubmit={(e) => {
        updateLogItem(title, e)
        setIsEditing(false)
        setIsOptionListDisplayed(false)
      }}
    >
      <FormLeft>
        <NameInput
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </FormLeft>

      <FormRight>
        <ButtonList>
          <FormButton disabled={!logItem.name} buttonType={'primary'}>
            Save
          </FormButton>

          <FormButton
            onClick={() => {
              setIsEditing(false)
              setIsOptionListDisplayed(false)
            }}
            buttonType={'secondary'}
          >
            Close
          </FormButton>
        </ButtonList>
      </FormRight>
    </Form>
  )
}
