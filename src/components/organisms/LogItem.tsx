import React, { useState } from 'react'
import styled from 'styled-components'
import { firebase, firestore } from 'firebaseConfig'

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

const StatusIcon = styled.span`
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

  :hover {
    &::after {
        content: '';
        border-radius: 2.5px;
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: ${(props: { color?: string }) =>
          props.color
            ? props.color
            : (props) => props.theme.primaryColor} 1px solid;
      }
    }
  }
`

interface Props {
  item: firebase.firestore.DocumentData
  categoryColor?: string
}

const LogItem = ({ item, categoryColor }: Props) => {
  const { name, id } = item

  return (
    <ItemContainer>
      <ItemLeft>
        <StatusIcon color={categoryColor} />
      </ItemLeft>

      <ItemRight>{name}</ItemRight>
    </ItemContainer>
  )
}

export default LogItem
