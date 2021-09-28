import React from 'react'
import styled from 'styled-components'
import { Heading, Button } from 'components/atoms'
import { Modal } from 'components/molecules'
import { DocumentData } from 'firebase/firestore'
import { Input } from 'components/atoms'
import 'react-datepicker/dist/react-datepicker.css'
const DatePicker = React.lazy(() => import('react-datepicker'))

interface Props {
  isModalDisplayed: boolean
  setIsModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>
  log: DocumentData
  logItemID: string
  currTotalHours: number
  updateLog: (
    currentLog: DocumentData,
    logItemID: string,
    currTotalHours: number,
    formValue: {
      description: string
      date: any
      hours: number | null
    },
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>
  handleDelete: () => void
}

const Form = styled.form`
  padding: 1rem;
  position: relative;

  .react-datepicker-wrapper {
    display: block;
  }

  &:before {
    content: '';
    height: 8px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      242.72deg,
      #5ad1f8,
      ${(props) => props.theme.primaryColor} 101.2%
    );
    border-top-left-radius: 10px 10px;
    border-top-right-radius: 10px 10px;
    position: absolute;
  }
`

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const FormContent = styled.div``

const FormFooter = styled.div`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row-reverse;
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

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const FormButton = styled(Button)`
  padding: 0.6rem 0.6rem;
  border-radius: 2.5px;

  /* :first-child {
    margin-right: 1rem;
  } */
`

const DeleteButton = styled(Button)`
  font-size: 0.8rem;
  :hover {
    color: rgb(244, 44, 44);
  }
`

export const EditLogModal = ({
  isModalDisplayed,
  setIsModalDisplayed,
  log,
  logItemID,
  currTotalHours,
  updateLog,
  handleDelete,
}: Props) => {
  const [formValue, setFormValue] = React.useState<{
    description: string
    date: any
    hours: number | null
  }>({
    description: log.description,
    date: new Date(log.date.toMillis()),
    hours: log.hours,
  })

  return (
    <Modal
      isModalDisplayed={isModalDisplayed}
      setIsModalDisplayed={setIsModalDisplayed}
    >
      <Form
        onSubmit={(e) => {
          updateLog(log, logItemID, currTotalHours, formValue, e)
          setIsModalDisplayed(false)
        }}
      >
        <FormHeader>
          <Heading size="h1">Edit Form</Heading>
          <DeleteButton
            buttonType="link"
            type={'button'}
            onClick={() => {
              if (
                window.confirm('Are you sure you wish to delete this item?')
              ) {
                handleDelete()
              }
            }}
          >
            Delete this Log
          </DeleteButton>
        </FormHeader>

        <FormContent>
          <LogInput
            placeholder="Description"
            value={formValue.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue({ ...formValue, description: e.target.value })
            }
          />

          <DatePicker
            selected={formValue.date}
            placeholderText="Date"
            onChange={(date) => {
              console.log(date)
              setFormValue({ ...formValue, date: date })
            }}
            customInput={<LogInput />}
          />

          <LogInput
            placeholder={'Hours'}
            value={formValue.hours}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue({ ...formValue, hours: Number(e.target.value) })
            }
            step="0.1"
          />
        </FormContent>

        <FormFooter>
          <Buttons>
            <FormButton
              disabled={
                !formValue.description || !formValue.date || !formValue.hours
              }
              buttonType={'primary'}
            >
              Update the Log
            </FormButton>
            {/* 
            <FormButton
              type={'button'}
              onClick={() => {
                setIsModalDisplayed(false)
              }}
              buttonType={'secondary'}
            >
              Close
            </FormButton> */}
          </Buttons>
        </FormFooter>
      </Form>
    </Modal>
  )
}
