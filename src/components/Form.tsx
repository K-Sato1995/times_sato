import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

const CommentForm = styled.form`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 35px;
`

const CommentInput = styled.input`
  border-radius: 5px;
  height: 37px;
  width: 100%;
  border: solid #e5e5e5 1px;
`

const SubmitButton = styled.button`
  border-radius: 5px;
  width: 100px;
  font-weight: bold;
  background-color: #2c7b7d;
  color: #fff;
  border: none;
  outline: none;
`

const Form = () => {
  return (
    <FormContainer>
      <CommentForm>
        <CommentInput placeholder={'リンクか言葉を入力'} />
        <SubmitButton>Submit</SubmitButton>
      </CommentForm>
    </FormContainer>
  )
}

export default Form
