import React from 'react'
import styled from 'styled-components'
import { Badge } from 'components/atoms'
import { BadgeProps } from 'components/atoms/Badge'
import ReactTooltip from 'react-tooltip'

const ListTagWrapper = styled.a`
  cursor: pointer;
`

interface Props extends BadgeProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ListTag = ({ setIsEditing, ...badgeProps }: Props) => {
  return (
    <ListTagWrapper
      data-tip
      data-for="infoMessage"
      onClick={() => {
        setIsEditing(true)
      }}
    >
      <ReactTooltip id="infoMessage" place="top" effect="solid">
        <span>Click To Edit</span>
      </ReactTooltip>
      <Badge {...badgeProps} />
    </ListTagWrapper>
  )
}

export default ListTag
