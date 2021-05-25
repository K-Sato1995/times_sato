import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaRegStar,
  FaStar,
  FaRegArrowAltCircleUp,
  FaEllipsisH,
} from 'react-icons/fa'
import { isKSato } from 'utils'
import { Icon, OptionItem } from 'components/atoms'
import { MemoContent, OptionList } from 'components/molecules'
import { EditMemoForm } from 'components/organisms'

const MemoWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1.5rem 0.315rem;
  margin: 1.625rem 0;

  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  @media screen and (max-width: 29.9999em) {
    margin: 25px 0;
  }
`

const PostedDate = styled.span`
  position: absolute;
  color: #697980;
  left: 5px;
  top: 0;
`

const Delted = styled.span`
  position: absolute;
  color: #e66d6d;
  left: 5px;
  top: 0;
`

const OptionsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  display: ${(props: StyledCompsProps) => props.isVisible};
`

const RestoreIcon = Icon.withComponent(FaRegArrowAltCircleUp)
const FavIcon = styled(FaRegStar)`
  vertical-align: text-top;
`
const DeleteIcon = styled(FaRegTrashAlt)`
  vertical-align: text-top;
`
const EditIcon = styled(FaRegEdit)`
  vertical-align: text-top;
`

const OptionsIcon = styled(FaEllipsisH)`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 1rem;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 50%;
  transition: 0.2s;

  :hover {
    opacity: 0.7;
    background-color: #a4eef0;
  }
`

const FavedIcon = styled(FaStar)`
  font-size: 1rem;
  margin-left: 0.4rem;
  color: #ffd700;
  border-radius: 20%;
  transition: 0.2s;
  vertical-align: text-top;
`

interface Props {
  memo: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const Memo = ({ memo, currentUser }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [displayOptions, setDisplayOptions] = useState<boolean>(false)
  const { id, text, pinned, createdAt, deleted } = memo
  const { uid } = currentUser

  const memoRef = firestore.collection('comments').doc(id)

  const logicalDelteMemo = async () => {
    if (window.confirm('Are you sure you wish to delete this memo?')) {
      await memoRef
        .update({
          deleted: true,
        })
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error deleting document: ', error)
        })
    }
  }

  const pinMemo = async () => {
    await memoRef
      .update({
        pinned: true,
      })
      .then(() => {
        console.log('Pinned the memo')
      })
      .catch((error) => {
        console.error('Error pinning document: ', error)
      })
  }

  const unpinMemo = async () => {
    await memoRef
      .update({
        pinned: false,
      })
      .then(() => {
        console.log('Unpinned the memo')
      })
      .catch((error) => {
        console.error('Error unpinning document: ', error)
      })
  }

  const restoreDeltedMemo = async () => {
    if (window.confirm('Are you sure you wish to restore this memo?')) {
      await memoRef
        .update({
          deleted: false,
        })
        .then(() => {
          // alert('Document successfully restored!')
        })
        .catch((error) => {
          console.error('Error deleting document: ', error)
        })
    }
  }

  const editMemo = () => {
    setIsEditing(!isEditing)
  }

  const options: {
    handleClick: () => void
    component: React.ReactNode
    displayed: boolean
  }[] = [
    {
      handleClick: logicalDelteMemo,
      component: (
        <>
          <DeleteIcon /> Delete
        </>
      ),
      displayed: true,
    },
    {
      handleClick: editMemo,
      component: (
        <>
          <EditIcon /> Edit
        </>
      ),

      displayed: true,
    },
    {
      handleClick: unpinMemo,
      component: (
        <>
          <FavIcon /> UnStar
        </>
      ),
      displayed: pinned,
    },
    {
      handleClick: pinMemo,
      component: (
        <>
          <FavIcon /> Star
        </>
      ),
      displayed: !pinned,
    },
  ]

  return (
    <MemoWrapper>
      {deleted ? (
        <Delted>Delted Memo</Delted>
      ) : (
        <PostedDate>
          {createdAt
            ? `Posted on ${format(new Date(createdAt.toDate()), 'yyyy-MM-dd')}`
            : 'Loading'}

          {pinned && <FavedIcon />}
        </PostedDate>
      )}

      <OptionsContainer isVisible={`${isKSato(uid) ? '' : 'none'}`}>
        {deleted ? (
          <RestoreIcon
            textColor="#2c7b7d"
            backgroundColor="#a4eef0"
            onClick={restoreDeltedMemo}
          />
        ) : (
          <>
            <OptionsIcon
              onClick={() => {
                setDisplayOptions(!displayOptions)
              }}
            />

            {displayOptions && (
              <OptionList setDisplayOptionList={setDisplayOptions}>
                {options.map((option, idx) => {
                  const { handleClick, component, displayed } = option
                  return (
                    displayed && (
                      <OptionItem key={idx} onClick={handleClick}>
                        {component}
                      </OptionItem>
                    )
                  )
                })}
              </OptionList>
            )}
          </>
        )}
      </OptionsContainer>

      {isEditing ? (
        <EditMemoForm memo={memo} setIsEditing={setIsEditing} />
      ) : (
        <MemoContent text={text} />
      )}
    </MemoWrapper>
  )
}

export default Memo

// const physicalDeleteMemo = () => {
//   if (window.confirm('Are you sure you wish to delete this memo?')) {
//     firestore
//       .collection('memos')
//       .doc(id)
//       .delete()
//       .then(() => {
//         console.log('Document successfully deleted!')
//       })
//       .catch((error) => {
//         console.error('Error removing document: ', error)
//       })
//   }
// }
