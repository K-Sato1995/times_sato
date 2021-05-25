import React, { useState } from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { isKSato } from 'utils'
import { ContentWrapper } from 'components/atoms'
import { MemoSortOptions, LoadingState, NoItem } from 'components/molecules'
import { MemoBox, NewMemoForm } from 'components/organisms'

interface Props {
  currentUser: firebase.User
}

const Times = ({ currentUser }: Props) => {
  const [dislpayDeletedMemos, setDislpayDeletedMemos] = useState<boolean>(false)
  const [dislpayNewItemForm, setDislpayNewItemForm] = useState<boolean>(false)

  const memosRef = firestore.collection('comments')

  let query = memosRef.orderBy('createdAt', 'desc')

  if (dislpayDeletedMemos) {
    query = memosRef.orderBy('createdAt', 'desc')
  } else {
    query = memosRef.where('deleted', '==', false).orderBy('createdAt', 'desc')
  }

  const [memos, loading, error] = useCollectionData(query, { idField: 'id' })

  const pinnedMemos = memos?.filter((memo) => memo.pinned)
  const otherMemos = memos?.filter((memo) => !memo.pinned)

  if (error) {
    console.log(error?.message)
  }

  if (loading) {
    return <LoadingState />
  }

  if (!memos?.length) {
    return (
      <ContentWrapper>
        <MemoSortOptions
          dislpayDeletedMemos={dislpayDeletedMemos}
          setDislpayDeletedMemos={setDislpayDeletedMemos}
          dislpayNewItemForm={dislpayNewItemForm}
          setDislpayNewItemForm={setDislpayNewItemForm}
        />

        {isKSato(currentUser.uid) && dislpayNewItemForm && (
          <NewMemoForm currentUser={currentUser} />
        )}

        <NoItem />
      </ContentWrapper>
    )
  }

  return (
    <ContentWrapper>
      <MemoSortOptions
        dislpayDeletedMemos={dislpayDeletedMemos}
        setDislpayDeletedMemos={setDislpayDeletedMemos}
        dislpayNewItemForm={dislpayNewItemForm}
        setDislpayNewItemForm={setDislpayNewItemForm}
      />
      {isKSato(currentUser.uid) && dislpayNewItemForm && (
        <NewMemoForm currentUser={currentUser} />
      )}

      {pinnedMemos &&
        pinnedMemos.map((memo) => (
          <MemoBox key={memo.id} memo={memo} currentUser={currentUser} />
        ))}

      {otherMemos &&
        otherMemos.map((memo) => (
          <MemoBox key={memo.id} memo={memo} currentUser={currentUser} />
        ))}
    </ContentWrapper>
  )
}

export default Times
