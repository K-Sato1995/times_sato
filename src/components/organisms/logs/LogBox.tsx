import React from 'react'
import styled from 'styled-components'
import { LogOptions } from 'components/organisms'
import { format } from 'date-fns'
import { FaEllipsisH } from 'react-icons/fa'
import { useDetectOutsideClick } from 'hooks'
import { db } from 'firebaseConfig'
import { doc, DocumentData, runTransaction } from 'firebase/firestore'

const ItemContainer = styled.div`
  position: relative;
  padding: 1.5rem 0.2rem;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  /* cursor: pointer; */

  /* :hover {
    background-color: #f8f8f8;
  } */
`

const OptionIcon = styled(FaEllipsisH)`
  position: absolute;
  right: 2%;
  top: 2%;
  color: ${(props) => props.theme.secondaryColor};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.primaryColor};
  }
`

const LogDescription = styled.div`
  display: inline-block;
  width: 90%;
  color: ${(props) => props.theme.secondaryColor};
  word-wrap: break-word;
`

const LogHours = styled.div`
  display: inline-block;
  width: 5%;
  vertical-align: top;
  color: ${(props) => props.theme.secondaryColor};
`

const LogDate = styled.div`
  display: inline-block;
  position: absolute;
  top: 5%;
  font-size: 0.8rem;
  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  currTotalHours: number
  logItemID: string
  log: DocumentData
}

const deleteLog = async (
  currTotalHours: number,
  logItemID: string,
  log: DocumentData,
) => {
  const logItemRef = doc(db, 'logItems', logItemID)
  const { id: logID, hours: logHours } = log
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.delete(doc(db, 'logs', logID))

      await transaction.update(logItemRef, {
        totalHours: currTotalHours - logHours,
      })
    })
  } catch (err) {
    alert('Something went wrong....')
  }
}

const LogBox = ({ currTotalHours, logItemID, log }: Props) => {
  const { description, hours, date } = log
  const wrapperRef = React.useRef(null)
  const [
    isOptionListDisplayed,
    setIsOptionListDisplayed,
  ] = React.useState<boolean>(false)

  useDetectOutsideClick(wrapperRef, setIsOptionListDisplayed)
  return (
    <ItemContainer ref={wrapperRef}>
      {isOptionListDisplayed ? (
        <LogOptions
          handleDelete={() => {
            deleteLog(currTotalHours, logItemID, log)
          }}
        />
      ) : (
        <OptionIcon
          onClick={() => {
            setIsOptionListDisplayed(true)
          }}
        />
      )}
      <LogDate>{format(new Date(date.toDate()), 'yy/MM/dd')}</LogDate>
      <LogDescription>{description}</LogDescription>
      <LogHours>{hours}h</LogHours>
    </ItemContainer>
  )
}

export default LogBox
