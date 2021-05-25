import React from 'react'
import styled from 'styled-components'
import { firebase } from 'firebaseConfig'
import { format } from 'date-fns'

const ItemContainer = styled.div`
  position: relative;
  padding: 0.6rem 0.5rem;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }
`

const LogDescription = styled.div`
  display: inline-block;
  width: 60%;
  color: ${(props) => props.theme.secondaryColor};
  word-wrap: break-word;
  margin-left: 1rem;
`

const LogHours = styled.div`
  display: inline-block;
  width: 10%;
  color: ${(props) => props.theme.secondaryColor};
`

const LogDate = styled.div`
  display: inline-block;
  width: 25%;

  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  log: firebase.firestore.DocumentData
}

const LogBox = ({ log }: Props) => {
  const { description, hours, date } = log
  return (
    <ItemContainer>
      <LogDate>{format(new Date(date.toDate()), 'yyyy/MM/dd')}</LogDate>
      <LogDescription>{description}</LogDescription>
      <LogHours>{hours}h</LogHours>
    </ItemContainer>
  )
}

export default LogBox
