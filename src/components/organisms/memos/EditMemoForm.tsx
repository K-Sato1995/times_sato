import React, { useState } from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { TextAreaForm } from 'components/molecules'

interface Props {
  memo: firebase.firestore.DocumentData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const EditMemoForm = ({ memo, setIsEditing }: Props) => {
  const { id, text } = memo
  const [formValue, setFormValue] = useState<string>(text)

  const memoRef = firestore.collection('comments').doc(id)

  const updateMemo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await memoRef
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
    <TextAreaForm
      formValue={formValue}
      setFormValue={setFormValue}
      onSubmit={updateMemo}
    />
  )
}

export default EditMemoForm
