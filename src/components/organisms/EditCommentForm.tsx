import React, { useState } from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { CommentForm } from 'components/molecules'

interface Props {
  comment: firebase.firestore.DocumentData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCommentForm = ({ comment, setIsEditing }: Props) => {
  const { id, text } = comment
  const [formValue, setFormValue] = useState<string>(text)

  const commentRef = firestore.collection('comments').doc(id)

  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await commentRef
      .update({
        text: formValue,
      })
      .then(() => {
        alert('Document successfully updated!')
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  }

  return (
    <CommentForm
      formValue={formValue}
      setFormValue={setFormValue}
      onSubmit={updateComment}
    />
  )
}

export default EditCommentForm
