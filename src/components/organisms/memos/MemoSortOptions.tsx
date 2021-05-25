import React from 'react'
import styled, { css } from 'styled-components'

const SortOptions = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  /* padding: 0 2.35rem; */
  text-align: right;

  @media screen and (max-width: 29.9999em) {
    padding: 0rem 0.625rem 0rem 0.625rem;
  }
`

const SortOption = styled.span`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.1rem 0.5rem;

  &:nth-child(2) {
    border-left: solid ${(props) => props.theme.borderColor} 1px;
  }

  :hover {
    background-color: #f2f2f2;
  }

  ${(props: { checked: boolean }) =>
    props.checked &&
    css`
      color: #2c7b7d;
      background-color: #d8f4f5;
      padding: 0.1rem 0.5rem;
    `}
`

interface Props {
  dislpayDeletedMemos: boolean
  setDislpayDeletedMemos: React.Dispatch<React.SetStateAction<boolean>>
  dislpayNewItemForm: boolean
  setDislpayNewItemForm: React.Dispatch<React.SetStateAction<boolean>>
}

const MemoSortOptions = ({
  dislpayDeletedMemos,
  setDislpayDeletedMemos,
  dislpayNewItemForm,
  setDislpayNewItemForm,
}: Props) => {
  return (
    <SortOptions>
      <SortOption
        checked={dislpayDeletedMemos}
        onClick={() => {
          setDislpayDeletedMemos(!dislpayDeletedMemos)
        }}
      >
        Show Deleted
      </SortOption>

      <SortOption
        checked={dislpayNewItemForm}
        onClick={() => {
          setDislpayNewItemForm(!dislpayNewItemForm)
        }}
      >
        New Item
      </SortOption>
    </SortOptions>
  )
}

export default MemoSortOptions