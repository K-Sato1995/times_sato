import React from 'react'
import styled from 'styled-components'

interface BadgeDesign {
  textColor: string
  backgroundColor: string
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<BadgeDesign> {
  text: string
}

const StyledBadge = styled.span`
  display: inline-block;
  border-top-left-radius: 2.5px;
  border-top-right-radius: 2.5px;
  padding: 0.2rem 0.5rem;
  color: ${(props: Partial<BadgeDesign>) =>
    props.textColor ? props.textColor : '#fff'};
  background-color: ${(props: Partial<BadgeDesign>) =>
    props.backgroundColor
      ? props.backgroundColor
      : (props) => props.theme.primaryColor};
`

const Badge = ({ text, ...props }: BadgeProps) => {
  return <StyledBadge {...props}>{text}</StyledBadge>
}

export default Badge

// ${(props: Partial<BadgeDesign>) =>
//   props.hoverEffect &&
//   css`
//     cursor: pointer;

//     :hover {
//       background-color: #697980;
//       color: #fff;
//       padding-right: 2rem;

//       :after {
//         content: 'Edit';
//       }
//     }
//   `}
