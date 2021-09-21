import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ListTag } from 'components/molecules'
import { EditCategoryForm } from 'components/organisms'
import { BadgeProps } from 'components/atoms/Badge'
import { useDetectOutsideClick } from 'hooks'
import { DocumentData } from 'firebase/firestore'

interface Props extends BadgeProps {
  logCategory: DocumentData
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
