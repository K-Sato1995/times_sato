import React from 'react'
import styled from 'styled-components'
import { EditLogModal } from 'components/organisms'
import { format } from 'date-fns'
import { db } from 'firebaseConfig'
import { doc, DocumentData, runTransaction } from 'firebase/firestore'

const ItemContainer = styled.div`
  position: relative;
  padding: 1.5rem 0.2rem;

  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
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

const updateLog = async (
  currentLog: DocumentData,
  logItemID: string,
  currTotalHours: number,
  formValue: {
    description: string
    date: any
    hours: number | null
  },
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault()
  if (!formValue.date || !formValue.description || !formValue.hours) {
    alert("Anything can't be blank")
    return
  }

  const { id: logID, hours: currentLogHours } = currentLog
  const logItemRef = doc(db, 'logItems', logItemID)
  const logRef = doc(db, 'logs', logID)

  try {
    await runTransaction(db, async (transaction) => {
      if (currentLogHours !== formValue.hours) {
        const sum = currentLogHours - formValue.hours!

        if (sum > 0) {
          await transaction.update(logItemRef, {
            totalHours: currTotalHours - Math.abs(sum),
          })
        } else if (sum < 0) {
          await transaction.update(logItemRef, {
            totalHours: currTotalHours + Math.abs(sum),
          })
        } else {
          new Error('Something is just not adding up')
        }
      }
      await transaction.update(logRef, formValue)
    })
  } catch (err) {
    alert('Something went wrong....')
  }
}

const LogBox = ({ currTotalHours, logItemID, log }: Props) => {
  const { description, hours, date } = log
  const [isModalDisplayed, setIsModalDisplayed] = React.useState<boolean>(false)

  return (
    <ItemContainer
      onClick={() => {
        setIsModalDisplayed(true)
      }}
    >
      <EditLogModal
        isModalDisplayed={isModalDisplayed}
        setIsModalDisplayed={setIsModalDisplayed}
        log={log}
        logItemID={logItemID}
        currTotalHours={currTotalHours}
        updateLog={updateLog}
        handleDelete={() => {
          deleteLog(currTotalHours, logItemID, log)
        }}
      />
      <LogDate>{format(new Date(date.toDate()), 'yy/MM/dd')}</LogDate>
      <LogDescription>{description}</LogDescription>
      <LogHours>{hours}h</LogHours>
    </ItemContainer>
  )
}

export default LogBox
