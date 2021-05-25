import React from 'react'
import styled from 'styled-components'
import { firebase } from 'firebaseConfig'
import { useHistory } from 'react-router-dom'

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

const ItemLeft = styled.div`
  position: relative;
  width: 5%;
`
const ItemRight = styled.div`
  width: 95%;
  font-size: 1rem;
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

const ItemName = styled.div`
  display: inline-block;
  font-size: 1rem;
  width: 80%;
`

const TotalHours = styled.span`
  position: absolute;
  right: 5%;
  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  item: firebase.firestore.DocumentData
  categoryColor?: string
}

const LogItem = ({ item, categoryColor }: Props) => {
  const { name, totalHours, id } = item
  const history = useHistory()

  return (
    <ItemContainer
      onClick={() => {
        history.push(`/logs/${id}`)
      }}
    >
      <ItemLeft>
        <CategoryIcon color={categoryColor} />
      </ItemLeft>

      <ItemRight>
        <ItemName>{name}</ItemName>
        <TotalHours>{totalHours} Hours</TotalHours>
      </ItemRight>
    </ItemContainer>
  )
}

export default LogItem
