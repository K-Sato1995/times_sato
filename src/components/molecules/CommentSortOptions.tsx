import React from 'react'
import styled from 'styled-components'

const SortOptions = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  padding: 0 0.315rem;
`
const SortOption = styled.input``
const SortOptionLabel = styled.label`
  margin-left: 0.3rem;
`

interface Props {
  dislpayDeletedComments: boolean
  setDislpayDeletedComments: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentSortOptions = ({
  dislpayDeletedComments,
  setDislpayDeletedComments,
}: Props) => {
  return (
    <SortOptions>
      <SortOption
        type="checkbox"
        id="displayDeletedComments"
        checked={dislpayDeletedComments}
        onChange={() => {
          setDislpayDeletedComments(!dislpayDeletedComments)
        }}
      ></SortOption>
      <SortOptionLabel htmlFor="displayDeletedComments">
        Display Deleted Comments
      </SortOptionLabel>
    </SortOptions>
  )
}

export default CommentSortOptions
