import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ListTag } from 'components/molecules'
import { firebase } from 'firebaseConfig'
import { EditStatusForm } from 'components/organisms'
import { BadgeProps } from 'components/atoms/Badge'
import { useDetectOutsideClick } from 'hooks'

interface Props extends BadgeProps {
  status: firebase.firestore.DocumentData
}

const StatusTagWrapper = styled.div``

const StatusTag = ({ status, ...badgeProps }: Props) => {
  const wrapperRef = useRef(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useDetectOutsideClick(wrapperRef, setIsEditing)
  return (
    <StatusTagWrapper ref={wrapperRef}>
      {isEditing ? (
        <EditStatusForm status={status} setIsEditing={setIsEditing} />
      ) : (
        <ListTag setIsEditing={setIsEditing} {...badgeProps} />
      )}
    </StatusTagWrapper>
  )
}

export default StatusTag
