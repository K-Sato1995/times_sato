import React from 'react'
import styled from 'styled-components'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

const StyledTextarea = styled(TextareaAutosize)`
  font-size: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;
  outline: none;
  resize: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  :focus {
    outline: auto ${(props) => props.theme.primaryColor} 1px;
  }
  :disabled {
    background-color: #eee;
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface TextareaProps extends TextareaAutosizeProps {
  [key: string]: any
}

const Textarea = (props: TextareaProps) => {
  return <StyledTextarea {...props} />
}

export default Textarea
