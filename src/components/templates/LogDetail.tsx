import React from 'react'
import styled from 'styled-components'
import { Heading, ContentWrapper } from 'components/atoms'
import { NewLogForm, LogBox } from 'components/organisms'
import CalendarHeatmap from 'react-calendar-heatmap'
import { DocumentData } from 'firebase/firestore'
import 'react-calendar-heatmap/dist/styles.css'
import { User } from 'firebase/auth'

const ReactTooltip = React.lazy(() => import('react-tooltip'))

const LogsConatiner = styled.div`
  /* margin-top: 1rem; */
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

interface Props {
  currentUser: User
  itemID: string
  logItem: DocumentData | null
  logs: DocumentData[]
  formattedLogs: FormattedLog[]
  currTotalHours: number
}

export const LogDetailTemplate = ({
  currentUser,
  itemID,
  logItem,
  logs,
  formattedLogs,
  currTotalHours,
}: Props) => {
  const { uid } = currentUser

  const getTooltipDataAttrs = (value: { date: string; count: number }) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null
    }
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date.slice(0, 10)} | ${value.count} h`,
    }
  }

  return (
    <ContentWrapper>
      <Heading size={'h1'}>{logItem?.name}</Heading>

      <ReactTooltip />
      <CalendarHeatmap
        startDate={new Date('2021-05-01')}
        endDate={new Date('2022-05-01')}
        values={formattedLogs}
        tooltipDataAttrs={getTooltipDataAttrs}
      />
      <NewLogForm
        itemID={itemID}
        logItem={logItem}
        currTotalHours={currTotalHours}
        uid={uid}
      />
      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox
            key={log.id}
            currTotalHours={currTotalHours}
            logItemID={itemID}
            log={log}
          />
        ))}
      </LogsConatiner>
    </ContentWrapper>
  )
}
