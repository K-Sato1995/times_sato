import React from 'react'
import styled from 'styled-components'
import Form from 'components/Form'
import Comment from 'components/Comment'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
  /* border: solid 1px; */
`
const CommentsContainer = styled.div`
  padding: 10px;
`
const Main = () => {
  return (
    <MainContainer>
      <Form />
      <CommentsContainer>
        <Comment />
        <Comment />
        <Comment />
      </CommentsContainer>
    </MainContainer>
  )
}

export default Main
