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
        <Comment text={'https://qiita.com/ke-bo/items/1de55991d1b7b1166fb9'} />
        <Comment text={'test'} />
        <Comment text={'Reactの成果はなし'} />
        <Comment text={'学習が進まないです'} />
      </CommentsContainer>
    </MainContainer>
  )
}

export default Main
