import React from 'react'
import styled from 'styled-components'
import { firebase, firestore } from 'firebaseConfig'
import { format } from 'date-fns'

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  padding: 0.6rem 0;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }
`

const ItemLeft = styled.div``
const ItemRight = styled.div`
  word-wrap: break-word;
`

const CategoryIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  border-radius: 2.5px;
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin-top: -5px;
  margin-left: -5px;
  background-color: ${(props: { color?: string }) =>
    props.color ? props.color : (props) => props.theme.primaryColor};
  }
`

const Hours = styled.span`
  position: absolute;
  right: 5%;
  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  log: firebase.firestore.DocumentData
}

const LogBox = ({ log }: Props) => {
  const { description, hours, date } = log
  console.log(date)
  return (
    <ItemContainer>
      {/* <ItemLeft>
        <CategoryIcon color={categoryColor} />
      </ItemLeft> */}

      <ItemRight>
        {description}
        <Hours>{hours} Hours</Hours>
        {format(new Date(date.toDate()), 'yyyy/MM/dd')}
      </ItemRight>
    </ItemContainer>
  )
}

export default LogBox
