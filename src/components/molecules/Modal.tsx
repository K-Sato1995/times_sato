import React from 'react'
import styled, { css } from 'styled-components'
import { useDetectOutsideClick } from 'hooks'

const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  ${(props: { isDisplayed: boolean }) =>
    !props.isDisplayed &&
    css`
      visibility: hidden;
    `}
`
const ModalContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  margin: 20% auto;
  z-index: 4;
  width: 350px;
`

interface Props {
  isModalDisplayed: boolean
  setIsModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const Modal = ({
  isModalDisplayed,
  setIsModalDisplayed,
  children,
}: Props) => {
  const wrapperRef = React.useRef(null)
  useDetectOutsideClick(wrapperRef, setIsModalDisplayed)
  return (
    <ModalWrapper isDisplayed={isModalDisplayed}>
      <ModalContainer ref={wrapperRef}>{children}</ModalContainer>
    </ModalWrapper>
  )
}
