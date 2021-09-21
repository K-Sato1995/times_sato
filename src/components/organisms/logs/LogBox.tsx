import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { DocumentData } from 'firebase/firestore'

const ItemContainer = styled.div`
  position: relative;
  padding: 1.5rem 0.2rem;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
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
  log: DocumentData
}

const LogBox = ({ log }: Props) => {
  const { description, hours, date } = log
  return (
    <ItemContainer>
      <LogDate>{format(new Date(date.toDate()), 'yy/MM/dd')}</LogDate>
      <LogDescription>{description}</LogDescription>
      <LogHours>{hours}h</LogHours>
    </ItemContainer>
  )
}

export default LogBox
