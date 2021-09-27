import React from 'react'
import styled from 'styled-components'
import { Modal } from 'components/molecules'
import { DocumentData } from 'firebase/firestore'

interface Props {
  isModalDisplayed: boolean
  setIsModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>
  log: DocumentData
}

const Form = styled.div`
  background: #fff;
  border-radius: 2.5px;
  margin: 10% auto;
  z-index: 2;
  width: 360px;
  height: 500px;
`
export const EditLogModal = ({
  isModalDisplayed,
  setIsModalDisplayed,
}: Props) => {
  return (
    <Modal
      isModalDisplayed={isModalDisplayed}
      setIsModalDisplayed={setIsModalDisplayed}
    >
      <Form>test</Form>
    </Modal>
  )
}
