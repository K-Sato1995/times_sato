import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ListTag } from 'components/molecules'
import { firebase } from 'firebaseConfig'
import { EditCategoryForm } from 'components/organisms'
import { BadgeProps } from 'components/atoms/Badge'
import { useDetectOutsideClick } from 'hooks'

interface Props extends BadgeProps {
  logCategory: firebase.firestore.DocumentData
}

const CategoryTagWrapper = styled.div`
  display: inline-block;
`

const CategoryTag = ({ logCategory, ...badgeProps }: Props) => {
  const wrapperRef = useRef(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useDetectOutsideClick(wrapperRef, setIsEditing)
  return (
    <CategoryTagWrapper ref={wrapperRef}>
      {isEditing ? (
        <EditCategoryForm
          logCategory={logCategory}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ListTag setIsEditing={setIsEditing} {...badgeProps} />
      )}
    </CategoryTagWrapper>
  )
}

export default CategoryTag
