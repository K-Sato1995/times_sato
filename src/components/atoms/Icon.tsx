import styled from 'styled-components'

interface IconProps {
  backgroundColor?: string
  textColor?: string
}

const Icon = styled.span`
  font-size: 1rem;
  color: #697980;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 20%;
  transition: 0.2s;

  :hover {
    color: ${(props: IconProps) => props.textColor};
    background-color: ${(props: IconProps) => props.backgroundColor};
    opacity: 0.7;
  }
`

/*
EXAMPLE with styled-components

import styled from 'styled-components'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { Icon } from 'components/atoms'

Icon.withComponent(FaTrashAlt)
*/
export default Icon
